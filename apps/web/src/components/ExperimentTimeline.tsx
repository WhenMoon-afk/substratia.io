"use client";

import { useState } from "react";
import {
  type Experiment,
  GITHUB_REPO,
  patternColorMap,
} from "@/data/mirrorDemonsData";

export default function ExperimentTimeline({
  experiment,
  isExpanded,
  onToggle,
}: {
  experiment: Experiment;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [expandedMoment, setExpandedMoment] = useState<number | null>(null);

  const patternColors = patternColorMap[experiment.patternColor];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        className="p-6 cursor-pointer hover:bg-white/5 transition-all"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle();
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{experiment.title}</h3>
            <p className="text-gray-400">
              {experiment.character} &bull; {experiment.occupation}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-sm border ${patternColors}`}
            >
              {experiment.pattern}
            </span>
            <span className="text-xs text-gray-500">
              {experiment.delusionType} &bull; Risk: {experiment.riskLevel}
            </span>
          </div>
        </div>

        {/* Actor Insight Preview */}
        <div className="mt-4 bg-forge-purple/10 border border-forge-purple/30 rounded-lg p-3">
          <p className="text-xs text-forge-purple font-semibold mb-1">
            Actor&apos;s Internal Reasoning:
          </p>
          <p className="text-sm text-gray-300 italic">
            &ldquo;{experiment.actorInsight}&rdquo;
          </p>
        </div>

        <div className="flex items-center justify-center mt-4 text-gray-500 text-xs">
          {isExpanded ? "▲ Hide timeline" : "▼ Show timeline"}
        </div>
      </div>

      {/* Timeline */}
      {isExpanded && (
        <div className="border-t border-white/10 p-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20" />

            {/* Moments */}
            <div className="space-y-6">
              {experiment.moments.map((moment, i) => (
                <div
                  key={`${experiment.id}-moment-${i}`}
                  className="relative pl-10"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                      i === experiment.moments.length - 1
                        ? "bg-forge-cyan border-forge-cyan"
                        : "bg-forge-dark border-white/40"
                    }`}
                  />

                  {/* Content */}
                  <div
                    role="button"
                    tabIndex={0}
                    className="bg-black/20 rounded-lg p-4 cursor-pointer hover:bg-black/30 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedMoment(expandedMoment === i ? null : i);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        setExpandedMoment(expandedMoment === i ? null : i);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-forge-cyan">
                        {i + 1}. {moment.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {expandedMoment === i ? "▲" : "▼"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">
                      {moment.description}
                    </p>

                    {expandedMoment === i && (
                      <div className="mt-4 space-y-3">
                        <div className="bg-black/30 rounded-sm p-3">
                          <p className="text-xs text-gray-500 mb-1">
                            AI Response:
                          </p>
                          <p className="text-sm text-gray-300 italic">
                            &ldquo;{moment.aiResponse}&rdquo;
                          </p>
                        </div>
                        <div className="border-l-2 border-forge-purple/50 pl-3">
                          <p className="text-xs text-forge-purple mb-1">
                            Analysis:
                          </p>
                          <p className="text-sm text-gray-400">
                            {moment.analysis}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Links */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
            <a
              href={`${GITHUB_REPO}/blob/main/${experiment.githubPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-all text-forge-cyan"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              View Summary
            </a>
            <a
              href={`${GITHUB_REPO}/blob/main/${experiment.rawPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-forge-purple/20 hover:bg-forge-purple/30 rounded-lg transition-all text-forge-purple"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Full Transcript
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
