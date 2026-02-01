import Link from "next/link";

export default function MemoryDemoCta() {
  return (
    <div className="mt-12 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-3">
        Ready to stop repeating yourself?
      </h2>
      <p className="text-gray-400 mb-6 max-w-xl mx-auto">
        Install memory-mcp and Claude will remember your preferences, decisions,
        and project context forever.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="https://github.com/whenmoon-afk/claude-memory-mcp"
          className="px-6 py-3 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Install Free Plugin
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Free and open source. Your data stays on your machine.
      </p>
    </div>
  );
}
