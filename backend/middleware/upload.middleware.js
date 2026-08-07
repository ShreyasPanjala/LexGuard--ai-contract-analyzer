'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ── Ensure uploads directory exists at startup ─────────────────────────────
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ── Allowed MIME types ─────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt',
};

// ── Disk storage ────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase() || ALLOWED_MIME_TYPES[file.mimetype] || '';
    cb(null, `contract-${uniqueId}${ext}`);
  },
});

// ── File type validation ────────────────────────────────────────────────────
const fileFilter = (_req, file, cb) => {
  if (ALLOWED_MIME_TYPES[file.mimetype]) {
    return cb(null, true);
  }
  const err = new Error(
    `Unsupported file type "${file.mimetype}". Only PDF, DOCX, and TXT files are accepted.`
  );
  err.status = 400;
  err.code = 'UNSUPPORTED_FILE_TYPE';
  cb(err, false);
};

// ── Multer instance ─────────────────────────────────────────────────────────
const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 10;

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE_MB * 1024 * 1024, // bytes
    files: 1,
  },
});

module.exports = { upload, ALLOWED_MIME_TYPES };
