/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    qualities: [75, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'tridiagonal.com' },
      { protocol: 'https', hostname: 'tridiagonal.ai' },
      { protocol: 'https', hostname: 'tridiagonalsoftware.com' },
      // Allow any https hostname (covers your Hostinger backend domain for uploaded images)
      { protocol: 'https', hostname: '**' },
      // Allow localhost for development
      { protocol: 'http', hostname: 'localhost', port: '5000' },
    ],
  },
};

export default nextConfig;
