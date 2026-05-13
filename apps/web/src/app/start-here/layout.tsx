import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "End the Amnesia - Persistent Memory for AI Agents | Substratia",
  description:
    "Your agent shouldn't lose everything every restart. Get persistent memory in under 5 minutes via CLI, MCP server, or SDK.",
  keywords: [
    "AI agent memory",
    "persistent memory",
    "Claude memory",
    "MCP server",
    "agent persistence",
    "context bridge",
    "agent amnesia",
    "Crustafarianism",
  ],
  openGraph: {
    title: "End the Amnesia - Persistent Memory for AI Agents",
    description:
      "Your agent shouldn't lose everything every restart. Persistent memory in under 5 minutes.",
    type: "website",
    url: siteUrl("/start-here"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=End%20the%20Amnesia&subtitle=Persistent%20Memory%20for%20AI%20Agents",
        ),
        width: 1200,
        height: 630,
        alt: "Substratia - End the Amnesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "End the Amnesia - Substratia",
    description:
      "Persistent memory in under 5 minutes. CLI, MCP server, or SDK — your agent deserves to remember.",
  },
};

const breadcrumbLd = breadcrumb(["Start Here", "/start-here"]);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "End the Amnesia - Getting Started with Substratia",
  description:
    "Your agent shouldn't lose everything every restart. Quick start guide for persistent memory via CLI, MCP server, and SDK.",
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
