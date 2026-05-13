import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "What's New in memory-mcp v2.5 | Substratia",
  description:
    "Complete rewrite of memory-mcp: no more embeddings, no more pip - just npx and instant persistent memory.",
  keywords: ["memory-mcp", "v2.5", "MCP server", "Claude memory", "TypeScript"],
  openGraph: {
    title: "What's New in memory-mcp v2.5",
    description:
      "Complete rewrite: no embeddings, just npx for instant persistent memory.",
    type: "article",
    url: siteUrl("/blog/memory-mcp-v2-whats-new"),
    images: [
      {
        url: siteUrl("/api/og?title=memory-mcp%20v2.5&subtitle=What%27s%20New"),
        width: 1200,
        height: 630,
        alt: "What's New in memory-mcp v2.5",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "memory-mcp v2.5 Release",
    description: "Complete TypeScript rewrite with simpler setup.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["memory-mcp v2.5", "/blog/memory-mcp-v2-whats-new"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What's New in memory-mcp v2.5: From Python to TypeScript",
  description:
    "Complete rewrite of memory-mcp: no more embeddings, no more pip - just npx and instant persistent memory.",
  author: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  datePublished: "2026-01-11",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/blog/memory-mcp-v2-whats-new"),
  },
};

export default function MemoryMcpV2WhatsNewLayout({
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
