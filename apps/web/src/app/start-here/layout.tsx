import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Start Here - Give Your AI Agent Memory | Substratia",
  description:
    "Get started with Substratia in under 5 minutes. Add persistent memory to your AI agent via CLI, MCP server, or SDK.",
  keywords: [
    "AI agent memory",
    "persistent memory",
    "Claude memory",
    "MCP server",
    "agent persistence",
    "context bridge",
  ],
  openGraph: {
    title: "Start Here - Give Your AI Agent Memory",
    description:
      "Get started with Substratia in under 5 minutes. Add persistent memory to your AI agent.",
    type: "website",
    url: siteUrl("/start-here"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Give Your AI Agent Memory - Substratia",
    description:
      "Get started in under 5 minutes. CLI, MCP server, or SDK - your choice.",
  },
};

const breadcrumbLd = breadcrumb(["Start Here", "/start-here"]);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Give Your AI Agent Memory - Getting Started Guide",
  description:
    "Quick start guide for adding persistent memory to AI agents. Covers CLI, MCP server, and SDK integration options.",
  educationalLevel: "Beginner",
  learningResourceType: "Guide",
  provider: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  isAccessibleForFree: true,
  url: siteUrl("/start-here"),
};

export default function StartHereLayout({
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
