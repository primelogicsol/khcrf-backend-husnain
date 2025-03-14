const express = require('express');
const {
    createDonation,
    getDonations,
    getDonationDetails,
    deleteDonation,
} = require('../controllers/donationController');
const { protect, adminOrDonationModerator } = require('../middleware/auth'); // Use the new middleware
const router = express.Router();

// Public route to create a donation
router.post('/', createDonation);

// Protected routes for admin or donation moderators
router.get('/all', protect, adminOrDonationModerator, getDonations);
router.get('/:donationId', protect, adminOrDonationModerator, getDonationDetails);
router.delete('/:donationId', protect, adminOrDonationModerator, deleteDonation);

module.exports = router;