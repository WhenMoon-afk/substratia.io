"use client";

interface EntropyCollectorProps {
  entropyProgress: number;
  onMouseMove: (e: React.MouseEvent) => void;
  onAddTimeEntropy: () => void;
}

export default function EntropyCollector({
  entropyProgress,
  onMouseMove,
  onAddTimeEntropy,
}: EntropyCollectorProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <label className="text-sm text-gray-400 block mb-3">
        Collect Entropy
      </label>
      <div
        onMouseMove={onMouseMove}
        className={`h-32 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-crosshair ${
          entropyProgress >= 100
            ? "border-green-500/50 bg-green-500/10"
            : "border-white/20 bg-black/20 hover:border-forge-cyan/50"
        }`}
      >
        <p className="text-gray-400 text-sm mb-2">
          {entropyProgress >= 100
            ? "Entropy collected!"
            : "Move your mouse here to collect entropy"}
        </p>
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${entropyProgress >= 100 ? "bg-green-500" : "bg-forge-cyan"}`}
            style={{ width: `${entropyProgress}%` }}
          />
        </div>
      </div>
      <button
        onClick={onAddTimeEntropy}
        className="mt-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all"
      >
        Add Time Entropy
      </button>
    </div>
  );
}
