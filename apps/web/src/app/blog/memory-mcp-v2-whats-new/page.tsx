import Link from 'next/link'
import type { Metadata } from 'next'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'What\'s New in memory-mcp v2.5: From Python to TypeScript | Substratia',
  description: 'memory-mcp has been completely rewritten from Python to TypeScript with SQLite. No more embeddings, no more pip - just npx and instant persistent memory for Claude.',
  keywords: 'memory-mcp, claude memory, MCP server, TypeScript, SQLite, FTS5, persistent memory, claude-memory-mcp upgrade',
}

export default function BlogPost() {
  return (
    <main className="min-h-screen text-white">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Back link */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/blog" className="text-forge-cyan hover:underline">
            &larr; Back to Blog
          </Link>
          <ShareButton title="What's New in memory-mcp v2.5: From Python to TypeScript" />
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              Release
            </span>
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              memory-mcp
            </span>
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              v2.5
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What&apos;s New in memory-mcp v2.5: From Python to TypeScript
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span>January 11, 2026</span>
            <span>6 min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            If you found memory-mcp through an older article talking about Python, sentence transformers,
            and vector similarity search - that&apos;s the old version. Here&apos;s what changed and why.
          </p>

          <div className="bg-forge-cyan/10 border border-forge-cyan/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-forge-cyan mb-2">TL;DR</h3>
            <p className="text-gray-300 mb-0">
              memory-mcp v2.5 is a complete rewrite: Python → TypeScript, embeddings → FTS5,
              pip → npx. It&apos;s simpler, faster, and has zero external dependencies.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Old Version (Pre-v2.0)
          </h2>
          <p className="text-gray-300 mb-4">
            The original memory-mcp was built in Python with:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Sentence transformers for embeddings</li>
            <li>Vector similarity search</li>
            <li>Python 3.8-3.12 required</li>
            <li>pip install workflow</li>
            <li>Heavy dependencies (PyTorch, transformers)</li>
          </ul>
          <p className="text-gray-300 mb-4">
            It worked, but had problems: slow startup, large memory footprint, complex installation,
            and embedding models that needed downloading.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The New Version (v2.5)
          </h2>
          <p className="text-gray-300 mb-4">
            We completely rewrote memory-mcp with a different philosophy: <strong>simplicity over features</strong>.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-2">Aspect</th>
                  <th className="text-left py-3 px-2">Old (Python)</th>
                  <th className="text-left py-3 px-2">New (v2.5)</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Language</td>
                  <td className="py-3 px-2">Python 3.8+</td>
                  <td className="py-3 px-2 text-forge-cyan">TypeScript</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Search</td>
                  <td className="py-3 px-2">Vector embeddings</td>
                  <td className="py-3 px-2 text-forge-cyan">FTS5 full-text</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Storage</td>
                  <td className="py-3 px-2">JSON files</td>
                  <td className="py-3 px-2 text-forge-cyan">SQLite</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Install</td>
                  <td className="py-3 px-2">pip + requirements</td>
                  <td className="py-3 px-2 text-forge-cyan">npx (one command)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Dependencies</td>
                  <td className="py-3 px-2">PyTorch, transformers</td>
                  <td className="py-3 px-2 text-forge-cyan">MCP SDK + better-sqlite3</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Startup</td>
                  <td className="py-3 px-2">30+ seconds</td>
                  <td className="py-3 px-2 text-forge-cyan">&lt;1 second</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Embedding model</td>
                  <td className="py-3 px-2">Required (500MB+)</td>
                  <td className="py-3 px-2 text-forge-cyan">None needed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Why We Dropped Embeddings
          </h2>
          <p className="text-gray-300 mb-4">
            Embeddings are powerful but overkill for most memory use cases. Here&apos;s why:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><strong>Memory isn&apos;t search.</strong> You&apos;re not searching millions of documents - you&apos;re recalling dozens to hundreds of memories.</li>
            <li><strong>Keywords work.</strong> FTS5 with BM25 ranking is fast and accurate for reasonable memory sizes.</li>
            <li><strong>Simplicity wins.</strong> No model downloads, no GPU, no cold start.</li>
          </ul>
          <p className="text-gray-300 mb-4">
            For most users, &quot;find memories about authentication&quot; works perfectly with keyword search.
            If you truly need semantic search at scale, use a dedicated solution like Qdrant or Pinecone.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            New Features in v2.5
          </h2>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><strong>Token budgeting</strong> - Recall respects your context limits</li>
            <li><strong>Auto-summarization</strong> - Long memories get summarized on store</li>
            <li><strong>Entity extraction</strong> - Automatic tagging of people, projects, concepts</li>
            <li><strong>Soft deletes</strong> - Audit trail preserved for debugging</li>
            <li><strong>Hybrid relevance</strong> - Scoring combines recency + importance + frequency</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Migration Guide
          </h2>
          <p className="text-gray-300 mb-4">
            If you were using the old Python version:
          </p>
          <ol className="list-decimal pl-6 text-gray-300 mb-4 space-y-2">
            <li>Export your memories from the old JSON files (optional - start fresh is fine)</li>
            <li>Uninstall the old Python package</li>
            <li>Install the new version:</li>
          </ol>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
            <code className="text-forge-cyan">npx @whenmoon-afk/memory-mcp</code>
          </div>
          <p className="text-gray-300 mb-4">
            Or add to your Claude Desktop config:
          </p>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <pre className="text-gray-300">{`{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@whenmoon-afk/memory-mcp"]
    }
  }
}`}</pre>
          </div>
          <p className="text-gray-300 mb-4">
            Restart Claude Desktop. You now have three tools: <code className="text-forge-cyan">memory_store</code>,{' '}
            <code className="text-forge-cyan">memory_recall</code>, and <code className="text-forge-cyan">memory_forget</code>.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            What&apos;s Next
          </h2>
          <p className="text-gray-300 mb-4">
            We&apos;re building Substratia Pro with:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Cloud sync across devices</li>
            <li>Memory dashboard to view/edit what AI remembers</li>
            <li>Automatic backups</li>
            <li>Team memory sharing</li>
          </ul>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Ready to Try v2.5?</h3>
            <p className="text-gray-400 mb-4">
              Install in seconds, no Python required.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/WhenMoon-afk/claude-memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 font-semibold rounded-lg transition-all"
              >
                View on GitHub
              </a>
              <Link
                href="/pro"
                className="inline-block px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-lg hover:bg-forge-cyan/80 transition-all"
              >
                Join Pro Waitlist
              </Link>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-forge-purple/30 rounded-full flex items-center justify-center font-bold">
              S
            </div>
            <div>
              <div className="font-semibold">Substratia Team</div>
              <div className="text-sm text-gray-400">Building memory infrastructure for AI</div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Related Posts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/blog/memory-mcp-vs-alternatives"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="font-semibold mb-1">MCP Memory Servers Compared</div>
              <div className="text-sm text-gray-400">memory-mcp vs the alternatives</div>
            </Link>
            <Link
              href="/blog/how-to-build-claude-agents"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="font-semibold mb-1">How to Build Claude Agents</div>
              <div className="text-sm text-gray-400">A complete guide to CLAUDE.md files</div>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
