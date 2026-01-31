import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memory Tools - Substratia | momentum, memory-mcp',
  description: 'Free, open-source memory tools for AI assistants. momentum for context recovery, memory-mcp for persistent memory.',
  keywords: 'AI memory tools, momentum, memory-mcp, Claude memory, AI context management, persistent memory',
  openGraph: {
    title: 'Free Memory Tools for AI',
    description: 'Open-source tools: momentum (context recovery), memory-mcp (persistent memory).',
    type: 'website',
    url: 'https://substratia.io/templates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Memory Tools for AI',
    description: 'Open-source: momentum, memory-mcp.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Memory Tools', item: 'https://substratia.io/templates' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Memory Tools for AI',
  description: 'Open-source memory tools for AI assistants.',
  url: 'https://substratia.io/templates',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'momentum',
        description: 'Fast context recovery plugin for Claude Code. Restore context in <5ms.',
        applicationCategory: 'DeveloperApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'memory-mcp',
        description: 'Persistent memory MCP server. Remember conversations across sessions.',
        applicationCategory: 'DeveloperApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    },
  ],
}

export default function TemplatesLayout({
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
