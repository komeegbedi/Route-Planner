/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    },
    // Uncomment the following if you need to use Mapbox in a Client Component
    // experimental: {
    //   esmExternals: false,
    // },
  }
  
  module.exports = nextConfig