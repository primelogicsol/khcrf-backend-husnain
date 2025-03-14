// models/Listing.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Listing = sequelize.define('Listing', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registerType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    craftSpecialty: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    craftSkill: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    craftExperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    craftAward: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    craftCatalog: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    businessType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessSold: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    businessEmployee: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    businessLicense: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteRep: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    repPost: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instituteMission: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    materialSource: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    craftingProcess: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sustainablePractices: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    sustainablePracticesDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fairWage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    genderSupport: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    femalePercentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    workplaceStandards: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    workplaceStandardsDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    childLaborPolicy: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    fairTradeCertification: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    fairTradeDocument: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    giCertification: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    giCertificationNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    giCertificationDocument: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    blockchainCertification: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    blockchainCertificationDocument: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    qualityReviewConsent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    profileDisplayConsent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    complianceAcknowledgement: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
});

module.exports = Listing;