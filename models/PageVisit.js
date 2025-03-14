// C:\Users\HASNAIN__\Desktop\hamadan-craft-main_2\backend\models\PageVisit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PageVisit = sequelize.define('PageVisit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visits: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['filename', 'date', 'country', 'region', 'city'], // Ensure unique records per location
        },
    ],
});

module.exports = PageVisit;