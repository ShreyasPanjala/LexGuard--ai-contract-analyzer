'use strict';

const { error: formatError } = require('../utils/response.util');

/**
 * Global Express error handler middleware.
 * Must be registered LAST — after all routes and other middleware.
 *
 * Handles:
 *  - Multer file upload errors (size limits, unexpected fields)
 *  - Custom application errors (err.status)
 *  - Unhandled server errors
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  console.error('[LexGuard API Error]', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // ── Multer specific error codes ──────────────────────────────────────────
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(413)
      .json(formatError('File is too large. Maximum allowed size is 10 MB.', 413));
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res
      .status(400)
      .json(formatError('Unexpected file field. Use "contract" as the multipart field name.', 400));
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return res
      .status(400)
      .json(formatError('Only one file can be uploaded at a time.', 400));
  }

  if (err.code === 'UNSUPPORTED_FILE_TYPE') {
    return res.status(400).json(formatError(err.message, 400));
  }

  // ── Custom application errors ─────────────────────────────────────────────
  if (err.status && err.status < 500) {
    return res.status(err.status).json(formatError(err.message, err.status));
  }

  // ── Generic server error ──────────────────────────────────────────────────
  const statusCode = err.status || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An internal server error occurred.'
      : err.message || 'Internal server error.';

  return res.status(statusCode).json(formatError(message, statusCode));
}

module.exports = { errorHandler };
