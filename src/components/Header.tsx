'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Listings', href: '#listings' },
    { label: 'Insights', href: '/insights/' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="relative z-10">
            <Image
              src={scrolled ? '/images/logos/logo-dark.svg' : '/images/logos/logo.svg'}
              alt="OnMultifamily"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-medium tracking-wide-custom uppercase transition-colors duration-300 ${
                  scrolled ? 'text-navy/70 hover:text-navy' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#valuation"
              className={`text-[13px] font-medium tracking-wide-custom uppercase px-6 py-2.5 border transition-all duration-300 ${
                scrolled
                  ? 'border-navy text-navy hover:bg-navy hover:text-white'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              Free Valuation
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center gap-1.5"
          >
            <span className={`block h-px w-full transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[3px] bg-navy' : (scrolled ? 'bg-navy' : 'bg-white')
            }`} />
            <span className={`block h-px w-full transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[3px] bg-navy' : (scrolled ? 'bg-navy' : 'bg-white')
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-24 px-8">
          <nav className="flex flex-col gap-8">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-serif text-navy"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#valuation"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-navy border border-navy px-6 py-3 text-center mt-4"
            >
              Free Valuation
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
