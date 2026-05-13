// Video Prompt Timeline Presets
// Used by /tools/video-prompt-timeline

export type VideoPlatform = 'grok' | 'runway' | 'pika' | 'luma' | 'kling'

export type MomentCategory = 'action' | 'camera' | 'transition' | 'atmosphere'

export type Motion = 'static' | 'pan-left' | 'pan-right' | 'zoom-in' | 'zoom-out' | 'dolly-in' | 'dolly-out' | 'crane-up' | 'crane-down' | 'tracking'

export type Transition = 'cut' | 'fade' | 'dissolve' | 'morph' | 'wipe'

export type VideoAspectRatio = '16:9' | '9:16' | '1:1'

export interface VideoKeyframe {
  id: string
  timestamp: number // 0, 5, 10, 15, 20, 25, 30
  prompt: string
  motion: Motion
  transition: Transition
  emoji: string
}

export interface VideoTimeline {
  id: string
  name: string
  platform: VideoPlatform
  keyframes: VideoKeyframe[]
  globalStyle: string
  aspectRatio: VideoAspectRatio
  createdAt: string
}

export interface MomentPreset {
  id: string
  category: MomentCategory
  name: string
  promptSnippet: string
  emoji: string
}

export const videoPlatforms: { id: VideoPlatform; name: string; description: string }[] = [
  { id: 'grok', name: 'Grok', description: 'xAI video generation' },
  { id: 'runway', name: 'Runway Gen-3', description: 'Professional video generation' },
  { id: 'pika', name: 'Pika Labs', description: 'Creative video generation' },
  { id: 'luma', name: 'Luma Dream Machine', description: 'Realistic video generation' },
  { id: 'kling', name: 'Kling AI', description: 'High-quality video generation' },
]

export const motionOptions: { id: Motion; name: string; icon: string }[] = [
  { id: 'static', name: 'Static', icon: '⬜' },
  { id: 'pan-left', name: 'Pan Left', icon: '⬅️' },
  { id: 'pan-right', name: 'Pan Right', icon: '➡️' },
  { id: 'zoom-in', name: 'Zoom In', icon: '🔍' },
  { id: 'zoom-out', name: 'Zoom Out', icon: '🔎' },
  { id: 'dolly-in', name: 'Dolly In', icon: '🎥' },
  { id: 'dolly-out', name: 'Dolly Out', icon: '📹' },
  { id: 'crane-up', name: 'Crane Up', icon: '⬆️' },
  { id: 'crane-down', name: 'Crane Down', icon: '⬇️' },
  { id: 'tracking', name: 'Tracking', icon: '🏃' },
]

export const transitionOptions: { id: Transition; name: string }[] = [
  { id: 'cut', name: 'Cut' },
  { id: 'fade', name: 'Fade' },
  { id: 'dissolve', name: 'Dissolve' },
  { id: 'morph', name: 'Morph' },
  { id: 'wipe', name: 'Wipe' },
]

export const videoAspectRatios: { id: VideoAspectRatio; name: string }[] = [
  { id: '16:9', name: 'Widescreen (16:9)' },
  { id: '9:16', name: 'Portrait (9:16)' },
  { id: '1:1', name: 'Square (1:1)' },
]

export const momentPresets: MomentPreset[] = [
  // Actions
  { id: 'running', category: 'action', name: 'Running', promptSnippet: 'person running', emoji: '🏃' },
  { id: 'walking', category: 'action', name: 'Walking', promptSnippet: 'person walking slowly', emoji: '🚶' },
  { id: 'dancing', category: 'action', name: 'Dancing', promptSnippet: 'person dancing gracefully', emoji: '💃' },
  { id: 'flying', category: 'action', name: 'Flying', promptSnippet: 'soaring through the air', emoji: '🦅' },
  { id: 'falling', category: 'action', name: 'Falling', promptSnippet: 'falling in slow motion', emoji: '⬇️' },
  { id: 'fighting', category: 'action', name: 'Fighting', promptSnippet: 'dynamic action sequence', emoji: '👊' },
  { id: 'swimming', category: 'action', name: 'Swimming', promptSnippet: 'swimming underwater', emoji: '🏊' },
  { id: 'jumping', category: 'action', name: 'Jumping', promptSnippet: 'jumping into the air', emoji: '🦘' },
  { id: 'driving', category: 'action', name: 'Driving', promptSnippet: 'driving fast', emoji: '🚗' },
  { id: 'exploding', category: 'action', name: 'Explosion', promptSnippet: 'dramatic explosion', emoji: '💥' },

  // Camera Moves
  { id: 'pan', category: 'camera', name: 'Pan', promptSnippet: 'camera panning across the scene', emoji: '↔️' },
  { id: 'tilt', category: 'camera', name: 'Tilt', promptSnippet: 'camera tilting up/down', emoji: '↕️' },
  { id: 'dolly', category: 'camera', name: 'Dolly', promptSnippet: 'camera moving forward', emoji: '🎥' },
  { id: 'crane', category: 'camera', name: 'Crane', promptSnippet: 'camera rising up', emoji: '🏗️' },
  { id: 'handheld', category: 'camera', name: 'Handheld', promptSnippet: 'shaky handheld camera', emoji: '📱' },
  { id: 'steadicam', category: 'camera', name: 'Steadicam', promptSnippet: 'smooth steadicam movement', emoji: '🎬' },
  { id: 'orbit', category: 'camera', name: 'Orbit', promptSnippet: 'camera orbiting around subject', emoji: '🔄' },
  { id: 'push-in', category: 'camera', name: 'Push In', promptSnippet: 'dramatic push in', emoji: '🔜' },

  // Transitions (for between frames)
  { id: 'fade-in', category: 'transition', name: 'Fade In', promptSnippet: 'fading in from black', emoji: '🌅' },
  { id: 'fade-out', category: 'transition', name: 'Fade Out', promptSnippet: 'fading to black', emoji: '🌆' },
  { id: 'morph-trans', category: 'transition', name: 'Morph', promptSnippet: 'morphing transformation', emoji: '🔀' },
  { id: 'glitch', category: 'transition', name: 'Glitch', promptSnippet: 'digital glitch effect', emoji: '📺' },
  { id: 'spin', category: 'transition', name: 'Spin', promptSnippet: 'spinning transition', emoji: '🌀' },
  { id: 'flash', category: 'transition', name: 'Flash', promptSnippet: 'bright flash transition', emoji: '⚡' },

  // Atmosphere
  { id: 'sunrise', category: 'atmosphere', name: 'Sunrise', promptSnippet: 'golden sunrise lighting', emoji: '🌅' },
  { id: 'sunset', category: 'atmosphere', name: 'Sunset', promptSnippet: 'warm sunset glow', emoji: '🌇' },
  { id: 'rain', category: 'atmosphere', name: 'Rain', promptSnippet: 'rain falling', emoji: '🌧️' },
  { id: 'snow', category: 'atmosphere', name: 'Snow', promptSnippet: 'snowflakes falling', emoji: '❄️' },
  { id: 'fog', category: 'atmosphere', name: 'Fog', promptSnippet: 'misty fog', emoji: '🌫️' },
  { id: 'storm', category: 'atmosphere', name: 'Storm', promptSnippet: 'dramatic storm', emoji: '⛈️' },
  { id: 'night', category: 'atmosphere', name: 'Night', promptSnippet: 'dark night scene', emoji: '🌙' },
  { id: 'neon', category: 'atmosphere', name: 'Neon', promptSnippet: 'neon lights glowing', emoji: '💡' },
  { id: 'underwater', category: 'atmosphere', name: 'Underwater', promptSnippet: 'underwater atmosphere', emoji: '🌊' },
  { id: 'space', category: 'atmosphere', name: 'Space', promptSnippet: 'outer space environment', emoji: '🚀' },
]

export const categoryLabels: Record<MomentCategory, string> = {
  action: 'Actions',
  camera: 'Camera',
  transition: 'Transitions',
  atmosphere: 'Atmosphere',
}

// Timeline slots (7 keyframes at 5-second intervals)
export const timelineSlots = [0, 5, 10, 15, 20, 25, 30] as const

export function createEmptyKeyframe(timestamp: number): VideoKeyframe {
  return {
    id: `frame-${timestamp}-${Date.now()}`,
    timestamp,
    prompt: '',
    motion: 'static',
    transition: 'cut',
    emoji: '⬜',
  }
}

export function createEmptyTimeline(): VideoTimeline {
  return {
    id: `timeline-${Date.now()}`,
    name: 'Untitled Timeline',
    platform: 'grok',
    keyframes: [],
    globalStyle: '',
    aspectRatio: '16:9',
    createdAt: new Date().toISOString(),
  }
}

// Platform-specific formatters
export function formatVideoPrompt(timeline: VideoTimeline): string {
  const filledKeyframes = timeline.keyframes
    .filter(k => k.prompt.trim())
    .sort((a, b) => a.timestamp - b.timestamp)

  if (filledKeyframes.length === 0) {
    return ''
  }

  const globalPrefix = timeline.globalStyle ? `Style: ${timeline.globalStyle}\n\n` : ''

  switch (timeline.platform) {
    case 'grok': {
      const scenes = filledKeyframes.map((kf, i) => {
        const nextKf = filledKeyframes[i + 1]
        const duration = nextKf ? nextKf.timestamp - kf.timestamp : 5
        const motion = kf.motion !== 'static' ? `, ${motionOptions.find(m => m.id === kf.motion)?.name} motion` : ''
        return `Scene ${i + 1} (${kf.timestamp}-${kf.timestamp + duration}s): ${kf.prompt}${motion}`
      })
      return `${globalPrefix}${scenes.join('\n')}`
    }

    case 'runway': {
      const frames = filledKeyframes.map((kf, i) => {
        const motion = motionOptions.find(m => m.id === kf.motion)?.name || 'Static'
        return `Frame ${i + 1}: ${kf.prompt} | Motion: ${motion} | Time: ${kf.timestamp}s`
      })
      return `${globalPrefix}${frames.join('\n')}`
    }

    case 'pika':
    case 'luma':
    case 'kling':
    default: {
      const scenes = filledKeyframes.map((kf, i) => {
        const nextKf = filledKeyframes[i + 1]
        const endTime = nextKf ? nextKf.timestamp : kf.timestamp + 5
        return `[${kf.timestamp}s - ${endTime}s] ${kf.prompt}`
      })
      return `${globalPrefix}${scenes.join('\n')}`
    }
  }
}

// LocalStorage helpers for favorites
const FAVORITES_KEY = 'substratia-video-favorites'

export function saveFavorite(timeline: VideoTimeline): void {
  const favorites = getFavorites()
  const existing = favorites.findIndex(f => f.id === timeline.id)
  if (existing >= 0) {
    favorites[existing] = timeline
  } else {
    favorites.push(timeline)
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export function getFavorites(): VideoTimeline[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function deleteFavorite(id: string): void {
  const favorites = getFavorites()
  const filtered = favorites.filter(f => f.id !== id)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
}
