import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: "What's New in memory-mcp v2.5 | Substratia",
  description: 'Complete rewrite of memory-mcp: no more embeddings, no more pip - just npx and instant persistent memory.',
  keywords: ['memory-mcp', 'v2.5', 'MCP server', 'Claude memory', 'TypeScript'],
  openGraph: {
    title: "What's New in memory-mcp v2.5",
    description: 'Complete rewrite: no embeddings, just npx for instant persistent memory.',
    type: 'article',
    url: siteUrl('/blog/memory-mcp-v2-whats-new'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'memory-mcp v2.5 Release',
    description: 'Complete TypeScript rewrite with simpler setup.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['memory-mcp v2.5', '/blog/memory-mcp-v2-whats-new'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "What's New in memory-mcp v2.5: From Python to TypeScript",
  description: 'Complete rewrite of memory-mcp: no more embeddings, no more pip - just npx and instant persistent memory.',
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
    '@id': siteUrl('/blog/memory-mcp-v2-whats-new'),
  },
}

export default function MemoryMcpV2WhatsNewLayout({
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
