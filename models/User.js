const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Define the User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Super Admin flag
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otpExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isMember: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    role: {
        type: DataTypes.ENUM(
            'Normal User', // Default role for regular users
            'Membership Moderator',
            'Donation Moderator',
            'Career Moderator',
            'Certifications Moderator',
            'Accreditation Moderator', 
            'eBooks Moderator',
            'Advocacy Collaborator',
            'Campaigning Collaborator',
            'Lobbying Collaborator',
            'eBooks Collaborator'
        ),
        allowNull: false,
        defaultValue: 'Normal User', // Default role for new users
    },
}, {
    timestamps: false,
});

module.exports = User;