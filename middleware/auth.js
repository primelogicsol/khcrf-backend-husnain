const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (verify token)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by ID
            const user = await User.findByPk(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Attach user to request (excluding password)
            req.user = { ...user.dataValues };
            delete req.user.password;

            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware for admin-only access
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

// Middleware for admin or donation moderator access
const adminOrDonationModerator = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.role === 'Donation Moderator')) {
        next();
    } else {
        return res.status(401).json({ message: 'Not authorized as admin or donation moderator' });
    }
};

// Middleware for admin or membership moderator access
const adminOrMembershipModerator = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.role === 'Membership Moderator')) {
        next();
    } else {
        return res.status(401).json({ message: 'Not authorized as admin or membership moderator' });
    }
};

// Middleware for admin or accreditation moderator access
const adminOrAccreditationModerator = (req, res, next) => {
    console.log('--- Middleware Debug ---');
    console.log('User Object:', req.user);
    console.log('Is Admin:', req.user?.isAdmin);
    console.log('Role:', req.user?.role);
    
    if (req.user && (req.user.isAdmin || req.user.role === 'Accreditation Moderator')) {
        console.log('Access Granted');
        next();
    } else {
        console.log('Access Denied');
        return res.status(401).json({ 
            message: 'Not authorized as admin or accreditation moderator' 
        });
    }
};

// Middleware for admin or eBooks collaborator access
const adminOrEbooksModerator = (req, res, next) => {
    console.log('--- Middleware Debug ---');
    console.log('User Object:', req.user);
    console.log('Is Admin:', req.user?.isAdmin);
    console.log('Role:', req.user?.role);
    
    if (req.user && (req.user.isAdmin || req.user.role === 'eBooks Moderator')) {
        console.log('Access Granted');
        next();
    } else {
        console.log('Access Denied');
        return res.status(401).json({ 
            message: 'Not authorized as admin or eBooks collaborator' 
        });
    }
};
// Middleware for admin or certifications moderator access
const adminOrCertificationsModerator = (req, res, next) => {
    console.log('--- Middleware Debug ---');
    console.log('User Object:', req.user);
    console.log('Is Admin:', req.user?.isAdmin);
    console.log('Role:', req.user?.role);
    
    if (req.user && (req.user.isAdmin || req.user.role === 'Certifications Moderator')) {
        console.log('Access Granted');
        next();
    } else {
        console.log('Access Denied');
        return res.status(401).json({ 
            message: 'Not authorized as admin or certifications moderator' 
        });
    }
};
module.exports = { 
    protect, 
    admin, 
    adminOrDonationModerator, 
    adminOrMembershipModerator, 
    adminOrAccreditationModerator,
    adminOrEbooksModerator ,
    adminOrCertificationsModerator
};