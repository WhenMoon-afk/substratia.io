"use client";

interface SeedHistoryProps {
  history: string[];
  onSelect: (seed: string) => void;
  onClear: () => void;
  onExport: () => void;
}

export default function SeedHistory({
  history,
  onSelect,
  onClear,
  onExport,
}: SeedHistoryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">History</span>
        <div className="flex gap-2">
          {history.length > 0 && (
            <button
              onClick={onExport}
              className="text-xs text-forge-cyan hover:text-forge-cyan/80 transition-all"
            >
              Export
            </button>
          )}
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-white transition-all"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-xs text-gray-500">No history yet</p>
        ) : (
          history.map((item, i) => (
            <button
              key={i}
              onClick={() => onSelect(item)}
              className="w-full text-left text-xs font-mono p-2 bg-black/20 hover:bg-black/40 rounded truncate transition-all"
            >
              {item}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
