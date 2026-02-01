'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import NewsletterCapture from '@/components/NewsletterCapture'
import RelatedTools from '@/components/RelatedTools'
import TimelineSlot from '@/components/TimelineSlot'
import MomentLibrary from '@/components/MomentLibrary'
import KeyframeEditor from '@/components/KeyframeEditor'
import PromptPreview from '@/components/PromptPreview'
import { downloadText, downloadJson } from '@/lib/file-utils'
import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  videoPlatforms,
  videoAspectRatios,
  timelineSlots,
  createEmptyKeyframe,
  createEmptyTimeline,
  formatVideoPrompt,
  saveFavorite,
  getFavorites,
  deleteFavorite,
  type VideoPlatform,
  type VideoKeyframe,
  type VideoTimeline,
  type VideoAspectRatio,
} from '@/data/videoPromptPresets'

export default function VideoPromptTimelinePage() {
  const [timeline, setTimeline] = useState<VideoTimeline>(createEmptyTimeline)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<VideoTimeline[]>(() => getFavorites())
  const [showFavorites, setShowFavorites] = useState(false)
  const [saved, setSaved] = useState(false)
  const [shared, setShared] = useState(false)
  const [jsonCopied, setJsonCopied] = useState(false)
  const [activeDragId, setActiveDragId] = useState<number | null>(null)

  // Load timeline from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('state')
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam))
        if (decoded && decoded.keyframes) {
          setTimeline(decoded)
        }
      } catch {
        // Invalid state param, ignore
      }
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setTimeline(createEmptyTimeline())
        setSelectedSlot(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Get keyframe for a slot
  const getKeyframeForSlot = useCallback((timestamp: number): VideoKeyframe | undefined => {
    return timeline.keyframes.find(k => k.timestamp === timestamp)
  }, [timeline.keyframes])

  // Add or update keyframe at timestamp
  const setKeyframe = useCallback((timestamp: number, updates: Partial<VideoKeyframe>) => {
    setTimeline(prev => {
      const existingIdx = prev.keyframes.findIndex(k => k.timestamp === timestamp)
      if (existingIdx >= 0) {
        const newKeyframes = [...prev.keyframes]
        newKeyframes[existingIdx] = { ...newKeyframes[existingIdx], ...updates }
        return { ...prev, keyframes: newKeyframes }
      } else {
        const newKeyframe = { ...createEmptyKeyframe(timestamp), ...updates }
        return { ...prev, keyframes: [...prev.keyframes, newKeyframe] }
      }
    })
  }, [])

  // Remove keyframe at timestamp
  const removeKeyframe = useCallback((timestamp: number) => {
    setTimeline(prev => ({
      ...prev,
      keyframes: prev.keyframes.filter(k => k.timestamp !== timestamp)
    }))
    if (selectedSlot === timestamp) {
      setSelectedSlot(null)
    }
  }, [selectedSlot])

  // Apply moment preset to selected slot
  const applyMoment = useCallback((promptSnippet: string, emoji: string) => {
    if (selectedSlot === null) return
    const existing = getKeyframeForSlot(selectedSlot)
    const newPrompt = existing?.prompt
      ? `${existing.prompt}, ${promptSnippet}`
      : promptSnippet
    setKeyframe(selectedSlot, { prompt: newPrompt, emoji })
  }, [selectedSlot, getKeyframeForSlot, setKeyframe])

  // Update timeline properties
  const updateTimeline = useCallback((updates: Partial<VideoTimeline>) => {
    setTimeline(prev => ({ ...prev, ...updates }))
  }, [])

  // Generated prompt
  const generatedPrompt = useMemo(() => formatVideoPrompt(timeline), [timeline])

  // Download prompt
  const downloadPrompt = useCallback(() => {
    if (!generatedPrompt) return
    downloadText(generatedPrompt, `${timeline.name.replace(/\s+/g, '-').toLowerCase()}.txt`)
  }, [generatedPrompt, timeline.name])

  // Save to favorites
  const saveToFavorites = useCallback(() => {
    saveFavorite(timeline)
    setFavorites(getFavorites())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [timeline])

  // Export as JSON
  const exportJSON = useCallback(async () => {
    const json = JSON.stringify(timeline, null, 2)
    await navigator.clipboard.writeText(json)
    setJsonCopied(true)
    setTimeout(() => setJsonCopied(false), 2000)
  }, [timeline])

  // Download as JSON file
  const downloadJSON = useCallback(() => {
    downloadJson(timeline, `${timeline.name.replace(/\s+/g, '-').toLowerCase()}.json`)
  }, [timeline])

  // Share via URL
  const shareURL = useCallback(async () => {
    const stateStr = btoa(JSON.stringify(timeline))
    const shareUrl = `${window.location.origin}${window.location.pathname}?state=${stateStr}`
    await navigator.clipboard.writeText(shareUrl)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }, [timeline])

  // Drag handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as number)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)

    if (!over || active.id === over.id) return

    const fromTimestamp = active.id as number
    const toTimestamp = over.id as number

    const fromKeyframe = timeline.keyframes.find(k => k.timestamp === fromTimestamp)
    const toKeyframe = timeline.keyframes.find(k => k.timestamp === toTimestamp)

    if (!fromKeyframe) return

    setTimeline(prev => {
      const newKeyframes = prev.keyframes.filter(
        k => k.timestamp !== fromTimestamp && k.timestamp !== toTimestamp
      )
      newKeyframes.push({ ...fromKeyframe, timestamp: toTimestamp })
      if (toKeyframe) {
        newKeyframes.push({ ...toKeyframe, timestamp: fromTimestamp })
      }
      return { ...prev, keyframes: newKeyframes }
    })
  }, [timeline.keyframes])

  // Load from favorites
  const loadFavorite = useCallback((fav: VideoTimeline) => {
    setTimeline(fav)
    setSelectedSlot(null)
    setShowFavorites(false)
  }, [])

  // Delete favorite
  const removeFavorite = useCallback((id: string) => {
    deleteFavorite(id)
    setFavorites(getFavorites())
  }, [])

  // Clear timeline
  const clearTimeline = useCallback(() => {
    setTimeline(createEmptyTimeline())
    setSelectedSlot(null)
  }, [])

  // Selected keyframe for editor
  const selectedKeyframe = selectedSlot !== null ? getKeyframeForSlot(selectedSlot) : undefined

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/tools" className="text-forge-cyan hover:underline text-sm">
              &larr; Back to Tools
            </Link>
            <ShareButton title="Video Prompt Timeline - Substratia" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Video <span className="text-forge-cyan">Prompt Timeline</span>
          </h1>
          <p className="text-gray-400">
            Build frame-by-frame video prompts. Define keyframes, describe moments, export for video generation.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Timeline Name */}
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="timeline-name" className="block text-xs text-gray-500 mb-1">Timeline Name</label>
              <input
                id="timeline-name"
                type="text"
                value={timeline.name}
                onChange={(e) => updateTimeline({ name: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              />
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="video-platform" className="block text-xs text-gray-500 mb-1">Platform</label>
              <select
                id="video-platform"
                value={timeline.platform}
                onChange={(e) => updateTimeline({ platform: e.target.value as VideoPlatform })}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              >
                {videoPlatforms.map(p => (
                  <option key={p.id} value={p.id} className="bg-forge-dark">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label htmlFor="video-aspect-ratio" className="block text-xs text-gray-500 mb-1">Aspect Ratio</label>
              <select
                id="video-aspect-ratio"
                value={timeline.aspectRatio}
                onChange={(e) => updateTimeline({ aspectRatio: e.target.value as VideoAspectRatio })}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
              >
                {videoAspectRatios.map(ar => (
                  <option key={ar.id} value={ar.id} className="bg-forge-dark">
                    {ar.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
              >
                {showFavorites ? 'Hide' : 'Load'} Favorites
              </button>
              <button
                onClick={clearTimeline}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-all flex items-center gap-1"
              >
                Clear
                <kbd className="hidden sm:inline px-1 py-0.5 text-[10px] bg-red-500/20 rounded">⌘K</kbd>
              </button>
            </div>
          </div>

          {/* Global Style */}
          <div className="mt-4">
            <label htmlFor="global-style" className="block text-xs text-gray-500 mb-1">Global Style (applies to all scenes)</label>
            <input
              id="global-style"
              type="text"
              value={timeline.globalStyle}
              onChange={(e) => updateTimeline({ globalStyle: e.target.value })}
              placeholder="e.g., cinematic, 4K, dramatic lighting, film grain..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-forge-cyan text-white text-sm"
            />
          </div>
        </div>

        {/* Favorites Panel */}
        {showFavorites && favorites.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Saved Timelines</h3>
            <div className="space-y-2">
              {favorites.map(fav => (
                <div key={fav.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <span className="text-white">{fav.name}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      {fav.keyframes.length} keyframes
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadFavorite(fav)}
                      className="px-3 py-1 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded text-sm"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => removeFavorite(fav.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4 text-center">Timeline (30 seconds)</h3>

          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-white/20" />
              <div className="flex justify-between relative z-10">
                {timelineSlots.map((timestamp) => (
                  <TimelineSlot
                    key={timestamp}
                    timestamp={timestamp}
                    keyframe={getKeyframeForSlot(timestamp)}
                    isSelected={selectedSlot === timestamp}
                    isDragging={activeDragId === timestamp}
                    onSelect={() => setSelectedSlot(selectedSlot === timestamp ? null : timestamp)}
                    onRemove={() => removeKeyframe(timestamp)}
                  />
                ))}
              </div>
            </div>

            <DragOverlay>
              {activeDragId !== null && (
                <div className="w-14 h-14 rounded-xl border-2 border-forge-cyan bg-forge-cyan/30 flex items-center justify-center text-2xl shadow-lg">
                  {getKeyframeForSlot(activeDragId)?.emoji || '⬜'}
                </div>
              )}
            </DragOverlay>
          </DndContext>

          <p className="text-center text-gray-500 text-xs mt-4">
            Click a slot to edit. Drag filled slots to reorder.
          </p>
        </div>

        {/* Main Grid: Moment Library + Keyframe Editor */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <MomentLibrary
            selectedSlot={selectedSlot}
            onApplyMoment={applyMoment}
          />
          <KeyframeEditor
            selectedSlot={selectedSlot}
            keyframe={selectedKeyframe}
            onUpdateKeyframe={(updates) => selectedSlot !== null && setKeyframe(selectedSlot, updates)}
          />
        </div>

        {/* Preview Output */}
        <PromptPreview
          generatedPrompt={generatedPrompt}
          platform={timeline.platform}
          hasKeyframes={timeline.keyframes.length > 0}
          onDownloadPrompt={downloadPrompt}
          onSaveToFavorites={saveToFavorites}
          onShareURL={shareURL}
          onExportJSON={exportJSON}
          onDownloadJSON={downloadJSON}
          saved={saved}
          shared={shared}
          jsonCopied={jsonCopied}
        />

        {/* Stats & Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-forge-cyan">
                  {timeline.keyframes.filter(k => k.prompt.trim()).length}
                </div>
                <div className="text-xs text-gray-500">Keyframes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-forge-purple">
                  {Math.max(...timeline.keyframes.map(k => k.timestamp), 0) + 5}s
                </div>
                <div className="text-xs text-gray-500">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{generatedPrompt.length}</div>
                <div className="text-xs text-gray-500">Chars</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl p-4">
            <h3 className="font-medium mb-2">Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>- Start with a clear opening shot at 0s</li>
              <li>- Use 3-5 keyframes for best results</li>
              <li>- Add motion for dynamic scenes</li>
              <li>- Global style applies to all scenes</li>
            </ul>
          </div>
        </div>

        <RelatedTools currentPath="/tools/video-prompt-timeline" />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need to build image prompts too?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/tools/image-prompt-generator"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
            >
              Try Image Prompt Generator
            </Link>
            <Link
              href="/templates"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
            >
              Explore Memory Tools
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 max-w-xl mx-auto">
          <NewsletterCapture source="video-prompt-timeline" compact />
        </div>
      </div>
    </main>
  )
}
