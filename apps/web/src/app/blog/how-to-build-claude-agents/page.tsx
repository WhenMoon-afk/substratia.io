import Link from "next/link";
import type { Metadata } from "next";
import { BlogHeader, BlogAuthor, RelatedPosts } from "@/components/blog";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title:
    "How to Build Claude Agents: A Complete Guide to CLAUDE.md | Substratia",
  description:
    "Learn how to create powerful AI agents using CLAUDE.md files. This comprehensive guide covers capabilities, rulesets, negative prompts, and best practices for Claude Code.",
  keywords:
    "CLAUDE.md, Claude Code, AI agents, agents.md, prompt engineering, negative prompts, agent configuration",
};

export default function BlogPost() {
  return (
    <main className="min-h-screen text-white">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <BlogHeader
          title="How to Build Claude Agents: A Complete Guide to CLAUDE.md"
          date="January 11, 2026"
          readTime="8 min read"
          tags={[
            { label: "Claude" },
            { label: "Tutorial" },
            { label: "Beginner" },
          ]}
        />

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            CLAUDE.md files are the secret to building powerful, reliable AI
            agents with Claude Code. In this guide, you&apos;ll learn everything
            you need to create your first agent configuration.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            What is a CLAUDE.md File?
          </h2>
          <p className="text-gray-300 mb-4">
            A CLAUDE.md file is a configuration file that defines how an AI
            agent should behave. It includes instructions, capabilities, rules,
            and constraints that shape the agent&apos;s responses and actions.
          </p>
          <p className="text-gray-300 mb-4">
            Think of it as a &quot;personality profile&quot; for your AI agent -
            it tells Claude what it can do, what it should never do, and how it
            should approach tasks.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Structure of a CLAUDE.md File
          </h2>
          <p className="text-gray-300 mb-4">
            A well-structured CLAUDE.md file typically includes these sections:
          </p>

          <div className="bg-forge-dark border border-white/10 rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-300 overflow-x-auto">{`# Agent Name

Brief description of the agent's purpose.

## Core Principles
- Principle 1
- Principle 2
- Principle 3

## Capabilities
- What the agent can do
- Tools it has access to

## Negative Prompt (Critical Rules)

### NEVER DO
- Rule 1
- Rule 2

### ALWAYS DO
- Positive rule 1
- Positive rule 2`}</pre>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            The Power of Negative Prompts
          </h2>
          <p className="text-gray-300 mb-4">
            Negative prompts are arguably the most important part of your
            CLAUDE.md file. They define boundaries and prevent unwanted
            behaviors.
          </p>
          <p className="text-gray-300 mb-4">
            <strong className="text-white">Key insight:</strong> Telling an AI
            what NOT to do is often more effective than telling it what to do.
            Negative prompts create guardrails that keep the agent on track.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Essential Negative Prompts
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>NEVER store or display passwords in plain text</li>
            <li>NEVER modify code without reading it first</li>
            <li>NEVER repeat the same action more than 3 times</li>
            <li>NEVER claim an action succeeded without showing output</li>
            <li>NEVER make financial transactions without verification</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Preventing Agent Loops
          </h2>
          <p className="text-gray-300 mb-4">
            One of the most common problems with AI agents is getting stuck in
            repetitive loops. Your CLAUDE.md should include anti-loop rules:
          </p>

          <div className="bg-forge-dark border border-white/10 rounded-lg p-4 mb-6">
            <pre className="text-sm text-gray-300 overflow-x-auto">{`## Loop Prevention

- Do not repeat the same action more than 3 times
- Do not take more than 3 screenshots per task
- If blocked, stop and report - do not keep retrying
- Do not poll or refresh repeatedly while waiting`}</pre>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Best Practices
          </h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-6">
            <li>
              <strong className="text-white">Start with security rules</strong>{" "}
              - These are non-negotiable and should be at the top of your
              configuration.
            </li>
            <li>
              <strong className="text-white">Be specific</strong> - Vague
              instructions lead to vague behavior. Use concrete examples.
            </li>
            <li>
              <strong className="text-white">Include verification steps</strong>{" "}
              - Always have the agent confirm its actions completed
              successfully.
            </li>
            <li>
              <strong className="text-white">Add escalation rules</strong> -
              Define when the agent should stop and ask for help instead of
              continuing.
            </li>
            <li>
              <strong className="text-white">Test and iterate</strong> - Your
              first CLAUDE.md won&apos;t be perfect. Observe behavior and refine
              over time.
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Getting Started
          </h2>
          <p className="text-gray-300 mb-4">
            Check out our{" "}
            <Link
              href="/tools/prompt-optimizer"
              className="text-forge-cyan hover:underline"
            >
              Prompt Optimizer
            </Link>{" "}
            and
            <Link
              href="/tools/cheat-sheet"
              className="text-forge-cyan hover:underline"
            >
              {" "}
              Cheat Sheet
            </Link>{" "}
            for reference patterns and best practices when writing your
            CLAUDE.md.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Ready to build your first agent?
            </h3>
            <p className="text-gray-400 mb-4">
              Explore our free tools to help you write better CLAUDE.md files.
            </p>
            <Button href="/tools" variant="purple">
              Browse Free Tools
            </Button>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Conclusion
          </h2>
          <p className="text-gray-300 mb-4">
            Building effective AI agents requires careful configuration. A
            well-crafted CLAUDE.md file is the foundation of a reliable, safe,
            and productive agent. Start with strong negative prompts, add
            specific capabilities, and iterate based on real-world performance.
          </p>
          <p className="text-gray-300">
            With the right tools and patterns, you can skip the trial-and-error
            phase and start with battle-tested configurations from real
            production systems.
          </p>
        </div>

        <BlogAuthor />

        <RelatedPosts
          posts={[
            {
              href: "/blog/mastering-negative-prompts",
              title: "Mastering Negative Prompts",
              description: "The secret to reliable AI agents",
            },
            {
              href: "/blog/agents-md-vs-claude-md",
              title: "AGENTS.md vs CLAUDE.md",
              description: "The complete comparison guide",
            },
          ]}
        />
      </article>
    </main>
  );
}
