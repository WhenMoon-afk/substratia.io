import Link from "next/link";

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
          Ready to Build{" "}
          <span className="hero-gradient-text">Something Great</span>?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Get started in under 2 minutes. Free, open source, and built for
          developers who ship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/start-here"
            className="group relative px-8 py-4 bg-forge-cyan text-forge-dark font-semibold text-lg rounded-xl transition-all glow-cyan hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started Free
            <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a
            href="https://github.com/WhenMoon-afk/claude-memory-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass rounded-xl text-gray-300 hover:text-white font-medium transition-all hover:border-white/20"
          >
            View Source →
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            MIT Licensed
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            No Signup Required
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            2-Minute Setup
          </span>
        </div>
      </div>
    </section>
  );
}
