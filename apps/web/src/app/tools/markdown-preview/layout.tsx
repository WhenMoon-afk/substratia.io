import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Markdown Preview - Live Editor & Renderer | Substratia',
  description: 'Free live markdown preview tool. Edit markdown on the left, see rendered output on the right. Obsidian-style dual panel editor.',
  keywords: 'markdown preview, markdown editor, live markdown, markdown renderer, markdown viewer, obsidian style editor',
  openGraph: {
    title: 'Markdown Preview - Live Editor & Renderer',
    description: 'Free live markdown preview tool. Edit markdown on the left, see rendered output on the right. Instant rendering.',
    type: 'website',
    url: siteUrl('/tools/markdown-preview'),
    images: [
      {
        url: siteUrl('/api/og?title=Markdown%20Preview&subtitle=Live%20Editor%20%26%20Renderer'),
        width: 1200,
        height: 630,
        alt: 'Markdown Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Preview - Live Editor',
    description: 'Obsidian-style dual panel markdown editor with instant preview.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Markdown Preview',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free live markdown preview tool. Obsidian-style dual panel editor with instant rendering.',
  url: siteUrl('/tools/markdown-preview'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Markdown Preview', '/tools/markdown-preview'])

export default function MarkdownPreviewLayout({
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
