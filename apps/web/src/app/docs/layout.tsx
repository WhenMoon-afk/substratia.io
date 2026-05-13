import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Documentation - Substratia | Memory Infrastructure for AI",
  description:
    "Learn how to use Substratia tools: momentum for context recovery and memory-mcp for persistent memory.",
  keywords: [
    "Substratia docs",
    "momentum documentation",
    "memory-mcp guide",
    "Claude Code plugins",
    "MCP server setup",
  ],
  openGraph: {
    title: "Substratia Documentation",
    description: "Learn how to use momentum and memory-mcp tools.",
    type: "website",
    url: siteUrl("/docs"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Substratia%20Documentation&subtitle=Learn%20momentum%20and%20memory-mcp",
        ),
        width: 1200,
        height: 630,
        alt: "Substratia Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Substratia Documentation",
    description: "Learn how to use momentum and memory-mcp.",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
    {
      "@type": "ListItem",
      position: 2,
      name: "Documentation",
      item: siteUrl("/docs"),
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Substratia Documentation",
  description:
    "Learn how to use Substratia tools: momentum for context recovery and memory-mcp for persistent memory.",
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
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/docs"),
  },
};

export default function DocsLayout({
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
