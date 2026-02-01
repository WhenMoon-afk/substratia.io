interface StripperStatsProps {
  inputLength: number;
  outputLength: number;
  charsRemoved: number;
  percentReduced: number;
  inputWords: number;
  outputWords: number;
}

export default function StripperStats({
  inputLength,
  outputLength,
  charsRemoved,
  percentReduced,
  inputWords,
  outputWords,
}: StripperStatsProps) {
  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-white">
            {inputLength.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Input Chars</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-forge-cyan">
            {outputLength.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Output Chars</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-forge-purple">
            {charsRemoved.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Removed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-400">
            {percentReduced}%
          </div>
          <div className="text-xs text-gray-500">Reduction</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">
            {inputWords.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Input Words</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-forge-cyan">
            {outputWords.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Output Words</div>
        </div>
      </div>
    </div>
  );
}
