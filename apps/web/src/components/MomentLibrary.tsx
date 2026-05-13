'use client'

import {
  momentPresets,
  categoryLabels,
  type MomentCategory,
} from '@/data/videoPromptPresets'
import { useMemo, useState } from 'react'

interface MomentLibraryProps {
  selectedSlot: number | null
  onApplyMoment: (promptSnippet: string, emoji: string) => void
}

export default function MomentLibrary({ selectedSlot, onApplyMoment }: MomentLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<MomentCategory | null>(null)

  const filteredMoments = useMemo(() => {
    if (!activeCategory) return momentPresets
    return momentPresets.filter(m => m.category === activeCategory)
  }, [activeCategory])

  const categories = Object.entries(categoryLabels) as [MomentCategory, string][]

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Moment Library</h3>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory(null)}
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
            onClick={() => setActiveCategory(key)}
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

      {/* Moments Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
        {filteredMoments.map(moment => (
          <button
            key={moment.id}
            onClick={() => onApplyMoment(moment.promptSnippet, moment.emoji)}
            disabled={selectedSlot === null}
            className={`p-2 text-left text-sm rounded-lg transition-all ${
              selectedSlot === null
                ? 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
                : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-forge-cyan/50'
            }`}
          >
            <span className="mr-1">{moment.emoji}</span>
            {moment.name}
          </button>
        ))}
      </div>

      {selectedSlot === null && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Select a timeline slot to add moments
        </p>
      )}
    </div>
  )
}
