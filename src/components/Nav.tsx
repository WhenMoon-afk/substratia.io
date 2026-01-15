'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { href: '/start-here', label: 'Start Here' },
    { href: '/cloud', label: 'Cloud', badge: 'New' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tools', label: 'Tools' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/blog', label: 'Blog' },
    { href: '/docs', label: 'Docs' },
  ]

  return (
    <nav className="border-b border-white/10 bg-forge-dark/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand/logo-icon.png"
              alt="Substratia"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="text-xl font-bold text-white">Substratia</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all flex items-center gap-1.5 ${
                  pathname === link.href
                    ? 'text-forge-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {'badge' in link && link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-forge-purple/30 text-forge-purple rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <a
              href="https://github.com/WhenMoon-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-all"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2 py-2 text-base font-medium transition-all flex items-center gap-2 ${
                    pathname === link.href
                      ? 'text-forge-cyan bg-forge-cyan/10 rounded-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {'badge' in link && link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-forge-purple/30 text-forge-purple rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <a
                href="https://github.com/WhenMoon-afk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 text-base text-gray-400 hover:text-white transition-all"
              >
                GitHub →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
