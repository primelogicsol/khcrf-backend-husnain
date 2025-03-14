const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Add a new Moderator or Collaborator
const addModeratorOrCollaborator = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate role
        const allowedRoles = [
            'Membership Moderator',
            'Donation Moderator',
            'Career Moderator',
            'Certifications Moderator',
            'Accreditation Moderator',
            'eBooks Moderator',
            'Advocacy Collaborator',
            'Campaigning Collaborator',
            'Lobbying Collaborator',
            'eBooks Collaborator',
        ];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            isAdmin: false, // Moderators and Collaborators are not admins by default
            verified: true, // Automatically verify these users
            isMember: false, // Default to false unless specified otherwise
        });

        // Generate a JWT token for the new user
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin, isMember: newUser.isMember },
            process.env.JWT_SECRET,
            { expiresIn: '100h' }
        );

        // Return the new user and token
        res.status(201).json({ user: newUser, token, message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const [updated] = await User.update({ role }, { where: { id }, returning: true });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get the profile of the logged-in user
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a user's isAdmin status
const updateUserAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    // Ensure that only super admins can update the isAdmin field
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only super admins can update admin status' });
    }

    const [updated] = await User.update({ isAdmin }, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addModeratorOrCollaborator,
  updateUserById,
  deleteUserById,
  getProfile,
  updateUserAdminStatus,
};