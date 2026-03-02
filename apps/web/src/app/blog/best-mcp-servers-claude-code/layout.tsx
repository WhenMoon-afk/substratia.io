import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title:
    "Best MCP Servers for Claude Code in 2026: The Complete Guide | Substratia",
  description:
    "The best MCP servers for Claude Code in 2026. Memory, dev tools, databases, web automation, and productivity servers with install commands and honest reviews.",
  keywords: [
    "best mcp servers claude code",
    "mcp servers 2026",
    "claude code mcp setup",
    "model context protocol servers",
    "mcp memory server",
    "claude code extensions",
    "mcp server install",
    "claude code tools",
  ],
  openGraph: {
    title: "Best MCP Servers for Claude Code (2026)",
    description:
      "The definitive guide to MCP servers that actually matter. Memory, dev tools, databases, and more — with install commands.",
    type: "article",
    url: siteUrl("/blog/best-mcp-servers-claude-code"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Best%20MCP%20Servers%20for%20Claude%20Code&subtitle=2026%20Guide",
        ),
        width: 1200,
        height: 630,
        alt: "Best MCP Servers for Claude Code 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best MCP Servers for Claude Code (2026)",
    description:
      "The MCP servers that actually matter for Claude Code. Install commands, use cases, and honest reviews.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["Best MCP Servers for Claude Code", "/blog/best-mcp-servers-claude-code"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best MCP Servers for Claude Code in 2026: The Complete Guide",
  description:
    "The best MCP servers for Claude Code in 2026. Memory, dev tools, databases, web automation, and productivity servers with install commands and honest reviews.",
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
  datePublished: "2026-03-01",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/blog/best-mcp-servers-claude-code"),
  },
};

export default function BestMcpServersLayout({
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
