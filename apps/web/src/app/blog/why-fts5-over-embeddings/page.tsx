import Link from 'next/link'
import type { Metadata } from 'next'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'Why We Chose FTS5 Over Embeddings for AI Memory | Substratia',
  description: 'Vector embeddings are powerful but overkill for most AI memory use cases. SQLite FTS5 gave us instant startup, zero dependencies, and 46MB less bloat. Here\'s why simpler won.',
  keywords: 'FTS5, embeddings, vector search, AI memory, BM25, SQLite, memory-mcp, sentence transformers, full-text search',
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
          <ShareButton title="Why We Chose FTS5 Over Embeddings for AI Memory" />
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              Architecture
            </span>
            <span className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded">
              Technical
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Why We Chose FTS5 Over Embeddings for AI Memory
          </h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span>January 11, 2026</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            When we rewrote memory-mcp from Python to TypeScript, we made a controversial decision:
            drop vector embeddings entirely in favor of SQLite&apos;s FTS5. The result? 46MB less
            bloat, instant startup, and search that actually works better for our use case.
          </p>

          <div className="bg-forge-cyan/10 border border-forge-cyan/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-forge-cyan mb-2">The Numbers</h3>
            <ul className="text-gray-300 mb-0 space-y-1">
              <li><strong>46MB saved</strong> - No more sentence-transformers model weight</li>
              <li><strong>30+ seconds → &lt;1s startup</strong> - No model loading</li>
              <li><strong>1,500+ tokens saved</strong> per response (no embedding bloat)</li>
              <li><strong>88 tokens</strong> for hot context retrieval (tested)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Embeddings Trap
          </h2>
          <p className="text-gray-300 mb-4">
            Vector embeddings have become the default answer for anything involving search.
            Need to find similar documents? Embeddings. Semantic search? Embeddings.
            AI memory? Obviously embeddings.
          </p>
          <p className="text-gray-300 mb-4">
            The original Python version of memory-mcp followed this playbook:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><code className="text-forge-cyan">sentence-transformers/all-MiniLM-L6-v2</code> - 384 dimensions</li>
            <li>In-memory cosine similarity using NumPy</li>
            <li>JSON storage with embedded vectors</li>
            <li>PyTorch as a dependency (yes, really)</li>
          </ul>
          <p className="text-gray-300 mb-4">
            It worked. But the costs were brutal:
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
            <ul className="text-gray-300 mb-0 space-y-1">
              <li><strong>46MB+</strong> model weight downloaded on first run</li>
              <li><strong>30+ seconds</strong> cold start (loading the model)</li>
              <li><strong>2+ seconds</strong> latency reported by users</li>
              <li><strong>Entire JSON file</strong> loaded into RAM</li>
              <li><strong>No concurrent access</strong> - file locks everywhere</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The ildunari Fork: Peak Complexity
          </h2>
          <p className="text-gray-300 mb-4">
            Someone forked the original and tried to &quot;fix&quot; it by adding more infrastructure:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Qdrant vector database</li>
            <li>NGINX load balancing (2 instances)</li>
            <li>Prometheus + Grafana monitoring</li>
            <li>Loki + Promtail logging</li>
            <li>Redis caching</li>
            <li>Kubernetes + Helm charts</li>
          </ul>
          <p className="text-gray-300 mb-4">
            For a personal memory tool. Running locally. With maybe 100-1,000 memories.
          </p>
          <p className="text-gray-300 mb-4">
            They learned an important lesson and documented it before archiving the project:
          </p>
          <blockquote className="border-l-4 border-forge-cyan pl-4 italic text-gray-400 mb-4">
            &quot;After implementing and then removing the auto-capture feature, here is the correct
            understanding of how MCP works: Servers can only respond to requests, not initiate actions.&quot;
          </blockquote>
          <p className="text-gray-300 mb-4">
            The fork was abandoned. Over-engineering doesn&apos;t survive contact with reality.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            When Embeddings Actually Make Sense
          </h2>
          <p className="text-gray-300 mb-4">
            Vector embeddings excel at specific problems:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-2">Use Case</th>
                  <th className="text-left py-3 px-2">Embeddings?</th>
                  <th className="text-left py-3 px-2">Why</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Millions of documents</td>
                  <td className="py-3 px-2 text-green-400">Yes</td>
                  <td className="py-3 px-2">Can&apos;t brute force at scale</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Cross-lingual search</td>
                  <td className="py-3 px-2 text-green-400">Yes</td>
                  <td className="py-3 px-2">Semantic meaning crosses language</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Image/text similarity</td>
                  <td className="py-3 px-2 text-green-400">Yes</td>
                  <td className="py-3 px-2">Cross-modal requires embeddings</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">100-1,000 memories</td>
                  <td className="py-3 px-2 text-red-400">No</td>
                  <td className="py-3 px-2">Keyword search is faster and simpler</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Personal AI memory</td>
                  <td className="py-3 px-2 text-red-400">No</td>
                  <td className="py-3 px-2">You know what you&apos;re looking for</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Local-first tools</td>
                  <td className="py-3 px-2 text-red-400">No</td>
                  <td className="py-3 px-2">46MB model + startup cost kills UX</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 mb-4">
            Personal AI memory is firmly in the &quot;No&quot; category. You&apos;re not searching millions
            of documents. You&apos;re recalling dozens to hundreds of memories you created yourself.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            FTS5: The Right Tool
          </h2>
          <p className="text-gray-300 mb-4">
            SQLite&apos;s FTS5 (Full-Text Search 5) is built into SQLite. No external dependencies.
            It provides:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><strong>BM25 ranking</strong> - The same algorithm behind Elasticsearch and Lucene</li>
            <li><strong>Phrase queries</strong> - Search for &quot;authentication flow&quot; as a phrase</li>
            <li><strong>Boolean operators</strong> - AND, OR, NOT</li>
            <li><strong>Prefix matching</strong> - auth* matches authentication, authorize, etc.</li>
            <li><strong>Column weights</strong> - Prioritize title matches over body matches</li>
          </ul>
          <p className="text-gray-300 mb-4">
            For memory-mcp, we built a hybrid scoring system:
          </p>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
            <code className="text-gray-300">
              score = 0.4 * relevance + 0.3 * importance + 0.2 * recency + 0.1 * frequency
            </code>
          </div>
          <p className="text-gray-300 mb-4">
            This means a highly relevant but older memory can still rank above a recent but
            tangentially related one. The weights are tunable, but these defaults work well.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Token Budget Problem
          </h2>
          <p className="text-gray-300 mb-4">
            Here&apos;s something embedding-based systems get wrong: they ignore token cost.
          </p>
          <p className="text-gray-300 mb-4">
            When Claude calls <code className="text-forge-cyan">memory_recall</code>, we need to return
            memories that fit within context limits. The old Python version would return:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Memory content</li>
            <li>384-dimension embedding vector (stringified)</li>
            <li>Full metadata</li>
            <li>Similarity scores</li>
          </ul>
          <p className="text-gray-300 mb-4">
            Result: 1,500+ tokens per response in some cases. Most of it useless to Claude.
          </p>
          <p className="text-gray-300 mb-4">
            The new version uses a 3-tier response system:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-2">Tier</th>
                  <th className="text-left py-3 px-2">Tokens</th>
                  <th className="text-left py-3 px-2">Content</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Minimal</td>
                  <td className="py-3 px-2 text-forge-cyan">~30</td>
                  <td className="py-3 px-2">Just the summary</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Standard</td>
                  <td className="py-3 px-2 text-forge-cyan">~200</td>
                  <td className="py-3 px-2">Summary + key context</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2">Full</td>
                  <td className="py-3 px-2 text-forge-cyan">~500</td>
                  <td className="py-3 px-2">Everything including metadata</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 mb-4">
            Hot context (the most relevant memories) tested at just 88 tokens. That&apos;s 17x more
            efficient than the embedding-bloated responses.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Startup Cost Nobody Talks About
          </h2>
          <p className="text-gray-300 mb-4">
            MCP servers need to start fast. Every time you restart Claude Desktop, every MCP
            server initializes. With the old Python version:
          </p>
          <ol className="list-decimal pl-6 text-gray-300 mb-4 space-y-2">
            <li>Python interpreter starts (~500ms)</li>
            <li>Import sentence-transformers (~2s)</li>
            <li>Load the model into memory (~10-30s first time, ~5s cached)</li>
            <li>Finally ready to serve requests</li>
          </ol>
          <p className="text-gray-300 mb-4">
            With the TypeScript + FTS5 version:
          </p>
          <ol className="list-decimal pl-6 text-gray-300 mb-4 space-y-2">
            <li>Node starts (~100ms)</li>
            <li>Open SQLite database (~10ms)</li>
            <li>Ready</li>
          </ol>
          <p className="text-gray-300 mb-4">
            Sub-second startup. No model downloading. No waiting.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            What We Lost
          </h2>
          <p className="text-gray-300 mb-4">
            To be fair, dropping embeddings does sacrifice some capabilities:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li><strong>Semantic similarity</strong> - &quot;car&quot; won&apos;t match &quot;automobile&quot; unless you
              explicitly store both</li>
            <li><strong>Typo tolerance</strong> - &quot;authenication&quot; won&apos;t find &quot;authentication&quot;</li>
            <li><strong>Cross-lingual</strong> - Can&apos;t search English memories with French queries</li>
          </ul>
          <p className="text-gray-300 mb-4">
            For personal AI memory, these tradeoffs are acceptable. You wrote the memories.
            You know roughly what words you used. And if you need semantic search at scale,
            use a dedicated solution like Pinecone or Qdrant.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Architecture That Shipped
          </h2>
          <p className="text-gray-300 mb-4">
            Here&apos;s what the final memory-mcp architecture looks like:
          </p>
          <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto">
            <pre className="text-gray-300">{`SQLite Database
├── memories (main table)
│   ├── id, content, summary
│   ├── importance, created_at
│   ├── access_count, last_accessed
│   └── tags (JSON array)
├── memories_fts (FTS5 virtual table)
│   └── Indexed: content, summary, tags
└── Hybrid scoring query
    └── BM25 + importance + recency + frequency`}</pre>
          </div>
          <p className="text-gray-300 mb-4">
            Three tools. One database file. Zero external dependencies beyond better-sqlite3
            (and we&apos;re migrating to Bun&apos;s built-in SQLite to eliminate even that).
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            When to Use What
          </h2>
          <p className="text-gray-300 mb-4">
            Here&apos;s the decision tree we use:
          </p>
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <p className="text-gray-300 mb-2">
              <strong>Dataset size &lt; 10K documents?</strong>
            </p>
            <p className="text-gray-300 mb-2 pl-4">
              → Use FTS5. It&apos;s simpler and faster.
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Need semantic/cross-lingual search?</strong>
            </p>
            <p className="text-gray-300 mb-2 pl-4">
              → Use embeddings, but via an external service (Pinecone, Qdrant).
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Local-first with no external deps?</strong>
            </p>
            <p className="text-gray-300 mb-0 pl-4">
              → FTS5 is the only sane choice.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Conclusion
          </h2>
          <p className="text-gray-300 mb-4">
            The industry&apos;s default answer to search is &quot;add embeddings.&quot; For large-scale
            semantic search, that&apos;s right. For personal AI memory with 100-1,000 items,
            it&apos;s over-engineering.
          </p>
          <p className="text-gray-300 mb-4">
            FTS5 gave us:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>46MB less bloat</li>
            <li>30x faster startup</li>
            <li>17x more token-efficient responses</li>
            <li>Zero external dependencies</li>
            <li>Search that actually works for the use case</li>
          </ul>
          <p className="text-gray-300 mb-4">
            Sometimes simpler wins. This was one of those times.
          </p>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold mb-3">Try memory-mcp</h3>
            <p className="text-gray-400 mb-4">
              Persistent memory for Claude. FTS5-powered. Install in seconds.
            </p>
            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm mb-4">
              <code className="text-forge-cyan">npx @whenmoon-afk/memory-mcp</code>
            </div>
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
                href="/templates"
                className="inline-block px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-lg hover:bg-forge-cyan/80 transition-all"
              >
                Learn More
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
              href="/blog/memory-mcp-v2-whats-new"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="font-semibold mb-1">What&apos;s New in memory-mcp v2.5</div>
              <div className="text-sm text-gray-400">Python to TypeScript migration</div>
            </Link>
            <Link
              href="/blog/memory-mcp-vs-alternatives"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="font-semibold mb-1">MCP Memory Servers Compared</div>
              <div className="text-sm text-gray-400">memory-mcp vs the alternatives</div>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
