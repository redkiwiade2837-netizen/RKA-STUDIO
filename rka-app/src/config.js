// Backend base URL. Set VITE_API_BASE_URL in production (Vercel env vars)
// to the deployed rka-backend URL; falls back to the local dev server.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
