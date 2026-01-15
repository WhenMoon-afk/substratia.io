import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials - Claude Code Consulting Success Stories | Substratia',
  description: 'See how teams and developers have improved their Claude Code workflows with our consulting services. Real results from real users.',
  keywords: ['Claude Code consulting', 'testimonials', 'case studies', 'AI consulting results', 'Claude Code training'],
  openGraph: {
    title: 'Claude Code Consulting Testimonials',
    description: 'Real results from developers and teams who improved their Claude Code workflows.',
    type: 'website',
    url: 'https://substratia.io/testimonials',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Consulting Testimonials',
    description: 'Success stories from Claude Code consulting clients.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Testimonials', item: 'https://substratia.io/testimonials' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Claude Code Consulting Testimonials',
  description: 'Success stories from developers and teams who improved their Claude Code workflows.',
  url: 'https://substratia.io/testimonials',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Client Success Stories',
    description: 'Testimonials from Claude Code consulting clients.',
  },
}

export default function TestimonialsLayout({
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
