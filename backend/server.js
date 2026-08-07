'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const apiRouter = require('./routes');
const { errorHandler } = require('./middleware/errorHandler.middleware');

// ── App Initialization ─────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── CORS ───────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ── Body Parsers ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Static Uploads (dev only) ──────────────────────────────────────────────────
if (NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

// ── Root Route ─────────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'LexGuard AI Server Running',
    version: '1.0.0',
    environment: NODE_ENV,
    docs: 'POST /api/analyze to analyze a contract',
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api', apiRouter);

// ── 404 Handler ────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    timestamp: new Date().toISOString(),
  });
});

// ── Global Error Handler (must be last) ───────────────────────────────────────
app.use(errorHandler);

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n⚖️   LexGuard AI API is running`);
  console.log(`    ➜  Local:       http://localhost:${PORT}`);
  console.log(`    ➜  Health:      http://localhost:${PORT}/api/health`);
  console.log(`    ➜  Analyze:     POST http://localhost:${PORT}/api/analyze`);
  console.log(`    ➜  Environment: ${NODE_ENV}\n`);
});

module.exports = app;
