import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stack Builder - Full-Stack Tech Selector | Substratia',
  description: 'Build your perfect tech stack. Visual full-stack technology selector with compatibility checks, export to CSV/JSON, and AI analysis prompt generation.',
  keywords: 'tech stack builder, full stack selector, React vs Vue, database comparison, web development stack, technology selector, stack comparison',
  openGraph: {
    title: 'Stack Builder - Full-Stack Tech Selector',
    description: 'Build your perfect tech stack with compatibility checks and AI analysis export.',
    type: 'website',
    url: 'https://substratia.io/tools/stack-builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stack Builder - Full-Stack Tech Selector',
    description: 'Visual tech stack builder with compatibility checks and AI analysis.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Stack Builder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Build your perfect tech stack with visual selector, compatibility checks, and AI analysis export.',
  url: 'https://substratia.io/tools/stack-builder',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Stack Builder', item: 'https://substratia.io/tools/stack-builder' },
  ],
}

export default function StackBuilderLayout({
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
