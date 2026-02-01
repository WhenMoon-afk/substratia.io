"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@substratia/convex";
import type { Id } from "@substratia/convex/convex/_generated/dataModel";
import Link from "next/link";
import type { Stats, Snapshot, Memory, ApiKey } from "@/types/dashboard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentSnapshots from "@/components/dashboard/RecentSnapshots";
import RecentMemories from "@/components/dashboard/RecentMemories";
import GetStarted from "@/components/dashboard/GetStarted";
import ApiKeysSection from "@/components/dashboard/ApiKeysSection";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const stats = useQuery(api.users.getStats) as Stats | undefined;
  const recentSnapshots = useQuery(api.snapshots.getRecent, { limit: 5 }) as
    | Snapshot[]
    | undefined;
  const recentMemories = useQuery(api.memories.getRecent, { limit: 5 }) as
    | Memory[]
    | undefined;
  const apiKeys = useQuery(api.apiKeys.list) as ApiKey[] | undefined;

  const getOrCreateUser = useMutation(api.users.getOrCreate);
  const createApiKey = useMutation(api.apiKeys.create);
  const revokeApiKey = useMutation(api.apiKeys.revoke);
  const forgetMemory = useMutation(api.memories.forget);

  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [showApiSection, setShowApiSection] = useState(true);

  // Check for checkout success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      setShowCheckoutSuccess(true);
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  // Ensure user exists in Convex when dashboard loads
  useEffect(() => {
    if (isLoaded && user) {
      getOrCreateUser().catch(() => {});
    }
  }, [isLoaded, user, getOrCreateUser]);

  const handleDeleteMemory = async (memoryId: string) => {
    if (!confirm("Delete this memory?")) return;
    try {
      await forgetMemory({ memoryId: memoryId as Id<"memories"> });
    } catch {
      // Silently handled — memory remains in list
    }
  };

  const handleCreateKey = async (name: string) => {
    return await createApiKey({ name });
  };

  const handleRevokeKey = async (keyId: Id<"apiKeys">) => {
    await revokeApiKey({ keyId });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Checkout Success Banner */}
      {showCheckoutSuccess && (
        <div className="mb-6 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-xl p-6 relative">
          <button
            onClick={() => setShowCheckoutSuccess(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            &times;
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Welcome!</h2>
              <p className="text-gray-300">
                Your account is active. You can now view and manage your
                memories and snapshots.
              </p>
            </div>
          </div>
          <div className="mt-4 ml-16">
            <p className="text-cyan-400 text-sm">
              Next: Create an API key below to connect your Claude Code.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.firstName || "Developer"}
          </h1>
          <p className="text-gray-400 mt-1">Substratia Memory Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            &larr; Back to site
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <StatsGrid stats={stats} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentSnapshots snapshots={recentSnapshots} />
        <RecentMemories
          memories={recentMemories}
          onDeleteMemory={handleDeleteMemory}
        />
      </div>

      <GetStarted
        apiKeys={apiKeys}
        onExpandApiSection={() => setShowApiSection(true)}
      />
      <ApiKeysSection
        apiKeys={apiKeys}
        onCreateKey={handleCreateKey}
        onRevokeKey={handleRevokeKey}
        showApiSection={showApiSection}
        onToggleApiSection={() => setShowApiSection((prev) => !prev)}
      />
    </div>
  );
}
