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

  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const links = [
    { label: 'Listings', href: '/#listings' },
    // { label: 'Map', href: '/map/' }, // Hidden until map is ready
    { label: 'Insights', href: '/insights/' },
    { label: 'Resources', href: '/resources/', dropdown: [
      { label: 'CMHC Debt Calculator', href: '/resources/cmhc-calculator/', desc: 'Size your insured mortgage instantly' },
      { label: 'Bond Yield Tracker', href: '/resources/bond-yields/', desc: 'Live GoC yields and CMB spreads' },
      { label: 'Market Insights', href: '/insights/', desc: 'Weekly multifamily analysis' },
    ]},
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        menuOpen
          ? 'bg-navy-deep'
          : scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]' 
            : 'bg-transparent'
      }`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold transition-opacity duration-700 ${scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <a href="/" className="relative z-10 flex items-center gap-3 sm:gap-5">
              <Image
                src={scrolled && !menuOpen ? '/images/logos/logo-dark.svg' : '/images/logos/logo.svg'}
                alt="OnMultifamily"
                width={180}
                height={40}
                className="h-7 sm:h-8 w-auto"
              />
              <div className={`w-px h-6 sm:h-7 ${scrolled && !menuOpen ? 'bg-navy/15' : 'bg-white/20'}`} />
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
              {links.map(link => 
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current)
                      setResourcesOpen(true)
                    }}
                    onMouseLeave={() => {
                      resourcesTimeout.current = setTimeout(() => setResourcesOpen(false), 150)
                    }}
                  >
                    <a
                      href={link.href}
                      className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-500 flex items-center gap-1 ${
                        scrolled ? 'text-navy/45 hover:text-navy' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <svg className={`w-3 h-3 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                      resourcesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}>
                      <div className="bg-white rounded shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-navy/5 py-2 min-w-[280px]">
                        {link.dropdown.map(item => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block px-5 py-3 hover:bg-navy/[0.03] transition-colors duration-200 group"
                          >
                            <div className="text-[12px] font-semibold tracking-[0.05em] text-navy group-hover:text-gold transition-colors duration-200">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-navy/40 mt-0.5">
                              {item.desc}
                            </div>
                          </a>
                        ))}
                        <div className="border-t border-navy/5 mt-1 pt-1">
                          <a
                            href={link.href}
                            className="block px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase font-medium text-navy/30 hover:text-gold transition-colors duration-200"
                          >
                            All Resources
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${
                    scrolled ? 'text-navy/45 hover:text-navy' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
                )
              )}
              <a
                href="/#valuation"
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
      </header>

      {/* Mobile Menu - OUTSIDE header to avoid stacking context issues */}
      <div className={`md:hidden fixed inset-0 bg-navy-deep z-[9999] pt-28 px-8 transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <nav className="flex flex-col gap-6">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-7 right-6 w-8 h-8 flex flex-col justify-center gap-1.5"
          >
            <span className="block h-px w-full rotate-45 translate-y-[3px] bg-white" />
            <span className="block h-px w-full -rotate-45 -translate-y-[3px] bg-white" />
          </button>

          {links.map((link, i) => (
            <div key={link.label}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-serif text-white border-b border-white/10 pb-4 block transition-all duration-500 ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
              {link.dropdown && (
                <div className={`pl-4 pb-2 space-y-2 transition-all duration-500 ${
                  menuOpen ? 'opacity-100' : 'opacity-0'
                }`} style={{ transitionDelay: menuOpen ? `${i * 60 + 30}ms` : '0ms' }}>
                  {link.dropdown.map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-[14px] text-white/40 hover:text-gold py-1.5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="/#valuation"
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
    </>
  )
}
