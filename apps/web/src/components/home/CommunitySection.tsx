"use client";

import { memo } from "react";

const directories = [
  { name: "PulseMCP", url: "https://pulsemcp.com/servers/whenmoon-memory" },
  {
    name: "Glama.ai",
    url: "https://glama.ai/mcp/servers/@WhenMoon-afk/claude-memory-mcp",
  },
  {
    name: "LobeHub",
    url: "https://lobehub.com/mcp/whenmoon-afk-claude-memory-mcp",
  },
  {
    name: "mcp.so",
    url: "https://mcp.so/server/claude-memory-mcp/WhenMoon-afk",
  },
  { name: "playbooks.com", url: "https://playbooks.com/mcp/whenmoon-memory" },
  {
    name: "awesome-mcp-servers",
    url: "https://github.com/TensorBlock/awesome-mcp-servers",
  },
];

interface CommunitySectionProps {
  githubStars: number | null;
  npmDownloads: number | null;
  statsLoading: boolean;
}

function StatSkeleton() {
  return (
    <span className="inline-block w-12 h-4 bg-gray-700 rounded animate-pulse" />
  );
}

function ExternalIcon() {
  return (
    <svg
      className="w-3 h-3 opacity-0 -translate-x-1 group-hover/dir:opacity-60 group-hover/dir:translate-x-0 transition-all duration-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export default memo(function CommunitySection({
  githubStars,
  npmDownloads,
  statsLoading,
}: CommunitySectionProps) {
  return (
    <section
      aria-label="Directory listings"
      className="relative z-10 py-24 bg-gradient-to-b from-transparent via-forge-dark-lighter/30 to-transparent"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-4">
          Listed on <span className="text-forge-cyan">9+ Directories</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          memory-mcp has been indexed by the MCP community with zero marketing
          spend.
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {directories.map((dir) => (
            <a
              key={dir.name}
              href={dir.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/dir inline-flex items-center gap-1.5 px-4 py-2.5 glass hover:bg-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{dir.name}</span>
              <ExternalIcon />
            </a>
          ))}
        </div>

        {/* Stats footer */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
          {statsLoading ? (
            <StatSkeleton />
          ) : (
            <>
              {githubStars && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <svg
                    className="w-4 h-4 text-forge-purple"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
                  </svg>
                  <span className="text-gray-400">
                    <span className="text-forge-purple font-medium">
                      {githubStars}
                    </span>{" "}
                    GitHub stars
                  </span>
                </div>
              )}
              {npmDownloads && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <svg
                    className="w-4 h-4 text-forge-cyan"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-8 4h16v-2H4v2z" />
                  </svg>
                  <span className="text-gray-400">
                    <span className="text-forge-cyan font-medium">
                      {npmDownloads.toLocaleString()}+
                    </span>{" "}
                    downloads/month
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
});
