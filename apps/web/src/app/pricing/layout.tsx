import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Substratia',
  description: 'Free open-source memory tools. Pro tier with cloud sync, dashboard, and team features starting at $15/month.',
  keywords: ['Substratia pricing', 'AI memory tools pricing', 'momentum free', 'memory-mcp free', 'Substratia Pro'],
  openGraph: {
    title: 'Substratia Pricing',
    description: 'Free open-source tools. Pro tier starting at $15/month.',
    type: 'website',
    url: 'https://substratia.io/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia Pricing',
    description: 'Free tools. Pro tier from $15/month.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://substratia.io/pricing' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Substratia Memory Tools',
  description: 'Memory infrastructure for AI. Free open-source tools with optional Pro tier.',
  brand: {
    '@type': 'Brand',
    name: 'Substratia',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Tier',
      price: '0',
      priceCurrency: 'USD',
      description: 'Open-source tools: momentum, memory-mcp, AgentForge',
    },
    {
      '@type': 'Offer',
      name: 'Pro Tier',
      price: '15',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '15',
        priceCurrency: 'USD',
        billingDuration: 'P1M',
      },
      description: 'Cloud sync, memory dashboard, automatic backups',
    },
  ],
  url: 'https://substratia.io/pricing',
}

export default function PricingLayout({
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
