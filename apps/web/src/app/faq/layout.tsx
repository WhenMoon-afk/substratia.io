import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "FAQ - Memory Infrastructure for AI Agents | Substratia",
  description:
    "Frequently asked questions about Substratia, persistent AI memory, momentum, memory-mcp, and building agents that remember.",
  keywords: [
    "AI agent memory FAQ",
    "persistent memory FAQ",
    "momentum FAQ",
    "memory-mcp FAQ",
    "Substratia help",
  ],
  openGraph: {
    title: "FAQ - Memory Infrastructure for AI Agents",
    description:
      "Get answers about persistent memory for AI agents, momentum, memory-mcp, and more.",
    type: "website",
    url: siteUrl("/faq"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Substratia%20FAQ&subtitle=Memory%20Infrastructure%20for%20AI%20Agents",
        ),
        width: 1200,
        height: 630,
        alt: "FAQ - Memory Infrastructure for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Memory Infrastructure for AI Agents",
    description:
      "Answers about persistent memory for AI agents, momentum, and memory-mcp.",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
    { "@type": "ListItem", position: 2, name: "FAQ", item: siteUrl("/faq") },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Claude Code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Code is Anthropic's official CLI tool for AI-assisted software development. It allows developers to interact with Claude directly from the terminal to write, edit, and debug code.",
      },
    },
    {
      "@type": "Question",
      name: "What is momentum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "momentum is a free, open-source Claude Code plugin for fast context recovery. It takes snapshots of your work and can restore them in under 5 milliseconds after using /clear.",
      },
    },
    {
      "@type": "Question",
      name: "What is memory-mcp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "memory-mcp is a free, open-source MCP server that gives Claude persistent memory across sessions. It uses SQLite with FTS5 full-text search for efficient storage and retrieval.",
      },
    },
    {
      "@type": "Question",
      name: "Are these tools free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all tools (momentum, memory-mcp, and the web tools at substratia.io/tools) are completely free and open source under the MIT license.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit substratia.io/start-here for a beginner-friendly guide, or check out the cheat sheet at substratia.io/tools/cheat-sheet for a quick reference.",
      },
    },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      {children}
    </>
  );
}
