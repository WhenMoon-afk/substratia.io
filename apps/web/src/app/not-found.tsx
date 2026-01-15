import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="text-forge-cyan">404</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/tools"
            className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-semibold transition-all"
          >
            Browse Tools
          </Link>
          <Link
            href="/start-here"
            className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-semibold transition-all"
          >
            Start Here
          </Link>
        </div>
      </div>
    </main>
  )
}
