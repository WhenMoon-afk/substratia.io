import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCP Memory Servers Compared | Substratia',
  description: 'Comprehensive comparison of MCP memory servers including memory-mcp, mem0, Basic Memory, and Obsidian MCP.',
  keywords: ['MCP memory', 'memory-mcp', 'mem0', 'Basic Memory', 'MCP comparison'],
  openGraph: {
    title: 'MCP Memory Servers Compared',
    description: 'Compare memory-mcp, mem0, Basic Memory, and Obsidian MCP.',
    type: 'article',
    url: 'https://substratia.io/blog/memory-mcp-vs-alternatives',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCP Memory Server Comparison',
    description: 'memory-mcp vs mem0 vs Basic Memory vs Obsidian MCP.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://substratia.io/blog' },
    { '@type': 'ListItem', position: 3, name: 'MCP Memory Servers Compared', item: 'https://substratia.io/blog/memory-mcp-vs-alternatives' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MCP Memory Servers Compared: memory-mcp vs Alternatives',
  description: 'Comprehensive comparison of MCP memory servers including memory-mcp, mem0, Basic Memory, and Obsidian MCP.',
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
    '@id': 'https://substratia.io/blog/memory-mcp-vs-alternatives',
  },
}

export default function MemoryMcpVsAlternativesLayout({
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
