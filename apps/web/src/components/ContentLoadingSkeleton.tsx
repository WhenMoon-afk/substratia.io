export default function ContentLoadingSkeleton() {
  return (
    <main className="min-h-screen text-white bg-forge-dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse mb-6" />

        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-10 w-3/4 bg-gray-700 rounded animate-pulse mb-3" />
          <div className="h-5 w-1/2 bg-gray-700/50 rounded animate-pulse mb-4" />
          <div className="flex gap-3">
            <div className="h-6 w-20 bg-gray-700/30 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-gray-700/30 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-11/12 bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-700/40 rounded animate-pulse" />

          {/* Image placeholder */}
          <div className="h-64 w-full bg-gray-700/20 rounded-xl animate-pulse my-6" />

          <div className="h-4 w-full bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-10/12 bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-700/40 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-700/40 rounded animate-pulse" />
        </div>

        {/* CTA skeleton */}
        <div className="mt-12 bg-gradient-to-r from-forge-purple/10 to-forge-cyan/10 rounded-2xl p-8">
          <div className="h-8 w-64 bg-gray-700 rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-96 bg-gray-700/50 rounded animate-pulse mx-auto mb-6" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-40 bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-12 w-32 bg-gray-700/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
