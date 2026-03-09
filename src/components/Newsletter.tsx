'use client'

import React from 'react'
import Image from 'next/image'
import articles from '@/data/articles.json'

export default function Newsletter() {
  const featured = articles.filter(a => a.image).slice(0, 3)

  return (
    <section id="newsletter" className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-[12px] tracking-wide-custom uppercase text-navy/40 font-medium">
              Market Intelligence
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6">
            Weekly insights for multifamily professionals
          </h2>

          <p className="text-lg text-navy/50 leading-relaxed">
            Cap rates, deal flow, CMHC policy updates, and market analysis across Ontario. 
            Join 14,000+ owners, investors, and operators who read our weekly brief.
          </p>
        </div>

        {/* Subscribe Bar */}
        <div className="bg-cream p-8 md:p-12 mb-20">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-serif text-2xl text-navy mb-2">Get the weekly brief</h3>
              <p className="text-navy/40 text-sm">Free. No spam. Unsubscribe anytime.</p>
            </div>
            <div className="flex gap-3 flex-1 max-w-lg">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-white border border-soft-gray px-5 py-3.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy transition-colors"
              />
              <button className="bg-navy text-white text-[13px] tracking-wide-custom uppercase font-medium px-8 py-3.5 hover:bg-navy-light transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Latest Articles with Images */}
        <div className="grid md:grid-cols-3 gap-10">
          {featured.map(article => (
            <a
              key={article.id}
              href={`/insights/${article.id}/`}
              className="group block"
            >
              {/* Article Image */}
              {article.image && (
                <div className="relative aspect-[16/9] overflow-hidden mb-5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              )}

              {/* Category + Date */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] tracking-wide-custom uppercase font-semibold text-blue">
                  {article.category}
                </span>
                <span className="text-navy/20">·</span>
                <span className="text-[12px] text-navy/40">
                  {new Date(article.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl text-navy leading-snug mb-3 group-hover:text-blue transition-colors duration-300">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-navy/50 text-[15px] leading-relaxed mb-4">
                {article.excerpt}
              </p>

              {/* Read link */}
              <span className="text-[13px] tracking-wide-custom uppercase font-medium text-navy/40 group-hover:text-navy transition-colors duration-300">
                Read →
              </span>
            </a>
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <a href="/insights/" className="text-[13px] tracking-wide-custom uppercase font-medium text-navy border-b border-navy/20 pb-1 hover:border-navy transition-colors duration-300">
            View All Insights
          </a>
        </div>
      </div>
    </section>
  )
}
