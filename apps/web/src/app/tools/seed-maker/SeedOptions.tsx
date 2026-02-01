"use client";

export interface SeedOptionsState {
  lower: boolean;
  upper: boolean;
  numbers: boolean;
  special: boolean;
}

interface SeedOptionsProps {
  length: number;
  options: SeedOptionsState;
  onLengthChange: (length: number) => void;
  onOptionsChange: (options: SeedOptionsState) => void;
}

const charsetOptions = [
  { key: "lower" as const, label: "a-z" },
  { key: "upper" as const, label: "A-Z" },
  { key: "numbers" as const, label: "0-9" },
  { key: "special" as const, label: "!@#$%" },
];

export default function SeedOptions({
  length,
  options,
  onLengthChange,
  onOptionsChange,
}: SeedOptionsProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <label htmlFor="seed-length" className="text-sm text-gray-400 block mb-3">
        Options
      </label>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          id="seed-length"
          value={length}
          onChange={(e) => onLengthChange(parseInt(e.target.value))}
          aria-label="Seed length"
          className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          <option value={16}>16 characters</option>
          <option value={32}>32 characters</option>
          <option value={64}>64 characters</option>
          <option value={128}>128 characters</option>
          <option value={256}>256 characters</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-4">
        {charsetOptions.map((opt) => (
          <label
            key={opt.key}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={options[opt.key]}
              onChange={(e) =>
                onOptionsChange({ ...options, [opt.key]: e.target.checked })
              }
              className="rounded border-white/20 bg-black/30"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
