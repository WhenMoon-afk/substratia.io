import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 bg-forge-dark">
      <div className="container mx-auto px-4 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Substratia.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-white transition-all">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-all">Terms</Link>
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
