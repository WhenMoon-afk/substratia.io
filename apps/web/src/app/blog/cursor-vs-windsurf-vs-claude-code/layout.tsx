import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title:
    "Cursor vs Windsurf vs Claude Code: Which AI Coding Assistant Wins in 2026? | Substratia",
  description:
    "Honest comparison of Cursor, Windsurf, and Claude Code in 2026. Pricing, features, workflows, and which AI coding assistant fits your development style.",
  keywords: [
    "cursor vs windsurf vs claude code",
    "AI coding assistant comparison 2026",
    "cursor pricing",
    "windsurf pricing",
    "claude code pricing",
    "best AI coding assistant",
    "cursor vs claude code",
    "windsurf vs cursor",
  ],
  openGraph: {
    title: "Cursor vs Windsurf vs Claude Code (2026)",
    description:
      "Honest comparison of the three leading AI coding assistants. Pricing, features, and who each one is actually for.",
    type: "article",
    url: siteUrl("/blog/cursor-vs-windsurf-vs-claude-code"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Cursor%20vs%20Windsurf%20vs%20Claude%20Code&subtitle=2026%20Comparison",
        ),
        width: 1200,
        height: 630,
        alt: "Cursor vs Windsurf vs Claude Code Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursor vs Windsurf vs Claude Code (2026)",
    description:
      "Which AI coding assistant actually fits your workflow? Honest comparison.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  [
    "Cursor vs Windsurf vs Claude Code",
    "/blog/cursor-vs-windsurf-vs-claude-code",
  ],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Cursor vs Windsurf vs Claude Code: Which AI Coding Assistant Wins in 2026?",
  description:
    "Honest comparison of Cursor, Windsurf, and Claude Code. Pricing, features, workflows, and which AI coding assistant fits your development style.",
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
    "@id": siteUrl("/blog/cursor-vs-windsurf-vs-claude-code"),
  },
};

export default function CursorVsWindsurfVsClaudeCodeLayout({
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
