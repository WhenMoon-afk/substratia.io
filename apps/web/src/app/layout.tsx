import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { siteConfig, siteUrl } from '@/lib/site-config'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
    { media: '(prefers-color-scheme: light)', color: '#1a1a2e' },
  ],
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: siteConfig.brand.logo,
    apple: siteConfig.brand.logo,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
  },
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.title,
    description: 'Free tools for Claude Code: memory-mcp (persistent memory), dev utilities, and more. Open source, MIT licensed.',
    type: 'website',
    url: siteConfig.url,
    images: [
      {
        url: siteUrl(siteConfig.brand.social),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: 'Free tools for Claude Code power users: persistent memory, visual agent config, dev utilities. Open source, MIT licensed.',
    images: [siteUrl(siteConfig.brand.social)],
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': siteUrl('/feed.xml'),
    },
  },
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteUrl(siteConfig.brand.logo),
  description: siteConfig.shortDescription,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.newsletter,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: siteConfig.links.github,
  },
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: 'Open-source developer tools for Claude Code. Free: memory-mcp, dev utilities, and more.',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: siteUrl('/tools?q={search_term_string}'),
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
        <link rel="dns-prefetch" href={siteConfig.links.newsletter} />
        <link rel="dns-prefetch" href="https://plausible.io" />
        {/* Plausible Analytics - privacy-friendly, no cookies, GDPR compliant */}
        <Script
          defer
          data-domain={siteConfig.analytics.plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} Blog`} href="/feed.xml" />
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
