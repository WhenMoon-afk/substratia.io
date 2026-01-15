"use client";

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode, Suspense } from "react";

// Initialize Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function DashboardContent({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-forge-dark">
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

function ConvexWrapper({ children }: { children: ReactNode }) {
  const auth = useAuth();

  if (!convex) {
    return (
      <div className="min-h-screen bg-forge-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Convex Not Configured</h1>
          <p className="text-gray-400">Set NEXT_PUBLIC_CONVEX_URL in your environment.</p>
        </div>
      </div>
    );
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={() => auth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export default function DashboardProviders({ children }: { children: ReactNode }) {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    return (
      <div className="min-h-screen bg-forge-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Authentication Not Configured</h1>
          <p className="text-gray-400">Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment.</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Suspense fallback={
        <div className="min-h-screen bg-forge-dark flex items-center justify-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      }>
        <ConvexWrapper>
          <DashboardContent>{children}</DashboardContent>
        </ConvexWrapper>
      </Suspense>
    </ClerkProvider>
  );
}
