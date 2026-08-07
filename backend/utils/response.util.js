'use strict';

/**
 * Formats a successful API response envelope.
 * @param {*} data - Response payload
 * @param {string} message - Optional human-readable message
 * @returns {Object}
 */
function success(data, message = 'Success') {
  return {
    status: 'success',
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Formats an error API response envelope.
 * @param {string} message - Error description
 * @param {number} statusCode - HTTP status code
 * @param {*} details - Optional debugging details (stripped in production)
 * @returns {Object}
 */
function error(message, statusCode = 500, details = null) {
  const payload = {
    status: 'error',
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
  if (details && process.env.NODE_ENV !== 'production') {
    payload.details = details;
  }
  return payload;
}

module.exports = { success, error };
