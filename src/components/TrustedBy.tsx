'use client'

import React from 'react'
import Image from 'next/image'

const clients = [
  { name: 'University of Toronto', src: '/images/credibility/uoft.svg' },
  { name: 'Hazelview', src: '/images/credibility/hazelview.jpg' },
  { name: 'Horizons', src: '/images/credibility/horizons.jpg' },
  { name: 'Lankin', src: '/images/credibility/lankin.jpg' },
  { name: 'Peakhill', src: '/images/credibility/peakhill.jpg' },
]

export default function TrustedBy() {
  // Double the array for seamless loop
  const doubled = [...clients, ...clients]

  return (
    <section className="relative py-14 md:py-16 bg-charcoal overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/25 font-medium whitespace-nowrap flex-shrink-0">
            Trusted by leading institutions
          </span>
          <div className="w-px h-6 bg-white/10 hidden md:block flex-shrink-0" />
          
          {/* Scrolling marquee container */}
          <div className="relative flex-1 overflow-hidden mask-edges">
            <div className="flex items-center gap-16 animate-marquee">
              {doubled.map((c, i) => (
                <div key={`${c.name}-${i}`} className="flex-shrink-0">
                  <div className="bg-white rounded-md px-4 py-2 flex items-center justify-center h-12">
                    <Image
                      src={c.src}
                      alt={c.name}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  )
}
