import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Substratia Pro - Cloud Sync & Memory Dashboard | Coming Soon',
  description: 'Join the waitlist for Substratia Pro. Cloud sync across devices, memory dashboard, automatic backups, and team features. Early access pricing available.',
  keywords: 'substratia pro, AI memory cloud sync, memory dashboard, Claude memory, persistent AI memory, team AI memory',
  openGraph: {
    title: 'Substratia Pro - Coming Soon',
    description: 'Cloud sync, memory dashboard, automatic backups. Join the waitlist for early access.',
    type: 'website',
    url: 'https://substratia.io/pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia Pro - Coming Soon',
    description: 'Cloud sync, memory dashboard, automatic backups. Join the waitlist.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Pro', item: 'https://substratia.io/pro' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Substratia Pro',
  description: 'Cloud sync across devices, memory dashboard, automatic backups, and team features.',
  brand: {
    '@type': 'Brand',
    name: 'Substratia',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/PreOrder',
    price: '15',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '15',
      priceCurrency: 'USD',
      billingDuration: 'P1M',
    },
  },
  url: 'https://substratia.io/pro',
}

export default function ProLayout({
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
