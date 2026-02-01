import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Seed Maker - High-Entropy Random String Generator | Substratia',
  description: 'Generate cryptographically strong random strings from mouse movements. 100% client-side, no data leaves your browser. Perfect for seeds, passwords, and API keys.',
  keywords: 'random string generator, entropy generator, password generator, seed generator, cryptographic random, secure random, client-side generator',
  openGraph: {
    title: 'Seed Maker - High-Entropy Random Generator',
    description: 'Generate cryptographically strong random strings from mouse movements. 100% client-side, private.',
    type: 'website',
    url: siteUrl('/tools/seed-maker'),
    images: [
      {
        url: siteUrl('/api/og?title=Seed%20Maker&subtitle=High-Entropy%20Random%20Generator'),
        width: 1200,
        height: 630,
        alt: 'Seed Maker',
      },
    ],
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
  url: siteUrl('/tools/seed-maker'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Seed Maker', '/tools/seed-maker'])

export default function SeedMakerLayout({
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
