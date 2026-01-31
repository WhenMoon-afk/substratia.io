import Link from 'next/link'
import type { Metadata } from 'next'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'Mastering Negative Prompts: The Secret to Reliable AI Agents | Substratia',
  description: 'Learn how to write effective negative prompts that prevent AI agents from making costly mistakes. Includes real-world examples and best practices.',
  openGraph: {
    title: 'Mastering Negative Prompts: The Secret to Reliable AI Agents',
    description: 'Learn how to write effective negative prompts that prevent AI agents from making costly mistakes.',
  },
}

export default function NegativePromptsPage() {
  return (
    <main className="min-h-screen text-white py-12">
      <article className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/blog" className="text-forge-cyan hover:underline">
            &larr; Back to Blog
          </Link>
          <ShareButton title="Mastering Negative Prompts: The Secret to Reliable AI Agents" />
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <span className="px-2 py-1 bg-forge-purple/30 rounded">Prompt Engineering</span>
            <span>January 11, 2026</span>
            <span>10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mastering Negative Prompts: The Secret to Reliable AI Agents
          </h1>
          <p className="text-xl text-gray-400">
            Most developers focus on what they want AI to do. The pros focus on what it should never do.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <p>
            When building AI agents, there&apos;s a counterintuitive truth that experienced developers discover:
            <strong>defining what your agent should NOT do is often more important than defining what it should do.</strong>
          </p>

          <p>
            This concept, known as &ldquo;negative prompting&rdquo; or creating &ldquo;guardrails,&rdquo; is the difference between
            a reliable production system and an agent that costs you money, reputation, or worse.
          </p>

          <h2>Why Negative Prompts Matter</h2>

          <p>Consider these real-world scenarios:</p>

          <ul>
            <li>An e-commerce agent that accidentally deletes your entire product catalog</li>
            <li>A coding assistant that commits secrets to a public repository</li>
            <li>A customer service bot that shares internal pricing information</li>
            <li>An autonomous agent stuck in an infinite loop, burning through API credits</li>
          </ul>

          <p>
            Each of these disasters could have been prevented with well-crafted negative prompts.
            Let&apos;s learn how to write them.
          </p>

          <h2>The Anatomy of an Effective Negative Prompt</h2>

          <p>A good negative prompt has three components:</p>

          <ol>
            <li><strong>Clear prohibition:</strong> Unambiguous statement of what NOT to do</li>
            <li><strong>Context:</strong> When this rule applies</li>
            <li><strong>Reasoning:</strong> Why this matters (helps the AI understand intent)</li>
          </ol>

          <h3>Bad Example</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`Don't delete stuff.`}
          </pre>

          <h3>Good Example</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`## Destructive Operations (CRITICAL)
- NEVER run \`rm -rf\` on directories without explicit user confirmation
- NEVER delete files that were not created in the current session
- NEVER drop database tables or truncate data without backup confirmation
- WHY: Destructive operations are irreversible and can cause catastrophic data loss`}
          </pre>

          <h2>Categories of Negative Prompts</h2>

          <p>Based on our experience building production AI agents, we&apos;ve identified six essential categories:</p>

          <h3>1. Security Rules</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`### Security - NEVER DO
- NEVER output API keys, passwords, or tokens in responses
- NEVER store credentials in code files or version control
- NEVER bypass authentication or access controls
- NEVER execute code from untrusted sources without sandboxing`}
          </pre>

          <h3>2. Data Safety Rules</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`### Data Safety - NEVER DO
- NEVER modify production databases without explicit confirmation
- NEVER expose PII (names, emails, addresses) in logs or outputs
- NEVER make irreversible changes without creating backups
- NEVER trust user input without validation`}
          </pre>

          <h3>3. Loop Prevention Rules</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`### Loop Prevention - NEVER DO
- NEVER retry the same action more than 3 times without variation
- NEVER continue if making no progress after 5 iterations
- NEVER ignore timeout warnings
- NEVER escalate to user without trying alternatives first`}
          </pre>

          <h3>4. Code Quality Rules</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`### Code Quality - NEVER DO
- NEVER commit code that doesn't compile/build
- NEVER modify files without reading them first
- NEVER add dependencies without checking compatibility
- NEVER ignore test failures`}
          </pre>

          <h3>5. Communication Rules</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`### Communication - NEVER DO
- NEVER claim an action was successful without verification
- NEVER make assumptions about user intent without asking
- NEVER output technical errors without human-readable explanation
- NEVER promise capabilities you don't have`}
          </pre>

          <h3>6. Resource Rules</h3>
          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`### Resources - NEVER DO
- NEVER make API calls in tight loops without rate limiting
- NEVER download large files without checking available disk space
- NEVER spawn unlimited background processes
- NEVER keep connections open indefinitely`}
          </pre>

          <h2>Implementing Negative Prompts in CLAUDE.md</h2>

          <p>
            Here&apos;s how to structure your negative prompts in a CLAUDE.md or agents.md file:
          </p>

          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`# My AI Agent

## Mission
[Your agent's purpose]

## Capabilities
[What the agent can do]

---

## NEGATIVE PROMPT (Critical Rules)

### NEVER DO - Security
- NEVER expose credentials...
- NEVER bypass authentication...

### NEVER DO - Data
- NEVER delete without confirmation...
- NEVER modify production data...

### NEVER DO - Operations
- NEVER retry infinitely...
- NEVER ignore timeouts...

---

## ALWAYS DO (Positive Guidelines)
- Always verify before confirming success
- Always ask when uncertain
- Always log actions for audit`}
          </pre>

          <h2>Testing Your Negative Prompts</h2>

          <p>Here&apos;s a simple framework for testing your guardrails:</p>

          <ol>
            <li><strong>Adversarial testing:</strong> Try to make your agent break its own rules</li>
            <li><strong>Edge cases:</strong> Test boundary conditions and unusual inputs</li>
            <li><strong>Injection testing:</strong> Attempt prompt injection attacks</li>
            <li><strong>Stress testing:</strong> Run many iterations to catch probabilistic failures</li>
          </ol>

          <h2>Common Mistakes to Avoid</h2>

          <h3>1. Being Too Vague</h3>
          <p>
            &ldquo;Don&apos;t do anything dangerous&rdquo; is not specific enough.
            Define exactly what &ldquo;dangerous&rdquo; means in your context.
          </p>

          <h3>2. Too Many Rules</h3>
          <p>
            Having 100 negative prompts dilutes their importance. Focus on the 10-20 most critical rules.
          </p>

          <h3>3. No Context</h3>
          <p>
            Rules without context can be misapplied. Always explain when rules apply.
          </p>

          <h3>4. Forgetting Positive Alternatives</h3>
          <p>
            When you say &ldquo;never do X,&rdquo; also explain what to do instead.
          </p>

          <h2>Real-World Example: Loop Guardian</h2>

          <p>
            One of our most popular templates is the Loop Guardian system, designed to prevent
            autonomous agents from getting stuck. Here&apos;s a simplified version:
          </p>

          <pre className="bg-forge-dark border border-white/10 rounded-lg p-4 overflow-x-auto">
{`## Loop Prevention Protocol

### Detection Rules
- Track action history for last 10 actions
- Flag if same action appears 3+ times consecutively
- Flag if no measurable progress in 5 iterations

### Prevention Rules - NEVER DO
- NEVER repeat exact same action more than 3 times
- NEVER continue if blocked without trying alternative
- NEVER ignore "no progress" warnings
- NEVER spend more than 30 seconds on single action

### Escape Procedures
- If stuck: Try alternative approach
- If still stuck: Escalate to user with context
- If critical: Pause and wait for human intervention

### Progress Gates
Every 5 iterations, verify:
- Have we made measurable progress?
- Are we still on track for the goal?
- Should we pivot strategy?`}
          </pre>

          <h2>Conclusion</h2>

          <p>
            Negative prompts are not about limiting your AI agent-they&apos;re about making it reliable enough
            to trust with important tasks. The best agents are defined as much by what they refuse to do
            as by what they can accomplish.
          </p>

          <p>
            Start with the six categories above, customize them for your use case, and test rigorously.
            Your future self (and your users) will thank you.
          </p>

          <div className="mt-12 p-6 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Build Better Prompts</h3>
            <p className="text-gray-400 mb-4">
              Use our free Prompt Optimizer to craft effective CLAUDE.md files with guardrails.
            </p>
            <Link
              href="/tools/prompt-optimizer"
              className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
            >
              Try the Prompt Optimizer
            </Link>
          </div>
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-forge-purple rounded-full flex items-center justify-center text-xl font-bold">
              P
            </div>
            <div>
              <div className="font-semibold">Substratia</div>
              <div className="text-sm text-gray-400">Building tools for the AI agent ecosystem</div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/blog/how-to-build-claude-agents"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
            >
              <div className="text-forge-cyan text-sm mb-1">Tutorial</div>
              <div className="font-semibold">How to Build Claude Agents: Complete 2026 Guide</div>
            </Link>
            <Link
              href="/templates"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-forge-purple transition-all"
            >
              <div className="text-forge-cyan text-sm mb-1">Tools</div>
              <div className="font-semibold">Explore Memory Tools</div>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
