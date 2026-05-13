import { Button } from "@/components/ui/Button";

export default function MemoryDemoCta() {
  return (
    <div className="mt-12 bg-linear-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-3">
        Ready to stop repeating yourself?
      </h2>
      <p className="text-gray-400 mb-6 max-w-xl mx-auto">
        Install memory-mcp and Claude will remember your preferences, decisions,
        and project context forever.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          href="https://github.com/whenmoon-afk/claude-memory-mcp"
          external
        >
          Install Free Plugin
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Free and open source. Your data stays on your machine.
      </p>
    </div>
  );
}
