# Budgam Kani Pilot — 25 Records

Source of individual identity and GI authorization: Intellectual Property India, GI Application 51 (Kani Shawl), Authorized User register.

Context validation: Government of Jammu & Kashmir / JKTPO identifies Kani Shawl as Budgam ODOP and reports active Kani artisans in Budgam.

Ingestion rules:
- Preserve source spelling verbatim in source observation.
- Normalize district alias Badgam -> Budgam.
- Do not infer missing Pehchan or Government Artisan IDs.
- GI Authorized User number is a craft/GI authorization, not the artisan's primary identity.
- Weak/blank source status may be stored as PROVISIONAL; never silently upgraded.
- Private contact values, when later discovered, must be stored but server-masked for public responses.

Pilot file: `data/budgam-kani-pilot-25.json`.
