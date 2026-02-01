"use client";

import CopyButton from "@/components/CopyButton";

interface SeedOutputProps {
  result: string;
  onGenerate: () => void;
  onDownload: () => void;
}

export default function SeedOutput({
  result,
  onGenerate,
  onDownload,
}: SeedOutputProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <button
        onClick={onGenerate}
        className="w-full px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all mb-4"
      >
        Generate
      </button>
      <div className="relative">
        <textarea
          value={result}
          readOnly
          placeholder="Your generated string will appear here..."
          className="w-full h-24 bg-black/30 border border-white/10 rounded-lg p-4 text-sm font-mono resize-none"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <CopyButton
            text={result}
            label="Copy"
            successMessage="Seed copied to clipboard!"
            disabled={!result}
            variant="ghost"
            size="sm"
          />
          <button
            onClick={onDownload}
            disabled={!result}
            className="px-3 py-1 rounded text-xs font-medium bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
