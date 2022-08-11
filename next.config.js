/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  jsconfigPaths: true,
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
  images: {
    domains: [process.env.IMG_DOMAIN],
  },
};

module.exports = nextConfig;
