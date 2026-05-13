export default function CardGridLoadingSkeleton() {
  return (
    <main className="min-h-screen text-white bg-forge-dark">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page title skeleton */}
        <div className="mb-8 text-center">
          <div className="h-10 w-48 bg-gray-700 rounded animate-pulse mx-auto mb-3" />
          <div className="h-5 w-80 bg-gray-700/50 rounded animate-pulse mx-auto" />
        </div>

        {/* Card grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="h-40 bg-gray-700/20 rounded-lg animate-pulse mb-4" />
              <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-700/40 rounded animate-pulse mb-1" />
              <div className="h-4 w-5/6 bg-gray-700/40 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
