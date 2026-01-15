import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memory Architecture Patterns for AI Assistants | Substratia',
  description: 'Explore different memory architecture patterns for building AI systems with persistent context.',
  keywords: ['memory architecture', 'AI memory', 'persistent context', 'Claude memory', 'MCP patterns'],
  openGraph: {
    title: 'Memory Architecture Patterns for AI',
    description: 'Memory architecture patterns for building AI with persistent context.',
    type: 'article',
    url: 'https://substratia.io/blog/memory-architecture-patterns',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Architecture Patterns',
    description: 'Building AI systems with persistent context.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'Memory Architecture Patterns', item: 'https://substratia.io/blog/memory-architecture-patterns' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Memory Architecture Patterns for AI Assistants',
  description: 'Explore different memory architecture patterns for building AI systems with persistent context.',
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
    '@id': 'https://substratia.io/blog/memory-architecture-patterns',
  },
}

export default function MemoryArchitecturePatternsLayout({
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
