"use client";

import CopyButton from "@/components/CopyButton";
import { ModelInfo } from "@/data/tokenCounterData";

interface StatsPanelProps {
  tokens: number;
  chars: number;
  words: number;
  lines: number;
  selectedModel: ModelInfo;
  contextPercentage: number;
  estimatedCost: number;
  text: string;
  getStats: () => string;
  onDownload: () => void;
  onShare: () => void;
  shared: boolean;
  urlTooLong: boolean;
}

function getContextColor(percentage: number) {
  if (percentage < 25) return "text-green-400";
  if (percentage < 50) return "text-yellow-400";
  if (percentage < 75) return "text-orange-400";
  return "text-red-400";
}

function getContextBarColor(percentage: number) {
  if (percentage < 25) return "bg-green-400";
  if (percentage < 50) return "bg-yellow-400";
  if (percentage < 75) return "bg-orange-400";
  return "bg-red-400";
}

export default function StatsPanel({
  tokens,
  chars,
  words,
  lines,
  selectedModel,
  contextPercentage,
  estimatedCost,
  text,
  getStats,
  onDownload,
  onShare,
  shared,
  urlTooLong,
}: StatsPanelProps) {
  return (
    <div className="space-y-4">
      {/* Token Count - Main Stat */}
      <div className="bg-gradient-to-br from-forge-cyan/20 to-forge-purple/20 border border-forge-cyan/30 rounded-xl p-6 text-center">
        <div className="text-5xl font-bold text-forge-cyan mb-1">
          {tokens.toLocaleString()}
        </div>
        <div className="text-sm text-gray-400">tokens (estimated)</div>
      </div>

      {/* Secondary Stats */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Characters</span>
          <span className="font-mono">{chars.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Words</span>
          <span className="font-mono">{words.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Lines</span>
          <span className="font-mono">{lines.toLocaleString()}</span>
        </div>
      </div>

      {/* Context Usage */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Context Window</span>
          <span
            className={`font-mono text-sm ${getContextColor(contextPercentage)}`}
          >
            {contextPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full transition-all ${getContextBarColor(contextPercentage)}`}
            style={{ width: `${Math.min(contextPercentage, 100)}%` }}
          />
        </div>
        <div className="text-xs text-gray-500">
          {tokens.toLocaleString()} / {selectedModel.context.toLocaleString()}{" "}
          tokens
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Estimated Cost</span>
          <span className="font-mono text-forge-purple">
            ${estimatedCost.toFixed(6)}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Input: ${selectedModel.inputPrice}/1M tokens
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <CopyButton
          text={getStats()}
          label="Copy Stats"
          successMessage="Stats copied to clipboard!"
          variant="secondary"
          className="flex-1"
        />
        <button
          onClick={onDownload}
          disabled={!text}
          className="px-4 py-3 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download
        </button>
      </div>
      <button
        onClick={onShare}
        disabled={!text}
        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
          urlTooLong
            ? "bg-amber-500 text-white"
            : shared
              ? "bg-green-500 text-white"
              : "bg-forge-purple/20 hover:bg-forge-purple/30 text-forge-purple disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        {urlTooLong
          ? "Too large \u2014 download instead"
          : shared
            ? "Link Copied!"
            : "Share Results"}
      </button>
    </div>
  );
}
