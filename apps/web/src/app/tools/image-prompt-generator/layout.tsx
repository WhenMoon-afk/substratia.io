import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Image Prompt Generator - AI Art Prompt Builder | Substratia',
  description: 'Free drag-and-drop prompt builder for AI image generation. Create prompts for Midjourney, DALL-E, Stable Diffusion, Grok, and more. 50+ style presets, negative prompts, intensity sliders.',
  keywords: 'AI image prompt, Midjourney prompt generator, DALL-E prompt builder, Stable Diffusion prompts, image generation prompt, AI art prompt maker, negative prompts, style presets',
  openGraph: {
    title: 'Image Prompt Generator - Build AI Art Prompts Visually',
    description: 'Free tool to create image generation prompts. 50+ style presets, negative prompts, platform-specific output. Works with Midjourney, DALL-E, Stable Diffusion.',
    type: 'website',
    url: siteUrl('/tools/image-prompt-generator'),
    images: [
      {
        url: siteUrl('/api/og?title=Image%20Prompt%20Generator&subtitle=Build%20AI%20Art%20Prompts%20Visually'),
        width: 1200,
        height: 630,
        alt: 'Image Prompt Generator',
      },
    ],
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
  url: siteUrl('/tools/image-prompt-generator'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Image Prompt Generator', '/tools/image-prompt-generator'])

export default function ImagePromptGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      {children}
    </>
  )
}
