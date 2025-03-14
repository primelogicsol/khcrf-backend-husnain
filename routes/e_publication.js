const express = require('express');
const {
  createBook,
  getBooksByCategory,
  getBookDetails,
  updateBook,
  deleteBook,
  getAllBooks
} = require('../controllers/e_publication');

const upload = require('../config/multerConfig'); // Multer for file uploads
const { protect, adminOrEbooksModerator } = require('../middleware/auth'); // Import middleware

const router = express.Router();

// Public routes (No authentication middleware)
router.get('/', getAllBooks); // Anyone can view all books
router.get('/:category', getBooksByCategory); // Anyone can view books by category
router.get('/details/:id', getBookDetails); // Anyone can view book details

// Protected routes (Admin or eBooks Collaborator only)
router.post(
  '/',
  protect, // Ensure user is authenticated
  adminOrEbooksModerator, // Ensure user is admin or eBooks collaborator
  upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), // Handle file uploads
  createBook // Create a new book
);

router.put(
  '/:id',
  protect, // Ensure user is authenticated
  adminOrEbooksModerator, // Ensure user is admin or eBooks collaborator
  upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), // Handle file uploads
  updateBook // Update an existing book
);

router.delete(
  '/:id',
  protect, // Ensure user is authenticated
  adminOrEbooksModerator, // Ensure user is admin or eBooks collaborator
  deleteBook // Delete a book
);

// Serve PDFs correctly
router.get("/pdf/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline");

  res.sendFile(filePath, (err) => {
      if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Error loading PDF");
      }
  });
});

module.exports = router;