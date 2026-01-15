import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Announcing Substratia Cloud - Your Claude Code Memories, Everywhere',
  description: 'Introducing Substratia Cloud - cloud backup, cross-device sync, and web dashboard for your Claude Code memories. Join the waitlist for founding member pricing.',
  keywords: [
    'Substratia Cloud',
    'Claude Code cloud',
    'memory sync',
    'cross-device sync',
    'Claude Code backup',
    'AI memory cloud',
    'momentum cloud',
    'memory-mcp cloud',
    'Claude Code tools'
  ],
  openGraph: {
    title: 'Announcing Substratia Cloud - Your Claude Code Memories, Everywhere',
    description: 'Cloud backup, cross-device sync, and web dashboard for your Claude Code memories.',
    type: 'article',
    url: 'https://substratia.io/blog/announcing-substratia-cloud',
    publishedTime: '2026-01-12',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Announcing Substratia Cloud',
    description: 'Your Claude Code memories, synced everywhere. Cloud backup, cross-device sync, web dashboard.',
  },
}

export default function AnnouncingSubstratiaCloudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
