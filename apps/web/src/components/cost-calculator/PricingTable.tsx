"use client";

import { models } from "@/data/costCalculatorModels";

export default function PricingTable() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">
        Current API Pricing (Jan 2026)
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500">
            <th className="text-left py-2">Model</th>
            <th className="text-right py-2">Input/1M</th>
            <th className="text-right py-2">Output/1M</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.id} className="border-t border-white/5">
              <td className="py-2">{m.name}</td>
              <td className="text-right text-gray-400">${m.inputPer1M}</td>
              <td className="text-right text-gray-400">${m.outputPer1M}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
