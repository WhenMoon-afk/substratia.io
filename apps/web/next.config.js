const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export disabled for Convex/Clerk support
  // Deploy to Vercel instead of Cloudflare Pages
  // To enable static export (without auth): uncomment below and remove dashboard routes
  // output: 'export',
  images: {
    formats: ["image/webp", "image/avif"],
  },
  trailingSlash: true,

  // Redirects for removed pages
  async redirects() {
    return [
      {
        source: "/cloud",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/cloud/",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pricing/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pro",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pro/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/thank-you",
        destination: "/",
        permanent: true,
      },
      {
        source: "/thank-you/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/templates",
        destination: "/memory-tools",
        permanent: true,
      },
      {
        source: "/templates/",
        destination: "/memory-tools",
        permanent: true,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline' ${isProd ? "" : "'unsafe-eval'"} https://clerk.substratia.io https://*.clerk.accounts.dev https://challenges.cloudflare.com https://plausible.io https://va.vercel-scripts.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.convex.cloud https://clerk.substratia.io https://*.clerk.accounts.dev wss://*.convex.cloud https://api.npmjs.org https://api.github.com https://plausible.io https://va.vercel-scripts.com",
              "frame-src 'self' https://clerk.substratia.io https://*.clerk.accounts.dev https://challenges.cloudflare.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
