"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@substratia/convex";
import Link from "next/link";

// Types for Convex data (matches schema)
interface Snapshot {
  _id: string;
  summary: string;
  projectPath: string;
  context?: string;
  decisions?: string[];
  nextSteps?: string;
  filesTouched?: string[];
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

  const getOrCreateUser = useMutation(api.users.getOrCreate);
  const createApiKey = useMutation(api.apiKeys.create);
  const revokeApiKey = useMutation(api.apiKeys.revoke);

  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  // Show API section by default if user has no keys yet (detected after load)
  const [showApiSection, setShowApiSection] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedSnapshot, setExpandedSnapshot] = useState<string | null>(null);

  // Auto-fill default key name for first-time users
  useEffect(() => {
    if (apiKeys !== undefined && apiKeys.length === 0 && !newKeyName) {
      setNewKeyName("default");
    }
  }, [apiKeys, newKeyName]);

  // Ensure user exists in Convex when dashboard loads
  useEffect(() => {
    if (isLoaded && user) {
      getOrCreateUser().catch((err) => {
        console.error("Failed to create user:", err);
      });
    }
  }, [isLoaded, user, getOrCreateUser]);

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

  const copyToClipboard = (text: string, showFeedback = false) => {
    navigator.clipboard.writeText(text);
    if (showFeedback) {
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    }
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
              {recentSnapshots.map((snapshot) => {
                const isExpanded = expandedSnapshot === snapshot._id;
                const hasDetails = snapshot.context || snapshot.decisions?.length || snapshot.nextSteps || snapshot.filesTouched?.length;

                return (
                  <div
                    key={snapshot._id}
                    className={`bg-gray-700/30 rounded-lg p-4 transition-all ${hasDetails ? 'cursor-pointer hover:bg-gray-700/50' : ''}`}
                    onClick={() => hasDetails && setExpandedSnapshot(isExpanded ? null : snapshot._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{snapshot.summary}</h3>
                          {hasDetails && (
                            <span className="text-gray-500 text-xs">
                              {isExpanded ? '▼' : '▶'}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mt-1 truncate">
                          {snapshot.projectPath.replace(/^\/home\/[^/]+\//, '~/')}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded flex-shrink-0 ml-2 ${
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

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-600/50 space-y-3">
                        {snapshot.context && (
                          <div>
                            <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Context</h4>
                            <p className="text-gray-300 text-sm whitespace-pre-wrap">{snapshot.context}</p>
                          </div>
                        )}

                        {snapshot.nextSteps && (
                          <div>
                            <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Next Steps</h4>
                            <p className="text-cyan-400 text-sm">{snapshot.nextSteps}</p>
                          </div>
                        )}

                        {snapshot.decisions && snapshot.decisions.length > 0 && (
                          <div>
                            <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Decisions</h4>
                            <ul className="text-gray-300 text-sm list-disc list-inside">
                              {snapshot.decisions.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                          </div>
                        )}

                        {snapshot.filesTouched && snapshot.filesTouched.length > 0 && (
                          <div>
                            <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Files Touched</h4>
                            <div className="flex flex-wrap gap-1">
                              {snapshot.filesTouched.map((f, i) => (
                                <code key={i} className="text-xs bg-gray-800 text-cyan-400 px-1.5 py-0.5 rounded">
                                  {f.split('/').pop()}
                                </code>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(snapshot.createdAt).toLocaleString()}
                    </p>
                  </div>
                );
              })}
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

      {/* Quick Setup */}
      <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-2">Get Started</h2>
        <p className="text-gray-400 text-sm mb-4">Install the free memory plugin, then connect to cloud for backup and sync.</p>

        <div className="space-y-4">
          {/* Step 1: Install */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center">1</span>
              <h3 className="text-white font-medium">Install Memory Plugin</h3>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Free</span>
            </div>
            <div className="space-y-2 ml-8">
              <div className="flex items-center gap-2 group">
                <code className="text-cyan-400 text-sm flex-1">/plugin marketplace add whenmoon-afk/substratia-marketplace</code>
                <button
                  onClick={() => copyToClipboard('/plugin marketplace add whenmoon-afk/substratia-marketplace', true)}
                  className="px-2 py-1 text-xs rounded bg-gray-600/50 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                >
                  {copiedCommand === '/plugin marketplace add whenmoon-afk/substratia-marketplace' ? <span className="text-green-400">Copied!</span> : 'Copy'}
                </button>
              </div>
              <div className="flex items-center gap-2 group">
                <code className="text-cyan-400 text-sm flex-1">/plugin install memory-mcp@substratia-marketplace</code>
                <button
                  onClick={() => copyToClipboard('/plugin install memory-mcp@substratia-marketplace', true)}
                  className="px-2 py-1 text-xs rounded bg-gray-600/50 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                >
                  {copiedCommand === '/plugin install memory-mcp@substratia-marketplace' ? <span className="text-green-400">Copied!</span> : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Connect Cloud */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm flex items-center justify-center">2</span>
              <h3 className="text-white font-medium">Connect to Cloud</h3>
              <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">Pro</span>
            </div>
            <p className="text-gray-400 text-sm ml-8">
              {apiKeys && apiKeys.length > 0 ? (
                <span className="text-green-400">✓ Ready! Create an API key below and copy the connect command.</span>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowApiSection(true);
                      document.getElementById('api-keys-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Create an API key
                  </button>
                  {' '}below to enable cloud backup, cross-device sync, and this dashboard.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div
        id="api-keys-section"
        className={`mt-8 rounded-xl p-6 border ${
          apiKeys && apiKeys.length === 0
            ? 'bg-cyan-500/10 border-cyan-500/30'
            : 'bg-gray-800/50 border-gray-700'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            API Keys
            {apiKeys && apiKeys.length === 0 && (
              <span className="text-xs px-2 py-1 bg-cyan-500 text-white rounded-full">
                Required
              </span>
            )}
          </h2>
          {apiKeys && apiKeys.length > 0 && (
            <button
              onClick={() => setShowApiSection(!showApiSection)}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {showApiSection ? "Hide" : "Show"} API Keys
            </button>
          )}
        </div>

        {showApiSection && (
          <>
            {apiKeys && apiKeys.length === 0 ? (
              <div className="text-cyan-300/80 text-sm mb-4">
                <strong>Next step:</strong> Create an API key to connect memory-mcp to cloud sync.
              </div>
            ) : (
              <p className="text-gray-400 text-sm mb-4">
                API keys allow memory-mcp to sync your memories to Substratia Cloud.
              </p>
            )}

            {/* New Key Created - Show Once */}
            {newKeyValue && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-green-400 font-medium">API Key Created</h3>
                    <p className="text-green-300/70 text-sm mt-1">
                      Connect your Claude Code in one click, or copy the key manually.
                    </p>
                  </div>
                  <button
                    onClick={() => setNewKeyValue(null)}
                    className="text-green-400 hover:text-green-300"
                  >
                    ×
                  </button>
                </div>

                {/* Connect Command */}
                <div className="mt-4 mb-3">
                  <button
                    onClick={() => {
                      copyToClipboard(`memory_cloud action:connect api_key:${newKeyValue}`);
                      alert("Copied! Paste this command into Claude Code.");
                    }}
                    className="w-full px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Copy Connect Command
                  </button>
                  <p className="text-gray-500 text-xs text-center mt-2">
                    Paste into Claude Code to enable cloud sync
                  </p>
                </div>

                {/* Manual Key Copy */}
                <details className="mt-3">
                  <summary className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                    Or copy key manually
                  </summary>
                  <div className="mt-2 flex items-center gap-2">
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
                </details>
              </div>
            )}

            {/* Create New Key */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Key name (e.g., 'work-laptop', 'home-desktop')"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleCreateKey()}
                />
                {apiKeys && apiKeys.length === 0 && newKeyName === "default" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                    Edit or press Create
                  </span>
                )}
              </div>
              <button
                onClick={handleCreateKey}
                disabled={isCreating || !newKeyName.trim()}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
                <h3 className="text-white font-medium mb-2">Connect memory-mcp to cloud</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Create a new API key above, then paste the copied command into Claude Code.
                </p>
                <p className="text-gray-500 text-sm">
                  Claude will automatically configure memory-mcp to sync your memories to Substratia Cloud.
                  Config is saved to <code className="text-cyan-400">~/.config/substratia/credentials.json</code>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
