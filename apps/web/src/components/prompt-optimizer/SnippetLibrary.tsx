"use client";

import { useState, useMemo } from "react";
import {
  snippets,
  categoryLabels,
  categoryStyles,
  type Snippet,
} from "@/data/promptOptimizerData";

interface SnippetLibraryProps {
  selectedSnippets: string[];
  onToggleSnippet: (snippetId: string) => void;
}

export default function SnippetLibrary({
  selectedSnippets,
  onToggleSnippet,
}: SnippetLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<
    Snippet["category"] | null
  >(null);

  const filteredSnippets = useMemo(() => {
    if (!activeCategory) return snippets;
    return snippets.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const categories = Object.entries(categoryLabels) as [
    Snippet["category"],
    string,
  ][];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">
        Prompt Snippets
      </h3>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            activeCategory === null
              ? "bg-forge-cyan text-forge-dark"
              : "bg-white/10 text-gray-400 hover:bg-white/20"
          }`}
        >
          All
        </button>
        {categories.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              activeCategory === key
                ? "bg-forge-cyan text-forge-dark"
                : "bg-white/10 text-gray-400 hover:bg-white/20"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Snippets Grid */}
      <div className="space-y-2 max-h-64 sm:max-h-[450px] overflow-y-auto">
        {filteredSnippets.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => onToggleSnippet(snippet.id)}
            className={`w-full p-3 text-left rounded-lg transition-all ${
              selectedSnippets.includes(snippet.id)
                ? `${categoryStyles[snippet.category].bgSelected} border ${categoryStyles[snippet.category].borderSelected}`
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium text-sm">{snippet.name}</div>
                <div className="text-xs text-gray-500">
                  {snippet.description}
                </div>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-sm ${categoryStyles[snippet.category].badge} ${categoryStyles[snippet.category].badgeText}`}
              >
                {categoryLabels[snippet.category].split(" ")[0]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
