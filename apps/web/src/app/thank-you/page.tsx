import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You | Substratia',
  description: 'Thank you for your purchase!',
  robots: 'noindex',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-forge-cyan/20 rounded-full mb-6">
            <svg
              className="w-16 h-16 text-forge-cyan"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your purchase was successful. Check your email for download instructions.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
          <ul className="text-left text-gray-300 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-forge-cyan font-bold">1.</span>
              <span>Check your email for the download link (may take a few minutes)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forge-cyan font-bold">2.</span>
              <span>Download and extract the files to your project</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-forge-cyan font-bold">3.</span>
              <span>Follow the integration guide included in your download</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Didn&apos;t receive an email? Check your spam folder or contact{' '}
            <a href="mailto:support@substratia.io" className="text-forge-cyan hover:underline">
              support@substratia.io
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
            >
              Browse Tools
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-semibold transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
