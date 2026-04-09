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
    ],
  },
};

export default nextConfig;
