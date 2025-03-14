const express = require('express');
const router = express.Router();
const pageVisitController = require('../controllers/pageVisitController');

// Track a page visit
router.post('/track', pageVisitController.trackPageVisit);

// Get visit statistics
router.get('/stats', pageVisitController.getVisitStats);

module.exports = router;