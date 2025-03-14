const express = require('express');
const {
  submitBadgeApplication,
  getBadgeApplications,
  getPendingBadgeApplications,
  getApprovedBadgeApplications,
  getRejectedBadgeApplications,
  getBadgeApplicationDetails,
  updateBadgeApplication,
  deleteBadgeApplication,
  approveBadgeApplication,
  rejectBadgeApplication,
} = require('../controllers/badgeApplicationController');

const upload = require('../config/multerConfig'); // Multer for file uploads
const { protect, admin, adminOrAccreditationModerator } = require('../middleware/auth'); // Middleware for protected routes
const router = express.Router();

// Public route for submitting badge applications
router.post('/submit', upload.array('uploadedFiles', 5), submitBadgeApplication);

// Routes for fetching applications (Admin or Accreditation Moderator only)
router.get('/', protect, adminOrAccreditationModerator, getBadgeApplications); // Get all applications with optional status filter
router.get('/pending', protect, adminOrAccreditationModerator, getPendingBadgeApplications); // Get pending applications
router.get('/approved', protect, adminOrAccreditationModerator, getApprovedBadgeApplications); // Get approved applications
router.get('/rejected', protect, adminOrAccreditationModerator, getRejectedBadgeApplications); // Get rejected applications
router.get('/:applicationId', protect, adminOrAccreditationModerator, getBadgeApplicationDetails); // Get application details by ID

// Admin or Accreditation Moderator routes for managing badge applications
router.put('/:applicationId', protect, adminOrAccreditationModerator, updateBadgeApplication); // Update an application
router.delete('/:applicationId', protect, adminOrAccreditationModerator, deleteBadgeApplication); // Delete an application

// Badge application approval and rejection routes (Admin or Accreditation Moderator only)
router.put('/:applicationId/approve', protect, adminOrAccreditationModerator, approveBadgeApplication);
router.put('/:applicationId/reject', protect, adminOrAccreditationModerator, rejectBadgeApplication);

module.exports = router;