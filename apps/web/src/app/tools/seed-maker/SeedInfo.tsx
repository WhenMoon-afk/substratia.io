export default function SeedInfo() {
  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="font-semibold text-forge-cyan mb-2">How it works</h3>
        <p className="text-xs text-gray-400 mb-3">
          This tool combines browser crypto APIs with entropy from your mouse
          movements to generate high-quality random strings.
        </p>
        <h3 className="font-semibold text-forge-cyan mb-2">Use cases</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>&bull; API keys and tokens</li>
          <li>&bull; Password generation</li>
          <li>&bull; Cryptographic seeds</li>
          <li>&bull; Provably fair gaming</li>
        </ul>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <p className="text-xs text-green-400">
          100% client-side. Nothing is sent to any server. Your seeds stay on
          your device.
        </p>
      </div>
    </>
  );
}
