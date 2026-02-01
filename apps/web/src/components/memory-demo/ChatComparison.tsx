"use client";

import { useState, useEffect } from "react";
import {
  type ChatMessage,
  WITHOUT_MEMORY_EXCHANGE,
  WITH_MEMORY_EXCHANGE,
} from "@/data/memoryDemoData";

interface ChatComparisonProps {
  activeTab: "without" | "with";
  onSwitchTab: (tab: "without" | "with") => void;
}

export default function ChatComparison({
  activeTab,
  onSwitchTab,
}: ChatComparisonProps) {
  const [visibleMessages, setVisibleMessages] = useState(0);

  const messages: ChatMessage[] =
    activeTab === "without" ? WITHOUT_MEMORY_EXCHANGE : WITH_MEMORY_EXCHANGE;

  // Calculate time wasted (corrections × 30 seconds each)
  const correctionsCount =
    WITHOUT_MEMORY_EXCHANGE.filter((m) => m.role === "user").length - 1;
  const timeWasted = correctionsCount * 30;

  // Animate messages appearing
  useEffect(() => {
    if (visibleMessages < messages.length) {
      const timer = setTimeout(
        () => setVisibleMessages((v) => v + 1),
        activeTab === "without" ? 800 : 1200,
      );
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, activeTab, messages.length]);

  // Reset animation when switching tabs
  const switchTab = (tab: "without" | "with") => {
    onSwitchTab(tab);
    setVisibleMessages(0);
  };

  return (
    <div className="lg:col-span-2">
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => switchTab("without")}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === "without"
              ? "bg-red-500/20 border-2 border-red-500/50 text-red-300"
              : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
          }`}
        >
          <span className="block text-lg">Without Memory</span>
          <span className="text-sm opacity-70">Every session starts fresh</span>
        </button>
        <button
          onClick={() => switchTab("with")}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === "with"
              ? "bg-green-500/20 border-2 border-green-500/50 text-green-300"
              : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
          }`}
        >
          <span className="block text-lg">With Memory</span>
          <span className="text-sm opacity-70">Claude remembers</span>
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`rounded-xl border overflow-hidden ${
          activeTab === "without"
            ? "bg-red-500/5 border-red-500/20"
            : "bg-green-500/5 border-green-500/20"
        }`}
      >
        <div
          className={`p-3 border-b flex items-center gap-2 ${
            activeTab === "without"
              ? "border-red-500/20"
              : "border-green-500/20"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              activeTab === "without" ? "bg-red-400" : "bg-green-400"
            }`}
          ></div>
          <span className="text-sm text-gray-400">
            {activeTab === "without"
              ? "Standard Claude Code"
              : "Claude Code + memory-mcp"}
          </span>
        </div>

        {/* Messages */}
        <div className="p-4 min-h-[350px] space-y-3">
          <div className="text-center text-gray-500 text-sm mb-4">
            New session: &quot;Help me write a test for the auth component&quot;
          </div>

          {messages.slice(0, visibleMessages).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-forge-cyan/20 border border-forge-cyan/30"
                    : "bg-white/10 border border-white/10"
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {msg.role === "user" ? "You (correcting again...)" : "Claude"}
                </div>
                <div className="text-sm">{msg.text}</div>
              </div>
            </div>
          ))}

          {visibleMessages < messages.length && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/10">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}

          {/* Summary when done */}
          {visibleMessages >= messages.length && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                activeTab === "without"
                  ? "bg-red-500/10 border border-red-500/30"
                  : "bg-green-500/10 border border-green-500/30"
              }`}
            >
              {activeTab === "without" ? (
                <>
                  <div className="text-red-300 font-semibold mb-2">
                    {correctionsCount} corrections needed
                  </div>
                  <div className="text-gray-400 text-sm">
                    ~{Math.round(timeWasted / 60)} minutes wasted this session.
                    Multiply by every session, every project...
                  </div>
                  <button
                    onClick={() => switchTab("with")}
                    className="mt-3 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                  >
                    See it with memory &rarr;
                  </button>
                </>
              ) : (
                <>
                  <div className="text-green-300 font-semibold mb-2">
                    0 corrections needed
                  </div>
                  <div className="text-gray-400 text-sm">
                    Claude remembered everything. One message, done.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Comparison */}
      {activeTab === "with" && visibleMessages >= messages.length && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400 line-through opacity-50">
              {correctionsCount}
            </div>
            <div className="text-sm text-gray-500">Corrections</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400">89</div>
            <div className="text-sm text-gray-500">Memories stored</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-forge-cyan">2.5h</div>
            <div className="text-sm text-gray-500">Saved/month</div>
          </div>
        </div>
      )}
    </div>
  );
}
