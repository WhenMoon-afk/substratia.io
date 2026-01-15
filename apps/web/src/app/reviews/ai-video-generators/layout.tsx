import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best AI Video Generators 2026 - Runway vs Pika vs Luma vs Kling | Substratia',
  description: 'Comprehensive comparison of AI video generators in 2026. Runway Gen-3, Pika Labs, Luma Dream Machine, Kling AI, and Grok video compared. Pricing, quality, features.',
  keywords: 'best AI video generator 2026, Runway vs Pika, Luma Dream Machine review, Kling AI review, Grok video generator, AI video comparison, text to video AI',
  openGraph: {
    title: 'Best AI Video Generators 2026 - Complete Comparison',
    description: 'Runway Gen-3 vs Pika vs Luma vs Kling vs Grok. Which AI video generator is best for you?',
    type: 'article',
    url: 'https://substratia.io/reviews/ai-video-generators',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Video Generators 2026',
    description: 'Runway Gen-3 vs Pika vs Luma vs Kling vs Grok comparison.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://substratia.io/reviews' },
    { '@type': 'ListItem', position: 3, name: 'AI Video Generators', item: 'https://substratia.io/reviews/ai-video-generators' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best AI Video Generators 2026',
  description: 'A comparison of the top AI video generators for creators.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Runway Gen-3',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Pika Labs',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Luma Dream Machine',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Kling AI',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'SoftwareApplication',
        name: 'Grok Video',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
      },
    },
  ],
}

export default function AIVideoGeneratorsLayout({
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
