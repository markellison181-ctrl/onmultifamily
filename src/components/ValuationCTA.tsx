'use client'

import React from 'react'

export default function ValuationCTA() {
  return (
    <section id="valuation" className="relative py-28 sm:py-36 md:py-48 bg-navy-deep overflow-hidden noise">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[200px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-10 sm:mb-14">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-gold-light font-medium">
              Complimentary
            </span>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white leading-[0.95] mb-6 sm:mb-8">
            Considering your
            <br />
            <span className="text-gradient-gold">options?</span>
          </h2>

          <p className="text-[15px] sm:text-[17px] text-white/40 leading-[1.75] mb-4 sm:mb-5 max-w-2xl mx-auto">
            Whether you&apos;re exploring a sale, refinancing, or simply want to understand 
            your building&apos;s current market position — we provide confidential, 
            complimentary opinions of value for apartment buildings across Ontario.
          </p>

          <p className="text-[13px] sm:text-[15px] text-white/25 mb-12 sm:mb-14 max-w-xl mx-auto">
            We have closed 81% of every listing we have ever taken on. 
            When you&apos;re ready, we are the team you want in your corner.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] tracking-[0.15em] uppercase font-bold px-12 sm:px-14 py-5 hover:shadow-[0_0_50px_rgba(201,168,76,0.3)] transition-all duration-500"
          >
            Request a Valuation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
