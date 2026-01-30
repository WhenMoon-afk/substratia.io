import Link from 'next/link'

export default function ProPage() {
  return (
    <main className="min-h-screen text-white relative">
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      <section className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              All Tools Are <span className="text-forge-cyan">Free</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              All Substratia tools are open source and free to use.
              No paid tiers, no subscriptions needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/start-here"
                className="px-8 py-4 bg-forge-cyan text-forge-dark font-bold text-lg rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan text-center"
              >
                Get Started
              </Link>
              <Link
                href="/tools"
                className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-xl font-semibold text-lg transition-all text-center"
              >
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
