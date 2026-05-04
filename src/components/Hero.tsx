'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useMailchimp } from '@/lib/mailchimp'

interface StatDef {
  prefix: string
  target: number
  suffix: string
  label: string
  decimals: number
  useLocale: boolean
}

function formatCount(n: number, decimals: number, useLocale: boolean): string {
  if (decimals > 0) return n.toFixed(decimals)
  if (useLocale) return Math.round(n).toLocaleString('en-CA')
  return Math.round(n).toString()
}

function StatCounter({ stat }: { stat: StatDef }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const animated = useRef(false)

  useEffect(() => {
    if (animated.current) return
    animated.current = true
    // Start immediately since hero is above the fold
    setStarted(true)
    const duration = 1800
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * stat.target)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [stat.target])

  return (
    <div className={`group transition-opacity duration-500 ${started ? 'opacity-100' : 'opacity-0'}`}>
      <div className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-white mb-2 number-display group-hover:text-gradient-gold transition-all duration-500">
        {stat.prefix}{formatCount(count, stat.decimals, stat.useLocale)}{stat.suffix}
      </div>
      <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/30 font-medium">{stat.label}</div>
    </div>
  )
}

const stats: StatDef[] = [
  { prefix: '$', target: 1.2, suffix: 'B+', label: 'Transactions', decimals: 1, useLocale: false },
  { prefix: '',  target: 81,   suffix: '%',  label: 'Close Rate',   decimals: 0, useLocale: false },
  { prefix: '',  target: 3000, suffix: '+',  label: 'Units Sold',   decimals: 0, useLocale: true },
  { prefix: '',  target: 14000,suffix: '+',  label: 'Subscribers',  decimals: 0, useLocale: true },
]

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const { status: mcStatus, message: mcMessage, subscribe } = useMailchimp()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) await subscribe(email)
  }

  return (
    <section className="relative min-h-[100svh] flex items-end bg-navy-deep overflow-hidden noise">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-img.png"
          alt=""
          fill
          className={`object-cover transition-all duration-[2s] ${loaded ? 'scale-100 opacity-20' : 'scale-110 opacity-0'}`}
          priority
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-transparent to-navy-deep/40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-deep to-transparent" />
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
            Colliers Multifamily, Ontario
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
          dispositions, and portfolio strategy.
        </p>

        {/* Sector Tags */}
        <div className={`flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16 opacity-0 ${loaded ? 'animate-fade-in-up stagger-2' : ''}`} style={{ animationDelay: '0.5s' }}>
          {['Apartments', 'Seniors Housing', 'Student Housing'].map((sector) => (
            <span
              key={sector}
              className="text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white/40 border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 hover:border-gold/30 hover:text-gold-light/60 transition-all duration-500"
            >
              {sector}
            </span>
          ))}
        </div>

        {/* Newsletter Signup - Primary CTA */}
        <div className={`mb-8 sm:mb-12 opacity-0 ${loaded ? 'animate-fade-in-up stagger-3' : ''}`}>
          <p className="text-[12px] sm:text-[13px] tracking-[0.1em] uppercase text-white/30 font-medium mb-3">
            Join 14,000+ apartment investors. Free weekly brief.
          </p>
          {mcStatus === 'success' ? (
            <div className="flex items-center gap-3 max-w-xl py-4">
              <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[13px] text-white/60 tracking-wide">{mcMessage}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="flex-1 bg-white/5 border border-white/15 px-5 py-4 text-sm text-white placeholder:text-white/25 focus:border-gold/50 focus:bg-white/8 transition-all duration-300 outline-none"
              />
              <button
                type="submit"
                disabled={mcStatus === 'loading'}
                className="bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase px-8 sm:px-10 py-4 transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] whitespace-nowrap disabled:opacity-50"
              >
                {mcStatus === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
              </button>
              {mcStatus === 'error' && (
                <p className="text-red-400 text-[12px] mt-1 sm:mt-0 sm:self-center">{mcMessage}</p>
              )}
            </form>
          )}
        </div>

        {/* Secondary CTA */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-20 sm:mb-28 opacity-0 ${loaded ? 'animate-fade-in-up stagger-3' : ''}`} style={{ animationDelay: '0.7s' }}>
          <a href="#listings" className="border border-white/20 text-white text-[12px] sm:text-[13px] font-medium tracking-[0.15em] uppercase px-10 sm:px-12 py-4 sm:py-5 hover:bg-white/5 hover:border-white/30 transition-all duration-500 text-center">
            Current Offerings
          </a>
        </div>

        {/* Stats */}
        <div className={`border-t border-white/10 pt-10 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-0 ${loaded ? 'animate-fade-in-up stagger-4' : ''}`}>
          {stats.map(stat => (
            <StatCounter key={stat.label} stat={stat} />
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
