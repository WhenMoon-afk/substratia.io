"use client";

import { useState } from "react";
import type { ApiKey } from "@/types/dashboard";

interface GetStartedProps {
  apiKeys: ApiKey[] | undefined;
  onExpandApiSection: () => void;
}

export default function GetStarted({
  apiKeys,
  onExpandApiSection,
}: GetStartedProps) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="mt-8 bg-white/5 rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-2">Get Started</h2>
      <p className="text-gray-400 text-sm mb-4">
        Install the free memory plugin, then create an API key to connect.
      </p>

      <div className="space-y-4">
        {/* Step 1: Install */}
        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-forge-cyan text-sm flex items-center justify-center">
              1
            </span>
            <h3 className="text-white font-medium">Install Memory Plugin</h3>
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-sm">
              Free
            </span>
          </div>
          <div className="space-y-2 ml-8">
            <div className="flex items-center gap-2 group">
              <code className="text-forge-cyan text-sm flex-1">
                /plugin marketplace add whenmoon-afk/substratia-marketplace
              </code>
              <button
                onClick={() =>
                  copyToClipboard(
                    "/plugin marketplace add whenmoon-afk/substratia-marketplace",
                  )
                }
                className="px-2 py-1 text-xs rounded-sm bg-gray-600/50 text-gray-400 hover:bg-cyan-500/20 hover:text-forge-cyan transition-colors"
              >
                {copiedCommand ===
                "/plugin marketplace add whenmoon-afk/substratia-marketplace" ? (
                  <span className="text-green-400">Copied!</span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 group">
              <code className="text-forge-cyan text-sm flex-1">
                /plugin install memory-mcp@substratia-marketplace
              </code>
              <button
                onClick={() =>
                  copyToClipboard(
                    "/plugin install memory-mcp@substratia-marketplace",
                  )
                }
                className="px-2 py-1 text-xs rounded-sm bg-gray-600/50 text-gray-400 hover:bg-cyan-500/20 hover:text-forge-cyan transition-colors"
              >
                {copiedCommand ===
                "/plugin install memory-mcp@substratia-marketplace" ? (
                  <span className="text-green-400">Copied!</span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Connect memory-mcp */}
        <div className="bg-gray-700/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-forge-cyan text-sm flex items-center justify-center">
              2
            </span>
            <h3 className="text-white font-medium">Connect memory-mcp</h3>
            <span className="text-xs text-forge-cyan bg-cyan-400/10 px-2 py-0.5 rounded-sm">
              Setup
            </span>
          </div>
          <p className="text-gray-400 text-sm ml-8">
            {apiKeys && apiKeys.length > 0 ? (
              <span className="text-green-400">
                &check; Ready! Create an API key below and copy the connect
                command.
              </span>
            ) : (
              <>
                <button
                  onClick={() => {
                    onExpandApiSection();
                    document
                      .getElementById("api-keys-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-forge-cyan hover:text-forge-cyan underline"
                >
                  Create an API key
                </button>{" "}
                below to connect memory-mcp to this dashboard.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
