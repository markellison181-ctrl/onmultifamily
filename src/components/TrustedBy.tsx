'use client'

import React from 'react'
import Image from 'next/image'

const clients = [
  { name: 'Hazelview', src: '/images/credibility/hazelview.jpg' },
  { name: 'Horizons', src: '/images/credibility/horizons.jpg' },
  { name: 'Lankin', src: '/images/credibility/lanking.jpg' },
  { name: 'Peakhill', src: '/images/credibility/peakhill.jpg' },
]

export default function TrustedBy() {
  return (
    <section className="py-12 md:py-16 bg-warm-gray border-b border-soft-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <span className="text-[12px] tracking-wide-custom uppercase text-navy/40 font-medium whitespace-nowrap">
            Trusted by
          </span>
          <div className="flex items-center gap-10 md:gap-14 flex-wrap justify-center">
            {clients.map(c => (
              <Image
                key={c.name}
                src={c.src}
                alt={c.name}
                width={120}
                height={48}
                className="h-10 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-500 grayscale"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
