"use client";

import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@substratia/convex";
import Link from "next/link";

// Types for Convex data (matches schema)
interface Snapshot {
  _id: string;
  summary: string;
  projectPath: string;
  importance: "critical" | "important" | "normal" | "reference";
  createdAt: number;
}

interface Memory {
  _id: string;
  content: string;
  importance: "critical" | "high" | "normal" | "low";
  accessCount: number;
}

interface Stats {
  snapshotCount: number;
  memoryCount: number;
  tier: "free" | "pro" | "team";
  memberSince: number;
}

interface ApiKey {
  _id: string;
  keyPrefix: string;
  name: string;
  lastUsed?: number;
  createdAt: number;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const stats = useQuery(api.users.getStats) as Stats | undefined;
  const recentSnapshots = useQuery(api.snapshots.getRecent, { limit: 5 }) as Snapshot[] | undefined;
  const recentMemories = useQuery(api.memories.getRecent, { limit: 5 }) as Memory[] | undefined;
  const apiKeys = useQuery(api.apiKeys.list) as ApiKey[] | undefined;

  const createApiKey = useMutation(api.apiKeys.create);
  const revokeApiKey = useMutation(api.apiKeys.revoke);

  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showApiSection, setShowApiSection] = useState(false);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    setIsCreating(true);
    try {
      const result = await createApiKey({ name: newKeyName.trim() });
      setNewKeyValue(result.key);
      setNewKeyName("");
    } catch (error) {
      console.error("Failed to create API key:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to revoke this API key? This cannot be undone.")) return;
    try {
      await revokeApiKey({ keyId: keyId as any });
    } catch (error) {
      console.error("Failed to revoke API key:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.firstName || "Developer"}
          </h1>
          <p className="text-gray-400 mt-1">
            Substratia Cloud Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Snapshots</h3>
          <p className="text-4xl font-bold text-white mt-2">
            {stats?.snapshotCount ?? "—"}
          </p>
          <p className="text-gray-500 text-sm mt-1">Synced to cloud</p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Memories</h3>
          <p className="text-4xl font-bold text-white mt-2">
            {stats?.memoryCount ?? "—"}
          </p>
          <p className="text-gray-500 text-sm mt-1">Persistent memories</p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium">Plan</h3>
          <p className="text-4xl font-bold text-cyan-400 mt-2 capitalize">
            {stats?.tier ?? "Free"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {stats?.tier === "free" ? (
              <Link href="/pricing" className="text-cyan-400 hover:underline">
                Upgrade →
              </Link>
            ) : (
              "Thank you for your support!"
            )}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Snapshots */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Snapshots</h2>
          {recentSnapshots === undefined ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
              ))}
            </div>
          ) : recentSnapshots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No snapshots yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Use <code className="text-cyan-400">/momentum:save</code> in Claude Code
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSnapshots.map((snapshot) => (
                <div
                  key={snapshot._id}
                  className="bg-gray-700/30 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">{snapshot.summary}</h3>
                      <p className="text-gray-400 text-sm mt-1 truncate max-w-md">
                        {snapshot.projectPath}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        snapshot.importance === "critical"
                          ? "bg-red-500/20 text-red-400"
                          : snapshot.importance === "important"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-600/50 text-gray-400"
                      }`}
                    >
                      {snapshot.importance}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(snapshot.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Memories */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Memories</h2>
          {recentMemories === undefined ? (
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
              ))}
            </div>
          ) : recentMemories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No memories yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Use <code className="text-cyan-400">store</code> from memory-mcp
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMemories.map((memory) => (
                <div
                  key={memory._id}
                  className="bg-gray-700/30 rounded-lg p-4"
                >
                  <p className="text-white line-clamp-2">{memory.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        memory.importance === "critical"
                          ? "bg-red-500/20 text-red-400"
                          : memory.importance === "high"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-600/50 text-gray-400"
                      }`}
                    >
                      {memory.importance}
                    </span>
                    <span className="text-gray-500 text-xs">
                      Accessed {memory.accessCount}×
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-white font-medium">1. Install momentum</h3>
            <code className="text-cyan-400 text-sm block mt-2">
              /plugin install momentum@substratia-marketplace
            </code>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-white font-medium">2. Install memory-mcp</h3>
            <code className="text-cyan-400 text-sm block mt-2">
              npx @whenmoon-afk/memory-mcp
            </code>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-white font-medium">3. Save your work</h3>
            <code className="text-cyan-400 text-sm block mt-2">
              /momentum:save
            </code>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h3 className="text-white font-medium">4. Restore after /clear</h3>
            <code className="text-cyan-400 text-sm block mt-2">
              /momentum:load
            </code>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">API Keys</h2>
          <button
            onClick={() => setShowApiSection(!showApiSection)}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {showApiSection ? "Hide" : "Show"} API Keys
          </button>
        </div>

        {showApiSection && (
          <>
            <p className="text-gray-400 text-sm mb-4">
              API keys allow momentum and memory-mcp to sync data to Substratia Cloud.
            </p>

            {/* New Key Created - Show Once */}
            {newKeyValue && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-green-400 font-medium">API Key Created</h3>
                    <p className="text-green-300/70 text-sm mt-1">
                      Copy this key now. You won&apos;t be able to see it again.
                    </p>
                  </div>
                  <button
                    onClick={() => setNewKeyValue(null)}
                    className="text-green-400 hover:text-green-300"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <code className="bg-gray-900 px-3 py-2 rounded text-cyan-400 font-mono text-sm flex-1 overflow-x-auto">
                    {newKeyValue}
                  </code>
                  <button
                    onClick={() => copyToClipboard(newKeyValue)}
                    className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* Create New Key */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Key name (e.g., 'work-laptop')"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleCreateKey()}
              />
              <button
                onClick={handleCreateKey}
                disabled={isCreating || !newKeyName.trim()}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? "Creating..." : "Create Key"}
              </button>
            </div>

            {/* Existing Keys */}
            <div className="space-y-2">
              {apiKeys === undefined ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-12 bg-gray-700/50 rounded-lg" />
                  ))}
                </div>
              ) : apiKeys.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No API keys yet. Create one to enable cloud sync.
                </p>
              ) : (
                apiKeys.map((key) => (
                  <div
                    key={key._id}
                    className="flex items-center justify-between bg-gray-700/30 rounded-lg px-4 py-3"
                  >
                    <div>
                      <span className="text-white font-medium">{key.name}</span>
                      <span className="text-gray-500 ml-2 font-mono text-sm">
                        {key.keyPrefix}...
                      </span>
                      <span className="text-gray-600 text-xs ml-2">
                        Created {new Date(key.createdAt).toLocaleDateString()}
                        {key.lastUsed && (
                          <> · Last used {new Date(key.lastUsed).toLocaleDateString()}</>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRevokeKey(key._id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Revoke
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Setup Instructions */}
            {apiKeys && apiKeys.length > 0 && (
              <div className="mt-6 bg-gray-700/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Configure momentum for cloud sync</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Add this to your <code className="text-cyan-400">~/.config/momentum/config.json</code>:
                </p>
                <pre className="bg-gray-900 rounded p-3 text-sm text-gray-300 overflow-x-auto">
{`{
  "cloudSync": {
    "enabled": true,
    "apiKey": "YOUR_API_KEY",
    "endpoint": "https://agreeable-chameleon-83.convex.site/api/snapshots/sync"
  }
}`}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
