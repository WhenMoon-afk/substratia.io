import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best AI Image Generators 2026 - Midjourney vs DALL-E vs Stable Diffusion | Substratia',
  description: 'Comprehensive comparison of AI image generators in 2026. Midjourney v6, DALL-E 3, Stable Diffusion XL, Grok, Flux, and more. Pricing, quality, features compared.',
  keywords: 'best AI image generator 2026, Midjourney vs DALL-E, Stable Diffusion comparison, Grok image generator, Flux AI, AI art generator comparison, image generation AI',
  openGraph: {
    title: 'Best AI Image Generators 2026 - Complete Comparison',
    description: 'Midjourney vs DALL-E 3 vs Stable Diffusion vs Grok. Which AI image generator is best for you?',
    type: 'article',
    url: 'https://substratia.io/reviews/ai-image-generators',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Image Generators 2026',
    description: 'Midjourney vs DALL-E 3 vs Stable Diffusion vs Grok comparison.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best AI Image Generators 2026',
  description: 'A comparison of the top AI image generators for artists and creators.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Midjourney v6.1',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'DALL-E 3',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Stable Diffusion XL',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Cross-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Grok',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Flux',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Cross-platform',
      },
    },
  ],
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://substratia.io/reviews' },
    { '@type': 'ListItem', position: 3, name: 'AI Image Generators', item: 'https://substratia.io/reviews/ai-image-generators' },
  ],
}

export default function AIImageGeneratorsLayout({
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
