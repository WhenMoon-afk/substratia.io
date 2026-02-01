"use client";

import { useState } from "react";
import type { Snapshot } from "@/types/dashboard";

interface RecentSnapshotsProps {
  snapshots: Snapshot[] | undefined;
}

export default function RecentSnapshots({ snapshots }: RecentSnapshotsProps) {
  const [expandedSnapshot, setExpandedSnapshot] = useState<string | null>(null);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Recent Snapshots</h2>
      {snapshots === undefined ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
          ))}
        </div>
      ) : snapshots.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No snapshots yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Use <code className="text-cyan-400">/momentum:save</code> in Claude Code
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {snapshots.map((snapshot) => {
            const isExpanded = expandedSnapshot === snapshot._id;
            const hasDetails = snapshot.context || snapshot.decisions?.length || snapshot.nextSteps || snapshot.filesTouched?.length;

            return (
              <div
                key={snapshot._id}
                className={`bg-gray-700/30 rounded-lg p-4 transition-all ${hasDetails ? 'cursor-pointer hover:bg-gray-700/50' : ''}`}
                onClick={() => hasDetails && setExpandedSnapshot(isExpanded ? null : snapshot._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{snapshot.summary}</h3>
                      {hasDetails && (
                        <span className="text-gray-500 text-xs">
                          {isExpanded ? '\u25BC' : '\u25B6'}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1 truncate">
                      {snapshot.projectPath.replace(/^\/home\/[^/]+\//, '~/')}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded flex-shrink-0 ml-2 ${
                      snapshot.importance === "critical"
                        ? "bg-red-500/20 text-red-400"
                        : snapshot.importance === "important"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-600/50 text-gray-400"
                    }`}
                  >
                    {snapshot.importance}
                  </span>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-600/50 space-y-3">
                    {snapshot.context && (
                      <div>
                        <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Context</h4>
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{snapshot.context}</p>
                      </div>
                    )}

                    {snapshot.nextSteps && (
                      <div>
                        <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Next Steps</h4>
                        <p className="text-cyan-400 text-sm">{snapshot.nextSteps}</p>
                      </div>
                    )}

                    {snapshot.decisions && snapshot.decisions.length > 0 && (
                      <div>
                        <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Decisions</h4>
                        <ul className="text-gray-300 text-sm list-disc list-inside">
                          {snapshot.decisions.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                      </div>
                    )}

                    {snapshot.filesTouched && snapshot.filesTouched.length > 0 && (
                      <div>
                        <h4 className="text-gray-400 text-xs font-medium uppercase mb-1">Files Touched</h4>
                        <div className="flex flex-wrap gap-1">
                          {snapshot.filesTouched.map((f, i) => (
                            <code key={i} className="text-xs bg-gray-800 text-cyan-400 px-1.5 py-0.5 rounded">
                              {f.split('/').pop()}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-gray-500 text-xs mt-2">
                  {new Date(snapshot.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
