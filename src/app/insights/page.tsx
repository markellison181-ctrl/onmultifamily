import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import articlesData from '@/data/articles.json'

export default function InsightsPage() {
  const featured = articlesData.filter(a => a.featured)
  const recent = articlesData.filter(a => !a.featured)

  return (
    <main>
      <Header />
      
      {/* Hero */}
      <section className="bg-navy pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold" />
            <span className="text-[12px] tracking-wide-custom uppercase text-gold font-medium">
              Market Intelligence
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Insights & Analysis
          </h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
            Weekly analysis on Ontario multifamily markets. Cap rates, deal flow, 
            CMHC updates, and actionable guidance.
          </p>
        </div>
      </section>

      {/* Subscribe Bar */}
      <section className="bg-cream py-10">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-navy/50 text-sm whitespace-nowrap">
              Join 14,000+ professionals
            </p>
            <div className="flex gap-3 flex-1 w-full sm:w-auto">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-white border border-soft-gray px-5 py-3 text-sm text-navy placeholder:text-navy/30 focus:border-navy transition-colors"
              />
              <button className="bg-navy text-white text-[12px] tracking-wide-custom uppercase font-medium px-6 py-3 hover:bg-navy-light transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="space-y-16">
            {featured.map(article => (
              <Link
                key={article.id}
                href={`/insights/${article.id}/`}
                className="group block border-b border-soft-gray pb-16 last:border-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] tracking-wide-custom uppercase font-semibold text-blue">
                    {article.category}
                  </span>
                  <span className="text-navy/20">·</span>
                  <span className="text-[12px] text-navy/40">
                    {new Date(article.date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-navy/20">·</span>
                  <span className="text-[12px] text-navy/40">{article.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl text-navy leading-snug mb-4 group-hover:text-blue transition-colors duration-300">
                  {article.title}
                </h2>

                <p className="text-navy/50 text-[16px] leading-relaxed mb-6 max-w-3xl">
                  {article.excerpt}
                </p>

                <span className="text-[13px] tracking-wide-custom uppercase font-medium text-navy/30 group-hover:text-navy transition-colors duration-300">
                  Read Full Analysis →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent */}
      {recent.length > 0 && (
        <section className="py-20 md:py-28 bg-warm-gray">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <h2 className="font-serif text-3xl text-navy mb-12">Recent Insights</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {recent.map(article => (
                <Link
                  key={article.id}
                  href={`/insights/${article.id}/`}
                  className="group block"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] tracking-wide-custom uppercase font-semibold text-blue">
                      {article.category}
                    </span>
                    <span className="text-navy/20">·</span>
                    <span className="text-[12px] text-navy/40">{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-navy leading-snug mb-3 group-hover:text-blue transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-navy/40 text-[14px] leading-relaxed">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
