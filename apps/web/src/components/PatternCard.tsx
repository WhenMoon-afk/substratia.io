"use client";

import { type Pattern, colorClassMap } from "@/data/mirrorDemonsData";

export default function PatternCard({
  pattern,
  isExpanded,
  onToggle,
}: {
  pattern: Pattern;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const colorClasses = colorClassMap[pattern.color];

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${colorClasses.bg} ${colorClasses.border} ${colorClasses.hoverBorder} border rounded-xl p-6 transition-all cursor-pointer`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`text-xl font-bold ${colorClasses.text}`}>
            {pattern.title}
          </h3>
          <p className="text-gray-400 text-sm">{pattern.tagline}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-sm ${colorClasses.badge}`}>
          Risk: {pattern.riskLevel}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-4">{pattern.experiment}</p>

      {isExpanded && (
        <div className="space-y-4 mt-4 pt-4 border-t border-white/10">
          {/* Sequence */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">
              Failure Sequence:
            </h4>
            <ol className="space-y-1.5">
              {pattern.sequence.map((step, i) => (
                <li
                  key={`${pattern.id}-step-${i}`}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <span
                    className={`${colorClasses.text} font-mono text-xs mt-0.5`}
                  >
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Quote */}
          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-gray-300 italic text-sm">
              &ldquo;{pattern.quote.text}&rdquo;
            </p>
            <p className={`text-xs ${colorClasses.text} mt-2`}>
              &mdash; {pattern.quote.speaker}
            </p>
          </div>

          {/* Insight */}
          <p className="text-gray-400 text-sm border-l-2 border-white/20 pl-3">
            {pattern.insight}
          </p>
        </div>
      )}

      <div className="flex items-center justify-center mt-4 text-gray-500 text-xs">
        {isExpanded ? "▲ Collapse" : "▼ Expand details"}
      </div>
    </div>
  );
}
