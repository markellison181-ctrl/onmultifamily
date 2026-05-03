'use client'

import React, { useState } from 'react'
import { useMailchimp } from '@/lib/mailchimp'

const CalculatorIcon = () => (
  <svg className="w-10 h-10 text-navy/25 group-hover:text-gold transition-colors duration-500" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.2}>
    <rect x="8" y="4" width="24" height="32" rx="2" />
    <rect x="12" y="8" width="16" height="6" rx="1" fill="currentColor" opacity="0.15" />
    <circle cx="15" cy="20" r="1.5" fill="currentColor" />
    <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    <circle cx="25" cy="20" r="1.5" fill="currentColor" />
    <circle cx="15" cy="26" r="1.5" fill="currentColor" />
    <circle cx="20" cy="26" r="1.5" fill="currentColor" />
    <circle cx="25" cy="26" r="1.5" fill="currentColor" />
    <rect x="15" y="31" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-10 h-10 text-navy/25 group-hover:text-gold transition-colors duration-500" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.2}>
    <path d="M6 34h28" />
    <path d="M6 6v28" />
    <path d="M10 28l6-8 5 4 5-10 4-2 4 6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="28" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="16" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="21" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="26" cy="14" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="30" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="34" cy="18" r="1.5" fill="currentColor" opacity="0.3" />
  </svg>
)

const primaryTools = [
  {
    title: 'CMHC Debt Calculator',
    description: 'Size your insured mortgage instantly. DSCR and LTV constraints, MLI Select credit scenarios, insurance premiums, and amortization modeling.',
    href: '/resources/cmhc-calculator/',
    tag: 'Calculator',
    Icon: CalculatorIcon,
  },
  {
    title: 'Bond Yield Tracker',
    description: 'Live Government of Canada benchmark yields - the rates that drive every multifamily mortgage in the country. Updated regularly with CMB spreads.',
    href: '/resources/bond-yields/',
    tag: 'Live Data',
    Icon: ChartIcon,
  },
]

const secondaryTools = [
  {
    title: 'Cap Rate Map',
    description: 'Interactive transaction map across Ontario - explore active listings, recent sales, and market-level cap rate benchmarks.',
    href: '/map/',
    tag: 'Interactive',
  },
  {
    title: 'Market Insights',
    description: 'Weekly analysis on cap rates, CMHC policy, interest rate trends, and Ontario multifamily market conditions.',
    href: '/insights/',
    tag: 'Newsletter',
  },
]

export default function ResourcesHub() {
  const [email, setEmail] = useState('')
  const { status: mcStatus, message: mcMessage, subscribe } = useMailchimp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) await subscribe(email)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-deep pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden noise">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gold-light font-medium">Resources</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6 sm:mb-8">
            Tools for
            <br />
            <span className="text-gradient-gold">smarter decisions</span>
          </h1>
          <p className="text-white/40 text-[16px] sm:text-lg max-w-2xl leading-relaxed">
            Free calculators, live market data, and institutional-grade analysis
            built for Ontario multifamily owners and investors.
          </p>
        </div>
      </section>

      {/* Primary Tools */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Featured tools - large cards */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {primaryTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className="group relative bg-white p-8 sm:p-12 hover-lift border border-soft-gray hover:border-gold/30 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/5 to-transparent" />
                
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <tool.Icon />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-navy/25 border border-navy/10 px-3 py-1 font-medium">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-navy mb-4 group-hover:text-gold-dark transition-colors duration-500">
                  {tool.title}
                </h3>
                <p className="text-navy/40 text-[14px] sm:text-[15px] leading-relaxed mb-8">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-navy/30 group-hover:text-gold font-medium transition-colors duration-500">
                  Open tool
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          {/* Secondary tools - smaller grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
            {secondaryTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.tag === 'Coming Soon' ? '#' : tool.href}
                className={`group bg-white p-6 sm:p-7 border border-soft-gray transition-all duration-500 ${
                  tool.tag === 'Coming Soon' 
                    ? 'opacity-60 cursor-default' 
                    : 'hover-lift hover:border-gold/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-1 ${
                    tool.tag === 'Coming Soon' 
                      ? 'bg-soft-gray text-navy/30' 
                      : 'bg-gold/10 text-gold-dark'
                  }`}>
                    {tool.tag}
                  </span>
                </div>
                <h4 className="font-serif text-lg text-navy mb-2 group-hover:text-gold-dark transition-colors duration-500">
                  {tool.title}
                </h4>
                <p className="text-navy/35 text-[13px] leading-relaxed">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>

          {/* Quarterly Market Reports */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-navy/35 font-medium">
                GTA Multifamily Market Reports
              </span>
            </div>
            <p className="text-navy/40 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-2xl">
              Our quarterly GTA multifamily market reports, authored by Dayma Itamunoala, Kyle Lindsay, Zoe Prachter, and Matthew Bruchkowsky.
              Published by Colliers.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { title: '2025 Year-End Report', date: 'Feb 2026', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2024-year-in-review', highlight: true, pdf: 'https://mcusercontent.com/87232bcc93f1dd394870ffcbd/files/8f70d7ff-2bf6-34e2-e41d-8ff32d362a2e/Dayma_Itamunoala_Colliers_GTA_2025_Year_end_Report.pdf' },
                { title: 'Q3 2025 Report', date: 'Oct 2025', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2025-q3' },
                { title: 'Q2 2025 Report', date: 'Jul 2025', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2025-q2' },
                { title: 'Q1 2025 Report', date: 'Apr 2025', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2025-q1' },
                { title: '2024 Year in Review', date: 'Feb 2025', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2024-year-in-review' },
                { title: 'Q3 2024 Report', date: 'Oct 2024', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2024-q3' },
                { title: 'Q2 2024 Report', date: 'Jul 2024', href: 'https://www.collierscanada.com/en-ca/research/toronto-multifamily-market-report-2024-q2' },
                { title: 'Q1 2024 Report', date: 'Apr 2024', href: 'https://www.collierscanada.com/en-ca/research/gta-multifamily-market-report-2024-q1' },
              ].map((report) => (
                <a
                  key={report.title}
                  href={report.pdf || report.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-white p-5 sm:p-6 border transition-all duration-500 hover-lift ${
                    report.highlight ? 'border-gold/30 ring-1 ring-gold/10' : 'border-soft-gray hover:border-gold/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-navy/30 font-medium">{report.date}</span>
                    {report.highlight && (
                      <span className="text-[9px] tracking-[0.2em] uppercase font-bold bg-gold/10 text-gold-dark px-2 py-0.5">Latest</span>
                    )}
                  </div>
                  <h4 className="font-serif text-[15px] sm:text-base text-navy group-hover:text-gold-dark transition-colors duration-500 mb-2">
                    {report.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-navy/25 group-hover:text-gold font-medium transition-colors">
                    {report.pdf ? 'Download PDF' : 'View on Colliers'}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="relative bg-navy-deep p-10 sm:p-16 overflow-hidden noise">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                  Get the weekly brief
                </h3>
                <p className="text-white/30 text-[14px] max-w-lg">
                  Join 14,000+ multifamily professionals receiving our market intelligence every week. 
                  Cap rates, policy changes, deal flow, and analysis.
                </p>
              </div>
              <div className="flex gap-3 lg:min-w-[380px]">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/25 px-5 py-4 text-sm focus:border-gold/50 transition-colors"
                />
                <button className="bg-gradient-to-r from-gold to-gold-light text-navy text-[11px] tracking-[0.15em] uppercase font-bold px-7 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 whitespace-nowrap">
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
