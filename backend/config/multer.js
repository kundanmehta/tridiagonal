const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpeg|jpg|png|gif|webp|svg|mp4|webm|mov|pdf|doc|docx)$/i;
  const allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/mpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const extOk = allowedExtensions.test(file.originalname);
  const mimeOk = allowedMimeTypes.includes(file.mimetype);

  if (extOk || mimeOk) {
    cb(null, true);
  } else {
    console.warn(`[Upload] Rejected file: ${file.originalname}, mime: ${file.mimetype}`);
    cb(new Error(`File type not allowed: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max for videos
});

module.exports = upload;
