import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Prompt Generator - AI Art Prompt Builder | Substratia',
  description: 'Free drag-and-drop prompt builder for AI image generation. Create prompts for Midjourney, DALL-E, Stable Diffusion, Grok, and more. 50+ style presets, negative prompts, intensity sliders.',
  keywords: 'AI image prompt, Midjourney prompt generator, DALL-E prompt builder, Stable Diffusion prompts, image generation prompt, AI art prompt maker, negative prompts, style presets',
  openGraph: {
    title: 'Image Prompt Generator - Build AI Art Prompts Visually',
    description: 'Free tool to create image generation prompts. 50+ style presets, negative prompts, platform-specific output. Works with Midjourney, DALL-E, Stable Diffusion.',
    type: 'website',
    url: 'https://substratia.io/tools/image-prompt-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Prompt Generator',
    description: '50+ style presets for Midjourney, DALL-E, Stable Diffusion. Free.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Prompt Generator',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free prompt builder for AI image generation. 50+ style presets for Midjourney, DALL-E, Stable Diffusion.',
  url: 'https://substratia.io/tools/image-prompt-generator',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Image Prompt Generator', item: 'https://substratia.io/tools/image-prompt-generator' },
  ],
}

export default function ImagePromptGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
