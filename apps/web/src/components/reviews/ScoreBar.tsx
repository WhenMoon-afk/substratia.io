export function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{score}/100</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-forge-purple to-forge-cyan rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
