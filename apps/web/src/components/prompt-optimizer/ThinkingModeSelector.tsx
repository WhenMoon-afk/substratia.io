"use client";

import { thinkingModes, type ThinkingMode } from "@/data/promptOptimizerData";

interface ThinkingModeSelectorProps {
  value: ThinkingMode;
  onChange: (mode: ThinkingMode) => void;
}

export default function ThinkingModeSelector({
  value,
  onChange,
}: ThinkingModeSelectorProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Thinking Mode</h3>
      <div className="space-y-2">
        {thinkingModes.map((mode) => (
          <label
            key={mode.id}
            htmlFor={`thinking-mode-${mode.id}`}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              value === mode.id
                ? "bg-forge-cyan/20 border border-forge-cyan"
                : "bg-white/5 border border-transparent hover:bg-white/10"
            }`}
          >
            <input
              id={`thinking-mode-${mode.id}`}
              type="radio"
              name="thinkingMode"
              value={mode.id}
              checked={value === mode.id}
              onChange={() => onChange(mode.id)}
              className="mt-1 accent-forge-cyan"
            />
            <div>
              <div className="font-medium">{mode.name}</div>
              <div className="text-xs text-gray-500">{mode.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
