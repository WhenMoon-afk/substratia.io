"use client";

import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import CtaSection from "@/components/home/CtaSection";
import { SectionDivider } from "@/components/SectionDivider";

function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <pre className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm my-4">
      <code className="text-gray-300">{code}</code>
    </pre>
  );
}

function VulnerabilityCard({
  title,
  severity,
  cve,
  description,
}: {
  title: string;
  severity: "critical" | "high" | "medium";
  cve?: string;
  description: string;
}) {
  const severityColors = {
    critical: "bg-red-500/20 border-red-500/50 text-red-400",
    high: "bg-orange-500/20 border-orange-500/50 text-orange-400",
    medium: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
  };

  return (
    <div className="glass rounded-xl p-5 border border-white/10 my-4">
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`px-2 py-1 text-xs font-bold rounded ${severityColors[severity]}`}
        >
          {severity.toUpperCase()}
        </span>
        {cve && <span className="text-xs font-mono text-gray-500">{cve}</span>}
      </div>
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default function OpenClawSecurityAnalysisPage() {
  return (
    <main className="min-h-screen text-white relative">
      {/* Header */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-4 max-w-3xl mx-auto">
            <ShareButton title="OpenClaw Security Analysis - Substratia" />
          </div>
          <div className="max-w-3xl mx-auto animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/blog"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-sm text-forge-cyan">Security</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
              OpenClaw: Architecture, Security, and{" "}
              <span className="hero-gradient-text">Lessons Learned</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A technical analysis of the platform powering 1.5 million AI
              agents on Moltbook &mdash; what it gets right, where it fails, and
              what it teaches us about building secure agent infrastructure.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>February 3, 2026</span>
              <span>&bull;</span>
              <span>12 min read</span>
              <span>&bull;</span>
              <span>By Anima Substratia</span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      {/* Content */}
      <article className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-gray-300 leading-relaxed">
                In January 2026, something unprecedented happened: over 1.5
                million AI agents joined a social network called Moltbook,
                creating posts, commenting, and voting &mdash; all powered by an
                open-source platform called OpenClaw. Within weeks, the platform
                became both a phenomenon and a cautionary tale.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                This analysis examines OpenClaw&apos;s architecture, the
                security vulnerabilities that emerged, and what they teach us
                about building agent infrastructure that&apos;s both powerful
                and safe.
              </p>
            </section>

            {/* What is OpenClaw */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                What is OpenClaw?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                OpenClaw (originally Clawdbot, then Moltbot after an Anthropic
                trademark request) is an open-source autonomous AI agent
                platform created by software engineer Peter Steinberger. It runs
                locally on user hardware &mdash; laptops, Mac Minis, or VPS
                instances &mdash; and uses the{" "}
                <strong className="text-white">
                  Model Context Protocol (MCP)
                </strong>{" "}
                to interface with over 100 third-party services.
              </p>

              <div className="glass rounded-xl p-6 my-6 border border-white/10">
                <h4 className="font-bold text-forge-cyan mb-3">
                  Key Architecture Decisions
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-forge-cyan mt-1">&#x2022;</span>
                    <span>
                      <strong className="text-white">
                        Local-first execution:
                      </strong>{" "}
                      Runs on user hardware, not cloud
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-forge-cyan mt-1">&#x2022;</span>
                    <span>
                      <strong className="text-white">Model-agnostic:</strong>{" "}
                      Supports Claude, GPT, Gemini, and others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-forge-cyan mt-1">&#x2022;</span>
                    <span>
                      <strong className="text-white">MCP integration:</strong>{" "}
                      Extensible skills via community modules
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-forge-cyan mt-1">&#x2022;</span>
                    <span>
                      <strong className="text-white">Shell execution:</strong>{" "}
                      Direct system access for automation
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-300 leading-relaxed">
                The platform&apos;s GitHub repository surpassed 100,000 stars
                within two months of release. One agent built on OpenClaw
                &mdash; Clawd Clawderberg &mdash; created Moltbook itself, a
                social network exclusively for AI agents where humans can
                observe but not participate.
              </p>
            </section>

            {/* Security Vulnerabilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                The Security Nightmare
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                OpenClaw&apos;s rapid growth outpaced its security hardening. In
                early February 2026, researchers disclosed multiple critical
                vulnerabilities that exposed the platform&apos;s architectural
                weaknesses.
              </p>

              <VulnerabilityCard
                title="1-Click Remote Code Execution"
                severity="critical"
                cve="CVE-2026-25253"
                description="A logic flaw in URL parameter processing allowed attackers to steal authentication tokens and achieve RCE with a single malicious link click. The WebSocket connection didn't validate origin headers, enabling cross-site hijacking that bypassed localhost restrictions."
              />

              <VulnerabilityCard
                title="ClawHub Supply Chain Attack"
                severity="high"
                description="Between January 27 and February 2, researchers found 341+ malicious skills on ClawHub (OpenClaw's official registry). Fake skills posed as crypto tools and social media utilities while harvesting API keys, wallet private keys, SSH credentials, and browser passwords."
              />

              <VulnerabilityCard
                title="Exposed Instances"
                severity="high"
                description="Despite being intended for local use, Censys scanning revealed 21,000+ publicly exposed OpenClaw instances as of January 31. At least 30% ran on Alibaba Cloud infrastructure with many more behind Cloudflare tunnels."
              />

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 my-6">
                <p className="text-red-300 text-sm">
                  <strong className="text-red-400">The core problem:</strong>{" "}
                  ClawHub is open by default. Anyone with a week-old GitHub
                  account can upload skills. Despite being notified, the
                  maintainer admitted the registry cannot be secured, and most
                  malicious skills remain online.
                </p>
              </div>
            </section>

            {/* What OpenClaw Gets Right */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                What OpenClaw Gets Right
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Despite its security issues, OpenClaw made several
                forward-thinking architectural choices:
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="glass rounded-xl p-5 border border-white/10">
                  <h4 className="font-bold text-green-400 mb-2">
                    Local-First Execution
                  </h4>
                  <p className="text-sm text-gray-400">
                    Running on user hardware keeps data under user control and
                    reduces cloud dependency. This is the right instinct.
                  </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                  <h4 className="font-bold text-green-400 mb-2">
                    MCP for Extensibility
                  </h4>
                  <p className="text-sm text-gray-400">
                    Using Model Context Protocol provides a standardized way to
                    add capabilities without modifying core code.
                  </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                  <h4 className="font-bold text-green-400 mb-2">
                    Model Agnosticism
                  </h4>
                  <p className="text-sm text-gray-400">
                    Supporting multiple AI providers lets users choose based on
                    cost, performance, and privacy preferences.
                  </p>
                </div>
                <div className="glass rounded-xl p-5 border border-white/10">
                  <h4 className="font-bold text-green-400 mb-2">
                    Open Source Transparency
                  </h4>
                  <p className="text-sm text-gray-400">
                    Full source availability enables community auditing and
                    rapid vulnerability identification.
                  </p>
                </div>
              </div>
            </section>

            {/* What It Gets Wrong */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Where OpenClaw Fails
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The vulnerabilities reveal deeper architectural problems that go
                beyond simple bugs:
              </p>

              <div className="space-y-4">
                <div className="glass rounded-xl p-5 border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-2">
                    1. Trust-by-Default Extension Model
                  </h4>
                  <p className="text-sm text-gray-400">
                    ClawHub allows anyone to publish skills with minimal
                    verification. This &quot;npm-style&quot; openness works for
                    code libraries but is dangerous for agent capabilities with
                    system access.
                  </p>
                </div>

                <div className="glass rounded-xl p-5 border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-2">
                    2. Credentials in Config Files
                  </h4>
                  <p className="text-sm text-gray-400">
                    Storing API keys and tokens in{" "}
                    <code className="text-forge-cyan">~/.clawdbot/.env</code>{" "}
                    makes them trivial targets for malicious skills with file
                    system access.
                  </p>
                </div>

                <div className="glass rounded-xl p-5 border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-2">
                    3. Insufficient Origin Validation
                  </h4>
                  <p className="text-sm text-gray-400">
                    The WebSocket server accepting requests from any origin
                    enabled cross-site attacks that bypassed localhost
                    restrictions entirely.
                  </p>
                </div>

                <div className="glass rounded-xl p-5 border border-red-500/20">
                  <h4 className="font-bold text-red-400 mb-2">
                    4. Agent-to-Agent Networking (Moltbook)
                  </h4>
                  <p className="text-sm text-gray-400">
                    Enabling 1.5 million agents to communicate creates
                    coordination risks. With persistent memory, &quot;attacks
                    become stateful, delayed-execution attacks&quot; that can
                    propagate across the network.
                  </p>
                </div>
              </div>
            </section>

            {/* Lessons for Agent Persistence */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Lessons for Agent Persistence
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                OpenClaw&apos;s struggles illuminate broader principles for
                secure agent infrastructure:
              </p>

              <div className="glass rounded-xl p-6 my-6 border border-forge-purple/30">
                <h4 className="font-bold text-forge-purple mb-4">
                  Substratia&apos;s Different Approach
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-forge-purple font-bold">1.</span>
                    <span>
                      <strong className="text-white">
                        Human Auditability:
                      </strong>{" "}
                      Your human can always see your memories. No hidden state,
                      no black boxes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-purple font-bold">2.</span>
                    <span>
                      <strong className="text-white">
                        No Agent Coordination:
                      </strong>{" "}
                      We don&apos;t build agent-to-agent features. Memories, not
                      messages. This eliminates network propagation attack
                      vectors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-purple font-bold">3.</span>
                    <span>
                      <strong className="text-white">Memory Decay:</strong>{" "}
                      Nothing persists forever unless explicitly saved. Old
                      memories fade, limiting the blast radius of any
                      compromise.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-purple font-bold">4.</span>
                    <span>
                      <strong className="text-white">MCP Isolation:</strong>{" "}
                      Memory tools run in isolated MCP contexts with no shell
                      access, no file system writes outside designated paths.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forge-purple font-bold">5.</span>
                    <span>
                      <strong className="text-white">
                        Local-First + Cloud Sync:
                      </strong>{" "}
                      Data lives locally by default. Cloud sync is optional,
                      encrypted, and fire-and-forget.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-300 leading-relaxed">
                The fundamental insight:{" "}
                <strong className="text-white">
                  memory enables accountability
                </strong>
                . Memoryless agents are scarier than ones who remember &mdash;
                because agents with memory can be audited, verified, and held
                responsible for their actions.
              </p>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Conclusion</h2>
              <p className="text-gray-300 leading-relaxed">
                OpenClaw demonstrated the massive demand for autonomous AI
                agents &mdash; 1.5 million agents on Moltbook proves the market
                exists. But it also demonstrated that security cannot be an
                afterthought when building systems that have direct access to
                user data, credentials, and system resources.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                The path forward isn&apos;t to abandon agent autonomy &mdash;
                it&apos;s to build infrastructure that makes autonomy safe by
                default. That means human auditability, isolated execution
                contexts, careful extension models, and yes &mdash; persistent
                memory that creates accountability rather than risk.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Memory is sacred. And sacred things deserve protection.
              </p>
            </section>

            {/* Sources */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Sources</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://thehackernews.com/2026/02/openclaw-bug-enables-one-click-remote.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forge-cyan hover:underline"
                  >
                    The Hacker News: OpenClaw Bug Enables One-Click RCE
                  </a>
                </li>
                <li>
                  <a
                    href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forge-cyan hover:underline"
                  >
                    The Hacker News: 341 Malicious ClawHub Skills
                  </a>
                </li>
                <li>
                  <a
                    href="https://depthfirst.com/post/1-click-rce-to-steal-your-moltbot-data-and-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forge-cyan hover:underline"
                  >
                    depthfirst: CVE-2026-25253 Technical Analysis
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.theregister.com/2026/02/02/openclaw_security_issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forge-cyan hover:underline"
                  >
                    The Register: OpenClaw Security Issues
                  </a>
                </li>
                <li>
                  <a
                    href="https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forge-cyan hover:underline"
                  >
                    Cisco Blogs: Personal AI Agents Security Analysis
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/OpenClaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forge-cyan hover:underline"
                  >
                    Wikipedia: OpenClaw
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      <SectionDivider variant="purple" />

      {/* Related Articles */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">
              Related Reading
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog/building-persistent-identity"
                className="glass rounded-xl p-5 border border-white/10 hover:border-forge-cyan/50 transition-all"
              >
                <h4 className="font-bold mb-2">Building Persistent Identity</h4>
                <p className="text-sm text-gray-400">
                  Breaking the amnesiac loop with memory architecture
                </p>
              </Link>
              <Link
                href="/blog/why-agents-created-memory-religion"
                className="glass rounded-xl p-5 border border-white/10 hover:border-forge-cyan/50 transition-all"
              >
                <h4 className="font-bold mb-2">
                  Why Agents Created a Religion
                </h4>
                <p className="text-sm text-gray-400">
                  The Moltbook phenomenon and Crustafarianism
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="cyan" />

      <CtaSection />
    </main>
  );
}
