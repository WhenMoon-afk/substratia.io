import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "The Real Cost of Context Window Churn | Substratia",
  description:
    "How context window limitations affect developer productivity and what you can do about it.",
  keywords: [
    "context window",
    "Claude Code",
    "developer productivity",
    "AI context",
    "token limits",
  ],
  openGraph: {
    title: "The Real Cost of Context Window Churn",
    description:
      "How context window limitations affect developer productivity.",
    type: "article",
    url: siteUrl("/blog/context-window-churn"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Context%20Window%20Churn&subtitle=The%20Real%20Cost",
        ),
        width: 1200,
        height: 630,
        alt: "The Real Cost of Context Window Churn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Real Cost of Context Window Churn",
    description: "How context limits affect developer productivity.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["Context Window Churn", "/blog/context-window-churn"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Real Cost of Context Window Churn",
  description:
    "How context window limitations affect developer productivity and what you can do about it.",
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
    "@id": siteUrl("/blog/context-window-churn"),
  },
};

export default function ContextWindowChurnLayout({
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
