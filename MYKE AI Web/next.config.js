/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    // Backend API URL will be set via environment variables
    // API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000'
  },
};