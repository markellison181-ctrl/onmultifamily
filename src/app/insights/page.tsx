import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import articlesData from '@/data/articles.json'

export const metadata = {
  title: 'Insights & Market Analysis | Ontario Multifamily',
  description: 'Weekly analysis on Ontario multifamily markets from Colliers. Cap rates, CMHC policy updates, deal flow reports, rental growth data, and actionable guidance for apartment building owners and investors.',
  openGraph: {
    title: 'Insights & Market Analysis | OnMultifamily | Colliers',
    description: 'Weekly multifamily market intelligence for Ontario apartment building owners and investors.',
    type: 'website',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function InsightsPage() {
  // Sort all articles by date descending
  const sorted = [...articlesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const lead = sorted[0]
  const rest = sorted.slice(1)

  return (
    <main>
      <Header />
      
      {/* Hero */}
      <section className="bg-navy-deep pt-36 pb-16 md:pt-44 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gold" />
            <span className="text-[12px] tracking-[0.2em] uppercase text-gold font-medium">
              Market Intelligence
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Insights & Analysis
          </h1>
          <p className="text-[17px] text-white/40 leading-relaxed max-w-xl mb-10">
            Weekly analysis on Ontario multifamily markets. Cap rates, deal flow, 
            CMHC updates, and actionable guidance for apartment building owners and investors.
          </p>

          {/* Subscribe inline */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-gold/50 transition-all duration-300 outline-none"
            />
            <button className="bg-gradient-to-r from-gold to-gold-light text-navy text-[11px] tracking-[0.15em] uppercase font-bold px-7 py-3.5 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
          <p className="text-white/20 text-[12px] mt-3">Join 14,000+ multifamily professionals. Free. No spam.</p>
        </div>
      </section>

      {/* Lead Article - Full Impact */}
      {lead && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Link href={`/insights/${lead.id}/`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
                {lead.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
                    <Image
                      src={lead.image}
                      alt={lead.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-bold text-gold bg-gold/10 px-3 py-1">
                      {lead.category}
                    </span>
                    <span className="text-[13px] text-navy/35">
                      {formatDate(lead.date)}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl text-navy leading-[1.15] mb-5 group-hover:text-gold-dark transition-colors duration-300">
                    {lead.title}
                  </h2>
                  <p className="text-navy/45 text-[16px] leading-[1.8] mb-6">
                    {lead.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-light text-navy text-[11px] tracking-[0.15em] uppercase font-bold px-7 py-3.5 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-500">
                    Read Full Report
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Articles - Timeline Style */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <h2 className="font-serif text-2xl md:text-3xl text-navy">All Articles</h2>
            <span className="text-[12px] text-navy/30 tracking-wide">{articlesData.length} articles</span>
          </div>

          <div className="space-y-0">
            {rest.map((article, i) => (
              <Link
                key={article.id}
                href={`/insights/${article.id}/`}
                className="group block border-b border-navy/8 first:border-t"
              >
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 items-center">
                  {/* Date column */}
                  <div className="md:col-span-2">
                    <div className="text-[13px] text-navy/30 font-medium">
                      {formatShortDate(article.date)}
                    </div>
                  </div>

                  {/* Image */}
                  {article.image && (
                    <div className="md:col-span-3">
                      <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={article.image ? 'md:col-span-7' : 'md:col-span-10'}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-gold">
                        {article.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-navy/15" />
                      <span className="text-[11px] text-navy/25">{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-navy leading-snug mb-3 group-hover:text-gold-dark transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-navy/40 text-[14px] leading-relaxed line-clamp-2 max-w-xl">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-deep py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="relative max-w-2xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-5">
            Never miss an update
          </h2>
          <p className="text-white/35 text-[16px] leading-relaxed mb-10">
            14,000+ apartment building owners, investors, and operators across Ontario read our weekly brief. 
            Market data, deal announcements, and actionable analysis delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-white/5 border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/25 focus:border-gold/50 transition-all duration-300 outline-none"
            />
            <button className="bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] tracking-[0.15em] uppercase font-bold px-8 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-white/15 text-[12px] mt-4">Free. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
