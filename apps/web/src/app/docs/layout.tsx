import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - Substratia | Memory Infrastructure for AI',
  description: 'Learn how to use Substratia tools: momentum for context recovery, memory-mcp for persistent memory, and AgentForge for visual agent configuration.',
  keywords: ['Substratia docs', 'momentum documentation', 'memory-mcp guide', 'AgentForge tutorial', 'Claude Code plugins', 'MCP server setup'],
  openGraph: {
    title: 'Substratia Documentation',
    description: 'Learn how to use momentum, memory-mcp, and AgentForge tools.',
    type: 'website',
    url: 'https://substratia.io/docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia Documentation',
    description: 'Learn how to use momentum, memory-mcp, and AgentForge.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Documentation', item: 'https://substratia.io/docs' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Substratia Documentation',
  description: 'Learn how to use Substratia tools: momentum for context recovery, memory-mcp for persistent memory, and AgentForge for visual agent configuration.',
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
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://substratia.io/docs',
  },
}

export default function DocsLayout({
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
