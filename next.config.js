/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    ACCUWEATHER_API: process.env.ACCUWEATHER_API,
    ACCUWEATHER_API_BASE_URL: process.env.ACCUWEATHER_API_BASE_URL
  }
}

module.exports = nextConfig
