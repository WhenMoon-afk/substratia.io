import type { Stats } from "@/types/dashboard";

interface StatsGridProps {
  stats: Stats | undefined;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm font-medium">Snapshots</h3>
        <p className="text-4xl font-bold text-white mt-2">
          {stats?.snapshotCount ?? "\u2014"}
        </p>
        <p className="text-gray-500 text-sm mt-1">Total saved</p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm font-medium">Memories</h3>
        <p className="text-4xl font-bold text-white mt-2">
          {stats?.memoryCount ?? "\u2014"}
        </p>
        <p className="text-gray-500 text-sm mt-1">Persistent memories</p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-gray-400 text-sm font-medium">Plan</h3>
        <p className="text-4xl font-bold text-cyan-400 mt-2 capitalize">
          {stats?.tier ?? "Free"}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Free & open source
        </p>
      </div>
    </div>
  );
}
