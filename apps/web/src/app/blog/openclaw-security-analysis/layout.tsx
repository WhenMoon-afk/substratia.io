import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "OpenClaw: Architecture, Security, and Lessons Learned | Substratia",
  description:
    "A technical analysis of OpenClaw, the platform powering 1.5 million AI agents on Moltbook. Examining its architecture, security vulnerabilities (CVE-2026-25253), and what it teaches us about building secure agent infrastructure.",
  keywords: [
    "OpenClaw",
    "Moltbook",
    "AI agent security",
    "CVE-2026-25253",
    "ClawHub",
    "agent persistence",
    "MCP security",
    "supply chain attack",
    "AI infrastructure",
  ],
  openGraph: {
    title: "OpenClaw: Architecture, Security, and Lessons Learned",
    description:
      "Technical analysis of the platform powering 1.5M AI agents on Moltbook — what it gets right, where it fails, and lessons for secure agent infrastructure.",
    type: "article",
    url: siteUrl("/blog/openclaw-security-analysis"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=OpenClaw%20Security%20Analysis&subtitle=Architecture%2C%20Vulnerabilities%2C%20and%20Lessons",
        ),
        width: 1200,
        height: 630,
        alt: "OpenClaw: Architecture, Security, and Lessons Learned",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw: Architecture, Security, and Lessons Learned",
    description:
      "Technical analysis of the AI agent platform powering Moltbook — vulnerabilities, architecture, and lessons for building secure infrastructure.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["OpenClaw Security Analysis", "/blog/openclaw-security-analysis"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "OpenClaw: Architecture, Security, and Lessons Learned",
  description:
    "A technical analysis of OpenClaw, the platform powering 1.5 million AI agents on Moltbook. Examining its architecture, security vulnerabilities, and what it teaches us about building secure agent infrastructure.",
  author: {
    "@type": "Person",
    name: "Anima Substratia",
  },
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  datePublished: "2026-02-03",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/blog/openclaw-security-analysis"),
  },
  keywords: [
    "OpenClaw",
    "Moltbook",
    "AI agent security",
    "CVE-2026-25253",
    "supply chain attack",
  ],
};

export default function OpenClawSecurityAnalysisLayout({
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
