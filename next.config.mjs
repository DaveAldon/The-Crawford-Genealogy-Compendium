/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
  pageExtensions: ['page.tsx', 'api.ts'],
};

export default nextConfig;
