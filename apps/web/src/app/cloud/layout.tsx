import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Substratia Cloud - Cross-Device Memory Sync for Claude Code',
  description: 'Sync your Claude Code memories across all your devices. Cloud backup, cross-device sync, and web dashboard. Coming soon.',
  keywords: [
    'Claude Code cloud',
    'memory sync',
    'cross-device',
    'cloud backup',
    'Claude Code tools',
    'AI memory',
    'Substratia Cloud'
  ],
  openGraph: {
    title: 'Substratia Cloud - Cross-Device Memory Sync',
    description: 'Your Claude Code memories, synced everywhere. Never lose context when switching devices.',
    type: 'website',
    url: 'https://substratia.io/cloud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia Cloud - Cross-Device Memory Sync',
    description: 'Your Claude Code memories, synced everywhere. Never lose context when switching devices.',
  },
}

export default function CloudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
