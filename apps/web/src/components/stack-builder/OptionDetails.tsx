"use client";

import type { TechOption } from "@/data/stackBuilderPresets";

interface OptionDetailsProps {
  option: TechOption;
}

export default function OptionDetails({ option }: OptionDetailsProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="font-bold mb-2">{option.name}</h3>
      <p className="text-sm text-gray-400 mb-3">{option.description}</p>
      <div className="grid sm:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-green-400 font-medium mb-1">Pros</div>
          <ul className="text-gray-400 space-y-1">
            {option.pros.map((pro, i) => (
              <li key={i}>+ {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-red-400 font-medium mb-1">Cons</div>
          <ul className="text-gray-400 space-y-1">
            {option.cons.map((con, i) => (
              <li key={i}>- {con}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-forge-cyan font-medium mb-1">Best For</div>
          <p className="text-gray-400">{option.bestFor}</p>
        </div>
      </div>
    </div>
  );
}
