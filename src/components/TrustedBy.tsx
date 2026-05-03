'use client'

import React from 'react'
import Image from 'next/image'

const clients = [
  { name: 'Hazelview', src: '/images/credibility/hazelview.jpg' },
  { name: 'Horizons', src: '/images/credibility/horizons.jpg' },
  { name: 'Lankin', src: '/images/credibility/lankin.jpg' },
  { name: 'Peakhill', src: '/images/credibility/peakhill.jpg' },
]

export default function TrustedBy() {
  return (
    <section className="relative py-14 md:py-16 bg-charcoal overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/25 font-medium whitespace-nowrap">
            Trusted by leading institutions
          </span>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-12 md:gap-16 flex-wrap justify-center">
            {clients.map(c => (
              <Image
                key={c.name}
                src={c.src}
                alt={c.name}
                width={120}
                height={48}
                className="h-9 w-auto object-contain opacity-60 hover:opacity-90 transition-all duration-700 brightness-200 hover:brightness-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  )
}
