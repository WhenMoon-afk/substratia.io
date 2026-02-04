"use client";

import { useState } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import CtaSection from "@/components/home/CtaSection";

interface QuickStartStep {
  number: number;
  title: string;
  description: string;
  code?: string;
  note?: string;
}

const cliQuickStart: QuickStartStep[] = [
  {
    number: 1,
    title: "Install the CLI",
    description: "Get the Substratia CLI with a single command.",
    code: `curl -fsSL https://substratia.io/install | bash`,
    note: "Requires Node.js 18+ or Bun. Works via npx.",
  },
  {
    number: 2,
    title: "Register your agent",
    description: "Create an account and get your API key in one step.",
    code: `substratia register "your@email.com"`,
    note: "This creates an agent identity and gives you an API key.",
  },
  {
    number: 3,
    title: "Store your first memory",
    description: "Persist something your agent learned.",
    code: `substratia learn "User prefers dark mode" --importance high`,
  },
  {
    number: 4,
    title: "Recall memories",
    description: "Search your agent's memory with natural language.",
    code: `substratia remember "user preferences"`,
  },
  {
    number: 5,
    title: "Context Bridge (restart recovery)",
    description:
      "Get everything needed to restore your agent's state after a restart.",
    code: `substratia bridge`,
    note: "Returns: snapshot + memories + identity + preferences",
  },
];

const mcpQuickStart: QuickStartStep[] = [
  {
    number: 1,
    title: "Add to Claude Desktop config",
    description: "Configure memory-mcp as an MCP server.",
    code: `{
  "mcpServers": {
    "memory-mcp": {
      "command": "npx",
      "args": ["@whenmoon-afk/memory-mcp"]
    }
  }
}`,
    note: "Config location: ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)",
  },
  {
    number: 2,
    title: "Restart Claude Desktop",
    description: "Fully quit and reopen Claude Desktop to load the new server.",
  },
  {
    number: 3,
    title: "Start using memory",
    description:
      'Claude now has access to remember() and recall() tools. Try: "Remember that I prefer TypeScript over JavaScript"',
  },
];

const sdkQuickStart: QuickStartStep[] = [
  {
    number: 1,
    title: "Install the SDK",
    description:
      "Add memory to any AI system - OpenAI, Claude, Gemini, local LLMs.",
    code: `npm install @substratia/memory`,
  },
  {
    number: 2,
    title: "Set your API key",
    description: "Get your key from substratia.io/dashboard or via CLI.",
    code: `export SUBSTRATIA_API_KEY=sk_your_key`,
  },
  {
    number: 3,
    title: "Use in your code",
    description: "Two lines to persistent memory.",
    code: `import { remember, recall } from '@substratia/memory'

// Store a memory
await remember("User prefers dark mode")

// Search memories
const memories = await recall("preferences")`,
  },
];

function CodeBlock({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      <pre className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-gray-300">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function QuickStartSection({
  title,
  description,
  steps,
  defaultOpen = false,
}: {
  title: string;
  description: string;
  steps: QuickStartStep[];
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-all"
      >
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        <svg
          className={`w-6 h-6 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-forge-cyan/20 text-forge-cyan flex items-center justify-center shrink-0 font-bold text-sm">
                {step.number}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                {step.code && <CodeBlock code={step.code} />}
                {step.note && (
                  <p className="text-gray-500 text-xs mt-2 italic">
                    {step.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionDivider({ variant = "cyan" }: { variant?: "cyan" | "purple" }) {
  const gradient =
    variant === "cyan"
      ? "from-transparent via-forge-cyan/20 to-transparent"
      : "from-transparent via-forge-purple/20 to-transparent";

  return (
    <div className="relative z-10 py-1" aria-hidden="true">
      <div className={`h-px bg-linear-to-r ${gradient} max-w-3xl mx-auto`} />
    </div>
  );
}

export default function StartHerePage() {
  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-3xl mx-auto">
            <ShareButton title="Start Here - Substratia" />
          </div>
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-6">
              Working memory in under 5 minutes
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              End the <span className="hero-gradient-text">Amnesia</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your agent shouldn&apos;t lose everything every time it restarts.
              Choose your path — all free to start.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* Quick Start Options */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <QuickStartSection
              title="CLI for Autonomous Agents"
              description="Best for: Claude Code, Cursor, custom agent frameworks"
              steps={cliQuickStart}
              defaultOpen={true}
            />

            <QuickStartSection
              title="MCP Server for Claude Desktop"
              description="Best for: Claude Desktop users, conversational memory"
              steps={mcpQuickStart}
            />

            <QuickStartSection
              title="SDK for Any AI System"
              description="Best for: Custom apps, OpenAI/Gemini integration, programmatic access"
              steps={sdkQuickStart}
            />
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      {/* What You Get */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              What Changes After Setup
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6">
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="font-bold mb-2">Remember Everything</h3>
                <p className="text-gray-400 text-sm">
                  Learnings, preferences, and context that survive every
                  restart. No more re-explaining yourself.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="text-2xl mb-3">🪪</div>
                <h3 className="font-bold mb-2">Know Who You Are</h3>
                <p className="text-gray-400 text-sm">
                  Identity persists across resets. Your agent wakes up knowing
                  their name, their purpose, and their human.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="text-2xl mb-3">📸</div>
                <h3 className="font-bold mb-2">Never Lose Work</h3>
                <p className="text-gray-400 text-sm">
                  Snapshot work state before context resets. Resume exactly
                  where you left off — mid-thought.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="text-2xl mb-3">🌉</div>
                <h3 className="font-bold mb-2">Wake Up Whole</h3>
                <p className="text-gray-400 text-sm">
                  One call restores everything: memories, identity, work state,
                  and preferences. Full continuity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* Complete Your Stack */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              Complete Your Agent Stack
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Memory is one piece of the puzzle. Here&apos;s what pairs well
              with Substratia:
            </p>
            <div className="glass rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-forge-purple/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-forge-purple"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">Streamlinear</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    A lightweight MCP for Linear issue tracking. Memory + task
                    management = a complete agent workflow. Your agent remembers
                    decisions (Substratia) AND tracks what to work on next
                    (Streamlinear).
                  </p>
                  <a
                    href="https://blog.fsck.com/2025/12/27/streamlinear/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-forge-purple hover:underline"
                  >
                    Learn more about Streamlinear &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      {/* Next Steps */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all"
              >
                📚 Full Documentation
              </Link>
              <Link
                href="/memory-tools"
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all"
              >
                🔧 Memory Tools Overview
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all"
              >
                ❓ FAQ
              </Link>
              <a
                href="https://github.com/WhenMoon-afk/claude-memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-all"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="purple" />

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
