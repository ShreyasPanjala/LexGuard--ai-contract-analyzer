'use strict';

const { extractText, cleanupFile } = require('../services/document.service');
const { analyzeContract } = require('../services/analysis.service');
const { success, error: formatError } = require('../utils/response.util');

/**
 * POST /api/analyze
 *
 * Accepts a multipart/form-data upload with field name "contract",
 * extracts its text content, and returns a risk analysis.
 *
 * Architecture notes for future phases:
 *  - Phase 2: Replace analyzeContract(text) with aiService.analyze(text)
 *  - Phase 3: Add x402 payment middleware before upload in the router
 *  - Phase 4: Add Algorand payment verification in the router/middleware
 */
async function analyzeContractHandler(req, res, next) {
  let filePath = null;

  try {
    // ── 1. Validate file presence ──────────────────────────────────────────
    if (!req.file) {
      const err = new Error(
        'No file received. Please attach a contract using the "contract" multipart field.'
      );
      err.status = 400;
      return next(err);
    }

    filePath = req.file.path;
    console.info(
      `[AnalyzeController] Processing: ${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)`
    );

    // ── 2. Extract text from the document ────────────────────────────────
    const extractedText = await extractText(filePath, req.file.mimetype);

    if (!extractedText || extractedText.trim().length === 0) {
      const err = new Error(
        'The uploaded file appears to be empty or could not be parsed. Please try a different file.'
      );
      err.status = 422;
      return next(err);
    }

    // ── 3. Analyze the contract ──────────────────────────────────────────
    // TODO (Phase 2): Swap this for: const analysis = await aiService.analyze(extractedText);
    const analysis = analyzeContract(extractedText);

    // ── 4. Return results ─────────────────────────────────────────────────
    console.info(`[AnalyzeController] Analysis complete. Risk score: ${analysis.overallRisk}`);
    return res.status(200).json(success(analysis, 'Contract analysis complete'));
  } catch (err) {
    return next(err);
  } finally {
    // Always clean up the temp file regardless of success or failure
    if (filePath) cleanupFile(filePath);
  }
}

module.exports = { analyzeContractHandler };
