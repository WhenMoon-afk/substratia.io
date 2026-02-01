"use client";

import CopyButton from "@/components/CopyButton";

interface ExportPanelProps {
  selectedCount: number;
  aiPrompt: string;
  shared: boolean;
  urlTooLong: boolean;
  onDownload: (format: "markdown" | "csv" | "json") => void;
  onShare: () => void;
}

export default function ExportPanel({
  selectedCount,
  aiPrompt,
  shared,
  urlTooLong,
  onDownload,
  onShare,
}: ExportPanelProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="font-bold mb-3">Export</h3>
      <div className="space-y-2">
        <CopyButton
          text={aiPrompt}
          label="Copy AI Analysis Prompt"
          successMessage="AI prompt copied to clipboard!"
          disabled={selectedCount === 0}
          variant="primary"
          className="w-full bg-forge-purple hover:bg-forge-purple/80"
        />
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onDownload("markdown")}
            disabled={selectedCount === 0}
            aria-label="Download as Markdown"
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            .md
          </button>
          <button
            onClick={() => onDownload("csv")}
            disabled={selectedCount === 0}
            aria-label="Download as CSV"
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            .csv
          </button>
          <button
            onClick={() => onDownload("json")}
            disabled={selectedCount === 0}
            aria-label="Download as JSON"
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            .json
          </button>
          <button
            onClick={onShare}
            disabled={selectedCount === 0}
            className={`px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              urlTooLong
                ? "bg-amber-500 text-white"
                : shared
                  ? "bg-green-500 text-white"
                  : "bg-forge-cyan/30 hover:bg-forge-cyan/50 text-forge-cyan"
            }`}
          >
            {urlTooLong
              ? "Too large \u2014 export file instead"
              : shared
                ? "Link Copied!"
                : "Share URL"}
          </button>
        </div>
      </div>
    </div>
  );
}
