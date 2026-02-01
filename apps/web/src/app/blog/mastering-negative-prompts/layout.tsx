import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Mastering Negative Prompts for AI | Substratia',
  description: 'Learn how to use negative prompts effectively to improve AI output quality and avoid common pitfalls.',
  keywords: ['negative prompts', 'AI prompts', 'prompt engineering', 'Claude Code', 'AI quality'],
  openGraph: {
    title: 'Mastering Negative Prompts for AI',
    description: 'Use negative prompts to improve AI output quality.',
    type: 'article',
    url: siteUrl('/blog/mastering-negative-prompts'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mastering Negative Prompts',
    description: 'Improve AI output quality with negative prompts.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['Mastering Negative Prompts', '/blog/mastering-negative-prompts'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mastering Negative Prompts for AI',
  description: 'Learn how to use negative prompts effectively to improve AI output quality and avoid common pitfalls.',
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
    '@id': siteUrl('/blog/mastering-negative-prompts'),
  },
}

export default function MasteringNegativePromptsLayout({
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
