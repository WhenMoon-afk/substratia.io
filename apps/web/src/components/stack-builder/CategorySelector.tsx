"use client";

import type { Category, TechOption } from "@/data/stackBuilderPresets";

interface CategorySelectorProps {
  category: Category;
  selections: Record<string, string>;
  skipped: Record<string, boolean>;
  activeCategory: number;
  totalCategories: number;
  isOptionIncompatible: (option: TechOption) => boolean;
  onSelectOption: (optionId: string) => void;
  onSkipCategory: () => void;
  onNext: () => void;
  onPrev: () => void;
  onHoverOption: (option: TechOption | null) => void;
}

export default function CategorySelector({
  category,
  selections,
  skipped,
  activeCategory,
  totalCategories,
  isOptionIncompatible,
  onSelectOption,
  onSkipCategory,
  onNext,
  onPrev,
  onHoverOption,
}: CategorySelectorProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">{category.name}</h2>
          <p className="text-sm text-gray-400">{category.description}</p>
        </div>
        {category.skippable && (
          <button
            onClick={onSkipCategory}
            className={`px-3 py-1 text-sm rounded-lg transition-all ${
              skipped[category.id]
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {skipped[category.id] ? "Skipped" : "Skip"}
          </button>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {category.options.map((option) => {
          const isSelected = selections[category.id] === option.id;
          const incompatible = isOptionIncompatible(option);

          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              onMouseEnter={() => onHoverOption(option)}
              onMouseLeave={() => onHoverOption(null)}
              className={`p-4 rounded-xl text-left transition-all relative ${
                isSelected
                  ? "bg-forge-cyan/20 border-2 border-forge-cyan"
                  : incompatible
                    ? "bg-white/5 border border-red-500/30 opacity-60"
                    : "bg-white/5 border border-white/10 hover:border-white/30"
              }`}
            >
              {incompatible && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
                  !
                </span>
              )}
              <div className="font-medium mb-1">{option.name}</div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {option.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          disabled={activeCategory === 0}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &larr; Previous
        </button>
        <button
          onClick={onNext}
          disabled={activeCategory === totalCategories - 1}
          className="px-4 py-2 bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
