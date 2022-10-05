/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ACCUWEATHER_API: process.env.ACCUWEATHER_API,
  }
}

module.exports = nextConfig
