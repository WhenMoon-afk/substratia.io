// Convex auth configuration for Clerk
// See: https://docs.convex.dev/auth/clerk

const config = {
  providers: [
    {
      // Clerk JWT Issuer URL from Clerk Dashboard > JWT Templates > Convex
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
};

export default config;
