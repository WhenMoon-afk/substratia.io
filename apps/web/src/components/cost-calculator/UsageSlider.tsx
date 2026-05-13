"use client";

interface UsageSliderProps {
  monthlyUsage: number;
  onUsageChange: (usage: number) => void;
}

export default function UsageSlider({
  monthlyUsage,
  onUsageChange,
}: UsageSliderProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-4">
        Monthly Usage Estimate
      </h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>100K tokens</span>
          <span className="text-white font-medium">
            {(monthlyUsage / 1_000_000).toFixed(1)}M tokens/month
          </span>
          <span>10M tokens</span>
        </div>
        <input
          type="range"
          min="100000"
          max="10000000"
          step="100000"
          value={monthlyUsage}
          onChange={(e) => onUsageChange(parseInt(e.target.value))}
          aria-label="Monthly token usage"
          aria-valuetext={`${(monthlyUsage / 1_000_000).toFixed(1)} million tokens per month`}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
        />
      </div>

      <p className="text-xs text-gray-500">
        Drag to estimate your monthly token usage. Average Claude Code user:
        1-3M tokens/month.
      </p>
    </div>
  );
}
