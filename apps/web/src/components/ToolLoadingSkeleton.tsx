export default function ToolLoadingSkeleton() {
  return (
    <main className="min-h-screen text-white bg-[#0a0a14]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-4 w-24 bg-gray-700 rounded-sm animate-pulse mb-4" />
          <div className="h-10 w-72 bg-gray-700 rounded-sm animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-700/50 rounded-sm animate-pulse" />
        </div>

        {/* Main content skeleton */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="h-6 w-48 bg-gray-700 rounded-sm animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-700/50 rounded-sm animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-700/50 rounded-sm animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-700/50 rounded-sm animate-pulse" />
              </div>
              <div className="mt-6 h-40 bg-gray-700/30 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="h-5 w-32 bg-gray-700 rounded-sm animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-700/30 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA skeleton */}
        <div className="mt-12 bg-linear-to-r from-forge-purple/10 to-forge-cyan/10 rounded-2xl p-8">
          <div className="h-8 w-64 bg-gray-700 rounded-sm animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-gray-700/50 rounded-sm animate-pulse mx-auto mb-6" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-40 bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-12 w-32 bg-gray-700/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
