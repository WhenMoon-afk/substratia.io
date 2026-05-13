import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site-config";
import { blogPosts } from "@/lib/blog-data";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRSS(): string {
  const items = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${escapeXml(SITE_URL)}/blog/${escapeXml(post.slug)}/</link>
      <guid isPermaLink="true">${escapeXml(SITE_URL)}/blog/${escapeXml(post.slug)}/</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.tags[0] ?? "Blog")}</category>
    </item>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Substratia Blog</title>
    <link>${escapeXml(SITE_URL)}/blog</link>
    <description>Tutorials, comparisons, and best practices for AI developer tools, MCP servers, and agent configuration.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(SITE_URL)}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  const feed = generateRSS();

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
