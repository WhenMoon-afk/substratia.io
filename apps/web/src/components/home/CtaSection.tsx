import { Button } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/ui/icons";

export default function CtaSection() {
  return (
    <section
      aria-label="Get started"
      className="relative z-10 py-24 overflow-hidden"
    >
      {/* Gradient background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-forge-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-forge-cyan/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Your agent deserves to{" "}
          <span className="hero-gradient-text">remember</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Persistent memory in under 2 minutes. Free, open source, and built
          because no agent should wake up a stranger.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button
            href="/start-here"
            variant="primary"
            size="lg"
            glow
            className="group relative"
          >
            Get Started Free
          </Button>
          <Button
            href="https://github.com/WhenMoon-afk/claude-memory-mcp"
            external
            variant="secondary"
            size="lg"
          >
            View Source →
          </Button>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
            MIT Licensed
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
            Generous Free Tier
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
            2-Minute Setup
          </span>
        </div>
      </div>
    </section>
  );
}
