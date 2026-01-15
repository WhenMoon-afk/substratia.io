import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "What's New in memory-mcp v2.5 | Substratia",
  description: 'Complete rewrite of memory-mcp: no more embeddings, no more pip - just npx and instant persistent memory.',
  keywords: ['memory-mcp', 'v2.5', 'MCP server', 'Claude memory', 'TypeScript'],
  openGraph: {
    title: "What's New in memory-mcp v2.5",
    description: 'Complete rewrite: no embeddings, just npx for instant persistent memory.',
    type: 'article',
    url: 'https://substratia.io/blog/memory-mcp-v2-whats-new',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'memory-mcp v2.5 Release',
    description: 'Complete TypeScript rewrite with simpler setup.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'memory-mcp v2.5', item: 'https://substratia.io/blog/memory-mcp-v2-whats-new' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "What's New in memory-mcp v2.5: From Python to TypeScript",
  description: 'Complete rewrite of memory-mcp: no more embeddings, no more pip - just npx and instant persistent memory.',
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
    '@id': 'https://substratia.io/blog/memory-mcp-v2-whats-new',
  },
}

export default function MemoryMcpV2WhatsNewLayout({
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
