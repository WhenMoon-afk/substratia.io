import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Start Here - Claude Code Getting Started Guide | Substratia',
  description: 'New to Claude Code? Start here. A curated learning path from beginner to power user with free tools, guides, and resources.',
  keywords: ['Claude Code tutorial', 'Claude Code getting started', 'Claude Code beginner', 'Claude Code guide', 'learn Claude Code'],
  openGraph: {
    title: 'Start Here - Claude Code Getting Started Guide',
    description: 'New to Claude Code? A curated learning path from beginner to power user.',
    type: 'website',
    url: siteUrl('/start-here'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Getting Started Guide',
    description: 'A curated learning path from beginner to power user.',
  },
}

const breadcrumbLd = breadcrumb(['Start Here', '/start-here'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: 'Claude Code Getting Started Guide',
  description: 'A curated learning path from beginner to power user with free tools, guides, and resources.',
  educationalLevel: 'Beginner',
  learningResourceType: 'Guide',
  provider: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  isAccessibleForFree: true,
  url: siteUrl('/start-here'),
}

export default function StartHereLayout({
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
