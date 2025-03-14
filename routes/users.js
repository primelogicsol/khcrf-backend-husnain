const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth'); // Import middleware

// Protected routes (require authentication)
router.get('/profile', protect, userController.getProfile);
router.put('/:id', protect, userController.updateUserById);
router.delete('/:id', protect, userController.deleteUserById);
router.put('/:id/admin-status', protect, admin, userController.updateUserAdminStatus); // Admin only

router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, admin, userController.getUserById);

// Route for adding a new Moderator or Collaborator (protected)
router.post('/add-moderator-collaborator', protect, admin, userController.addModeratorOrCollaborator);

module.exports = router;
