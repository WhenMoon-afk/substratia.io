import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";
import ToolsClientWrapper from "@/components/ToolsClientWrapper";

export const metadata: Metadata = {
  title:
    "Free AI Tools - Stack Builder, Claude Code Calculator, Prompt Optimizer | Substratia",
  description:
    "Free tools for developers: stack builder, Claude Code cost calculator, prompt optimizer, token counter, image/video prompt builders, markdown tools. No signup required.",
  keywords: [
    "stack builder",
    "tech stack selector",
    "Claude Code cost",
    "Claude Code prompts",
    "ultrathink",
    "token counter",
    "AI tools",
    "full stack builder",
    "web development stack",
  ],
  openGraph: {
    title: "Free AI Tools for Developers",
    description:
      "12 free tools for AI-assisted development. No signup required.",
    type: "website",
    url: siteUrl("/tools"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Free%20AI%20Tools&subtitle=Stack%20Builder%20Cost%20Calculator%20and%20More",
        ),
        width: 1200,
        height: 630,
        alt: "Free AI Tools for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Tools for Developers",
    description:
      "12 free tools: stack builder, cost calculator, prompt optimizer, and more.",
  },
};

const breadcrumbLd = breadcrumb(["Tools", "/tools"]);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free AI Tools for Developers",
  description:
    "Free tools for developers: stack builder, Claude Code cost calculator, prompt optimizer, token counter, and more.",
  url: siteUrl("/tools"),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Claude Code Cheat Sheet",
        url: siteUrl("/tools/cheat-sheet"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Claude Code Cost Calculator",
        url: siteUrl("/tools/cost-calculator"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Claude Code Prompt Optimizer",
        url: siteUrl("/tools/prompt-optimizer"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Stack Builder",
        url: siteUrl("/tools/stack-builder"),
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Token Counter",
        url: siteUrl("/tools/token-counter"),
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Prompt Library",
        url: siteUrl("/tools/prompts"),
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Seed Maker",
        url: siteUrl("/tools/seed-maker"),
      },
      {
        "@type": "ListItem",
        position: 8,
        name: "Image Prompt Generator",
        url: siteUrl("/tools/image-prompt-generator"),
      },
      {
        "@type": "ListItem",
        position: 9,
        name: "Video Prompt Timeline",
        url: siteUrl("/tools/video-prompt-timeline"),
      },
      {
        "@type": "ListItem",
        position: 10,
        name: "Markdown Preview",
        url: siteUrl("/tools/markdown-preview"),
      },
      {
        "@type": "ListItem",
        position: 11,
        name: "Markdown Stripper",
        url: siteUrl("/tools/markdown-stripper"),
      },
    ],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />
      <ToolsClientWrapper>{children}</ToolsClientWrapper>
    </>
  );
}
