import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Memory Demo - Interactive AI Memory Visualization | Substratia',
  description: 'See how AI memory works in practice. Interactive demo of memory storage, retrieval, and context-aware recall for Claude and other AI coding assistants.',
  keywords: 'AI memory demo, Claude memory, AI context memory, memory MCP demo, AI coding assistant memory, interactive memory visualization',
  openGraph: {
    title: 'Memory Demo - Interactive AI Memory Visualization',
    description: 'See how AI memory works in practice. Interactive demo of memory storage, retrieval, and context-aware recall.',
    type: 'website',
    url: siteUrl('/tools/memory-demo'),
    images: [
      {
        url: siteUrl('/api/og?title=Memory%20Demo&subtitle=Interactive%20AI%20Memory%20Visualization'),
        width: 1200,
        height: 630,
        alt: 'Memory Demo - Interactive AI Memory Visualization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memory Demo - Interactive AI Memory Visualization',
    description: 'See how AI memory works in practice. Interactive demo of memory storage, retrieval, and context-aware recall.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Memory Demo',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Interactive demonstration of AI memory storage, retrieval, and context-aware recall.',
  url: siteUrl('/tools/memory-demo'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Memory Demo', '/tools/memory-demo'])

export default function MemoryDemoLayout({
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
