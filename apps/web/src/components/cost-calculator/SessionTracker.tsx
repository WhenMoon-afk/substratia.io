"use client";

import {
  models,
  formatCurrency,
  type Model,
} from "@/data/costCalculatorModels";

interface SessionTrackerProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  inputTokens: number;
  onInputTokensChange: (tokens: number) => void;
  outputTokens: number;
  onOutputTokensChange: (tokens: number) => void;
  currentCost: number;
  model: Model;
  onLogSession: () => void;
  onShare: () => void;
  savedSession: boolean;
  shared: boolean;
}

export default function SessionTracker({
  selectedModel,
  onModelChange,
  inputTokens,
  onInputTokensChange,
  outputTokens,
  onOutputTokensChange,
  currentCost,
  model,
  onLogSession,
  onShare,
  savedSession,
  shared,
}: SessionTrackerProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-4">
        Current Session
      </h3>

      {/* Model Selector */}
      <div className="mb-4">
        <label
          htmlFor="model-select"
          className="block text-xs text-gray-500 mb-1"
        >
          Model
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id} className="bg-forge-dark">
              {m.name} (${m.inputPer1M}/${m.outputPer1M} per 1M)
            </option>
          ))}
        </select>
      </div>

      {/* Token Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="input-tokens"
            className="block text-xs text-gray-500 mb-1"
          >
            Input Tokens
          </label>
          <input
            id="input-tokens"
            type="number"
            value={inputTokens || ""}
            onChange={(e) => onInputTokensChange(parseInt(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="output-tokens"
            className="block text-xs text-gray-500 mb-1"
          >
            Output Tokens
          </label>
          <input
            id="output-tokens"
            type="number"
            value={outputTokens || ""}
            onChange={(e) =>
              onOutputTokensChange(parseInt(e.target.value) || 0)
            }
            placeholder="0"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
          />
        </div>
      </div>

      {/* Cost Display */}
      <div className="bg-black/30 rounded-lg p-4 mb-4 text-center">
        <div className="text-xs text-gray-500 mb-1">Session Cost</div>
        <div className="text-3xl font-bold text-forge-cyan">
          {formatCurrency(currentCost)}
        </div>
        <div className="text-xs text-gray-500 mt-1">at {model.name} rates</div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onLogSession}
          disabled={inputTokens === 0 && outputTokens === 0}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            savedSession
              ? "bg-green-500 text-white"
              : "bg-forge-cyan text-forge-dark hover:bg-forge-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          {savedSession ? "Logged!" : "Log Session"}
        </button>
        <button
          onClick={onShare}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            shared
              ? "bg-green-500 text-white"
              : "bg-forge-purple hover:bg-forge-purple/80 text-white"
          }`}
        >
          {shared ? "Copied!" : "Share"}
        </button>
      </div>
    </div>
  );
}
