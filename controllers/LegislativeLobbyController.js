const LegislativeLobby = require("../models/LegislativeLobby");

// Create a new legislator
const createLegislator = async (req, res) => {
  try {
    const { name, location, title } = req.body;
    const image = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : null;
    const hoverImage = req.files["hoverImage"] ? `/uploads/${req.files["hoverImage"][0].filename}` : null;

    const legislator = await LegislativeLobby.create({
      name,
      location,
      title,
      image,
      hoverImage,
    });

    res.status(201).json({ success: true, message: "Legislator created successfully.", legislator });
  } catch (error) {
    console.error("Error creating legislator:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

// Retrieve all legislators
const getAllLegislators = async (req, res) => {
  try {
    const legislators = await LegislativeLobby.findAll();
    res.status(200).json(legislators);
  } catch (error) {
    console.error("Error fetching legislators:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

// Retrieve a single legislator by ID
const getLegislatorById = async (req, res) => {
  try {
    const { id } = req.params;
    const legislator = await LegislativeLobby.findByPk(id);

    if (!legislator) {
      return res.status(404).json({ success: false, message: "Legislator not found." });
    }

    res.status(200).json({ success: true, legislator });
  } catch (error) {
    console.error("Error fetching legislator:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

// Update a legislator
const updateLegislator = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, title } = req.body;

    const legislator = await LegislativeLobby.findByPk(id);
    if (!legislator) {
      return res.status(404).json({ success: false, message: "Legislator not found." });
    }

    const image = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : legislator.image;
    const hoverImage = req.files["hoverImage"] ? `/uploads/${req.files["hoverImage"][0].filename}` : legislator.hoverImage;

    await legislator.update({
      name,
      location,
      title,
      image,
      hoverImage,
    });

    res.status(200).json({ success: true, message: "Legislator updated successfully.", legislator });
  } catch (error) {
    console.error("Error updating legislator:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

// Delete a legislator
const deleteLegislator = async (req, res) => {
  try {
    const { id } = req.params;
    const legislator = await LegislativeLobby.findByPk(id);

    if (!legislator) {
      return res.status(404).json({ success: false, message: "Legislator not found." });
    }

    await legislator.destroy();
    res.status(200).json({ success: true, message: "Legislator deleted successfully." });
  } catch (error) {
    console.error("Error deleting legislator:", error);
    res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};

module.exports = {
  createLegislator,
  getAllLegislators,
  getLegislatorById,
  updateLegislator,
  deleteLegislator,
};