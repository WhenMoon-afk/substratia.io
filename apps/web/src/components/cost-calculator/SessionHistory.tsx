"use client";

import {
  findModel,
  calculateCost,
  formatCurrency,
} from "@/data/costCalculatorModels";
import type { Session } from "./sessionStorage";

interface SessionStats {
  sessions: number;
  totalCost: number;
  totalTokens: number;
}

interface SessionHistoryProps {
  sessions: Session[];
  sessionStats: SessionStats;
  onExport: () => void;
  onClear: () => void;
  exported: boolean;
}

export default function SessionHistory({
  sessions,
  sessionStats,
  onExport,
  onClear,
  exported,
}: SessionHistoryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-400">7-Day History</h3>
        {sessions.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={onExport}
              className={`text-xs transition-all ${
                exported
                  ? "text-green-400"
                  : "text-forge-cyan hover:text-forge-cyan/80"
              }`}
            >
              {exported ? "Exported!" : "Export JSON"}
            </button>
            <button
              onClick={onClear}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {sessions.length > 0 ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white">
                {sessionStats.sessions}
              </div>
              <div className="text-xs text-gray-500">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-forge-cyan">
                {formatCurrency(sessionStats.totalCost)}
              </div>
              <div className="text-xs text-gray-500">Total Cost</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-forge-purple">
                {(sessionStats.totalTokens / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-500">Tokens</div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {sessions.slice(0, 10).map((session) => {
              const m = findModel(session.model);
              const cost = calculateCost(
                session.inputTokens,
                session.outputTokens,
                m,
              );
              const date = new Date(session.date);
              return (
                <div
                  key={session.id}
                  className="flex justify-between items-center text-sm bg-white/5 rounded-lg p-2"
                >
                  <div>
                    <span className="text-gray-400">
                      {date.toLocaleDateString()}{" "}
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {(
                        (session.inputTokens + session.outputTokens) /
                        1000
                      ).toFixed(1)}
                      K tokens
                    </span>
                  </div>
                  <span className="text-forge-cyan">
                    {formatCurrency(cost)}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No sessions logged yet. Log your first session above.
        </p>
      )}
    </div>
  );
}
