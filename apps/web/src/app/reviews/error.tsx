"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ReviewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Reviews error:", error);
  }, [error]);

  return (
    <main className="min-h-screen text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="text-red-500">Oops</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Something went wrong loading this review
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again or browse other
          reviews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
          >
            Try Again
          </button>
          <Link
            href="/reviews"
            className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-xl font-semibold transition-all"
          >
            All Reviews
          </Link>
        </div>
      </div>
    </main>
  );
}
