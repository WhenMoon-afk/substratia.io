import Link from "next/link";
import Image from "next/image";
import { siteConfig, navLinks } from "@/lib/site-config";
import NewsletterCapture from "@/components/NewsletterCapture";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-12 bg-forge-dark">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="mb-10 pb-10 border-b border-white/5">
          <NewsletterCapture
            source="footer"
            heading={
              <>
                Stay updated on{" "}
                <span className="text-forge-cyan">agent memory</span>{" "}
                infrastructure
              </>
            }
            description="New tools, memory patterns, and research on persistent AI identity."
            centered
          />
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-icon.png"
              alt="Substratia"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold">Substratia</span>
            <span className="text-gray-500 text-sm hidden sm:inline">
              Memory Infrastructure for AI Agents
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-all"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="text-center md:text-left">
            <p className="font-mono">Intelligence is substrate-agnostic.</p>
            <p className="mt-1">Built by practitioners.</p>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-all"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-all">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
