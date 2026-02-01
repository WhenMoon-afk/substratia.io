'use client'

import {
  platforms,
  negativePresets,
  aspectRatios,
  type Platform,
} from '@/data/imagePromptPresets'

export interface Sliders {
  styleIntensity: number
  detailLevel: number
  realism: number
  saturation: number
  contrast: number
}

const sliderConfig = [
  { key: 'styleIntensity', label: 'Style Intensity', min: 'Subtle', max: 'Strong' },
  { key: 'detailLevel', label: 'Detail Level', min: 'Simple', max: 'Ultra' },
  { key: 'realism', label: 'Realism', min: 'Stylized', max: 'Photo' },
  { key: 'saturation', label: 'Saturation', min: 'Muted', max: 'Vibrant' },
  { key: 'contrast', label: 'Contrast', min: 'Flat', max: 'High' },
] as const

interface ControlsPanelProps {
  platform: Platform
  onPlatformChange: (platform: Platform) => void
  subject: string
  onSubjectChange: (subject: string) => void
  aspectRatio: string
  onAspectRatioChange: (ratio: string) => void
  sliders: Sliders
  onSliderChange: (key: keyof Sliders, value: number) => void
  selectedNegatives: string[]
  onToggleNegative: (id: string) => void
}

export default function ControlsPanel({
  platform,
  onPlatformChange,
  subject,
  onSubjectChange,
  aspectRatio,
  onAspectRatioChange,
  sliders,
  onSliderChange,
  selectedNegatives,
  onToggleNegative,
}: ControlsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Platform Selector */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <label htmlFor="platform-select" className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
        <select
          id="platform-select"
          value={platform}
          onChange={(e) => onPlatformChange(e.target.value as Platform)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white"
        >
          {platforms.map(p => (
            <option key={p.id} value={p.id} className="bg-forge-dark">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Input */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <label htmlFor="subject-input" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
        <textarea
          id="subject-input"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="A majestic dragon flying over a medieval castle..."
          className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white resize-none"
        />
      </div>

      {/* Aspect Ratio */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <label htmlFor="aspect-ratio-select" className="block text-sm font-medium text-gray-400 mb-2">Aspect Ratio</label>
        <select
          id="aspect-ratio-select"
          value={aspectRatio}
          onChange={(e) => onAspectRatioChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white"
        >
          {aspectRatios.map(ar => (
            <option key={ar.id} value={ar.id} className="bg-forge-dark">
              {ar.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sliders */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-400">Intensity Controls</h3>

        {sliderConfig.map(({ key, label, min, max }) => (
          <div key={key}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{min}</span>
              <span className="text-white">{label}: {sliders[key]}%</span>
              <span>{max}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliders[key]}
              onChange={(e) => onSliderChange(key, parseInt(e.target.value))}
              aria-label={`${label} intensity`}
              aria-valuetext={`${label}: ${sliders[key]}%`}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-forge-cyan"
            />
          </div>
        ))}
      </div>

      {/* Negative Prompts */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Negative Prompts</h3>
        <div className="space-y-2">
          {negativePresets.map(neg => (
            <label key={neg.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedNegatives.includes(neg.id)}
                onChange={() => onToggleNegative(neg.id)}
                className="w-4 h-4 rounded border-white/30 bg-white/10 text-forge-cyan focus:ring-forge-cyan"
              />
              <span className="text-sm text-gray-300">{neg.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
