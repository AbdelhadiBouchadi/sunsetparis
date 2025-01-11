/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
