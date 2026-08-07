/**
 * config/index.js
 *
 * Centralized application configuration.
 * All environment variables should be accessed through this module.
 */

'use strict';

require('dotenv').config();

const config = {
  server: {
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
  upload: {
    maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 10,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  // AI Integration (coming soon)
  ai: {
    apiKey: process.env.AI_API_KEY || null,
    model: process.env.AI_MODEL || null,
  },
};

module.exports = config;
