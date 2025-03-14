// controllers/listingController.js
const Listing = require('../models/Listing');

// Create a new listing
const createListing = async (req, res) => {
    try {
      const listingData = {
        ...req.body,
        // Handle array fields
        fairtradeDoc: req.body.fairtradeDoc || [],
        blockChainDoc: req.body.blockChainDoc || [],
        documents: req.body.documents || []
      };
      
      const listing = await Listing.create(listingData);
      res.status(201).json(listing);
    } catch (error) {
      res.status(400).json({ 
        message: "Validation Error",
        details: error.errors.map(e => e.message) 
      });
    }
  };

// Get all listings
const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.findAll();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single listing by ID
const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a listing by ID
const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        await listing.update(req.body);
        res.status(200).json(listing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a listing by ID
const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        await listing.destroy();
        res.status(204).json({ message: 'Listing deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
};