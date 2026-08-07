import axios from 'axios';

/**
 * Pre-configured Axios instance for the LexGuard AI API.
 * Uses Vite's dev proxy (/api → http://localhost:5000) so no
 * hardcoded localhost URL is needed in service code.
 */
const api = axios.create({
  baseURL: '/api',
  timeout: 60_000, // 60 s — generous for large file uploads
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // TODO (Phase 3): Attach x402 payment token:
    //   config.headers['X-Payment-Token'] = paymentService.getToken();
    // TODO (Phase 4): Attach Algorand transaction proof:
    //   config.headers['X-Algorand-Tx'] = algorandService.getProof();
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    console.error('[LexGuard API]', message, error.response?.status);
    return Promise.reject(error);
  }
);

/**
 * Uploads a contract file for analysis.
 *
 * @param {File} file - The contract file (PDF/DOCX/TXT)
 * @param {Function} [onUploadProgress] - Progress callback receives 0–100 integer
 * @returns {Promise<Object>} Analysis data object from the server
 */
export async function analyzeContract(file, onUploadProgress) {
  const formData = new FormData();
  formData.append('contract', file);

  const response = await api.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        onUploadProgress?.(percent);
      }
    },
  });

  // Server wraps response in { status, data, message }
  return response.data.data;
}

/**
 * Checks if the backend API is reachable.
 * @returns {Promise<Object>}
 */
export async function checkHealth() {
  const response = await api.get('/health');
  return response.data;
}

export default api;
