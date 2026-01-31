import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Privacy Policy | Substratia',
  description: 'Privacy policy for Substratia - how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-forge-dark py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert prose-cyan max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-gray-300 mb-4">
              Substratia (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
              This policy explains how we collect, use, and safeguard your information when you use
              our website (substratia.io) and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>

            <h3 className="text-xl font-medium text-white mb-2">Account Information</h3>
            <p className="text-gray-300 mb-4">
              When you create an account, we collect your email address and name through our
              authentication provider (Clerk). This is necessary to provide you with our services.
            </p>

            <h3 className="text-xl font-medium text-white mb-2">User Content</h3>
            <p className="text-gray-300 mb-4">
              If you use the Substratia dashboard, we store the snapshots and memories you choose to save.
              This data is encrypted in transit and at rest.
            </p>

            <h3 className="text-xl font-medium text-white mb-2">Usage Data</h3>
            <p className="text-gray-300 mb-4">
              We collect anonymous usage data to improve our services, including page views and
              feature usage. We do not use third-party tracking cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To authenticate your identity</li>
              <li>To sync your data across devices (if you opt in)</li>
              <li>To send important service updates</li>
              <li>To improve our products and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>All data is transmitted over HTTPS</li>
              <li>API keys are SHA-256 hashed before storage</li>
              <li>Authentication is handled by Clerk with secure session management</li>
              <li>User data is isolated and scoped per account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 mb-4">We use the following third-party services:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Clerk</strong> - Authentication (see their <a href="https://clerk.com/privacy" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
              <li><strong>Convex</strong> - Database hosting (see their <a href="https://www.convex.dev/privacy" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
              <li><strong>Vercel</strong> - Website hosting (see their <a href="https://vercel.com/legal/privacy-policy" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-gray-300 mt-4">
              To exercise these rights, contact us through GitHub or your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
            <p className="text-gray-300 mb-4">
              We retain your data for as long as your account is active. If you delete your account,
              we will delete your personal data within 30 days, except where required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update this policy from time to time. We will notify you of significant changes
              via email or a notice on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
            <p className="text-gray-300">
              For privacy concerns, please open an issue on our{' '}
              <a href={siteConfig.links.repos.website} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub repository
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <Link href="/" className="text-cyan-400 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
