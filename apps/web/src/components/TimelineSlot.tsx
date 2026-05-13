'use client'

import { useDraggable, useDroppable } from '@dnd-kit/core'
import type { VideoKeyframe } from '@/data/videoPromptPresets'

interface TimelineSlotProps {
  timestamp: number
  keyframe?: VideoKeyframe
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  isDragging?: boolean
}

export default function TimelineSlot({
  timestamp,
  keyframe,
  isSelected,
  onSelect,
  onRemove,
  isDragging,
}: TimelineSlotProps) {
  const hasContent = keyframe && keyframe.prompt.trim()

  const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({
    id: timestamp,
    disabled: !hasContent,
  })

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: timestamp,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div className="flex flex-col items-center" ref={setDropRef}>
      <button
        ref={setDragRef}
        onClick={onSelect}
        style={style}
        {...(hasContent ? { ...attributes, ...listeners } : {})}
        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
          isDragging
            ? 'opacity-50'
            : isOver
              ? 'border-forge-cyan bg-forge-cyan/30 scale-110'
              : isSelected
                ? 'border-forge-cyan bg-forge-cyan/20 scale-110'
                : hasContent
                  ? 'border-forge-purple bg-forge-purple/20 hover:border-forge-purple/80 cursor-grab active:cursor-grabbing'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
        }`}
      >
        {keyframe?.emoji || '⬜'}
      </button>

      <span className={`text-xs mt-2 ${isSelected ? 'text-forge-cyan' : 'text-gray-500'}`}>
        {timestamp}s
      </span>

      {hasContent && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="text-xs text-red-400 hover:text-red-300 mt-1"
        >
          remove
        </button>
      )}
    </div>
  )
}
