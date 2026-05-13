"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import RelatedTools from "@/components/RelatedTools";
import CheatSection from "@/components/CheatSection";
import { CommandList, ShortcutList } from "@/components/CheatList";
import Tip from "@/components/Tip";
import { newsletterUrl } from "@/lib/site-config";
import { downloadMarkdown as downloadMdFile } from "@/lib/file-utils";
import {
  commandGroups,
  shortcutGroups,
  claudeMdPatterns,
  promptPatterns,
  mcpExampleConfig,
  mcpServers,
  mcpConfigLocations,
  tips,
  slashCommandsContent,
  shortcutsContent,
  claudeMdContent,
  promptsContent,
  mcpContent,
  tipsContent,
} from "@/data/cheatSheetData";

export default function CheatSheetPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Open Substack subscription in new tab with email pre-filled
    window.open(
      newsletterUrl(email, "cheat-sheet"),
      "_blank",
      "noopener,noreferrer",
    );

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const copySection = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Scroll to section from URL hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  // Download as markdown
  const downloadMarkdown = useCallback(() => {
    const content = `# Claude Code Cheat Sheet

## Slash Commands
${slashCommandsContent}

## Keyboard Shortcuts
${shortcutsContent}

## CLAUDE.md Template
\`\`\`markdown
${claudeMdContent}
\`\`\`

## Power Prompts
${promptsContent}

## MCP Configuration
\`\`\`json
${mcpContent}
\`\`\`

## Pro Tips
${tipsContent}

---
Downloaded from substratia.io/tools/cheat-sheet
`;
    downloadMdFile(content, "claude-code-cheat-sheet.md");
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      {/* Header */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/tools"
              className="text-forge-cyan hover:underline text-sm"
            >
              ← Back to Tools
            </Link>
            <ShareButton title="Claude Code Cheat Sheet - Substratia" />
          </div>
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-400 mb-4">
              Free Resource
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Claude Code <span className="text-forge-cyan">Cheat Sheet</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              The essential reference for Claude Code power users. Commands,
              shortcuts, CLAUDE.md patterns, and advanced techniques.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
              >
                Print / Save PDF
              </button>
              <button
                onClick={downloadMarkdown}
                className="px-4 py-2 bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan rounded-lg text-sm transition-all"
              >
                Download .md
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cheat Sheet Content */}
      <section className="relative z-10 py-8 print:py-0">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8 print:space-y-4">
            {/* Slash Commands */}
            <CheatSection
              id="slash-commands"
              title="Slash Commands"
              onCopy={copySection}
              copied={copiedSection === "slash-commands"}
              content={slashCommandsContent}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {commandGroups.map((group) => (
                  <div key={group.title}>
                    <h4
                      className={`text-sm font-semibold ${group.colorClass} mb-2`}
                    >
                      {group.title}
                    </h4>
                    <CommandList commands={group.commands} />
                  </div>
                ))}
              </div>
            </CheatSection>

            {/* Keyboard Shortcuts */}
            <CheatSection
              id="shortcuts"
              title="Keyboard Shortcuts"
              onCopy={copySection}
              copied={copiedSection === "shortcuts"}
              content={shortcutsContent}
            >
              <div className="grid md:grid-cols-3 gap-4">
                {shortcutGroups.map((group) => (
                  <div key={group.title}>
                    <h4
                      className={`text-sm font-semibold ${group.colorClass} mb-2`}
                    >
                      {group.title}
                    </h4>
                    <ShortcutList shortcuts={group.shortcuts} />
                  </div>
                ))}
              </div>
            </CheatSection>

            {/* CLAUDE.md Patterns */}
            <CheatSection
              id="claude-md"
              title="CLAUDE.md Patterns"
              onCopy={copySection}
              copied={copiedSection === "claude-md"}
              content={claudeMdContent}
            >
              <div className="space-y-4">
                {claudeMdPatterns.map((pattern) => (
                  <div key={pattern.title} className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-forge-purple mb-2">
                      {pattern.title}
                    </h4>
                    <pre className="text-xs bg-black/50 rounded-sm p-3 overflow-x-auto">
                      {pattern.code}
                    </pre>
                  </div>
                ))}
              </div>
            </CheatSection>

            {/* Prompt Patterns */}
            <CheatSection
              id="prompts"
              title="Power User Prompt Patterns"
              onCopy={copySection}
              copied={copiedSection === "prompts"}
              content={promptsContent}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {promptPatterns.map((pattern) => (
                  <div key={pattern.title} className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-forge-cyan mb-2">
                      {pattern.title}
                    </h4>
                    <pre className="text-xs bg-black/50 rounded-sm p-2 overflow-x-auto whitespace-pre-wrap">
                      {pattern.prompt}
                    </pre>
                  </div>
                ))}
              </div>
            </CheatSection>

            {/* MCP Configuration */}
            <CheatSection
              id="mcp"
              title="MCP Server Configuration"
              onCopy={copySection}
              copied={copiedSection === "mcp"}
              content={mcpContent}
            >
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-forge-purple mb-2">
                    Location: ~/.claude/claude_desktop_config.json
                  </h4>
                  <pre className="text-xs bg-black/50 rounded-sm p-3 overflow-x-auto">
                    {mcpExampleConfig}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-forge-cyan mb-2">
                      Popular MCP Servers
                    </h4>
                    <ul className="text-xs space-y-1 text-gray-300">
                      {mcpServers.map((s) => (
                        <li key={s.name}>
                          <span className="text-forge-cyan">{s.name}</span> -{" "}
                          {s.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-forge-cyan mb-2">
                      Config Locations
                    </h4>
                    <ul className="text-xs space-y-1 text-gray-300">
                      {mcpConfigLocations.map((l) => (
                        <li key={l.platform}>
                          <span className="text-gray-500">{l.platform}:</span>{" "}
                          {l.path}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CheatSection>

            {/* Tips & Tricks */}
            <CheatSection
              id="tips"
              title="Pro Tips"
              onCopy={copySection}
              copied={copiedSection === "tips"}
              content={tipsContent}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {tips.slice(0, 4).map((tip) => (
                    <Tip key={tip.title} emoji={tip.emoji} title={tip.title}>
                      {tip.text}
                    </Tip>
                  ))}
                </div>
                <div className="space-y-3">
                  {tips.slice(4).map((tip) => (
                    <Tip key={tip.title} emoji={tip.emoji} title={tip.title}>
                      {tip.text}
                    </Tip>
                  ))}
                </div>
              </div>
            </CheatSection>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="relative z-10 py-12 print:hidden">
        <div className="container mx-auto px-4">
          <RelatedTools currentPath="/tools/cheat-sheet" />
        </div>
      </section>

      {/* Email Capture */}
      <section className="relative z-10 py-16 print:hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Get More Claude Code Tips
            </h2>
            <p className="text-gray-400 mb-6">
              Join the newsletter for weekly tips, new tool announcements, and
              advanced techniques.
            </p>
            {status === "success" ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-300">
                Almost there! Complete signup in the Substack tab.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter subscription"
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-hidden focus:border-forge-cyan transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-12 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">Want to dive deeper?</p>
          <Link
            href="/docs"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
          >
            Explore Documentation
          </Link>
        </div>
      </section>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .neural-bg,
          .gradient-mesh,
          nav,
          footer {
            display: none !important;
          }
          .glass {
            background: white !important;
            border: 1px solid #ddd !important;
          }
          * {
            color: black !important;
          }
          pre {
            background: #f5f5f5 !important;
          }
          .text-forge-cyan,
          .text-forge-purple {
            color: #333 !important;
            font-weight: bold;
          }
        }
      `}</style>
    </main>
  );
}
