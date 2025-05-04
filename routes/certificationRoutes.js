const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/cerificationController');
const {
    protect,
    adminOrCertificationsModerator
} = require('../middleware/auth');

// ---------------- Public Route ---------------- //
router.post('/create', certificationController.createCertification); // Public access

// ---------------- Protected Routes ---------------- //
router.use(protect, adminOrCertificationsModerator); // Apply auth & role middleware to all below

router.get('/', certificationController.getAllCertifications);
router.get('/:id', certificationController.getCertificationById);
router.get('/total-amount', certificationController.getTotalAmountPaid);
router.get('/status/:status', certificationController.getCertificationsByStatus);
router.get('/email/:email', certificationController.getCertificationsByEmail);
router.get('/payment-method/:method', certificationController.getCertificationsByPaymentMethod);

router.put('/:id', certificationController.updateCertification);
router.patch('/:id/status', certificationController.updateCertificationStatus);
router.patch('/:id/approve', certificationController.approveCertification);
router.patch('/:id/reject', certificationController.rejectCertification);
router.delete('/:id', certificationController.deleteCertification);

module.exports = router;
