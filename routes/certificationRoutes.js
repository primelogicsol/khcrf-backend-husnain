const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/cerificationController');
const { protect, adminOrCertificationsModerator } = require('../middleware/auth'); // Import the new middleware

// Public Routes (No authentication required)
router.get('/status/:status', certificationController.getCertificationsByStatus);
router.get('/email/:email', certificationController.getCertificationsByEmail);
router.get('/payment-method/:method', certificationController.getCertificationsByPaymentMethod);

// Protected Routes (Require authentication)
router.get('/', protect, certificationController.getAllCertifications);
router.get('/total-amount', protect, adminOrCertificationsModerator, certificationController.getTotalAmountPaid); // Updated
router.get('/:id', protect, certificationController.getCertificationById);

// Admin or Certifications Moderator Routes (Require authentication + admin or moderator privileges)
router.post('/create', protect, adminOrCertificationsModerator, certificationController.createCertification); // Updated
router.put('/:id', protect, adminOrCertificationsModerator, certificationController.updateCertification); // Updated
router.patch('/:id/status', protect, adminOrCertificationsModerator, certificationController.updateCertificationStatus); // Updated
router.delete('/:id', protect, adminOrCertificationsModerator, certificationController.deleteCertification); // Updated

// New routes for approve and reject
router.patch('/:id/approve', protect, adminOrCertificationsModerator, certificationController.approveCertification); // Updated
router.patch('/:id/reject', protect, adminOrCertificationsModerator, certificationController.rejectCertification); // Updated

module.exports = router;