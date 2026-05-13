"use client";

import {
  snippets,
  categoryStyles,
  type Snippet,
} from "@/data/promptOptimizerData";

interface SelectedSnippetsProps {
  selectedIds: string[];
  onToggleSnippet: (snippetId: string) => void;
}

export default function SelectedSnippets({
  selectedIds,
  onToggleSnippet,
}: SelectedSnippetsProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">
        Selected ({selectedIds.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {selectedIds.map((id) => {
          const snippet = snippets.find((s) => s.id === id);
          if (!snippet) return null;
          return (
            <button
              key={id}
              onClick={() => onToggleSnippet(id)}
              className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${categoryStyles[snippet.category as Snippet["category"]].tag} border ${categoryStyles[snippet.category as Snippet["category"]].tagBorder}`}
            >
              {snippet.name}
              <span className="text-gray-400 hover:text-white">&times;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
