"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import ThinkingModeSelector from "@/components/prompt-optimizer/ThinkingModeSelector";
import SnippetLibrary from "@/components/prompt-optimizer/SnippetLibrary";
import PromptOutput from "@/components/prompt-optimizer/PromptOutput";
import SelectedSnippets from "@/components/prompt-optimizer/SelectedSnippets";
import {
  thinkingModes,
  snippets,
  type ThinkingMode,
} from "@/data/promptOptimizerData";

export default function PromptOptimizerPage() {
  const [thinkingMode, setThinkingMode] = useState<ThinkingMode>("normal");
  const [userPrompt, setUserPrompt] = useState("");
  const [selectedSnippets, setSelectedSnippets] = useState<string[]>([]);

  // Load state from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("config");
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam));
        if (decoded) {
          if (decoded.thinkingMode) setThinkingMode(decoded.thinkingMode);
          if (decoded.userPrompt) setUserPrompt(decoded.userPrompt);
          if (decoded.selectedSnippets)
            setSelectedSnippets(decoded.selectedSnippets);
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K: Clear all
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        clearAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSnippet = useCallback((snippetId: string) => {
    setSelectedSnippets((prev) =>
      prev.includes(snippetId)
        ? prev.filter((id) => id !== snippetId)
        : [...prev, snippetId],
    );
  }, []);

  const generatedPrompt = useMemo(() => {
    const mode = thinkingModes.find((m) => m.id === thinkingMode);
    const prefix = mode?.prefix || "";

    const selectedSnippetContents = selectedSnippets
      .map((id) => snippets.find((s) => s.id === id)?.content)
      .filter(Boolean);

    let result = prefix;

    if (userPrompt.trim()) {
      result += userPrompt.trim();
    }

    if (selectedSnippetContents.length > 0) {
      if (result) result += "\n\n---\n\n";
      result += selectedSnippetContents.join("\n\n");
    }

    return result;
  }, [thinkingMode, userPrompt, selectedSnippets]);

  const clearAll = useCallback(() => {
    setUserPrompt("");
    setSelectedSnippets([]);
    setThinkingMode("normal");
  }, []);

  const shareConfig = useCallback(async () => {
    const state = { thinkingMode, userPrompt, selectedSnippets };
    const stateStr = btoa(JSON.stringify(state));
    const shareUrl = `${window.location.origin}${window.location.pathname}?config=${stateStr}`;
    await navigator.clipboard.writeText(shareUrl);
  }, [thinkingMode, userPrompt, selectedSnippets]);

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              &larr; Back to Tools
            </Link>
            <ShareButton title="Claude Code Prompt Optimizer - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Claude Code{" "}
            <span className="text-forge-cyan">Prompt Optimizer</span>
          </h1>
          <p className="text-gray-400">
            Build optimized prompts for Claude Code. Add thinking modes,
            autonomous patterns, and parallel execution.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Controls */}
          <div className="space-y-6">
            <ThinkingModeSelector
              value={thinkingMode}
              onChange={setThinkingMode}
            />

            {/* Your Prompt */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Your Task
              </h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Describe what you want Claude Code to do..."
                className="w-full h-32 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm resize-none"
              />
            </div>

            <SelectedSnippets
              selectedIds={selectedSnippets}
              onToggleSnippet={toggleSnippet}
            />
          </div>

          {/* Column 2: Snippet Library */}
          <SnippetLibrary
            selectedSnippets={selectedSnippets}
            onToggleSnippet={toggleSnippet}
          />

          {/* Column 3: Output */}
          <PromptOutput
            generatedPrompt={generatedPrompt}
            thinkingMode={thinkingMode}
            snippetCount={selectedSnippets.length}
            onClearAll={clearAll}
            onShareConfig={shareConfig}
          />
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/prompt-optimizer" />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Want to track your Claude Code costs?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/cost-calculator"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Cost Calculator
            </Link>
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              All Tools
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="prompt-optimizer" compact />
        </div>
      </div>
    </main>
  );
}
