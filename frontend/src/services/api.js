/**
 * services/api.js
 *
 * Axios base instance configured to communicate with the LexGuard AI backend.
 *
 * All API service modules should import and use this instance instead of raw axios.
 *
 * Usage:
 *   import api from '@/services/api';
 *   const response = await api.get('/contracts');
 */

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',         // Proxied to http://localhost:5000 by Vite in dev
  timeout: 30_000,          // 30 seconds (generous for file uploads)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ──────────────────────────────────────────────────────

api.interceptors.request.use(
  (config) => {
    // TODO: Attach auth tokens or x402 payment headers here when ready
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────────────────────

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('[LexGuard API]', message, error.response?.status);
    return Promise.reject(error);
  }
);

export default api;
