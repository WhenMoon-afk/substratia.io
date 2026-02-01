import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Markdown Stripper - Remove Formatting Instantly | Substratia',
  description: 'Free tool to strip markdown formatting from text. Paste markdown, get clean plain text instantly. No signup required.',
  keywords: 'markdown stripper, remove markdown, plain text converter, strip formatting, markdown to text, remove markdown formatting',
  openGraph: {
    title: 'Markdown Stripper - Remove Formatting Instantly',
    description: 'Free tool to strip markdown formatting from text. Paste markdown, get clean plain text instantly.',
    type: 'website',
    url: siteUrl('/tools/markdown-stripper'),
    images: [
      {
        url: siteUrl('/api/og?title=Markdown%20Stripper&subtitle=Remove%20Formatting%20Instantly'),
        width: 1200,
        height: 630,
        alt: 'Markdown Stripper',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Stripper',
    description: 'Strip markdown formatting instantly. Paste markdown, get plain text.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Markdown Stripper',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free tool to strip markdown formatting from text. Get clean plain text instantly.',
  url: siteUrl('/tools/markdown-stripper'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Markdown Stripper', '/tools/markdown-stripper'])

export default function MarkdownStripperLayout({
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
