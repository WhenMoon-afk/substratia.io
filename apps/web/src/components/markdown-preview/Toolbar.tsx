"use client";

export type ViewMode = "split" | "edit" | "preview";

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  hasContent: boolean;
  onDownloadMarkdown: () => void;
  onDownloadHtml: () => void;
  onExportPdf: () => void;
  onLoadExample: () => void;
  onClear: () => void;
}

export default function Toolbar({
  viewMode,
  onViewModeChange,
  hasContent,
  onDownloadMarkdown,
  onDownloadHtml,
  onExportPdf,
  onLoadExample,
  onClear,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
      <div className="flex gap-2">
        {/* View Mode Toggle */}
        <div
          className="bg-white/5 rounded-lg p-1 flex"
          role="group"
          aria-label="Editor view mode"
        >
          <button
            onClick={() => onViewModeChange("edit")}
            aria-pressed={viewMode === "edit"}
            className={`px-3 py-1 text-xs rounded transition-all ${
              viewMode === "edit"
                ? "bg-forge-cyan text-forge-dark"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => onViewModeChange("split")}
            aria-pressed={viewMode === "split"}
            className={`px-3 py-1 text-xs rounded transition-all ${
              viewMode === "split"
                ? "bg-forge-cyan text-forge-dark"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Split
          </button>
          <button
            onClick={() => onViewModeChange("preview")}
            aria-pressed={viewMode === "preview"}
            className={`px-3 py-1 text-xs rounded transition-all ${
              viewMode === "preview"
                ? "bg-forge-cyan text-forge-dark"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onDownloadMarkdown}
          disabled={!hasContent}
          className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50"
        >
          Download .md
        </button>
        <button
          onClick={onDownloadHtml}
          disabled={!hasContent}
          className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50"
        >
          Download .html
        </button>
        <button
          onClick={onExportPdf}
          disabled={!hasContent}
          className="px-3 py-1 text-xs bg-forge-purple/30 hover:bg-forge-purple/50 text-forge-purple rounded-lg transition-all disabled:opacity-50"
        >
          Export PDF
        </button>
        <button
          onClick={onLoadExample}
          className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all"
        >
          Load Example
        </button>
        <button
          onClick={onClear}
          className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all flex items-center gap-1"
        >
          Clear
          <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-red-500/20 rounded">
            ⌘K
          </kbd>
        </button>
      </div>
    </div>
  );
}
