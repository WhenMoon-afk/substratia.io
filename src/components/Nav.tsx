'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/builder', label: 'Builder' },
    { href: '/templates', label: 'Tools' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Docs' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="border-b border-white/10 bg-forge-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-forge-cyan">Agent</span>Forge
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">by Substratia</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'text-forge-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/WhenMoon-afk/substratia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
