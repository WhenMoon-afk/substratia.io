import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Stack Builder - Full-Stack Tech Selector | Substratia',
  description: 'Build your perfect tech stack. Visual full-stack technology selector with compatibility checks, export to CSV/JSON, and AI analysis prompt generation.',
  keywords: 'tech stack builder, full stack selector, React vs Vue, database comparison, web development stack, technology selector, stack comparison',
  openGraph: {
    title: 'Stack Builder - Full-Stack Tech Selector',
    description: 'Build your perfect tech stack with compatibility checks and AI analysis export.',
    type: 'website',
    url: siteUrl('/tools/stack-builder'),
    images: [
      {
        url: siteUrl('/api/og?title=Stack%20Builder&subtitle=Full-Stack%20Tech%20Selector'),
        width: 1200,
        height: 630,
        alt: 'Stack Builder',
      },
    ],
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
  url: siteUrl('/tools/stack-builder'),
}

const breadcrumbLd = breadcrumb(['Tools', '/tools'], ['Stack Builder', '/tools/stack-builder'])

export default function StackBuilderLayout({
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
