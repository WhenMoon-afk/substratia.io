'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: '/templates', label: 'Memory' },
    { href: '/tools', label: 'Tools' },
    { href: '/builder', label: 'Builder' },
    { href: '/pricing', label: 'Pricing' },
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
              href="https://github.com/WhenMoon-afk"
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
