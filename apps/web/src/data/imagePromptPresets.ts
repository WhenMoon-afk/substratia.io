// Image Prompt Generator Presets
// Used by /tools/image-prompt-generator

export type Platform = 'nano-banana-pro' | 'grok' | 'midjourney' | 'dalle' | 'stable-diffusion'

export type StyleCategory = 'photography' | 'art' | 'aesthetic' | 'lighting' | 'technical'

export interface StylePreset {
  id: string
  name: string
  category: StyleCategory
  keywords: string[]
  emoji?: string
}

export interface NegativePreset {
  id: string
  name: string
  keywords: string[]
}

export interface AspectRatio {
  id: string
  name: string
  ratio: string
  width: number
  height: number
}

export const platforms: { id: Platform; name: string; description: string }[] = [
  { id: 'nano-banana-pro', name: 'nano-banana-pro', description: 'High quality image generation' },
  { id: 'grok', name: 'Grok', description: 'xAI image and video generation' },
  { id: 'midjourney', name: 'Midjourney', description: 'Artistic image generation with --ar, --v syntax' },
  { id: 'dalle', name: 'DALL-E / ChatGPT', description: 'Natural language image prompts' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', description: 'Weighted syntax (keyword:1.2)' },
]

export const stylePresets: StylePreset[] = [
  // Photography Styles
  { id: 'portrait', name: 'Portrait', category: 'photography', keywords: ['portrait photography', 'shallow depth of field', 'professional lighting'], emoji: '🧑' },
  { id: 'landscape', name: 'Landscape', category: 'photography', keywords: ['landscape photography', 'wide angle', 'scenic view'], emoji: '🏞️' },
  { id: 'macro', name: 'Macro', category: 'photography', keywords: ['macro photography', 'extreme close-up', 'fine details'], emoji: '🔬' },
  { id: 'street', name: 'Street', category: 'photography', keywords: ['street photography', 'candid', 'urban environment'], emoji: '🏙️' },
  { id: 'product', name: 'Product', category: 'photography', keywords: ['product photography', 'studio lighting', 'commercial'], emoji: '📦' },
  { id: 'fashion', name: 'Fashion', category: 'photography', keywords: ['fashion photography', 'editorial', 'haute couture'], emoji: '👗' },
  { id: 'wildlife', name: 'Wildlife', category: 'photography', keywords: ['wildlife photography', 'nature', 'animals in habitat'], emoji: '🦁' },
  { id: 'architecture', name: 'Architecture', category: 'photography', keywords: ['architectural photography', 'buildings', 'structural'], emoji: '🏛️' },
  { id: 'food', name: 'Food', category: 'photography', keywords: ['food photography', 'culinary', 'appetizing'], emoji: '🍽️' },
  { id: 'documentary', name: 'Documentary', category: 'photography', keywords: ['documentary photography', 'photojournalism', 'authentic'], emoji: '📰' },

  // Art Styles
  { id: 'anime', name: 'Anime/Manga', category: 'art', keywords: ['anime style', 'manga art', 'Japanese animation'], emoji: '🎌' },
  { id: 'oil-painting', name: 'Oil Painting', category: 'art', keywords: ['oil painting', 'classical art', 'painterly brushstrokes'], emoji: '🖼️' },
  { id: 'watercolor', name: 'Watercolor', category: 'art', keywords: ['watercolor painting', 'soft edges', 'translucent colors'], emoji: '🎨' },
  { id: 'digital-art', name: 'Digital Art', category: 'art', keywords: ['digital art', 'digital illustration', 'modern'], emoji: '💻' },
  { id: 'concept-art', name: 'Concept Art', category: 'art', keywords: ['concept art', 'game art', 'entertainment design'], emoji: '🎮' },
  { id: 'pixel-art', name: 'Pixel Art', category: 'art', keywords: ['pixel art', '8-bit', 'retro game style'], emoji: '👾' },
  { id: 'pencil-sketch', name: 'Pencil Sketch', category: 'art', keywords: ['pencil sketch', 'graphite drawing', 'hand-drawn'], emoji: '✏️' },
  { id: 'comic-book', name: 'Comic Book', category: 'art', keywords: ['comic book style', 'bold lines', 'pop art colors'], emoji: '💥' },
  { id: 'impressionist', name: 'Impressionist', category: 'art', keywords: ['impressionist style', 'Monet-inspired', 'visible brushstrokes'], emoji: '🌸' },
  { id: 'surrealist', name: 'Surrealist', category: 'art', keywords: ['surrealist art', 'dreamlike', 'Dali-inspired'], emoji: '🌀' },

  // Aesthetic Themes
  { id: 'cyberpunk', name: 'Cyberpunk', category: 'aesthetic', keywords: ['cyberpunk', 'neon lights', 'futuristic dystopia', 'high tech low life'], emoji: '🌃' },
  { id: 'cottagecore', name: 'Cottagecore', category: 'aesthetic', keywords: ['cottagecore', 'pastoral', 'cozy rural', 'idyllic countryside'], emoji: '🏡' },
  { id: 'dark-academia', name: 'Dark Academia', category: 'aesthetic', keywords: ['dark academia', 'classical education', 'gothic architecture', 'scholarly'], emoji: '📚' },
  { id: 'vaporwave', name: 'Vaporwave', category: 'aesthetic', keywords: ['vaporwave', 'retro 80s', 'pink and blue neon', 'glitch art'], emoji: '🌴' },
  { id: 'steampunk', name: 'Steampunk', category: 'aesthetic', keywords: ['steampunk', 'Victorian era', 'brass gears', 'steam-powered'], emoji: '⚙️' },
  { id: 'solarpunk', name: 'Solarpunk', category: 'aesthetic', keywords: ['solarpunk', 'sustainable future', 'green technology', 'utopian'], emoji: '🌱' },
  { id: 'gothic', name: 'Gothic', category: 'aesthetic', keywords: ['gothic', 'dark and moody', 'Victorian gothic', 'mysterious'], emoji: '🦇' },
  { id: 'minimalist', name: 'Minimalist', category: 'aesthetic', keywords: ['minimalist', 'clean lines', 'simple composition', 'negative space'], emoji: '⬜' },
  { id: 'maximalist', name: 'Maximalist', category: 'aesthetic', keywords: ['maximalist', 'vibrant colors', 'rich patterns', 'ornate details'], emoji: '✨' },
  { id: 'y2k', name: 'Y2K', category: 'aesthetic', keywords: ['Y2K aesthetic', 'early 2000s', 'chrome', 'futuristic retro'], emoji: '💿' },

  // Lighting Options
  { id: 'golden-hour', name: 'Golden Hour', category: 'lighting', keywords: ['golden hour lighting', 'warm sunset light', 'soft shadows'], emoji: '🌅' },
  { id: 'blue-hour', name: 'Blue Hour', category: 'lighting', keywords: ['blue hour', 'twilight', 'cool ambient light'], emoji: '🌆' },
  { id: 'dramatic', name: 'Dramatic', category: 'lighting', keywords: ['dramatic lighting', 'chiaroscuro', 'high contrast'], emoji: '🎭' },
  { id: 'soft', name: 'Soft', category: 'lighting', keywords: ['soft lighting', 'diffused light', 'gentle shadows'], emoji: '☁️' },
  { id: 'neon', name: 'Neon', category: 'lighting', keywords: ['neon lighting', 'colorful glow', 'electric atmosphere'], emoji: '💡' },
  { id: 'cinematic', name: 'Cinematic', category: 'lighting', keywords: ['cinematic lighting', 'film noir', 'moody atmosphere'], emoji: '🎬' },
  { id: 'studio', name: 'Studio', category: 'lighting', keywords: ['studio lighting', 'professional setup', 'controlled environment'], emoji: '📸' },
  { id: 'natural', name: 'Natural', category: 'lighting', keywords: ['natural lighting', 'available light', 'authentic'], emoji: '☀️' },
  { id: 'backlit', name: 'Backlit', category: 'lighting', keywords: ['backlit', 'rim lighting', 'silhouette'], emoji: '🌟' },
  { id: 'low-key', name: 'Low-key', category: 'lighting', keywords: ['low-key lighting', 'dark tones', 'minimal light'], emoji: '🌑' },
  { id: 'high-key', name: 'High-key', category: 'lighting', keywords: ['high-key lighting', 'bright', 'minimal shadows'], emoji: '💫' },

  // Camera/Technical
  { id: 'bokeh', name: 'Bokeh', category: 'technical', keywords: ['bokeh', 'blurred background', 'out of focus lights'], emoji: '🔴' },
  { id: 'shallow-dof', name: 'Shallow DOF', category: 'technical', keywords: ['shallow depth of field', 'f/1.4', 'subject isolation'], emoji: '📷' },
  { id: 'wide-angle', name: 'Wide Angle', category: 'technical', keywords: ['wide angle lens', '14mm', 'expansive view'], emoji: '🔭' },
  { id: 'telephoto', name: 'Telephoto', category: 'technical', keywords: ['telephoto lens', '200mm', 'compressed perspective'], emoji: '🔍' },
  { id: 'film-grain', name: 'Film Grain', category: 'technical', keywords: ['film grain', 'analog look', '35mm film'], emoji: '🎞️' },
  { id: 'long-exposure', name: 'Long Exposure', category: 'technical', keywords: ['long exposure', 'motion blur', 'light trails'], emoji: '⏱️' },
  { id: 'hdr', name: 'HDR', category: 'technical', keywords: ['HDR', 'high dynamic range', 'detailed highlights and shadows'], emoji: '🌈' },
  { id: 'tilt-shift', name: 'Tilt-shift', category: 'technical', keywords: ['tilt-shift', 'miniature effect', 'selective focus'], emoji: '🏘️' },
]

export const negativePresets: NegativePreset[] = [
  { id: 'quality', name: 'Low Quality', keywords: ['blurry', 'low quality', 'pixelated', 'jpeg artifacts', 'noisy', 'grainy'] },
  { id: 'anatomy', name: 'Bad Anatomy', keywords: ['deformed', 'bad anatomy', 'extra limbs', 'missing fingers', 'mutated', 'disfigured'] },
  { id: 'text', name: 'Text/Watermarks', keywords: ['watermark', 'signature', 'text', 'logo', 'username', 'artist name'] },
  { id: 'faces', name: 'Face Issues', keywords: ['distorted face', 'ugly', 'asymmetric face', 'crossed eyes', 'bad teeth'] },
  { id: 'cartoon', name: 'No Cartoon', keywords: ['cartoon', 'anime', 'illustration', 'drawn', '3D render'] },
  { id: 'photorealistic', name: 'No Photorealism', keywords: ['photorealistic', 'photograph', 'realistic', 'real life'] },
  { id: 'nsfw', name: 'Safe Content', keywords: ['nsfw', 'nude', 'explicit', 'violence', 'gore', 'disturbing'] },
]

export const aspectRatios: AspectRatio[] = [
  { id: 'square', name: 'Square (1:1)', ratio: '1:1', width: 1024, height: 1024 },
  { id: 'widescreen', name: 'Widescreen (16:9)', ratio: '16:9', width: 1920, height: 1080 },
  { id: 'portrait', name: 'Portrait (9:16)', ratio: '9:16', width: 1080, height: 1920 },
  { id: 'classic', name: 'Classic (3:2)', ratio: '3:2', width: 1536, height: 1024 },
  { id: 'standard', name: 'Standard (4:3)', ratio: '4:3', width: 1365, height: 1024 },
  { id: 'photo', name: 'Photo (2:3)', ratio: '2:3', width: 1024, height: 1536 },
]

export const categoryLabels: Record<StyleCategory, string> = {
  photography: 'Photography',
  art: 'Art Styles',
  aesthetic: 'Aesthetics',
  lighting: 'Lighting',
  technical: 'Technical',
}

// Platform-specific formatters
export function formatPrompt(
  subject: string,
  styles: StylePreset[],
  negatives: NegativePreset[],
  aspectRatio: AspectRatio,
  sliders: {
    styleIntensity: number
    detailLevel: number
    realism: number
    saturation: number
    contrast: number
  },
  platform: Platform
): { positive: string; negative: string } {
  const styleKeywords = styles.flatMap(s => s.keywords)
  const negativeKeywords = negatives.flatMap(n => n.keywords)

  // Quality modifiers based on sliders
  const qualityMods: string[] = []
  if (sliders.detailLevel > 70) qualityMods.push('highly detailed', 'intricate details')
  else if (sliders.detailLevel > 40) qualityMods.push('detailed')

  if (sliders.realism > 70) qualityMods.push('photorealistic', 'hyperrealistic')
  else if (sliders.realism < 30) qualityMods.push('stylized', 'artistic')

  if (sliders.saturation > 70) qualityMods.push('vibrant colors', 'saturated')
  else if (sliders.saturation < 30) qualityMods.push('muted colors', 'desaturated')

  if (sliders.contrast > 70) qualityMods.push('high contrast')
  else if (sliders.contrast < 30) qualityMods.push('low contrast', 'soft')

  switch (platform) {
    case 'midjourney': {
      const ar = `--ar ${aspectRatio.ratio.replace(':', ':')}`
      const stylize = sliders.styleIntensity > 50 ? `--stylize ${Math.round(sliders.styleIntensity * 10)}` : ''
      const positive = [subject, ...styleKeywords, ...qualityMods].filter(Boolean).join(', ')
      return {
        positive: `${positive} ${ar} ${stylize} --v 6.1`.trim(),
        negative: negativeKeywords.length > 0 ? `--no ${negativeKeywords.join(', ')}` : '',
      }
    }

    case 'stable-diffusion': {
      const intensity = 1 + (sliders.styleIntensity / 100) * 0.5 // 1.0 to 1.5
      const weightedStyles = styleKeywords.map(k => `(${k}:${intensity.toFixed(1)})`).join(', ')
      const positive = [subject, weightedStyles, ...qualityMods].filter(Boolean).join(', ')
      return {
        positive,
        negative: negativeKeywords.join(', '),
      }
    }

    case 'dalle': {
      // DALL-E prefers natural language
      const styleDesc = styles.length > 0
        ? `in the style of ${styles.map(s => s.name.toLowerCase()).join(' and ')}`
        : ''
      const qualityDesc = qualityMods.length > 0 ? `, ${qualityMods.join(', ')}` : ''
      return {
        positive: `${subject} ${styleDesc}${qualityDesc}`.trim(),
        negative: negativeKeywords.length > 0 ? `Avoid: ${negativeKeywords.join(', ')}` : '',
      }
    }

    case 'grok':
    case 'nano-banana-pro':
    default: {
      const positive = [
        subject,
        ...styleKeywords,
        ...qualityMods,
        'masterpiece',
        'best quality',
      ].filter(Boolean).join(', ')
      return {
        positive,
        negative: negativeKeywords.join(', '),
      }
    }
  }
}
