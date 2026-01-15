/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export disabled for Convex/Clerk support
  // Deploy to Vercel instead of Cloudflare Pages
  // To enable static export (without auth): uncomment below and remove dashboard routes
  // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
