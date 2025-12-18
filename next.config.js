/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/eurosource',
  images: { unoptimized: true }, // For static export compatibility
  env: {
    NEXT_PUBLIC_BASEPATH: '/eurosource',
  },
};

module.exports = nextConfig;
