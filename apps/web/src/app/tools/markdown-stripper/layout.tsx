import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Markdown Stripper - Remove Formatting Instantly | Substratia',
  description: 'Free tool to strip markdown formatting from text. Paste markdown, get clean plain text instantly. No signup required.',
  keywords: 'markdown stripper, remove markdown, plain text converter, strip formatting, markdown to text, remove markdown formatting',
  openGraph: {
    title: 'Markdown Stripper - Remove Formatting Instantly',
    description: 'Free tool to strip markdown formatting from text. Paste markdown, get clean plain text instantly.',
    type: 'website',
    url: 'https://substratia.io/tools/markdown-stripper',
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
  url: 'https://substratia.io/tools/markdown-stripper',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Markdown Stripper', item: 'https://substratia.io/tools/markdown-stripper' },
  ],
}

export default function MarkdownStripperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
