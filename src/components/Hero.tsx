'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-end bg-navy-deep overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3s] ${loaded ? 'scale-100 opacity-30' : 'scale-110 opacity-0'}`}
        >
          <source src="/images/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Heavy overlay layers to dim + cinematic feel */}
        <div className="absolute inset-0 bg-navy-deep/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-transparent to-navy-deep/50" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy-deep to-transparent" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise opacity-50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent ml-[8%] hidden lg:block" />
      <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-gold/5 rounded-full blur-[100px] hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-16 sm:pb-24 md:pb-32 pt-32 sm:pt-40 w-full">
        {/* Eyebrow */}
        <div className={`flex items-center gap-3 mb-8 sm:mb-12 opacity-0 ${loaded ? 'animate-fade-in-up' : ''}`}>
          <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-gold to-gold-light" />
          <span className="text-[11px] sm:text-[13px] font-medium tracking-[0.2em] uppercase text-gold-light">
            Colliers Multifamily — Ontario
          </span>
        </div>

        {/* Headline */}
        <h1 className={`font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] text-white leading-[0.92] mb-8 sm:mb-10 max-w-5xl opacity-0 ${loaded ? 'animate-fade-in-up stagger-1' : ''}`}>
          Institutional advisory
          <br />
          <span className="text-gradient-gold">for multifamily</span>
          <br />
          owners
        </h1>

        {/* Subheadline */}
        <p className={`text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mb-12 sm:mb-16 leading-relaxed opacity-0 ${loaded ? 'animate-fade-in-up stagger-2' : ''}`}>
          We advise apartment building owners and investors across Ontario on acquisitions, 
          dispositions, and portfolio strategy. Over $1.12 billion in completed transactions.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-20 sm:mb-28 opacity-0 ${loaded ? 'animate-fade-in-up stagger-3' : ''}`}>
          <a href="#listings" className="group relative bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase px-10 sm:px-12 py-4 sm:py-5 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] text-center">
            Current Offerings
          </a>
          <a href="#newsletter" className="border border-white/20 text-white text-[12px] sm:text-[13px] font-medium tracking-[0.15em] uppercase px-10 sm:px-12 py-4 sm:py-5 hover:bg-white/5 hover:border-white/30 transition-all duration-500 text-center">
            Subscribe
          </a>
        </div>

        {/* Stats */}
        <div className={`border-t border-white/10 pt-10 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-0 ${loaded ? 'animate-fade-in-up stagger-4' : ''}`}>
          {[
            { number: '$1.12B+', label: 'Transactions' },
            { number: '81%', label: 'Close Rate' },
            { number: '3,000+', label: 'Units Sold' },
            { number: '14,000+', label: 'Subscribers' },
          ].map(stat => (
            <div key={stat.label} className="group">
              <div className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-white mb-2 number-display group-hover:text-gradient-gold transition-all duration-500">
                {stat.number}
              </div>
              <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/30 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 ${loaded ? 'animate-fade-in stagger-5' : ''}`}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
