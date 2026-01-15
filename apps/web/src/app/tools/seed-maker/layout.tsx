import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seed Maker - High-Entropy Random String Generator | Substratia',
  description: 'Generate cryptographically strong random strings from mouse movements. 100% client-side, no data leaves your browser. Perfect for seeds, passwords, and API keys.',
  keywords: 'random string generator, entropy generator, password generator, seed generator, cryptographic random, secure random, client-side generator',
  openGraph: {
    title: 'Seed Maker - High-Entropy Random Generator',
    description: 'Generate cryptographically strong random strings from mouse movements. 100% client-side, private.',
    type: 'website',
    url: 'https://substratia.io/tools/seed-maker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seed Maker - Random String Generator',
    description: 'Cryptographically strong random strings from mouse movements. 100% private.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Seed Maker',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Generate cryptographically strong random strings from mouse movements. 100% client-side.',
  url: 'https://substratia.io/tools/seed-maker',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Seed Maker', item: 'https://substratia.io/tools/seed-maker' },
  ],
}

export default function SeedMakerLayout({
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
