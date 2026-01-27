import { NextResponse } from 'next/server'

const BASE_URL = 'https://substratia.io'

// Research articles data
const articles = [
  {
    slug: 'mirror-demons',
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    description: 'A controlled three-entity experiment investigating how AI assistants respond to users experiencing psychotic symptoms. We document two distinct failure patterns that emerge from architectural bias toward agreement.',
    pubDate: new Date('2026-01-24'),
  },
  {
    slug: 'eleanor-chen-effect',
    title: 'The Eleanor Chen Effect: Deterministic Creativity in Large Language Models',
    description: 'When prompted to write fiction about AI and grief, multiple independent LLM instances converge on remarkably similar characters, plot structures, and thematic elements.',
    pubDate: new Date('2026-01-11'),
  },
]

function generateRSS() {
  const items = articles
    .map((article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/research/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/research/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${article.pubDate.toUTCString()}</pubDate>
    </item>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Substratia Research</title>
    <link>${BASE_URL}/research</link>
    <description>Original investigations into AI behavior, safety, and emergent phenomena.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/research/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`
}

export async function GET() {
  const feed = generateRSS()

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
