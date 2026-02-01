'use client'

import { useMemo } from 'react'
import {
  stylePresets,
  categoryLabels,
  type StyleCategory,
  type StylePreset,
} from '@/data/imagePromptPresets'

interface StylePresetsPanelProps {
  selectedStyles: string[]
  onToggleStyle: (id: string) => void
  activeCategory: StyleCategory | null
  onCategoryChange: (category: StyleCategory | null) => void
}

export default function StylePresetsPanel({
  selectedStyles,
  onToggleStyle,
  activeCategory,
  onCategoryChange,
}: StylePresetsPanelProps) {
  const filteredStyles = useMemo(() => {
    if (!activeCategory) return stylePresets
    return stylePresets.filter(s => s.category === activeCategory)
  }, [activeCategory])

  const selectedStylePresets = useMemo(
    () => stylePresets.filter(s => selectedStyles.includes(s.id)),
    [selectedStyles]
  )

  const categories = Object.entries(categoryLabels) as [StyleCategory, string][]

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Style Presets</h3>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            activeCategory === null
              ? 'bg-forge-cyan text-forge-dark'
              : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          All
        </button>
        {categories.map(([key, label]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              activeCategory === key
                ? 'bg-forge-cyan text-forge-dark'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Selected Styles */}
      {selectedStyles.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Selected ({selectedStyles.length})</div>
          <div className="flex flex-wrap gap-2">
            {selectedStylePresets.map(style => (
              <button
                key={style.id}
                onClick={() => onToggleStyle(style.id)}
                className="px-2 py-1 text-xs bg-forge-purple/30 border border-forge-purple rounded-full flex items-center gap-1"
              >
                {style.emoji} {style.name}
                <span className="text-gray-400 hover:text-white">&times;</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Style Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
        {filteredStyles.map(style => (
          <button
            key={style.id}
            onClick={() => onToggleStyle(style.id)}
            className={`p-2 text-left text-sm rounded-lg transition-all ${
              selectedStyles.includes(style.id)
                ? 'bg-forge-purple/30 border border-forge-purple'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="mr-1">{style.emoji}</span>
            {style.name}
          </button>
        ))}
      </div>
    </div>
  )
}
