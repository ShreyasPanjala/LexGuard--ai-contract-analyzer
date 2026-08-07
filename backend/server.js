/**
 * LexGuard AI — Express Server Entry Point
 *
 * Bootstraps the Express application with middleware and routes.
 * Application logic is implemented in the respective controllers and services.
 */

'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// ─── App Initialization ────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Global Middleware ─────────────────────────────────────────────────────────

// CORS — allow requests from the frontend dev server
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse incoming JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// ─── Static Uploads Directory ──────────────────────────────────────────────────

// Serve uploaded files (used during development; restrict in production)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── API Routes ────────────────────────────────────────────────────────────────

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'LexGuard AI API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// TODO: Mount feature routes here as they are implemented
// const contractRoutes = require('./routes/contract.routes');
// app.use('/api/contracts', contractRoutes);

// ─── 404 Handler ───────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// ─── Global Error Handler ──────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[LexGuard API Error]', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

// ─── Start Server ──────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀  LexGuard AI API is running`);
  console.log(`    ➜  http://localhost:${PORT}`);
  console.log(`    ➜  Health: http://localhost:${PORT}/api/health`);
  console.log(`    ➜  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
