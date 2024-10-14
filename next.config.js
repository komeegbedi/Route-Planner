/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    },
    transpilePackages: ['@mapbox/search-js-react'],
    // Uncomment if you need to use Mapbox in a Client Component and encounter issues
    // experimental: {
    //   esmExternals: 'loose',
    // },
  }
  
  module.exports = nextConfig