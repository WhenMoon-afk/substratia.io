"use client";

import { ModelInfo } from "@/data/tokenCounterData";

interface ModelSelectorProps {
  models: ModelInfo[];
  selectedModel: ModelInfo;
  onSelect: (model: ModelInfo) => void;
}

export default function ModelSelector({
  models,
  selectedModel,
  onSelect,
}: ModelSelectorProps) {
  return (
    <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
      <h3
        id="model-selector-label"
        className="text-sm text-gray-400 block mb-3"
      >
        Select Model
      </h3>
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-2"
        role="group"
        aria-labelledby="model-selector-label"
      >
        {models.map((model) => (
          <button
            key={model.name}
            onClick={() => onSelect(model)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              selectedModel.name === model.name
                ? "bg-forge-cyan text-forge-dark"
                : "bg-white/5 hover:bg-white/10 text-gray-300"
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
}
