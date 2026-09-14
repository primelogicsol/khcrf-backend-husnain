const fs = require('fs');
const path = require('path');
const sequelize = require('../config/sequelize');

const DATA_FILE = path.join(__dirname, '..', 'data', 'budgam-kani-pilot-25.json');
const SOURCE_URL = 'https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/51';

async function getOrCreateSource(transaction) {
  const [rows] = await sequelize.query(
    `SELECT id FROM artisan_sources WHERE source_url = :url AND source_type = 'GI_REGISTRY' LIMIT 1`,
    { replacements: { url: SOURCE_URL }, transaction }
  );
  if (rows.length) return rows[0].id;

  const [result] = await sequelize.query(
    `INSERT INTO artisan_sources
      (source_type, authority, title, source_url, retrieved_at, dataset_version)
     VALUES
      ('GI_REGISTRY', 'Intellectual Property India', 'Kani Shawl GI Application 51 - Authorized User Register', :url, NOW(), 'retrieved-2026-09-14')`,
    { replacements: { url: SOURCE_URL }, transaction }
  );
  return result;
}

async function ingestRecord(record, sourceId, transaction) {
  const [existingIdentifier] = await sequelize.query(
    `SELECT artisan_id FROM artisan_identifiers
     WHERE identifier_type = 'GI_AUTHORIZED_USER' AND identifier_value = :gi LIMIT 1`,
    { replacements: { gi: record.gi_authorized_user_no }, transaction }
  );

  if (existingIdentifier.length) {
    return { action: 'SKIPPED_EXISTING', artisanId: existingIdentifier[0].artisan_id, masterId: record.khcrf_master_id };
  }

  const [entityInsert] = await sequelize.query(
    `INSERT INTO artisan_entities (entity_type, canonical_name, status)
     VALUES ('PERSON', :name, 'ACTIVE')`,
    { replacements: { name: record.full_name }, transaction }
  );
  const entityId = entityInsert;

  const verificationStatus = record.confidence === 'A' ? 'VERIFIED' : 'PROVISIONAL';
  const gender = record.gender ? record.gender.toUpperCase() : 'UNKNOWN';

  const [artisanInsert] = await sequelize.query(
    `INSERT INTO artisans
      (entity_id, khcrf_master_id, full_name, source_name, gender, life_status, practice_status,
       primary_district_code, primary_craft_code, verification_status, data_status, confidence_grade)
     VALUES
      (:entityId, :masterId, :name, :sourceName, :gender, 'UNKNOWN', 'UNKNOWN',
       'JK-BUD', 'KANI_SHAWL', :verificationStatus, :dataStatus, :confidence)`,
    {
      replacements: {
        entityId,
        masterId: record.khcrf_master_id,
        name: record.full_name,
        sourceName: record.full_name,
        gender,
        verificationStatus,
        dataStatus: record.data_status,
        confidence: record.confidence,
      },
      transaction,
    }
  );
  const artisanId = artisanInsert;

  await sequelize.query(
    `INSERT INTO artisan_identifiers
      (artisan_id, identifier_type, identifier_value, issuing_authority, status, craft_code,
       gi_application_no, verification_status, visibility)
     VALUES
      (:artisanId, 'KHCRF_MASTER_ID', :masterId, 'KHCRF', 'Active', 'KANI_SHAWL', NULL, 'VERIFIED', 'PUBLIC'),
      (:artisanId, 'GI_AUTHORIZED_USER', :gi, 'Intellectual Property India', :giStatus, 'KANI_SHAWL', '51', :verificationStatus, 'PUBLIC')`,
    {
      replacements: {
        artisanId,
        masterId: record.khcrf_master_id,
        gi: record.gi_authorized_user_no,
        giStatus: record.gi_status,
        verificationStatus,
      },
      transaction,
    }
  );

  await sequelize.query(
    `INSERT INTO artisan_crafts
      (artisan_id, craft_code, craft_name, role, is_primary, active_status, verification_status, visibility)
     VALUES
      (:artisanId, 'KANI_SHAWL', 'Kani Shawl', 'Authorized User / Artisan', TRUE, 'UNKNOWN', :verificationStatus, 'PUBLIC')`,
    { replacements: { artisanId, verificationStatus }, transaction }
  );

  await sequelize.query(
    `INSERT INTO artisan_locations
      (artisan_id, country, state_ut, district_code, district_name, locality, location_type, is_primary, visibility)
     VALUES
      (:artisanId, 'India', 'Jammu & Kashmir', 'JK-BUD', 'Budgam', :locality, 'SOURCE_REPORTED', TRUE, 'PUBLIC')`,
    { replacements: { artisanId, locality: record.locality }, transaction }
  );

  const evidence = [
    ['full_name', record.full_name],
    ['district', record.district],
    ['locality', record.locality],
    ['craft', record.craft],
    ['gi_authorized_user_no', record.gi_authorized_user_no],
    ['gi_status', record.gi_status],
  ];

  for (const [fieldName, observedValue] of evidence) {
    await sequelize.query(
      `INSERT INTO artisan_evidence
        (artisan_id, source_id, field_name, observed_value, confidence_grade, verification_status, notes)
       VALUES
        (:artisanId, :sourceId, :fieldName, :observedValue, :confidence, :verificationStatus, :notes)`,
      {
        replacements: {
          artisanId,
          sourceId,
          fieldName,
          observedValue,
          confidence: record.confidence,
          verificationStatus,
          notes: record.notes || null,
        },
        transaction,
      }
    );
  }

  return { action: 'INSERTED', artisanId, masterId: record.khcrf_master_id };
}

async function main() {
  const records = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  if (records.length !== 25) throw new Error(`Expected 25 records; found ${records.length}`);

  const transaction = await sequelize.transaction();
  try {
    const sourceId = await getOrCreateSource(transaction);
    const results = [];
    for (const record of records) {
      results.push(await ingestRecord(record, sourceId, transaction));
    }
    await transaction.commit();

    const inserted = results.filter(r => r.action === 'INSERTED').length;
    const skipped = results.filter(r => r.action === 'SKIPPED_EXISTING').length;
    console.log(JSON.stringify({ ok: true, total: results.length, inserted, skipped, results }, null, 2));
  } catch (err) {
    await transaction.rollback();
    throw err;
  } finally {
    await sequelize.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
