import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Blog - Substratia | AI Memory Tools & Agent Building",
  description:
    "Tutorials, comparisons, and best practices for AI memory tools, MCP servers, and agent configuration.",
  keywords: [
    "MCP memory server",
    "Claude memory",
    "AI agents",
    "CLAUDE.md",
    "prompt engineering",
    "memory-mcp",
    "Claude Code",
  ],
  openGraph: {
    title: "Substratia Blog - AI Memory Tools & Agent Building",
    description:
      "Tutorials, tips, and best practices for building AI agents with Claude Code.",
    type: "website",
    url: siteUrl("/blog"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Substratia%20Blog&subtitle=AI%20Memory%20Tools%20and%20Agent%20Building",
        ),
        width: 1200,
        height: 630,
        alt: "Substratia Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Substratia Blog",
    description:
      "Tutorials and best practices for AI memory tools and Claude Code.",
  },
};

const breadcrumbLd = breadcrumb(["Blog", "/blog"]);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Substratia Blog",
  description:
    "Tutorials, comparisons, and best practices for AI memory tools, MCP servers, and agent configuration.",
  url: siteUrl("/blog"),
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />
      {children}
    </>
  );
}
