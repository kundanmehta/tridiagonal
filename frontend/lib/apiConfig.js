// If environment variables are set, use them. 
// Otherwise, fall back to localhost for development or the live URL for production.

const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 
  (isProduction 
    ? 'https://silver-wasp-603471.hostingersite.com' 
    : 'http://localhost:5000');

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
  (isProduction 
    ? 'https://tridiagonal.com' 
    : 'http://localhost:3000');
