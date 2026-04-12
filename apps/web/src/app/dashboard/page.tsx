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
import { useURLParam } from "@/hooks/useURLParam";
import { CheckIcon } from "@/components/ui/icons";

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

  const checkoutParam = useURLParam("checkout");
  const [checkoutDismissed, setCheckoutDismissed] = useState(false);
  const showCheckoutSuccess = checkoutParam === "success" && !checkoutDismissed;
  const [showApiSection, setShowApiSection] = useState(true);

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
      // Silently handled - memory remains in list
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
        <div className="mb-6 bg-linear-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-xl p-6 relative">
          <button
            onClick={() => setCheckoutDismissed(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            &times;
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-green-400" />
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
            <p className="text-forge-cyan text-sm">
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

      <section className="mb-8 rounded-2xl border border-forge-cyan/25 bg-linear-to-br from-forge-cyan/15 via-white/[0.04] to-forge-purple/15 p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-forge-cyan">
              Private playtest
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Harborlight test world
            </h2>
            <p className="mt-2 max-w-2xl text-gray-300">
              Enter the live RP engine demo, create a character, move through
              the visual world, and interact with the Harborlight Guide.
            </p>
          </div>
          <Link
            href="/play/harborlight"
            className="inline-flex items-center justify-center rounded-full bg-forge-cyan px-5 py-3 text-sm font-bold text-forge-dark transition hover:bg-white"
          >
            Launch Harborlight
          </Link>
        </div>
      </section>

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
