import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tool Reviews & Comparisons | Substratia',
  description: 'Honest reviews and side-by-side comparisons of AI tools. Image generators, video generators, memory servers, and more. Updated for 2026.',
  keywords: 'AI tool reviews, AI comparisons, best AI image generator, best AI video generator, Midjourney vs DALL-E, Runway vs Pika, AI tool comparison 2026',
  openGraph: {
    title: 'AI Tool Reviews & Comparisons',
    description: 'Honest reviews and side-by-side comparisons of AI tools. Find the best AI tools for your workflow.',
    type: 'website',
    url: 'https://substratia.io/reviews',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tool Reviews & Comparisons',
    description: 'Honest reviews of AI coding assistants, image generators, video generators.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://substratia.io/reviews' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Tool Reviews & Comparisons',
  description: 'Honest reviews and side-by-side comparisons of AI tools. Updated for 2026.',
  url: 'https://substratia.io/reviews',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Best AI Coding Assistants 2026', url: 'https://substratia.io/reviews/ai-coding-assistants' },
      { '@type': 'ListItem', position: 2, name: 'Best AI Image Generators 2026', url: 'https://substratia.io/reviews/ai-image-generators' },
      { '@type': 'ListItem', position: 3, name: 'Best AI Video Generators 2026', url: 'https://substratia.io/reviews/ai-video-generators' },
      { '@type': 'ListItem', position: 4, name: 'Best Markdown Editors 2026', url: 'https://substratia.io/reviews/markdown-editors' },
    ],
  },
}

export default function ReviewsLayout({
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
