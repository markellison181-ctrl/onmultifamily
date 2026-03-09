'use client'

import React from 'react'

export default function ValuationCTA() {
  return (
    <section id="valuation" className="py-20 sm:py-28 md:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="w-8 sm:w-12 h-px bg-gold" />
            <span className="text-[11px] sm:text-[12px] tracking-wide-custom uppercase text-navy/40 font-medium">
              Complimentary
            </span>
            <div className="w-8 sm:w-12 h-px bg-gold" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy leading-tight mb-5 sm:mb-6">
            Considering your options?
          </h2>

          <p className="text-base sm:text-lg text-navy/50 leading-relaxed mb-3 sm:mb-4 max-w-2xl mx-auto">
            Whether you&apos;re exploring a sale, refinancing, or simply want to understand 
            your building&apos;s current market position — we provide confidential, 
            complimentary opinions of value for apartment buildings across Ontario.
          </p>

          <p className="text-[13px] sm:text-[15px] text-navy/40 mb-10 sm:mb-12 max-w-xl mx-auto">
            We have closed 81% of every listing we have ever taken on. When you&apos;re ready, 
            we are the team you want in your corner.
          </p>

          <a
            href="#contact"
            className="inline-block bg-navy text-white text-[12px] sm:text-[13px] tracking-wide-custom uppercase font-medium px-10 sm:px-12 py-3.5 sm:py-4 hover:bg-navy-light transition-colors duration-300"
          >
            Request a Valuation
          </a>
        </div>
      </div>
    </section>
  )
}
