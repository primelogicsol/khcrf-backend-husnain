const express = require("express");
const {
  createLegislator,
  getAllLegislators,
  getLegislatorById,
  updateLegislator,
  deleteLegislator,
} = require("../controllers/LegislativeLobbyController");
const upload = require("../config/multerConfig"); // Multer config for image uploads
const { protect, admin } = require("../middleware/auth"); // Middleware for authentication

const router = express.Router();

// Create legislator (Admin only)
router.post("/", protect, admin, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "hoverImage", maxCount: 1 },
]), createLegislator);

// Get all legislators
router.get("/", getAllLegislators);

// Get single legislator by ID
router.get("/:id", getLegislatorById);

// Update legislator (Admin only)
router.put("/:id", protect, admin, upload.fields([
  { name: "image", maxCount: 1 },
  { name: "hoverImage", maxCount: 1 },
]), updateLegislator);

// Delete legislator (Admin only)
router.delete("/:id", protect, admin, deleteLegislator);

module.exports = router;