/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/eurosource',
  images: { unoptimized: true }, // For static export compatibility
};

module.exports = nextConfig;
