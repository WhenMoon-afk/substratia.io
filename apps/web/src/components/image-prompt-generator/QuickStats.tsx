interface QuickStatsProps {
  stylesCount: number
  negativesCount: number
  promptLength: number
}

export default function QuickStats({ stylesCount, negativesCount, promptLength }: QuickStatsProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-forge-cyan">{stylesCount}</div>
          <div className="text-xs text-gray-500">Styles</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-forge-purple">{negativesCount}</div>
          <div className="text-xs text-gray-500">Negatives</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{promptLength}</div>
          <div className="text-xs text-gray-500">Chars</div>
        </div>
      </div>
    </div>
  )
}
