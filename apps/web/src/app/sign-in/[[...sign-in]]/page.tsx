"use client";

import { SignIn, ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";

function SignInContent() {
  return (
    <div className="min-h-screen bg-forge-dark flex items-center justify-center p-8">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gray-800/50 border border-gray-700",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-gray-700 text-white hover:bg-gray-600",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-gray-700 text-white border-gray-600",
            footerActionLink: "text-cyan-400 hover:text-cyan-300",
          },
        }}
        afterSignInUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}

export default function SignInPage() {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    return (
      <div className="min-h-screen bg-forge-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Authentication Not Configured</h1>
          <p className="text-gray-400">Clerk is not set up yet.</p>
          <Link href="/" className="text-cyan-400 hover:underline mt-4 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignInContent />
    </ClerkProvider>
  );
}
