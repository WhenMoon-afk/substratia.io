'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Capability } from '@/data/presets'

interface DraggableCapabilityProps {
  capability: Capability
  isSelected: boolean
  onToggle: () => void
}

export function DraggableCapability({ capability, isSelected, onToggle }: DraggableCapabilityProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: capability.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative cursor-grab active:cursor-grabbing p-3 rounded-lg transition-all ${
        isSelected
          ? 'bg-forge-purple/30 border border-forge-purple'
          : 'bg-white/5 border border-white/10 hover:border-white/30'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-gray-500" aria-hidden="true">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
          </svg>
        </div>
        <div className="flex-1" onClick={onToggle}>
          <div className="font-medium flex items-center gap-2">
            {capability.name}
            {isSelected && (
              <span className="text-xs px-2 py-0.5 bg-forge-cyan/20 text-forge-cyan rounded">
                Selected
              </span>
            )}
          </div>
          <div className="text-sm text-gray-400">{capability.description}</div>
        </div>
      </div>
    </div>
  )
}

export function SelectedCapabilityChip({
  capability,
  onRemove
}: {
  capability: Capability
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `selected-${capability.id}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-forge-purple/30 border border-forge-purple rounded-lg cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <span className="text-sm">{capability.name}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        aria-label={`Remove ${capability.name}`}
        className="text-gray-400 hover:text-red-400 transition-colors"
      >
        &times;
      </button>
    </div>
  )
}
