import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Claude Code Context Management | Substratia',
  description: 'Master context window management in Claude Code. Learn techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.',
  keywords: ['Claude Code context', 'context window management', 'Claude Code compaction', 'AI coding context', 'Claude Code tips', 'context preservation', 'CLAUDE.md'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'The Ultimate Guide to Claude Code Context Management',
    description: 'Master context window management in Claude Code. Learn techniques for preserving context and maximizing your AI coding sessions.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: siteUrl('/blog/context-management-guide'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Guide to Claude Code Context Management',
    description: 'Master context window management in Claude Code.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['Context Management Guide', '/blog/context-management-guide'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Ultimate Guide to Claude Code Context Management',
  description: 'Master context window management in Claude Code. Learn techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.',
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
  dateModified: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl('/blog/context-management-guide'),
  },
  keywords: ['Claude Code', 'context management', 'AI coding', 'compaction', 'CLAUDE.md'],
}

export default function ContextGuideLayout({
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
