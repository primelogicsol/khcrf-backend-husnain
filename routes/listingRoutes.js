const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { protect, admin } = require('../middleware/auth'); // Import the middleware

router.post('/',  listingController.createListing);

// Get all listings (protected route, admin-only)
router.get('/', protect, admin, listingController.getAllListings);

// Get a single listing by ID (protected route)
router.get('/:id', protect, listingController.getListingById);

// Update a listing by ID (protected route, admin-only)
router.put('/:id', protect, admin, listingController.updateListing);

// Delete a listing by ID (protected route, admin-only)
router.delete('/:id', protect, admin, listingController.deleteListing);

module.exports = router;