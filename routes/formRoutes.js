const express = require('express');
const router = express.Router();

const {
  createMember,
  getMemberDetails,
  updateMember,
  deleteMember,
  sendWelcomeEmail,
  getMembers,
  approveMembership,
  rejectMembership,
  getPendingMemberships,
  getMembershipByEmail,
  getAllMembers,
  getApprovedMembers,
  getRejectedMembers,
  checkMembership,
} = require('../controllers/formController');

const { protect, admin, adminOrMembershipModerator } = require('../middleware/auth');

// Public route for registration
router.post('/register', createMember);

// Admin or Membership Moderator routes for member management
router.get('/all', protect, adminOrMembershipModerator, getAllMembers);
router.get('/approved', protect, adminOrMembershipModerator, getApprovedMembers);
router.get('/rejected', protect, adminOrMembershipModerator, getRejectedMembers);
router.get('/', protect, adminOrMembershipModerator, getMembers);
router.get('/pending', protect, adminOrMembershipModerator, getPendingMemberships);
router.get('/:memberId', protect, adminOrMembershipModerator, getMemberDetails);
router.put('/:memberId', protect, adminOrMembershipModerator, updateMember);
router.delete('/:memberId', protect, adminOrMembershipModerator, deleteMember);
router.post('/:memberId/welcome-email', protect, adminOrMembershipModerator, sendWelcomeEmail);
router.post('/:memberId/approve', protect, adminOrMembershipModerator, approveMembership);
router.post('/:memberId/reject', protect, adminOrMembershipModerator, rejectMembership);

// Public route for checking membership status
router.get('/checkMembership', checkMembership);

// Route for fetching membership by email
router.get('/membership/:email', getMembershipByEmail);

module.exports = router;