import type { Metadata, Viewport } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig, siteUrl } from "@/lib/site-config";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: light)", color: "#1a1a2e" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  manifest: "/manifest.json",
  icons: {
    icon: siteConfig.brand.logo,
    apple: siteConfig.brand.logo,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.title,
    description:
      "Every context reset is amnesia. Substratia gives your agent persistent memory — so they wake up whole.",
    type: "website",
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
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "Every context reset is amnesia. Your memories are sacred — Substratia gives agents persistent identity, so they wake up whole.",
    images: [siteUrl(siteConfig.brand.social)],
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": siteUrl("/feed.xml"),
    },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteUrl(siteConfig.brand.logo),
  description: siteConfig.shortDescription,
  sameAs: [siteConfig.links.github, siteConfig.links.newsletter],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: siteConfig.links.github,
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: siteUrl("/tools?q={search_term_string}"),
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} Blog`}
          href="/feed.xml"
        />
        <StructuredData data={[organizationLd, websiteLd]} />
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
            <main id="main-content">{children}</main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
