"use client";

import { useState } from "react";
import { REALISTIC_MEMORIES } from "@/data/memoryDemoData";
import { downloadJson } from "@/lib/file-utils";

interface MemoryBankProps {
  activeTab: "without" | "with";
}

export default function MemoryBank({ activeTab }: MemoryBankProps) {
  const [highlightedMemory, setHighlightedMemory] = useState<string | null>(
    null,
  );
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const copyToClipboard = async () => {
    const text = REALISTIC_MEMORIES.map(
      (m) =>
        `[${m.context}] ${m.content} (importance: ${m.importance}/10, used ${m.timesUsed}x)`,
    ).join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback("Copied!");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback("Failed to copy");
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const exportAsJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      memories: REALISTIC_MEMORIES,
    };
    downloadJson(data, "claude-memories-demo.json");
    setCopyFeedback("Exported!");
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const generateShareLink = () => {
    const state = {
      tab: activeTab,
      memories: REALISTIC_MEMORIES.length,
    };
    const encoded = btoa(JSON.stringify(state));
    const url = `${window.location.origin}${window.location.pathname}?demo=${encoded}`;
    setShareLink(url);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyFeedback("Link copied!");
        setTimeout(() => setCopyFeedback(null), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="font-semibold">What Claude Remembers</h2>
        <p className="text-xs text-gray-500 mt-1">
          {activeTab === "with"
            ? "Active memories from past sessions"
            : "Nothing - every session starts fresh"}
        </p>
      </div>

      <div className="p-4 space-y-3 max-h-[450px] overflow-y-auto">
        {activeTab === "without" ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3 opacity-50">&#x1f9e0;</div>
            <p>No memories</p>
            <p className="text-sm mt-1">Claude starts fresh every time</p>
          </div>
        ) : (
          REALISTIC_MEMORIES.map((memory) => (
            <div
              key={memory.id}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                highlightedMemory === memory.id
                  ? "bg-forge-cyan/10 border-forge-cyan/30"
                  : "bg-black/20 border-white/5 hover:border-white/20"
              }`}
              onMouseEnter={() => setHighlightedMemory(memory.id)}
              onMouseLeave={() => setHighlightedMemory(null)}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs text-gray-500">{memory.context}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    memory.importance >= 9
                      ? "bg-red-500/20 text-red-300"
                      : memory.importance >= 7
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {memory.importance}/10
                </span>
              </div>
              <p className="text-sm text-gray-300">{memory.content}</p>
              <div className="mt-2 text-xs text-gray-600">
                Used {memory.timesUsed} times
              </div>
            </div>
          ))
        )}
      </div>

      {activeTab === "with" && (
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </button>
            <button
              onClick={exportAsJSON}
              className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export JSON
            </button>
            <button
              onClick={generateShareLink}
              className="flex-1 px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </div>

          {/* Feedback Message */}
          {copyFeedback && (
            <div className="text-xs text-center text-green-400 animate-fade-in">
              {copyFeedback}
            </div>
          )}

          {/* Share Link Display */}
          {shareLink && (
            <div className="p-2 bg-black/30 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Share this demo:</div>
              <div className="text-xs text-forge-cyan break-all font-mono">
                {shareLink}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            Memories persist across sessions
          </div>
        </div>
      )}
    </div>
  );
}
