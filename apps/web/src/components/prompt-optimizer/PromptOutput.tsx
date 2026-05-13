"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/CopyButton";
import type { ThinkingMode } from "@/data/promptOptimizerData";

interface PromptOutputProps {
  generatedPrompt: string;
  thinkingMode: ThinkingMode;
  snippetCount: number;
  onClearAll: () => void;
  onShareConfig: () => Promise<void>;
}

export default function PromptOutput({
  generatedPrompt,
  thinkingMode,
  snippetCount,
  onClearAll,
  onShareConfig,
}: PromptOutputProps) {
  const [shared, setShared] = useState(false);

  const handleShare = useCallback(async () => {
    await onShareConfig();
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }, [onShareConfig]);

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-400">
            Generated Prompt
          </h3>
          <button
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            Clear All
            <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-red-500/20 rounded-sm">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="bg-black/30 rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-auto">
          {generatedPrompt ? (
            <pre className="text-sm text-gray-200 whitespace-pre-wrap wrap-break-word font-mono">
              {generatedPrompt}
            </pre>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Add a task and select snippets to generate your optimized
              prompt...
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <CopyButton
            text={generatedPrompt}
            label="Copy Prompt"
            successMessage="Prompt copied to clipboard!"
            disabled={!generatedPrompt}
            className="flex-1"
          />
          <button
            onClick={handleShare}
            disabled={!generatedPrompt}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              shared
                ? "bg-green-500 text-white"
                : "bg-forge-purple hover:bg-forge-purple/80 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {shared ? "Copied!" : "Share URL"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-forge-cyan">
              {thinkingMode === "normal"
                ? "-"
                : thinkingMode === "thinkhard"
                  ? "2x"
                  : "3x"}
            </div>
            <div className="text-xs text-gray-500">Reasoning</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-forge-purple">
              {snippetCount}
            </div>
            <div className="text-xs text-gray-500">Snippets</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {generatedPrompt.length}
            </div>
            <div className="text-xs text-gray-500">Chars</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-linear-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
        <h3 className="font-medium mb-2">Tips</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>
            - Use <code className="text-forge-cyan">ultrathink</code> for
            complex architecture
          </li>
          <li>- Combine autonomous + interrupt for long tasks</li>
          <li>- Simulator subagents reduce back-and-forth</li>
          <li>- Structure templates improve consistency</li>
        </ul>
      </div>
    </div>
  );
}
