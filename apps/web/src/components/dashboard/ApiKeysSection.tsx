"use client";

import { useState, useEffect } from "react";
import type { ApiKey, ApiKeyId } from "@/types/dashboard";

interface ApiKeysSectionProps {
  apiKeys: ApiKey[] | undefined;
  onCreateKey: (name: string) => Promise<{ key: string }>;
  onRevokeKey: (keyId: ApiKeyId) => Promise<void>;
  showApiSection: boolean;
  onToggleApiSection: () => void;
}

export default function ApiKeysSection({
  apiKeys,
  onCreateKey,
  onRevokeKey,
  showApiSection,
  onToggleApiSection,
}: ApiKeysSectionProps) {
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  // Auto-fill default key name for first-time users
  useEffect(() => {
    if (apiKeys !== undefined && apiKeys.length === 0 && !newKeyName) {
      setNewKeyName("default");
    }
  }, [apiKeys, newKeyName]);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    setIsCreating(true);
    try {
      const result = await onCreateKey(newKeyName.trim());
      setNewKeyValue(result.key);
      setNewKeyName("");
    } catch {
      // Silently handled — UI shows previous state
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (
      !confirm(
        "Are you sure you want to revoke this API key? This cannot be undone.",
      )
    )
      return;
    try {
      await onRevokeKey(keyId as ApiKeyId);
    } catch {
      // Silently handled — key remains in list
    }
  };

  const copyToClipboard = async (text: string, showFeedback = false) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for environments where Clipboard API is unavailable
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    if (showFeedback) {
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    }
  };

  return (
    <div
      id="api-keys-section"
      className={`mt-8 rounded-xl p-6 border ${
        apiKeys && apiKeys.length === 0
          ? "bg-cyan-500/10 border-cyan-500/30"
          : "bg-gray-800/50 border-gray-700"
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
            onClick={onToggleApiSection}
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
              <strong>Next step:</strong> Create an API key to connect
              memory-mcp.
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-4">
              API keys allow memory-mcp to connect to your dashboard.
            </p>
          )}

          {/* New Key Created - Show Once */}
          {newKeyValue && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-green-400 font-medium">
                    API Key Created
                  </h3>
                  <p className="text-green-300/70 text-sm mt-1">
                    Connect your Claude Code in one click, or copy the key
                    manually.
                  </p>
                </div>
                <button
                  onClick={() => setNewKeyValue(null)}
                  className="text-green-400 hover:text-green-300"
                >
                  &times;
                </button>
              </div>

              {/* Connect Command */}
              <div className="mt-4 mb-3">
                <button
                  onClick={() => {
                    copyToClipboard(
                      `memory_cloud action:connect api_key:${newKeyValue}`,
                    );
                    alert("Copied! Paste this command into Claude Code.");
                  }}
                  className="w-full px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Copy Connect Command
                </button>
                <p className="text-gray-500 text-xs text-center mt-2">
                  Paste into Claude Code to connect
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
                No API keys yet. Create one to connect memory-mcp.
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
                        <>
                          {" "}
                          &middot; Last used{" "}
                          {new Date(key.lastUsed).toLocaleDateString()}
                        </>
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
              <h3 className="text-white font-medium mb-2">
                Connect memory-mcp
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Create a new API key above, then paste the copied command into
                Claude Code.
              </p>
              <p className="text-gray-500 text-sm">
                Claude will automatically configure memory-mcp to connect to
                your dashboard. Config is saved to{" "}
                <code className="text-cyan-400">
                  ~/.config/substratia/credentials.json
                </code>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
