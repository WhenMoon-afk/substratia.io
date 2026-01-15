import Link from 'next/link'
import type { Metadata } from 'next'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'Memory Architecture Patterns for AI Assistants | Substratia',
  description: 'How we designed momentum and memory-mcp to work together. Short-term context recovery meets long-term persistent memory. Two servers, one ecosystem.',
  keywords: 'AI memory, MCP architecture, context management, momentum, memory-mcp, Claude, persistent memory, session recovery',
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
          <ShareButton title="Memory Architecture Patterns for AI Assistants" />
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              Architecture
            </span>
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              Design
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Memory Architecture Patterns for AI Assistants
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span>January 11, 2026</span>
            <span>7 min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            Most memory systems try to do too much. Ours started that way too.
            After building, testing, and ultimately abandoning a complex tiered architecture,
            we landed on something simpler: two focused tools that complement each other.
          </p>

          <div className="bg-forge-cyan/10 border border-forge-cyan/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-forge-cyan mb-2">The Design Philosophy</h3>
            <p className="text-gray-300 mb-0">
              <strong>momentum</strong> handles short-term context recovery (within a session).
              <strong> memory-mcp</strong> handles long-term persistent memory (across sessions).
              Together they solve the complete memory problem without trying to be one monolithic system.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Architecture We Abandoned
          </h2>
          <p className="text-gray-300 mb-4">
            The first version of our memory system was ambitious. Too ambitious.
          </p>
          <p className="text-gray-300 mb-4">
            It had:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><strong>Short-term tier</strong> - Immediate context, fast access</li>
            <li><strong>Long-term tier</strong> - Consolidated memories, slower access</li>
            <li><strong>Archival tier</strong> - Old memories, cold storage</li>
            <li><strong>Automatic consolidation</strong> - Moving memories between tiers</li>
            <li><strong>Importance decay</strong> - Memories fading over time</li>
          </ul>
          <p className="text-gray-300 mb-4">
            Someone even wrote a long article praising this complexity. They called it &quot;optimal
            memory techniques based on comprehensive research.&quot;
          </p>
          <p className="text-gray-300 mb-4">
            The problem? It was overengineered. Users didn&apos;t understand when memories moved
            between tiers. The consolidation logic was fragile. And debugging issues meant
            understanding a state machine with multiple transitions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Simplification
          </h2>
          <p className="text-gray-300 mb-4">
            We threw it away and started over. The new design has one guiding principle:
            <strong> separation of concerns</strong>.
          </p>
          <p className="text-gray-300 mb-4">
            Two problems, two tools:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-forge-cyan mb-2">momentum</h3>
              <p className="text-gray-400 text-sm mb-3">Context recovery within a session</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Save snapshots at task boundaries</li>
                <li>Restore after /clear in &lt;5ms</li>
                <li>SQLite persistence (survives crashes)</li>
                <li>Session-scoped (cleared with new project)</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-forge-purple mb-2">memory-mcp</h3>
              <p className="text-gray-400 text-sm mb-3">Persistent facts across sessions</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Store facts Claude should remember</li>
                <li>Recall with FTS5 search</li>
                <li>Persists indefinitely</li>
                <li>Cross-project, cross-session</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            When to Use Each
          </h2>
          <p className="text-gray-300 mb-4">
            The distinction is simple once you understand it:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-2">Scenario</th>
                  <th className="text-left py-3 px-2">Tool</th>
                  <th className="text-left py-3 px-2">Why</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Context window filling up</td>
                  <td className="py-3 px-2 text-forge-cyan">momentum</td>
                  <td className="py-3 px-2">Snapshot, /clear, restore</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Mid-task, need to preserve state</td>
                  <td className="py-3 px-2 text-forge-cyan">momentum</td>
                  <td className="py-3 px-2">Incremental snapshots</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Learn a fact for next session</td>
                  <td className="py-3 px-2 text-forge-purple">memory-mcp</td>
                  <td className="py-3 px-2">Persistent storage</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Remember user preferences</td>
                  <td className="py-3 px-2 text-forge-purple">memory-mcp</td>
                  <td className="py-3 px-2">Cross-session recall</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Track decisions made in a project</td>
                  <td className="py-3 px-2 text-forge-purple">memory-mcp</td>
                  <td className="py-3 px-2">Searchable history</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Resume after coffee break</td>
                  <td className="py-3 px-2 text-forge-cyan">momentum</td>
                  <td className="py-3 px-2">Latest snapshot</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            How They Work Together
          </h2>
          <p className="text-gray-300 mb-4">
            In practice, you use both. Here&apos;s a typical workflow:
          </p>
          <ol className="list-decimal pl-6 text-gray-300 mb-4 space-y-3">
            <li>
              <strong>Start a new session.</strong> memory-mcp is available immediately. Claude can
              recall facts from previous sessions: &quot;User prefers TypeScript,&quot; &quot;This project uses
              Bun,&quot; etc.
            </li>
            <li>
              <strong>Work on a task.</strong> As you make progress, momentum saves periodic snapshots.
              These capture the working state: what files you&apos;ve touched, decisions made, blockers
              encountered.
            </li>
            <li>
              <strong>Context window fills up.</strong> You run /clear to free space. Momentum&apos;s
              restore_context brings back the working state in &lt;5ms.
            </li>
            <li>
              <strong>Learn something important.</strong> Claude uses memory_store to save a fact
              that should persist: &quot;The API requires authentication,&quot; &quot;Linting config is in
              .eslintrc.js,&quot; etc.
            </li>
            <li>
              <strong>End session.</strong> momentum&apos;s snapshots are session-scoped. memory-mcp&apos;s
              memories persist forever (or until explicitly forgotten).
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Key Insight
          </h2>
          <p className="text-gray-300 mb-4">
            The distinction maps to how human memory works:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>momentum = working memory.</strong> What you&apos;re actively holding in mind.
              Context-specific. Volatile. Fast to access.
            </li>
            <li>
              <strong>memory-mcp = long-term memory.</strong> Facts you&apos;ve learned. Persistent.
              Requires retrieval (search).
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            Trying to combine these into one system creates confusion. Do I snapshot this or
            store it? Should this memory consolidate? What tier is it in?
          </p>
          <p className="text-gray-300 mb-4">
            With two focused tools, the answer is obvious: <em>Is it working context? Snapshot.
            Is it a fact to remember? Store.</em>
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Technical Details
          </h2>
          <p className="text-gray-300 mb-4">
            Both tools share a similar foundation:
          </p>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-gray-300">{`# Shared stack
TypeScript + Bun
SQLite persistence
MCP SDK
Local-first design
Zero ML dependencies`}</pre>
          </div>
          <p className="text-gray-300 mb-4">
            This wasn&apos;t accidental. Having the same foundation means:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Consistent installation experience</li>
            <li>Same mental model for users</li>
            <li>Easier to maintain together</li>
            <li>Future monorepo consolidation is natural</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            What We Didn&apos;t Build
          </h2>
          <p className="text-gray-300 mb-4">
            We explicitly avoided:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><strong>Automatic capture</strong> - MCP can&apos;t intercept conversations. We tried.
              It doesn&apos;t work. Tools must be explicitly called.</li>
            <li><strong>Tiered storage</strong> - Complexity without clear benefit for typical use cases.</li>
            <li><strong>Embeddings</strong> - 46MB overhead for marginal semantic matching gains.
              FTS5 is faster and sufficient.</li>
            <li><strong>Cloud by default</strong> - Local-first means privacy and reliability.
              Cloud is optional (coming in Pro tier).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Stop Building, Start Using
          </h2>
          <p className="text-gray-300 mb-4">
            Here&apos;s a meta-observation: we spent months building memory infrastructure for Claude.
            The irony is that Claude kept forgetting about the work between sessions.
          </p>
          <p className="text-gray-300 mb-4">
            At some point, a past Claude instance noted:
          </p>
          <blockquote className="border-l-4 border-forge-cyan pl-4 italic text-gray-400 mb-4">
            &quot;Stop building memory systems. Start using them.&quot;
          </blockquote>
          <p className="text-gray-300 mb-4">
            This is the lesson: the tools work. They&apos;re simple enough to understand in five
            minutes. The best proof of value is using them to build something else.
          </p>
          <p className="text-gray-300 mb-4">
            If they solve our problem with Claude, they solve yours too.
          </p>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Try the Ecosystem</h3>
            <p className="text-gray-400 mb-4">
              Two tools that work together. Install in minutes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-500 text-xs mb-1"># Context recovery</div>
                <code className="text-forge-cyan">/plugin install momentum@substratia-marketplace</code>
              </div>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-500 text-xs mb-1"># Persistent memory</div>
                <code className="text-forge-purple">npx @whenmoon-afk/memory-mcp</code>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="inline-block px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-lg hover:bg-forge-cyan/80 transition-all"
              >
                View All Tools
              </Link>
              <a
                href="https://github.com/WhenMoon-afk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 font-semibold rounded-lg transition-all"
              >
                GitHub
              </a>
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
              href="/blog/why-fts5-over-embeddings"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="font-semibold mb-1">Why We Chose FTS5 Over Embeddings</div>
              <div className="text-sm text-gray-400">The simpler search that works</div>
            </Link>
            <Link
              href="/blog/memory-mcp-v2-whats-new"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="font-semibold mb-1">What&apos;s New in memory-mcp v2.5</div>
              <div className="text-sm text-gray-400">Python to TypeScript migration</div>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
