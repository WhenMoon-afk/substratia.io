"use client";

import { categories } from "@/data/stackBuilderPresets";

interface ProgressBarProps {
  activeCategory: number;
  selections: Record<string, string>;
  skipped: Record<string, boolean>;
  onCategoryClick: (index: number) => void;
}

export default function ProgressBar({
  activeCategory,
  selections,
  skipped,
  onCategoryClick,
}: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-400">Progress:</span>
        <span className="text-sm font-medium">
          {activeCategory + 1} / {categories.length}
        </span>
      </div>
      <div className="flex gap-1">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(i)}
            className={`flex-1 h-2 rounded-full transition-all ${
              i < activeCategory
                ? "bg-forge-cyan"
                : i === activeCategory
                  ? "bg-forge-purple"
                  : selections[cat.id]
                    ? "bg-forge-cyan/50"
                    : skipped[cat.id]
                      ? "bg-white/20"
                      : "bg-white/10"
            }`}
            title={cat.name}
          />
        ))}
      </div>
    </div>
  );
}
