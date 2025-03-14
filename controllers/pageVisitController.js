// C:\Users\HASNAIN__\Desktop\hamadan-craft-main_2\backend\controllers\pageVisitController.js
const PageVisit = require('../models/PageVisit');

// Track a page visit
const trackPageVisit = async (req, res) => {
    const { filename, ip, country, region, city } = req.body;

    if (!filename) {
        return res.status(400).json({ message: 'Filename is required' });
    }

    try {
        const today = new Date().toISOString().split('T')[0];

        // Check if a record exists for the same filename, date, and location
        const [pageVisit, created] = await PageVisit.findOrCreate({
            where: {
                filename,
                date: today,
                country,
                region,
                city,
            },
            defaults: {
                filename,
                visits: 1,
                date: today,
                ip,
                country,
                region,
                city,
            },
        });

        if (!created) {
            // If the record exists, increment the visit count
            pageVisit.visits += 1;
            await pageVisit.save();
        }

        res.json({ message: 'Visit recorded', pageVisit });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get visit statistics
const getVisitStats = async (req, res) => {
    try {
        const stats = await PageVisit.findAll({
            order: [['date', 'DESC']],
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    trackPageVisit,
    getVisitStats,
};