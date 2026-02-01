import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'MCP Memory Servers Compared | Substratia',
  description: 'Comprehensive comparison of MCP memory servers including memory-mcp, mem0, Basic Memory, and Obsidian MCP.',
  keywords: ['MCP memory', 'memory-mcp', 'mem0', 'Basic Memory', 'MCP comparison'],
  openGraph: {
    title: 'MCP Memory Servers Compared',
    description: 'Compare memory-mcp, mem0, Basic Memory, and Obsidian MCP.',
    type: 'article',
    url: siteUrl('/blog/memory-mcp-vs-alternatives'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCP Memory Server Comparison',
    description: 'memory-mcp vs mem0 vs Basic Memory vs Obsidian MCP.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['MCP Memory Servers Compared', '/blog/memory-mcp-vs-alternatives'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MCP Memory Servers Compared: memory-mcp vs Alternatives',
  description: 'Comprehensive comparison of MCP memory servers including memory-mcp, mem0, Basic Memory, and Obsidian MCP.',
  author: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  datePublished: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl('/blog/memory-mcp-vs-alternatives'),
  },
}

export default function MemoryMcpVsAlternativesLayout({
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
