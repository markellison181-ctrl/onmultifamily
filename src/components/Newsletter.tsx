'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import articles from '@/data/articles.json'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const featured = articles.filter(a => a.image).slice(0, 3)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="newsletter" className="relative py-24 sm:py-32 md:py-44 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cream to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
            <span className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-navy/35 font-medium">
              Market Intelligence
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-navy leading-[1.05] mb-5 sm:mb-6">
            Weekly insights for
            <br />
            <span className="text-gradient-gold">multifamily professionals</span>
          </h2>

          <p className="text-[15px] sm:text-[17px] text-navy/45 leading-[1.75]">
            Cap rates, deal flow, CMHC policy updates, and market analysis across Ontario. 
            Join 14,000+ owners, investors, and operators who read our weekly brief.
          </p>
        </div>

        {/* Subscribe Bar */}
        <div className="relative bg-navy-deep p-8 sm:p-10 md:p-14 mb-16 sm:mb-24 overflow-hidden noise">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">Get the weekly brief</h3>
              <p className="text-white/30 text-[13px] sm:text-[14px]">Free. No spam. Unsubscribe anytime. Join 14,000+ professionals.</p>
            </div>
            {submitted ? (
              <div className="flex items-center gap-3 flex-1 sm:max-w-lg py-4">
                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[13px] text-white/60 tracking-wide">You&apos;re subscribed. Look for the first issue in your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 flex-1 sm:max-w-lg">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="flex-1 bg-white/5 border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/25 focus:border-gold/50 focus:bg-white/8 transition-all duration-300 outline-none"
                />
                <button type="submit" className="bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] tracking-[0.15em] uppercase font-bold px-8 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Latest Articles */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {featured.map((article, i) => (
            <a
              key={article.id}
              href={`/insights/${article.id}/`}
              className="group block hover-lift"
            >
              {article.image && (
                <div className="relative aspect-[16/9] overflow-hidden mb-5 sm:mb-6">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 to-transparent" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-bold text-gold">
                  {article.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-navy/15" />
                <span className="text-[11px] sm:text-[12px] text-navy/30">
                  {new Date(article.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl md:text-[1.4rem] text-navy leading-snug mb-3 group-hover:text-gold-dark transition-colors duration-500">
                {article.title}
              </h3>

              <p className="text-navy/40 text-[13px] sm:text-[14px] leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <a href="/insights/" className="group inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-medium text-navy/50 hover:text-navy transition-colors duration-300">
            View All Insights
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
