import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Memory Architecture Patterns for AI Assistants | Substratia',
  description: 'Explore different memory architecture patterns for building AI systems with persistent context.',
  keywords: ['memory architecture', 'AI memory', 'persistent context', 'Claude memory', 'MCP patterns'],
  openGraph: {
    title: 'Memory Architecture Patterns for AI',
    description: 'Memory architecture patterns for building AI with persistent context.',
    type: 'article',
    url: siteUrl('/blog/memory-architecture-patterns'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Architecture Patterns',
    description: 'Building AI systems with persistent context.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['Memory Architecture Patterns', '/blog/memory-architecture-patterns'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Memory Architecture Patterns for AI Assistants',
  description: 'Explore different memory architecture patterns for building AI systems with persistent context.',
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
    '@id': siteUrl('/blog/memory-architecture-patterns'),
  },
}

export default function MemoryArchitecturePatternsLayout({
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
