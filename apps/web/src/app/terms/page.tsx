import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service | Substratia",
  description:
    "Terms of service for Substratia - rules and guidelines for using our services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-forge-dark py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert prose-cyan max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-300 mb-4">
              By accessing or using Substratia (&quot;the Service&quot;), you
              agree to be bound by these Terms of Service. If you do not agree,
              please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Description of Service
            </h2>
            <p className="text-gray-300 mb-4">
              Substratia provides memory infrastructure tools for AI, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Free open-source tools (momentum, memory-mcp)</li>
              <li>Web-based tools and utilities</li>
              <li>Memory dashboard for viewing and managing data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              User Accounts
            </h2>
            <p className="text-gray-300 mb-4">
              To access certain features, you must create an account. You are
              responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Acceptable Use
            </h2>
            <p className="text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Upload malicious content or malware</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Use the Service to harm or exploit others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              User Content
            </h2>
            <p className="text-gray-300 mb-4">
              You retain ownership of any content you upload to the Service. By
              uploading content, you grant us a limited license to store and
              process it solely to provide the Service.
            </p>
            <p className="text-gray-300 mb-4">
              You are responsible for ensuring you have the right to upload any
              content and that it does not violate any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Open Source Tools
            </h2>
            <p className="text-gray-300 mb-4">
              Our open-source tools (momentum, memory-mcp) are provided under
              the MIT License. These tools are provided &quot;as is&quot;
              without warranty of any kind.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Paid Services
            </h2>
            <p className="text-gray-300 mb-4">
              For paid tiers (Pro, Team, Enterprise):
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Payments are processed securely through Stripe</li>
              <li>Subscriptions renew automatically unless cancelled</li>
              <li>Refunds are handled on a case-by-case basis</li>
              <li>
                We reserve the right to change pricing with 30 days notice
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-300 mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF
              ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL
              DAMAGES.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Termination
            </h2>
            <p className="text-gray-300 mb-4">
              We may terminate or suspend your account at any time for
              violations of these terms. You may delete your account at any time
              through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-300 mb-4">
              We may update these terms from time to time. Continued use of the
              Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
            <p className="text-gray-300">
              For questions about these terms, please open an issue on our{" "}
              <a
                href={siteConfig.links.repos.website}
                className="text-forge-cyan hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="text-forge-cyan hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
