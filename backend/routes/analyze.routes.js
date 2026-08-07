'use strict';

const { Router } = require('express');
const { upload } = require('../middleware/upload.middleware');
const { analyzeContractHandler } = require('../controllers/analyze.controller');

const router = Router();

/**
 * POST /api/analyze
 *
 * Upload a contract document and receive a risk analysis.
 *
 * Middleware pipeline:
 *  1. upload.single('contract')  → Validates & saves the file to disk
 *  2. analyzeContractHandler     → Extracts text and returns analysis
 *
 * TODO (Phase 3): Insert x402 payment verification middleware here:
 *   router.post('/', x402Middleware, upload.single('contract'), analyzeContractHandler);
 *
 * TODO (Phase 4): Insert Algorand payment proof verification:
 *   router.post('/', algorandVerify, x402Middleware, upload.single('contract'), analyzeContractHandler);
 */
router.post('/', upload.single('contract'), analyzeContractHandler);

module.exports = router;
