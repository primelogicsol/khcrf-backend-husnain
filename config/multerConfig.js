const multer = require('multer');
const path = require('path');

// Define allowed file types
const allowedFileTypes = [
  'application/pdf', 
  'image/jpeg', 
  'image/png', 
  'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'image/gif', 
  'image/bmp', 
  'image/webp', 
  'application/zip', 
  'application/x-rar-compressed'
];

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, PNG, DOC, DOCX, GIF, BMP, WEBP, ZIP, and RAR formats are allowed.'));
  }
};

// Set file size limit (e.g., 10MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

module.exports = upload;
