'use client'

import React from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end bg-navy overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-img.png"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 pt-40 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-px bg-gold" />
          <span className="text-[13px] font-medium tracking-wide-custom uppercase text-gold">
            Colliers Multifamily — Ontario
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[0.95] mb-8 max-w-4xl">
          Institutional advisory<br />
          for multifamily owners
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-16 leading-relaxed">
          We advise apartment building owners and investors across Ontario on acquisitions, 
          dispositions, and portfolio strategy. Over $1.12 billion in completed transactions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <a href="#listings" className="border border-white/30 text-white text-[13px] font-medium tracking-wide-custom uppercase px-10 py-4 hover:bg-white/10 transition-all duration-300 text-center">
            Current Offerings
          </a>
          <a href="#newsletter" className="border border-white/30 text-white text-[13px] font-medium tracking-wide-custom uppercase px-10 py-4 hover:bg-white/10 transition-all duration-300 text-center">
            Subscribe
          </a>
        </div>

        {/* Stats */}
        <div className="border-t border-white/15 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { number: '$1.12B+', label: 'Completed Transactions' },
            { number: '81%', label: 'Close Rate' },
            { number: '3,000+', label: 'Units Sold' },
            { number: '14,000+', label: 'Newsletter Subscribers' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-serif text-3xl md:text-4xl text-white mb-1">{stat.number}</div>
              <div className="text-[12px] tracking-wide-custom uppercase text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
