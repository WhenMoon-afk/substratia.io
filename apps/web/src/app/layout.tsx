import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
    { media: '(prefers-color-scheme: light)', color: '#1a1a2e' },
  ],
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: '/brand/logo-icon.png',
    apple: '/brand/logo-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Substratia',
  },
  title: 'Substratia - Open-Source Developer Tools for Claude Code',
  description: 'Free, open-source tools for Claude Code power users. memory-mcp: persistent memory across sessions. Plus 12+ free dev utilities.',
  keywords: 'Claude Code tools, open source AI tools, memory-mcp, CLAUDE.md, AI developer tools, Claude Code plugins, MCP server, persistent AI memory',
  openGraph: {
    title: 'Substratia - Open-Source Developer Tools for Claude Code',
    description: 'Free tools for Claude Code: memory-mcp (persistent memory), dev utilities, and more. Open source, MIT licensed.',
    type: 'website',
    url: 'https://substratia.io',
    images: [
      {
        url: 'https://substratia.io/brand/social.png',
        width: 1200,
        height: 630,
        alt: 'Substratia - Open-Source Developer Tools for Claude Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia - Open-Source Developer Tools for Claude Code',
    description: 'Free tools for Claude Code power users: persistent memory, visual agent config, dev utilities. Open source, MIT licensed.',
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
  description: 'Open-source developer tools for Claude Code — persistent memory, visual agent config, and free dev utilities',
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
  description: 'Open-source developer tools for Claude Code. Free: memory-mcp, dev utilities, and more.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external links */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://formspree.io" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        {/* Plausible Analytics - privacy-friendly, no cookies, GDPR compliant */}
        <Script
          defer
          data-domain="substratia.io"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
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
      <body className="antialiased bg-forge-dark text-white">
        <ThemeProvider>
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            dynamic
          >
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Nav />
            <main id="main-content">
              {children}
            </main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
