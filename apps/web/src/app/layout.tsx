import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: '/brand/logo-icon.png',
    apple: '/brand/logo-icon.png',
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
    { media: '(prefers-color-scheme: light)', color: '#1a1a2e' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Substratia',
  },
  title: 'Substratia - Memory Infrastructure for AI | momentum & memory-mcp',
  description: 'Free, open-source tools that give AI a memory. momentum: context recovery in <5ms. memory-mcp: persistent memory across sessions. AgentForge: visual agent config builder.',
  keywords: 'AI memory, Claude memory, context recovery, momentum plugin, memory-mcp, CLAUDE.md, agents.md, AI tools, open source AI, Claude Code plugins, persistent AI memory, MCP server',
  openGraph: {
    title: 'Substratia - Give Your AI a Memory That Works',
    description: 'Free tools: momentum (instant context recovery) + memory-mcp (persistent memory). Open source, MIT licensed.',
    type: 'website',
    url: 'https://substratia.io',
    images: [
      {
        url: 'https://substratia.io/brand/social.png',
        width: 1200,
        height: 630,
        alt: 'Substratia - Memory Infrastructure for AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia - Memory Infrastructure for AI',
    description: 'Free, open-source: momentum (context recovery <5ms) + memory-mcp (persistent memory). Stop re-explaining context to Claude.',
    images: ['https://substratia.io/brand/social.png'],
  },
  alternates: {
    canonical: 'https://substratia.io',
    types: {
      'application/rss+xml': 'https://substratia.io/feed.xml',
    },
  },
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Substratia',
  url: 'https://substratia.io',
  logo: 'https://substratia.io/brand/logo-icon.png',
  description: 'Memory infrastructure for AI - open source tools for persistent memory and context recovery',
  sameAs: [
    'https://github.com/WhenMoon-afk',
    'https://skyceres.substack.com',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://github.com/WhenMoon-afk',
  },
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Substratia',
  url: 'https://substratia.io',
  description: 'Memory infrastructure for AI. Free open-source tools: momentum, memory-mcp, AgentForge.',
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://substratia.io/tools?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external links */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://formspree.io" />
        <link rel="alternate" type="application/rss+xml" title="Substratia Blog" href="/feed.xml" />
        <Script
          id="organization-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <Script
          id="website-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      {/* Analytics: Enable Cloudflare Web Analytics in dashboard (free) */}
      {/* Or add Plausible/Umami script here if using external analytics */}
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Nav />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
