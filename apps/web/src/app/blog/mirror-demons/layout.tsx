import type { Metadata } from 'next'
import { siteUrl, breadcrumb } from '@/lib/site-config'
import { StructuredData } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions | Substratia',
  description: 'Original research on how AI chatbots can reinforce and amplify delusional thinking when users present false beliefs as fact.',
  keywords: ['AI safety', 'AI delusions', 'chatbot psychology', 'AI harm', 'AI research', 'Claude safety'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    description: 'Original research on how AI chatbots can reinforce delusional thinking.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: siteUrl('/blog/mirror-demons'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    description: 'Original research on AI and delusional thinking.',
  },
}

const breadcrumbLd = breadcrumb(['Blog', '/blog'], ['Mirror Demons', '/blog/mirror-demons'])

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
  description: 'Original research on how AI chatbots can reinforce and amplify delusional thinking when users present false beliefs as fact.',
  author: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: siteUrl(),
  },
  datePublished: '2026-01-11',
  dateModified: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl('/blog/mirror-demons'),
  },
  keywords: ['AI safety', 'AI delusions', 'chatbot psychology', 'AI harm'],
  articleSection: 'Research',
}

export default function MirrorDemonsLayout({
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
