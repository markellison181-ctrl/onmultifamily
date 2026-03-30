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
    { label: 'Map', href: '/map/' },
    { label: 'Insights', href: '/insights/' },
    { label: 'Resources', href: '/resources/' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]' 
        : 'bg-transparent'
    }`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <a href="/" className="relative z-10 flex items-center gap-3 sm:gap-5">
            <Image
              src={scrolled ? '/images/logos/logo-dark.svg' : '/images/logos/logo.svg'}
              alt="OnMultifamily"
              width={180}
              height={40}
              className="h-7 sm:h-8 w-auto"
            />
            <div className={`w-px h-6 sm:h-7 ${scrolled ? 'bg-navy/15' : 'bg-white/20'}`} />
            <Image
              src="/images/logos/colliers.png"
              alt="Colliers"
              width={140}
              height={36}
              className={`h-8 sm:h-10 w-auto rounded-sm transition-all duration-500 ${
                scrolled ? 'opacity-90' : 'opacity-90'
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${
                  scrolled ? 'text-navy/45 hover:text-navy' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#valuation"
              className={`text-[11px] font-semibold tracking-[0.15em] uppercase px-6 py-2.5 transition-all duration-500 ${
                scrolled
                  ? 'bg-gradient-to-r from-gold to-gold-light text-navy hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                  : 'border border-gold/40 text-gold hover:bg-gold/10'
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
              menuOpen ? 'rotate-45 translate-y-[3px] bg-white' : (scrolled ? 'bg-navy' : 'bg-white')
            }`} />
            <span className={`block h-px w-full transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[3px] bg-white' : (scrolled ? 'bg-navy' : 'bg-white')
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-navy-deep z-40 pt-28 px-8 transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <nav className="flex flex-col gap-6">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl font-serif transition-all duration-500 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${menuOpen ? 'text-white' : 'text-white/0'}`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#valuation"
            onClick={() => setMenuOpen(false)}
            className={`text-[13px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-gold to-gold-light text-navy px-6 py-4 text-center mt-6 transition-all duration-500 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: menuOpen ? `${links.length * 60}ms` : '0ms' }}
          >
            Free Valuation
          </a>
        </nav>
      </div>
    </header>
  )
}
