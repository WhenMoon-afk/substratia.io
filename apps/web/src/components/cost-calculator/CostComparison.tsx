"use client";

import { formatCurrency } from "@/data/costCalculatorModels";

interface Comparison {
  sonnetApi: number;
  opusApi: number;
  subscription: number;
  recommendation: string;
  savings: number;
}

interface CostComparisonProps {
  comparison: Comparison;
}

export default function CostComparison({ comparison }: CostComparisonProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-4">
        Cost Comparison
      </h3>

      <div className="space-y-3">
        {/* API Sonnet */}
        <div
          className={`p-4 rounded-lg ${comparison.recommendation === "api" ? "bg-green-500/10 border border-green-500/30" : "bg-white/5"}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">API (Sonnet)</div>
              <div className="text-xs text-gray-500">Pay per token</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-forge-cyan">
                {formatCurrency(comparison.sonnetApi)}/mo
              </div>
              {comparison.recommendation === "api" && (
                <div className="text-xs text-green-400">
                  Save {formatCurrency(comparison.savings)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Opus */}
        <div className="p-4 rounded-lg bg-white/5">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">API (Opus)</div>
              <div className="text-xs text-gray-500">Pay per token</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-forge-purple">
                {formatCurrency(comparison.opusApi)}/mo
              </div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div
          className={`p-4 rounded-lg ${comparison.recommendation === "subscription" ? "bg-green-500/10 border border-green-500/30" : "bg-white/5"}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Claude Max</div>
              <div className="text-xs text-gray-500">Unlimited usage</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">
                {formatCurrency(comparison.subscription)}/mo
              </div>
              {comparison.recommendation === "subscription" && (
                <div className="text-xs text-green-400">
                  Save {formatCurrency(comparison.savings)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div className="mt-4 p-4 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-lg">
        <div className="text-sm font-medium mb-1">Our Recommendation</div>
        <div className="text-lg">
          {comparison.recommendation === "api" ? (
            <>
              <span className="text-green-400">API</span> is more cost-effective
              for your usage
            </>
          ) : (
            <>
              <span className="text-green-400">Claude Max</span> subscription
              makes sense
            </>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          You would save {formatCurrency(comparison.savings)}/month with{" "}
          {comparison.recommendation === "api" ? "API" : "subscription"}
        </div>
      </div>
    </div>
  );
}
