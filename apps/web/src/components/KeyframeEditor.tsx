"use client";

import {
  motionOptions,
  transitionOptions,
  type VideoKeyframe,
  type Motion,
  type Transition,
} from "@/data/videoPromptPresets";

interface KeyframeEditorProps {
  selectedSlot: number | null;
  keyframe: VideoKeyframe | undefined;
  onUpdateKeyframe: (updates: Partial<VideoKeyframe>) => void;
}

export default function KeyframeEditor({
  selectedSlot,
  keyframe,
  onUpdateKeyframe,
}: KeyframeEditorProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">
        Keyframe Editor
        {selectedSlot !== null && (
          <span className="text-forge-cyan ml-2">({selectedSlot}s)</span>
        )}
      </h3>

      {selectedSlot !== null ? (
        <div className="space-y-4">
          {/* Prompt */}
          <div>
            <label
              htmlFor="scene-description"
              className="block text-xs text-gray-500 mb-1"
            >
              Scene Description
            </label>
            <textarea
              id="scene-description"
              value={keyframe?.prompt || ""}
              onChange={(e) => onUpdateKeyframe({ prompt: e.target.value })}
              placeholder="Describe what's happening at this moment..."
              className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-hidden focus:border-forge-cyan text-white text-sm resize-none"
            />
          </div>

          {/* Motion */}
          <div>
            <label
              htmlFor="camera-motion"
              className="block text-xs text-gray-500 mb-1"
            >
              Camera Motion
            </label>
            <select
              id="camera-motion"
              value={keyframe?.motion || "static"}
              onChange={(e) =>
                onUpdateKeyframe({ motion: e.target.value as Motion })
              }
              className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-hidden focus:border-forge-cyan text-white text-sm"
            >
              {motionOptions.map((m) => (
                <option key={m.id} value={m.id} className="bg-forge-dark">
                  {m.icon} {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Transition */}
          <div>
            <label
              htmlFor="scene-transition"
              className="block text-xs text-gray-500 mb-1"
            >
              Transition to Next
            </label>
            <select
              id="scene-transition"
              value={keyframe?.transition || "cut"}
              onChange={(e) =>
                onUpdateKeyframe({ transition: e.target.value as Transition })
              }
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-hidden focus:border-forge-cyan text-white text-sm"
            >
              {transitionOptions.map((t) => (
                <option key={t.id} value={t.id} className="bg-forge-dark">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Emoji Picker */}
          <div>
            <span
              id="thumbnail-icon-label"
              className="block text-xs text-gray-500 mb-1"
            >
              Thumbnail Icon
            </span>
            <div
              className="flex gap-2 flex-wrap"
              role="group"
              aria-labelledby="thumbnail-icon-label"
            >
              {["🎬", "🏃", "💥", "🌅", "🌙", "🎭", "🔥", "💫", "🌊", "⚡"].map(
                (emoji) => (
                  <button
                    key={emoji}
                    onClick={() => onUpdateKeyframe({ emoji })}
                    aria-label={`Select ${emoji} as thumbnail icon`}
                    aria-pressed={keyframe?.emoji === emoji}
                    className={`w-10 h-10 rounded-lg text-xl transition-all ${
                      keyframe?.emoji === emoji
                        ? "bg-forge-cyan/30 border border-forge-cyan"
                        : "bg-white/10 border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {emoji}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-4">🎬</p>
          <p>Select a timeline slot to edit</p>
        </div>
      )}
    </div>
  );
}
