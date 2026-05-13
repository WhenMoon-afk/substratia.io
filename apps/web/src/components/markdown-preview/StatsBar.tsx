interface StatsBarProps {
  characters: number
  words: number
  lines: number
}

export default function StatsBar({ characters, words, lines }: StatsBarProps) {
  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-white">{characters.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Characters</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-forge-cyan">{words.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Words</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-forge-purple">{lines}</div>
          <div className="text-xs text-gray-500">Lines</div>
        </div>
      </div>
    </div>
  )
}
