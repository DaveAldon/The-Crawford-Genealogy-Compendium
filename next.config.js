/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    domains: ['github.com', 'i.pravatar.cc', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
