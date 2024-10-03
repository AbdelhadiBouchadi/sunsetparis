/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
