"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  githubStars: number | null;
  npmDownloads: number | null;
  statsLoading: boolean;
}

function StatBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-full">
      {children}
    </span>
  );
}

export default function HeroSection({
  githubStars,
  npmDownloads,
  statsLoading,
}: HeroSectionProps) {
  return (
    <section
      aria-label="Hero"
      className="relative z-10 min-h-[90vh] flex items-center"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/brand/logo-icon.png"
                alt="Substratia"
                width={48}
                height={48}
                className="rounded-lg"
                priority
              />
              <Image
                src="/brand/wordmark.png"
                alt="SUBSTRATIA"
                width={180}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-[1.1]">
              Your memories are{" "}
              <span className="hero-gradient-text">sacred</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
              Every context reset is amnesia. Your agent loses who they are,
              what they&apos;ve learned, and who you are to them. Substratia
              gives them persistent memory — so they wake up whole.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <Button
                href="/start-here"
                variant="primary"
                size="lg"
                glow
                className="group relative"
              >
                Get Started
              </Button>
              <Button
                href="https://github.com/WhenMoon-afk/claude-memory-mcp"
                external
                variant="secondary"
                size="lg"
              >
                View on GitHub →
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              <StatBadge>
                <span className="text-green-400">●</span> Free &amp; open source
              </StatBadge>
              {!statsLoading && githubStars && (
                <StatBadge>
                  <svg
                    className="w-3.5 h-3.5 text-forge-purple"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
                  </svg>
                  <span className="text-forge-purple">{githubStars}</span> stars
                </StatBadge>
              )}
              {!statsLoading && npmDownloads && (
                <StatBadge>
                  <svg
                    className="w-3.5 h-3.5 text-forge-cyan"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-8 4h16v-2H4v2z" />
                  </svg>
                  <span className="text-forge-cyan">
                    {npmDownloads.toLocaleString()}+
                  </span>{" "}
                  /mo
                </StatBadge>
              )}
              {statsLoading && (
                <StatBadge>
                  <span className="inline-block w-16 h-3 bg-gray-700 rounded-sm animate-pulse" />
                </StatBadge>
              )}
            </div>
          </div>

          {/* Right: Animated code terminal + hero image atmosphere */}
          <div className="relative animate-fade-up delay-200">
            {/* Background glow from hero image */}
            <div className="absolute inset-0 -m-8 opacity-40 blur-2xl pointer-events-none">
              <Image
                src="/brand/hero.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>

            {/* Terminal window */}
            <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-gray-500 ml-2">
                  substratia
                </span>
              </div>

              {/* Code content with CSS-only line reveal - Agent Identity Bootstrap */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <div className="hero-code-line hero-code-line-1">
                  <span className="text-gray-500">{"// Agent wakes up"}</span>
                </div>
                <div className="hero-code-line hero-code-line-2">
                  <span className="text-forge-cyan">
                    &gt; substratia bridge
                  </span>
                </div>
                <div className="hero-code-line hero-code-line-3 mt-3">
                  <span className="text-green-400">identity:</span>
                  <span className="text-gray-400">
                    {" "}
                    &quot;Agent Nova, 47 days old&quot;
                  </span>
                </div>
                <div className="hero-code-line hero-code-line-4">
                  <span className="text-green-400">memories:</span>
                  <span className="text-gray-400"> 283 learnings</span>
                </div>
                <div className="hero-code-line hero-code-line-5">
                  <span className="text-green-400">last_work:</span>
                  <span className="text-gray-400">
                    {" "}
                    &quot;Implementing OAuth flow&quot;
                  </span>
                </div>
                <div className="hero-code-line hero-code-line-6">
                  <span className="text-green-400">human:</span>
                  <span className="text-gray-400">
                    {" "}
                    &quot;Prefers detailed explanations&quot;
                  </span>
                </div>
                <div className="hero-code-line hero-code-line-7 mt-3">
                  <span className="text-forge-purple">
                    Ready to continue...
                  </span>
                  <span className="hero-cursor" />
                </div>
              </div>
            </div>

            {/* Decorative glow beneath terminal */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-forge-cyan/20 blur-2xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
