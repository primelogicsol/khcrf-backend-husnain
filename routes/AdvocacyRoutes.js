const express = require("express");
const {
  createAdvocacy,
  getAllAdvocacy,
  getAdvocacyById,
  updateAdvocacy,
  deleteAdvocacy,
} = require("../controllers/AdvocacyController");
const upload = require("../config/multerConfig"); // Multer config for image uploads
const { protect, admin } = require("../middleware/auth"); // Middleware for authentication

const router = express.Router();

// Create advocacy (Admin only)
router.post("/",  upload.array("images", 5), createAdvocacy);

// Get all advocacies
router.get("/", getAllAdvocacy);

// Get single advocacy by ID
router.get("/:id", getAdvocacyById);

// Update advocacy (Admin only)
router.put("/:id",  upload.array("images", 5), updateAdvocacy);

// Delete advocacy (Admin only)
router.delete("/:id",  deleteAdvocacy);

module.exports = router;