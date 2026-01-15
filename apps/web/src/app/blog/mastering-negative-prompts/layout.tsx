import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mastering Negative Prompts for AI | Substratia',
  description: 'Learn how to use negative prompts effectively to improve AI output quality and avoid common pitfalls.',
  keywords: ['negative prompts', 'AI prompts', 'prompt engineering', 'Claude Code', 'AI quality'],
  openGraph: {
    title: 'Mastering Negative Prompts for AI',
    description: 'Use negative prompts to improve AI output quality.',
    type: 'article',
    url: 'https://substratia.io/blog/mastering-negative-prompts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mastering Negative Prompts',
    description: 'Improve AI output quality with negative prompts.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'Mastering Negative Prompts', item: 'https://substratia.io/blog/mastering-negative-prompts' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mastering Negative Prompts for AI',
  description: 'Learn how to use negative prompts effectively to improve AI output quality and avoid common pitfalls.',
  author: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  datePublished: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://substratia.io/blog/mastering-negative-prompts',
  },
}

export default function MasteringNegativePromptsLayout({
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
