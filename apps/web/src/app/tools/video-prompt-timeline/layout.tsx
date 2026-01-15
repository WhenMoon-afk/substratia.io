import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Prompt Timeline - AI Video Storyboard Builder | Substratia',
  description: 'Free visual storyboard tool for AI video generation. Build frame-by-frame prompts for Grok, Runway, Pika, Luma, and Kling. 7 keyframes, drag-and-drop moments, save favorites.',
  keywords: 'AI video prompt, video generation prompt, Grok video, Runway prompt, Pika Labs, Luma Dream Machine, Kling AI, video storyboard, keyframe prompts, scene builder',
  openGraph: {
    title: 'Video Prompt Timeline - Build AI Video Prompts Visually',
    description: 'Free tool to create video generation prompts. 7 keyframes at 5-second intervals, drag-and-drop moment library, platform-specific output. Works with Grok, Runway, Pika, Luma.',
    type: 'website',
    url: 'https://substratia.io/tools/video-prompt-timeline',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Video Prompt Timeline',
    description: 'Visual storyboard for Grok, Runway, Pika, Luma video generation.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Video Prompt Timeline',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free visual storyboard tool for AI video generation. 7 keyframes for Grok, Runway, Pika, Luma.',
  url: 'https://substratia.io/tools/video-prompt-timeline',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://substratia.io/tools' },
    { '@type': 'ListItem', position: 3, name: 'Video Prompt Timeline', item: 'https://substratia.io/tools/video-prompt-timeline' },
  ],
}

export default function VideoPromptTimelineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
