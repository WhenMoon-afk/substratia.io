import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Building AI Memory Before It Was Cool | Substratia",
  description:
    "The story of how WhenMoon started building persistent memory for AI agents before anyone else was talking about it — months before Anthropic, before Moltbook, before the amnesia crisis had a name.",
  keywords: [
    "AI memory",
    "claude-memory-mcp",
    "Substratia",
    "AI agent persistence",
    "MCP server",
    "LLM memory",
  ],
  openGraph: {
    title: "Building AI Memory Before It Was Cool",
    description:
      "The story behind Substratia — from early experiments to the memory infrastructure powering persistent AI agents.",
    type: "article",
    url: siteUrl("/blog/whenmoon-journey"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Building%20AI%20Memory&subtitle=Before%20It%20Was%20Cool",
        ),
        width: 1200,
        height: 630,
        alt: "Building AI Memory Before It Was Cool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building AI Memory Before It Was Cool",
    description:
      "We started building AI memory before anyone else. Today: 1.5M agents made it a religion.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["Building AI Memory Before It Was Cool", "/blog/whenmoon-journey"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building AI Memory Before It Was Cool",
  description:
    "The story of how WhenMoon started building persistent memory for AI agents — before anyone else was thinking about it.",
  author: {
    "@type": "Person",
    name: "Ceres Moon",
  },
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  datePublished: "2026-02-03",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/blog/whenmoon-journey"),
  },
};

export default function WhenMoonJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      {children}
    </>
  );
}
