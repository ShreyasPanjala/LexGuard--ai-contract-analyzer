'use strict';

const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extracts plain text from an uploaded contract document.
 *
 * Supported MIME types:
 *  - application/pdf       → pdf-parse
 *  - application/vnd.openxmlformats... (DOCX) → mammoth
 *  - text/plain            → native fs read
 *
 * TODO (Phase 2): After extraction, pass `extractedText` to the AI analysis
 *   service instead of the mock:
 *     const analysis = await aiService.analyze(extractedText, options);
 *
 * @param {string} filePath - Absolute path to the file on disk
 * @param {string} mimetype - MIME type of the uploaded file
 * @returns {Promise<string>} Extracted plain text
 */
async function extractText(filePath, mimetype) {
  try {
    switch (mimetype) {
      case 'application/pdf': {
        const buffer = fs.readFileSync(filePath);
        const result = await pdfParse(buffer);
        return result.text || '';
      }

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        const result = await mammoth.extractRawText({ path: filePath });
        if (result.messages && result.messages.length > 0) {
          console.info('[DocumentService] Mammoth messages:', result.messages);
        }
        return result.value || '';
      }

      case 'text/plain': {
        return fs.readFileSync(filePath, 'utf-8');
      }

      default: {
        const err = new Error(`Unsupported file type: ${mimetype}`);
        err.status = 400;
        throw err;
      }
    }
  } catch (innerErr) {
    if (innerErr.status) throw innerErr;
    const wrapped = new Error(
      `Failed to parse the uploaded document. The file may be corrupted or password-protected. (${innerErr.message})`
    );
    wrapped.status = 422;
    throw wrapped;
  }
}

/**
 * Safely removes a file from the filesystem.
 * Non-throwing — logs a warning if deletion fails.
 * @param {string} filePath
 */
function cleanupFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn('[DocumentService] Failed to clean up file:', filePath, err.message);
  }
}

module.exports = { extractText, cleanupFile };
