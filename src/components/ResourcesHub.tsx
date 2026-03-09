'use client'

import React from 'react'

const tools = [
  {
    title: 'Bond Yield Tracker',
    description: 'Live Government of Canada benchmark yields — the rates that drive multifamily mortgage pricing across the country.',
    href: '/resources/bond-yields/',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 24l7-8 5 4 8-12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 28h24" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Live Data',
  },
  {
    title: 'CMHC Debt Calculator',
    description: 'Size your mortgage. Input property financials and get instant CMHC-insured debt sizing with MLI Select credit scenarios.',
    href: '/resources/cmhc-calculator/',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M10 10h12M10 14h12M10 18h8" strokeLinecap="round" />
        <rect x="10" y="22" width="12" height="3" rx="0.5" />
      </svg>
    ),
    tag: 'Calculator',
  },
  {
    title: 'Market Insights',
    description: 'Weekly analysis on cap rates, CMHC policy, interest rate trends, and Ontario multifamily market conditions.',
    href: '/insights/',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path d="M5 4v24h22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20l5-6 4 3 6-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'Newsletter',
  },
  {
    title: 'Transaction Map',
    description: 'Explore our multifamily transaction history across Ontario — active listings, recent sales, and market coverage.',
    href: '/map/',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path d="M16 28s10-8.35 10-15a10 10 0 10-20 0c0 6.65 10 15 10 15z" />
        <circle cx="16" cy="13" r="3" />
      </svg>
    ),
    tag: 'Interactive',
  },
]

export default function ResourcesHub() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[12px] tracking-wide-custom uppercase text-gold mb-4 sm:mb-6">Resources</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-6">
            Tools for<br />smarter decisions
          </h1>
          <p className="text-white/50 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Free calculators, live market data, and institutional-grade analysis — 
            built for Ontario multifamily owners and investors.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {tools.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className="group bg-white border border-soft-gray p-8 sm:p-10 hover:border-navy/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-navy/40 group-hover:text-navy transition-colors duration-300">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] tracking-wide-custom uppercase text-navy/30 border border-navy/10 px-3 py-1">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-navy mb-3 group-hover:text-navy/80 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-navy/50 text-[15px] leading-relaxed mb-6">
                  {tool.description}
                </p>
                <span className="text-[12px] tracking-wide-custom uppercase text-navy/40 group-hover:text-navy transition-colors duration-300">
                  Open tool →
                </span>
              </a>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 sm:mt-20 bg-navy p-10 sm:p-14">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                  Get the weekly brief
                </h3>
                <p className="text-white/40 text-[15px] max-w-lg">
                  Join 14,000+ multifamily professionals receiving our market intelligence every week. 
                  Cap rates, policy changes, deal flow, and analysis.
                </p>
              </div>
              <div className="flex gap-3 lg:min-w-[360px]">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-5 py-3.5 text-sm focus:border-white/30 transition-colors"
                />
                <button className="bg-gold text-navy text-[12px] tracking-wide-custom uppercase font-semibold px-6 py-3.5 hover:bg-gold/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
