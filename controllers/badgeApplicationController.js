const BadgeApplication = require('../models/BadgeApplication');
const sendEmail = require('../utils/sendEmail'); // For email notifications

// Submit a badge application
exports.submitBadgeApplication = async (req, res) => {
  try {
    const {
      businessName,
      contactPerson,
      emailAddress,
      phoneNumber,
      businessAddress,
      badges,
      businessDescription,
      productionMethods,
      documentation,
      otherDocumentation,
      certification,
    } = req.body;

    const parsedBadges = badges && typeof badges === 'string' ? JSON.parse(badges) : badges;
    const parsedDocumentation = documentation && typeof documentation === 'string' ? JSON.parse(documentation) : documentation;

    const filePaths = req.files ? req.files.map((file) => file.path) : [];

    const application = await BadgeApplication.create({
      businessName,
      contactPerson,
      emailAddress,
      phoneNumber,
      businessAddress,
      badges: parsedBadges,
      businessDescription,
      productionMethods,
      supportingDocumentation: parsedDocumentation,
      otherDocumentation,
      certification,
      uploadedFiles: JSON.stringify(filePaths),
      status: 'pending', // Default status
    });

    res.status(201).json({
      success: true,
      message: 'Badge application submitted successfully.',
      application,
    });
  } catch (error) {
    console.error('Error during application submission:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// Get all badge applications with optional status filter
exports.getBadgeApplications = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter = { where: { status } };
    }

    const applications = await BadgeApplication.findAll(filter);

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching badge applications:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get pending badge applications
exports.getPendingBadgeApplications = async (req, res) => {
  try {
    const pendingApplications = await BadgeApplication.findAll({ where: { status: 'pending' } });
    res.status(200).json({
      success: true,
      applications: pendingApplications,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch pending badge applications' });
  }
};

// Get approved badge applications
exports.getApprovedBadgeApplications = async (req, res) => {
  try {
    const applications = await BadgeApplication.findAll({ where: { status: 'approved' } });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching approved badge applications:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get rejected badge applications
exports.getRejectedBadgeApplications = async (req, res) => {
  try {
    const applications = await BadgeApplication.findAll({ where: { status: 'rejected' } });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching rejected badge applications:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get details of a specific badge application
exports.getBadgeApplicationDetails = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await BadgeApplication.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Badge application not found' });
    }
    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch badge application details' });
  }
};

// Update a badge application
exports.updateBadgeApplication = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await BadgeApplication.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Badge application not found' });
    }

    await application.update(req.body);
    res.status(200).json({
      success: true,
      message: 'Badge application updated successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update badge application' });
  }
};

// Delete a badge application
exports.deleteBadgeApplication = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await BadgeApplication.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Badge application not found' });
    }
    await application.destroy();
    res.status(200).json({
      success: true,
      message: 'Badge application deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete badge application' });
  }
};

// Approve a badge application
exports.approveBadgeApplication = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await BadgeApplication.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Badge application not found' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ success: false, error: 'Application is not pending' });
    }

    application.status = 'approved';
    await application.save();

    const subject = 'Badge Application Approved';
    const message = `
      Dear ${application.contactPerson},
      Your badge application has been approved. Congratulations!
      Best Regards,
      The Team
    `;

    await sendEmail(application.emailAddress, subject, message);
    res.status(200).json({
      success: true,
      message: 'Badge application approved successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to approve badge application' });
  }
};

// Reject a badge application
exports.rejectBadgeApplication = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await BadgeApplication.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Badge application not found' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ success: false, error: 'Application is not pending' });
    }

    application.status = 'rejected';
    await application.save();

    const subject = 'Badge Application Rejected';
    const message = `
      Dear ${application.contactPerson},
      Unfortunately, your badge application has been rejected.
      Best Regards,
      The Team
    `;

    await sendEmail(application.emailAddress, subject, message);
    res.status(200).json({
      success: true,
      message: 'Badge application rejected successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to reject badge application' });
  }
};