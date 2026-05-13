"use client";

import { categories } from "@/data/stackBuilderPresets";

interface StackSummaryProps {
  selections: Record<string, string>;
  skipped: Record<string, boolean>;
  onClearAll: () => void;
}

export default function StackSummary({
  selections,
  skipped,
  onClearAll,
}: StackSummaryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Your Stack</h3>
        <button
          onClick={onClearAll}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {categories.map((cat) => {
          const selection = selections[cat.id];
          const option = selection
            ? cat.options.find((o) => o.id === selection)
            : null;
          const isSkipped = skipped[cat.id];

          return (
            <div
              key={cat.id}
              className={`p-2 rounded-lg text-sm ${
                option
                  ? "bg-forge-cyan/10"
                  : isSkipped
                    ? "bg-white/5"
                    : "bg-white/5 opacity-50"
              }`}
            >
              <div className="text-xs text-gray-500">{cat.name}</div>
              <div className={option ? "text-white" : "text-gray-500"}>
                {option?.name || (isSkipped ? "(skipped)" : "(not selected)")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
