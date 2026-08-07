'use strict';

const { Router } = require('express');
const analyzeRouter = require('./analyze.routes');

const router = Router();

// ── Health Check ───────────────────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'LexGuard AI API',
    version: '1.0.0',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// ── Feature Routes ─────────────────────────────────────────────────────────────
router.use('/analyze', analyzeRouter);

// TODO: Mount additional feature routes here as the project grows
// const contractsRouter = require('./contracts.routes');
// router.use('/contracts', contractsRouter);

module.exports = router;
