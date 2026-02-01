"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import NewsletterCapture from "@/components/NewsletterCapture";
import RelatedTools from "@/components/RelatedTools";
import { downloadMarkdown } from "@/lib/file-utils";
import { prompts, categories } from "@/data/promptLibrary";
import type { Prompt } from "@/data/promptLibrary";

/**
 * Pre-computed Tailwind class strings for category badge colors.
 * Tailwind's JIT scanner needs to see full class names statically —
 * dynamic template literals like `bg-forge-${color}/20` won't be included.
 */
const categoryBadgeStyles: Record<string, string> = {
  cyan: "bg-forge-cyan/20 text-forge-cyan",
  purple: "bg-forge-purple/20 text-forge-purple",
};

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);

  // Load prompt from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const promptId = params.get("p");
    if (promptId) {
      const prompt = prompts.find((p) => p.id === promptId);
      if (prompt) {
        setExpandedPrompt(promptId);
        // Scroll to the prompt after a short delay
        setTimeout(() => {
          const element = document.getElementById(`prompt-${promptId}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }, []);

  const filteredPrompts = selectedCategory
    ? prompts.filter((p) => p.category === selectedCategory)
    : prompts;

  const copyPrompt = useCallback((prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.content);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const sharePrompt = useCallback(async (prompt: Prompt) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?p=${prompt.id}`;
    await navigator.clipboard.writeText(shareUrl);
    setSharedId(prompt.id);
    setTimeout(() => setSharedId(null), 2000);
  }, []);

  const downloadPrompt = useCallback((prompt: Prompt) => {
    const content = `# ${prompt.name}\n\n${prompt.description}\n\nCategory: ${prompt.category}\n${prompt.model ? `Model: ${prompt.model}\n` : ""}\n---\n\n${prompt.content}`;
    downloadMarkdown(content, `${prompt.id}.md`);
  }, []);

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              &larr; Back to Tools
            </Link>
            <ShareButton title="Prompt Library - Substratia" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Prompt <span className="text-forge-purple">Library</span>
            </h1>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-forge-cyan text-forge-dark">
              {prompts.length} Prompts
            </span>
          </div>
          <p className="text-gray-400">
            Curated prompts for communication, creativity, and productivity.
            Click to copy.
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-forge-cyan text-forge-dark"
                  : "bg-white/5 hover:bg-white/10 text-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-forge-cyan text-forge-dark"
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              id={`prompt-${prompt.id}`}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Header */}
              <div
                role="button"
                tabIndex={0}
                className="p-4 cursor-pointer"
                onClick={() =>
                  setExpandedPrompt(
                    expandedPrompt === prompt.id ? null : prompt.id,
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setExpandedPrompt(
                      expandedPrompt === prompt.id ? null : prompt.id,
                    );
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{prompt.name}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          categoryBadgeStyles[
                            categories.find((c) => c.id === prompt.category)
                              ?.color ?? "cyan"
                          ]
                        }`}
                      >
                        {categories.find((c) => c.id === prompt.category)?.name}
                      </span>
                      {prompt.model && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-400">
                          {prompt.model}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {prompt.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyPrompt(prompt);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        copiedId === prompt.id
                          ? "bg-green-500 text-white"
                          : "bg-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/30"
                      }`}
                    >
                      {copiedId === prompt.id ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sharePrompt(prompt);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        sharedId === prompt.id
                          ? "bg-green-500 text-white"
                          : "bg-forge-purple/20 text-forge-purple hover:bg-forge-purple/30"
                      }`}
                    >
                      {sharedId === prompt.id ? "Copied!" : "Share"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPrompt(prompt);
                      }}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-gray-400 hover:bg-white/20 transition-all"
                    >
                      Download
                    </button>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedPrompt === prompt.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPrompt === prompt.id && (
                <div className="border-t border-white/10 p-4">
                  <pre className="bg-black/30 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                    {prompt.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/tools/prompts" />

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-linear-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Build Custom Agents</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Use these prompts as a starting point, then customize with our
              prompt tools.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/tools/prompt-optimizer"
                className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
              >
                Prompt Optimizer
              </Link>
              <Link
                href="/templates"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
              >
                View Memory Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="prompts" compact />
        </div>
      </div>
    </main>
  );
}
