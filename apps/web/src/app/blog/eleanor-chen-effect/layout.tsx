import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story | Substratia',
  description: 'Original research on why LLMs converge on remarkably similar narratives and characters. 70% of AI-generated stories about AI and grief feature Eleanor Chen variants.',
  keywords: ['AI creativity', 'LLM convergence', 'AI narratives', 'Eleanor Chen', 'AI research', 'AI determinism'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
    description: 'Why do LLMs create the same characters? Our research reveals patterns in AI-generated narratives.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: siteUrl('/blog/eleanor-chen-effect'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
    description: 'Why do LLMs create the same characters?',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['Eleanor Chen Effect', '/blog/eleanor-chen-effect'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Eleanor Chen Effect: Why AI Keeps Writing the Same Story',
  description: 'Original research on why LLMs converge on remarkably similar narratives and characters. 70% of AI-generated stories about AI and grief feature Eleanor Chen variants.',
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
    '@id': siteUrl('/blog/eleanor-chen-effect'),
  },
  keywords: ['AI creativity', 'LLM convergence', 'AI narratives', 'Eleanor Chen effect'],
  articleSection: 'Research',
}

export default function EleanorChenLayout({
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
