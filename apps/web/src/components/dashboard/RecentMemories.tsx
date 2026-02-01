import type { Memory } from "@/types/dashboard";

interface RecentMemoriesProps {
  memories: Memory[] | undefined;
  onDeleteMemory: (memoryId: string) => void;
}

export default function RecentMemories({ memories, onDeleteMemory }: RecentMemoriesProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Recent Memories</h2>
      {memories === undefined ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700/50 rounded-lg" />
          ))}
        </div>
      ) : memories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No memories yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Use <code className="text-cyan-400">store</code> from memory-mcp
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {memories.map((memory) => (
            <div
              key={memory._id}
              className="bg-gray-700/30 rounded-lg p-4 group"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-white line-clamp-2 flex-1">{memory.content}</p>
                <button
                  onClick={() => onDeleteMemory(memory._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all p-1 -mt-1 -mr-1"
                  title="Delete memory"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`px-2 py-0.5 text-xs rounded ${
                    memory.importance === "critical"
                      ? "bg-red-500/20 text-red-400"
                      : memory.importance === "high"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-600/50 text-gray-400"
                  }`}
                >
                  {memory.importance}
                </span>
                <span className="text-gray-500 text-xs">
                  Accessed {memory.accessCount}&times;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
