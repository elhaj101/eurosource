/* eslint-disable @typescript-eslint/no-require-imports */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/eurosource',
  images: { unoptimized: true }, // For static export compatibility
  env: {
    NEXT_PUBLIC_BASEPATH: '/eurosource',
  },
};

module.exports = withNextIntl(nextConfig);
