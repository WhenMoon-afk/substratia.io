import Link from 'next/link'
import ShareButton from '@/components/ShareButton'

export default function ContextManagementGuidePage() {
  return (
    <article className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/blog" className="text-forge-cyan hover:underline text-sm">
              ← Back to Blog
            </Link>
            <ShareButton title="The Ultimate Guide to Claude Code Context Management" />
          </div>

          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 bg-forge-cyan/20 text-forge-cyan text-xs rounded">Guide</span>
              <span className="px-2 py-1 bg-forge-purple/20 text-forge-purple text-xs rounded">Deep Dive</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The Ultimate Guide to Claude Code Context Management
            </h1>
            <p className="text-gray-400">
              January 11, 2026 · 12 min read
            </p>
          </div>

          {/* Lead */}
          <div className="text-xl text-gray-300 mb-12 leading-relaxed">
            <p>
              Context window management is the difference between productive Claude Code sessions
              and frustrating ones. After months of daily use and building memory tools for Claude Code,
              here&apos;s everything I&apos;ve learned about managing context effectively.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-white/5 rounded-xl p-6 mb-12">
            <h2 className="font-bold mb-4">Table of Contents</h2>
            <ol className="space-y-2 text-sm text-gray-300">
              <li><a href="#problem" className="hover:text-forge-cyan">1. The Context Problem</a></li>
              <li><a href="#how-it-works" className="hover:text-forge-cyan">2. How Context Windows Work</a></li>
              <li><a href="#compaction" className="hover:text-forge-cyan">3. Understanding Compaction</a></li>
              <li><a href="#preservation" className="hover:text-forge-cyan">4. Context Preservation Techniques</a></li>
              <li><a href="#claude-md" className="hover:text-forge-cyan">5. CLAUDE.md Best Practices</a></li>
              <li><a href="#tools" className="hover:text-forge-cyan">6. Tools for Context Management</a></li>
              <li><a href="#workflows" className="hover:text-forge-cyan">7. Workflow Patterns</a></li>
              <li><a href="#advanced" className="hover:text-forge-cyan">8. Advanced Techniques</a></li>
            </ol>
          </nav>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Section 1 */}
            <section id="problem" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">1. The Context Problem</h2>
              <p className="text-gray-300 mb-4">
                Every Claude Code session starts fresh. Claude doesn&apos;t remember your previous conversations,
                your project structure, or the decisions you made yesterday. This is by design—it&apos;s a
                privacy feature—but it creates a productivity challenge.
              </p>
              <p className="text-gray-300 mb-4">
                The symptoms are familiar:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>Re-explaining your project structure every session</li>
                <li>Claude forgetting decisions made earlier in a long session</li>
                <li>Losing context after auto-compaction</li>
                <li>&quot;Wait, didn&apos;t we already fix that?&quot; moments</li>
                <li>Having to re-establish coding conventions repeatedly</li>
              </ul>
              <p className="text-gray-300">
                The root cause is the <strong>context window</strong>—the limited memory Claude has
                during any single conversation.
              </p>
            </section>

            {/* Section 2 */}
            <section id="how-it-works" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">2. How Context Windows Work</h2>
              <p className="text-gray-300 mb-4">
                Claude Code uses Claude&apos;s API with a context window of approximately 200,000 tokens.
                That sounds like a lot, but it fills up faster than you&apos;d expect:
              </p>
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-3">What Counts Toward Context</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>✓ Your messages (prompts)</li>
                  <li>✓ Claude&apos;s responses</li>
                  <li>✓ File contents Claude reads</li>
                  <li>✓ Command outputs</li>
                  <li>✓ Error messages and logs</li>
                  <li>✓ CLAUDE.md file contents</li>
                  <li>✓ MCP tool inputs and outputs</li>
                </ul>
              </div>
              <p className="text-gray-300 mb-4">
                A typical coding session might look like:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <div className="text-gray-400">CLAUDE.md: ~2,000 tokens</div>
                <div className="text-gray-400">Initial file reads: ~15,000 tokens</div>
                <div className="text-gray-400">Your prompts: ~5,000 tokens</div>
                <div className="text-gray-400">Claude&apos;s responses: ~30,000 tokens</div>
                <div className="text-gray-400">Code changes and diffs: ~10,000 tokens</div>
                <div className="text-gray-400">Test outputs: ~8,000 tokens</div>
                <div className="text-forge-cyan mt-2">Total: ~70,000 tokens (35% of window)</div>
              </div>
              <p className="text-gray-300">
                That&apos;s just 30 minutes of moderate activity. Heavy debugging or exploring
                a new codebase can burn through 200k tokens in under an hour.
              </p>
            </section>

            {/* Section 3 */}
            <section id="compaction" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">3. Understanding Compaction</h2>
              <p className="text-gray-300 mb-4">
                When the context window fills up, Claude Code <strong>compacts</strong> the conversation.
                This is an automatic summarization process that condenses the conversation history
                to free up space.
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-red-400 mb-2">The Compaction Problem</h3>
                <p className="text-gray-300">
                  Compaction is lossy. Details get dropped. Claude&apos;s summary might miss:
                </p>
                <ul className="list-disc pl-6 text-gray-300 mt-2 space-y-1">
                  <li>Specific file paths you were working on</li>
                  <li>Why certain approaches were rejected</li>
                  <li>Edge cases you discussed</li>
                  <li>Exact error messages and their solutions</li>
                  <li>Context about the broader architecture</li>
                </ul>
              </div>
              <p className="text-gray-300 mb-4">
                The result: Claude might re-suggest approaches you already tried, forget constraints
                you mentioned, or lose track of the overall goal.
              </p>
              <p className="text-gray-300">
                You can trigger compaction manually with <code className="bg-white/10 px-2 py-0.5 rounded">/compact</code>,
                which gives you more control over when it happens.
              </p>
            </section>

            {/* Section 4 */}
            <section id="preservation" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">4. Context Preservation Techniques</h2>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Technique 1: Front-Load Critical Information</h3>
              <p className="text-gray-300 mb-4">
                Put your most important context in CLAUDE.md. This file is read at the start of every
                session and survives compaction.
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                <pre>{`# CLAUDE.md
## Project: E-commerce API
Stack: Node.js, Express, PostgreSQL, Redis

## Critical Constraints
- All prices stored in cents (integers)
- User IDs are UUIDs, never integers
- Rate limit: 100 req/min per API key

## Recent Decisions
- 2026-01-10: Switched from JWT to sessions (security audit)
- 2026-01-09: Added Redis caching for product catalog`}</pre>
              </div>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Technique 2: Periodic Summaries</h3>
              <p className="text-gray-300 mb-4">
                Before context fills up, ask Claude to summarize progress:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <pre>{`Summarize what we've accomplished in this session:
1. What files were modified
2. What problems were solved
3. What's still pending
4. Any decisions or constraints we established

Save this to CLAUDE.md under ## Session Notes`}</pre>
              </div>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Technique 3: Checkpoint Files</h3>
              <p className="text-gray-300 mb-4">
                For long tasks, create checkpoint files that capture state:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <pre>{`# .claude/checkpoints/auth-refactor.md
## Goal: Refactor authentication to use sessions

## Completed
- [x] Created sessions table
- [x] Updated User model
- [x] Modified login endpoint

## In Progress
- [ ] Update middleware (src/middleware/auth.ts)

## Blocked
- Password reset flow depends on email service update`}</pre>
              </div>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Technique 4: Strategic /clear</h3>
              <p className="text-gray-300 mb-4">
                Sometimes a clean slate is better than fighting context drift.
                Use <code className="bg-white/10 px-2 py-0.5 rounded">/clear</code> when:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>Switching to a completely different task</li>
                <li>Claude seems confused about the goal</li>
                <li>You notice Claude repeating mistakes</li>
                <li>The conversation has gone in circles</li>
              </ul>
              <p className="text-gray-300">
                But first: save any important context to CLAUDE.md or a checkpoint file.
              </p>
            </section>

            {/* Section 5 */}
            <section id="claude-md" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">5. CLAUDE.md Best Practices</h2>
              <p className="text-gray-300 mb-4">
                Your CLAUDE.md file is your most powerful context management tool. Here&apos;s how
                to structure it for maximum effectiveness:
              </p>

              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-3">Essential Sections</h3>
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <strong className="text-forge-cyan">Project Overview</strong>
                    <p>2-3 sentences on what the project does, the stack, and key architecture decisions.</p>
                  </div>
                  <div>
                    <strong className="text-forge-cyan">Directory Structure</strong>
                    <p>Key directories and their purposes. Don&apos;t list every file—focus on patterns.</p>
                  </div>
                  <div>
                    <strong className="text-forge-cyan">Coding Standards</strong>
                    <p>Formatting, naming conventions, error handling patterns, test requirements.</p>
                  </div>
                  <div>
                    <strong className="text-forge-cyan">Do NOT Section</strong>
                    <p>Critical constraints and anti-patterns. This prevents Claude from making common mistakes.</p>
                  </div>
                  <div>
                    <strong className="text-forge-cyan">Recent Context</strong>
                    <p>Current task, recent decisions, ongoing work. Update this frequently.</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                <strong>Keep it under 3,000 tokens.</strong> A CLAUDE.md that&apos;s too long
                wastes context space. Be concise and update it regularly to stay relevant.
              </p>
            </section>

            {/* Section 6 */}
            <section id="tools" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">6. Tools for Context Management</h2>
              <p className="text-gray-300 mb-4">
                Several tools can help manage context more effectively:
              </p>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="font-semibold text-forge-purple mb-2">momentum</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Fast context recovery plugin. Takes snapshots of your work and restores them
                    instantly (&lt;5ms) after /clear or between sessions.
                  </p>
                  <Link href="/templates" className="text-forge-cyan text-sm hover:underline">
                    Learn more →
                  </Link>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="font-semibold text-forge-purple mb-2">memory-mcp</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    Persistent memory across sessions. Claude can store and recall information
                    using natural language commands.
                  </p>
                  <Link href="/templates" className="text-forge-cyan text-sm hover:underline">
                    Learn more →
                  </Link>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="font-semibold text-forge-purple mb-2">/cost Command</h3>
                  <p className="text-gray-300 text-sm">
                    Built into Claude Code. Use <code className="bg-white/10 px-1 rounded">/cost</code> to
                    see how much context you&apos;ve used. Helps you know when compaction is coming.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="workflows" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">7. Workflow Patterns</h2>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Pattern: Session Handoff</h3>
              <p className="text-gray-300 mb-4">
                At the end of each session, create a handoff document:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <pre>{`Before we end, create a session handoff:

## What was accomplished
[list completed work]

## Current state
[describe where things stand]

## Next steps
[prioritized list]

## Important context
[anything the next session needs to know]

Save to .claude/handoff-[date].md`}</pre>
              </div>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Pattern: Task Isolation</h3>
              <p className="text-gray-300 mb-4">
                For unrelated tasks, use separate sessions. One session for bug fixes,
                another for new features. This prevents context pollution and makes
                compaction less damaging.
              </p>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Pattern: Progressive Refinement</h3>
              <p className="text-gray-300 mb-4">
                Instead of one long session, work in focused sprints:
              </p>
              <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                <li>Session 1: Research and planning (save to CLAUDE.md)</li>
                <li>Session 2: Core implementation (checkpoint progress)</li>
                <li>Session 3: Testing and refinement (fresh context)</li>
                <li>Session 4: Documentation and cleanup</li>
              </ol>
            </section>

            {/* Section 8 */}
            <section id="advanced" className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">8. Advanced Techniques</h2>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Pre-Compaction Dumps</h3>
              <p className="text-gray-300 mb-4">
                When you notice context filling up, preemptively save state:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <pre>{`We're running low on context. Before compaction:
1. List all files modified this session
2. Summarize our approach and why we chose it
3. Note any gotchas or edge cases discovered
4. Save everything to CLAUDE.md ## Session State`}</pre>
              </div>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Selective File Loading</h3>
              <p className="text-gray-300 mb-4">
                Don&apos;t let Claude read entire files when it only needs snippets:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <pre>{`# Instead of:
"Read the entire auth.ts file"

# Do this:
"Show me only the validateToken function in auth.ts"

# Or:
"Read lines 45-80 of auth.ts"`}</pre>
              </div>

              <h3 className="text-xl font-semibold text-forge-purple mb-3">Context-Aware Prompts</h3>
              <p className="text-gray-300 mb-4">
                Include relevant context in your prompts instead of relying on memory:
              </p>
              <div className="bg-black/50 rounded-lg p-4 mb-6 font-mono text-sm">
                <pre>{`# Instead of:
"Now fix the other bug we discussed"

# Do this:
"Fix the null pointer in handleSubmit (line 42 of UserForm.tsx)
that we identified from the TypeError: Cannot read property 'email' of null"`}</pre>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forge-cyan mb-4">Conclusion</h2>
              <p className="text-gray-300 mb-4">
                Context management is a skill that improves with practice. The key principles:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                <li><strong>Invest in CLAUDE.md</strong> - It&apos;s your permanent context anchor</li>
                <li><strong>Save before clearing</strong> - Never lose important context</li>
                <li><strong>Use tools</strong> - momentum and memory-mcp exist because this problem is real</li>
                <li><strong>Be explicit</strong> - Include context in prompts rather than assuming memory</li>
                <li><strong>Work in sprints</strong> - Fresh sessions beat context drift</li>
              </ul>
              <p className="text-gray-300">
                Master these techniques and you&apos;ll spend less time re-explaining and more time building.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Want More Help?</h3>
            <p className="text-gray-300 mb-6">
              Get the <Link href="/tools/cheat-sheet" className="text-forge-cyan hover:underline">Claude Code Cheat Sheet</Link> for
              a quick reference, or <Link href="/consulting" className="text-forge-cyan hover:underline">book a consulting session</Link> for
              personalized help with your workflow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tools/cheat-sheet"
                className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all"
              >
                Get the Cheat Sheet
              </Link>
              <Link
                href="/consulting"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
              >
                Book Consulting
              </Link>
            </div>
          </div>

          {/* Related */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/context-window-churn" className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                <h4 className="font-semibold mb-1">The Real Cost of Context Window Churn</h4>
                <p className="text-sm text-gray-400">How context loss impacts developer productivity</p>
              </Link>
              <Link href="/blog/memory-architecture-patterns" className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                <h4 className="font-semibold mb-1">Memory Architecture Patterns</h4>
                <p className="text-sm text-gray-400">Two-server architecture for AI memory</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
