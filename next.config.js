/* eslint-disable @typescript-eslint/no-require-imports */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/eurosource' : '',
  images: { unoptimized: true }, // For static export compatibility
  env: {
    NEXT_PUBLIC_BASEPATH: isProd ? '/eurosource' : '',
  },
};

module.exports = withNextIntl(nextConfig);
