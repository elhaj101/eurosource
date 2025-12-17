/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // For static export compatibility
};

module.exports = nextConfig;
