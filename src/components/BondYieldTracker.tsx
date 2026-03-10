'use client'

import React, { useState } from 'react'

/* 
  Bond yield data — in production this would pull from Bank of Canada API.
  For now, static data updated periodically. The site is statically exported,
  so we use build-time data with a "last updated" timestamp.
  
  To update: edit the yields array below and redeploy.
  Future: Add a serverless function or edge function to fetch daily from
  https://www.bankofcanada.ca/rates/interest-rates/canadian-bonds/
*/

interface YieldData {
  label: string
  ticker: string
  current: number
  prevClose: number
  weekAgo: number
  monthAgo: number
  yearAgo: number
  description: string
}

const yields: YieldData[] = [
  {
    label: '5-Year GoC',
    ticker: 'GCAN5YR',
    current: 3.02,
    prevClose: 2.95,
    weekAgo: 2.91,
    monthAgo: 2.89,
    yearAgo: 2.63,
    description: 'The benchmark for most conventional and CMHC-insured 5-year fixed mortgage rates. This is the single most important rate for multifamily financing in Canada.',
  },
  {
    label: '10-Year GoC',
    ticker: 'GCAN10YR',
    current: 3.22,
    prevClose: 3.17,
    weekAgo: 3.14,
    monthAgo: 3.10,
    yearAgo: 2.85,
    description: 'Drives 10-year fixed mortgage pricing. Increasingly relevant for CMHC MLI Select borrowers locking in longer terms for rental construction.',
  },
  {
    label: '2-Year GoC',
    ticker: 'GCAN2YR',
    current: 2.78,
    prevClose: 2.73,
    weekAgo: 2.70,
    monthAgo: 2.65,
    yearAgo: 2.45,
    description: 'Short-term rate reflecting near-term Bank of Canada rate expectations. Relevant for variable-rate and shorter-term mortgage pricing.',
  },
  {
    label: 'Overnight Rate',
    ticker: 'BoC Target',
    current: 2.25,
    prevClose: 2.75,
    weekAgo: 2.75,
    monthAgo: 3.00,
    yearAgo: 5.00,
    description: 'Bank of Canada\'s policy rate. Directly influences variable-rate mortgages and the cost of floating-rate bridge and construction debt.',
  },
  {
    label: '5-Year CMB',
    ticker: 'CMB 5YR',
    current: 3.16,
    prevClose: 3.11,
    weekAgo: 3.11,
    monthAgo: 3.10,
    yearAgo: 3.01,
    description: 'Canada Mortgage Bond 5-year yield (GoC 5Y + ~14bps spread). The direct benchmark for CMHC-insured 5-year fixed multifamily mortgage pricing. Source: First National.',
  },
  {
    label: '10-Year CMB',
    ticker: 'CMB 10YR',
    current: 3.71,
    prevClose: 3.66,
    weekAgo: 3.66,
    monthAgo: 3.58,
    yearAgo: 3.33,
    description: 'Canada Mortgage Bond 10-year yield (GoC 10Y + ~49bps spread). The benchmark for CMHC MLI Select and long-term insured mortgage rates. Source: First National.',
  },
]

const cmbSpreads = [
  { term: '5-Year CMB', spread: 14, note: 'Over 5-Year GoC — insured mortgage benchmark (Source: First National)' },
  { term: '10-Year CMB', spread: 49, note: 'Over 10-Year GoC — MLI Select and long-term CMHC (Source: First National)' },
]

const lastUpdated = 'March 10, 2026'

function formatChange(current: number, prev: number) {
  const diff = current - prev
  const sign = diff > 0 ? '+' : ''
  return { text: `${sign}${diff.toFixed(2)}%`, positive: diff > 0, zero: diff === 0 }
}

function ChangeIndicator({ current, prev }: { current: number; prev: number }) {
  const { text, positive, zero } = formatChange(current, prev)
  if (zero) return <span className="text-navy/30 text-sm">—</span>
  return (
    <span className={`text-sm font-medium ${positive ? 'text-red-600' : 'text-emerald-600'}`}>
      {positive ? '↑' : '↓'} {text}
    </span>
  )
}

export default function BondYieldTracker() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-deep pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden noise">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <a href="/resources/" className="text-[11px] tracking-[0.2em] uppercase text-white/25 hover:text-white/40 transition-colors mb-6 block">
            ← Resources
          </a>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gold-light font-medium">Live Market Data</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[0.95] mb-6">
            Bond Yield<br /><span className="text-gradient-gold">Tracker</span>
          </h1>
          <p className="text-white/40 text-[16px] max-w-2xl leading-relaxed">
            Government of Canada benchmark yields — the rates that drive every 
            multifamily mortgage in the country. Updated regularly.
          </p>
        </div>
      </section>

      {/* Yield Cards */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {yields.map((y) => (
              <div key={y.ticker} className="bg-white border border-soft-gray p-5 sm:p-6">
                <p className="text-[11px] tracking-wide-custom uppercase text-navy/30 mb-2">{y.label}</p>
                <p className="font-serif text-3xl sm:text-4xl text-navy mb-1">{y.current.toFixed(2)}%</p>
                <ChangeIndicator current={y.current} prev={y.prevClose} />
              </div>
            ))}
          </div>

          {/* Detailed Table */}
          <div className="bg-white border border-soft-gray overflow-hidden mb-12 sm:mb-16">
            <div className="px-6 sm:px-8 py-5 border-b border-soft-gray flex items-center justify-between">
              <h2 className="font-serif text-xl sm:text-2xl text-navy">Benchmark Yields</h2>
              <span className="text-[11px] tracking-wide-custom uppercase text-navy/30">Updated {lastUpdated}</span>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="w-full">
                <thead>
                  <tr className="text-[11px] tracking-wide-custom uppercase text-navy/30 border-b border-soft-gray">
                    <th className="text-left px-8 py-4 font-medium">Rate</th>
                    <th className="text-right px-4 py-4 font-medium">Current</th>
                    <th className="text-right px-4 py-4 font-medium">Day Chg</th>
                    <th className="text-right px-4 py-4 font-medium">1 Week</th>
                    <th className="text-right px-4 py-4 font-medium">1 Month</th>
                    <th className="text-right px-8 py-4 font-medium">1 Year</th>
                  </tr>
                </thead>
                <tbody>
                  {yields.map((y, i) => (
                    <tr 
                      key={y.ticker} 
                      className={`border-b border-soft-gray/50 hover:bg-cream/50 transition-colors cursor-pointer ${expandedIndex === i ? 'bg-cream/50' : ''}`}
                      onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    >
                      <td className="px-8 py-5">
                        <p className="text-navy font-medium text-[15px]">{y.label}</p>
                        <p className="text-navy/30 text-[12px]">{y.ticker}</p>
                      </td>
                      <td className="text-right px-4 py-5 font-serif text-xl text-navy">{y.current.toFixed(2)}%</td>
                      <td className="text-right px-4 py-5"><ChangeIndicator current={y.current} prev={y.prevClose} /></td>
                      <td className="text-right px-4 py-5"><ChangeIndicator current={y.current} prev={y.weekAgo} /></td>
                      <td className="text-right px-4 py-5"><ChangeIndicator current={y.current} prev={y.monthAgo} /></td>
                      <td className="text-right px-8 py-5"><ChangeIndicator current={y.current} prev={y.yearAgo} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-soft-gray/50">
              {yields.map((y, i) => (
                <div 
                  key={y.ticker}
                  className="px-6 py-5 cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-navy font-medium">{y.label}</p>
                      <p className="text-navy/30 text-[12px]">{y.ticker}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-2xl text-navy">{y.current.toFixed(2)}%</p>
                      <ChangeIndicator current={y.current} prev={y.prevClose} />
                    </div>
                  </div>
                  {expandedIndex === i && (
                    <div className="mt-3 pt-3 border-t border-soft-gray/50 grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-[10px] uppercase text-navy/30 mb-1">1 Week</p>
                        <ChangeIndicator current={y.current} prev={y.weekAgo} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-navy/30 mb-1">1 Month</p>
                        <ChangeIndicator current={y.current} prev={y.monthAgo} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-navy/30 mb-1">1 Year</p>
                        <ChangeIndicator current={y.current} prev={y.yearAgo} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CMB Spreads */}
          <div className="bg-white border border-soft-gray overflow-hidden mb-12 sm:mb-16">
            <div className="px-6 sm:px-8 py-5 border-b border-soft-gray">
              <h2 className="font-serif text-xl sm:text-2xl text-navy">CMB Spreads</h2>
              <p className="text-navy/40 text-[14px] mt-1">Canada Mortgage Bond spreads over GoC — the markup lenders add for CMHC-insured mortgages</p>
            </div>
            <div className="divide-y divide-soft-gray/50">
              {cmbSpreads.map((s) => (
                <div key={s.term} className="px-6 sm:px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-navy font-medium">{s.term}</p>
                    <p className="text-navy/30 text-[13px]">{s.note}</p>
                  </div>
                  <p className="font-serif text-2xl text-navy">{s.spread}<span className="text-lg text-navy/40"> bps</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* What This Means */}
          <div className="bg-navy p-8 sm:p-12">
            <h3 className="font-serif text-2xl sm:text-3xl text-white mb-6">What this means for your mortgage</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-[12px] tracking-wide-custom uppercase text-gold mb-3">Conventional Insured (5-Year Fixed)</p>
                <p className="font-serif text-3xl text-white mb-2">
                  ~{(yields[0].current + cmbSpreads[0].spread / 100 + 0.50).toFixed(2)}%
                </p>
                <p className="text-white/40 text-[14px] leading-relaxed">
                  5-Year GoC ({yields[0].current.toFixed(2)}%) + CMB spread ({cmbSpreads[0].spread}bps) + lender margin (~50bps). 
                  Typical CMHC-insured 5-year fixed rate for stabilized multifamily.
                </p>
              </div>
              <div>
                <p className="text-[12px] tracking-wide-custom uppercase text-gold mb-3">10-Year Fixed (MLI Select)</p>
                <p className="font-serif text-3xl text-white mb-2">
                  ~{(yields[1].current + cmbSpreads[1].spread / 100 + 0.55).toFixed(2)}%
                </p>
                <p className="text-white/40 text-[14px] leading-relaxed">
                  10-Year GoC ({yields[1].current.toFixed(2)}%) + CMB spread ({cmbSpreads[1].spread}bps) + lender margin (~55bps). 
                  Typical rate for CMHC MLI Select 10-year terms on purpose-built rental.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/30 text-[13px]">
                Estimated all-in rates are illustrative only and vary by property, borrower, and lender. 
                Contact our team for current rate quotes specific to your property.
              </p>
            </div>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-navy/40 text-[15px] mb-4">Get yield updates and market analysis delivered weekly</p>
            <a href="/#newsletter" className="inline-block bg-navy text-white text-[12px] tracking-wide-custom uppercase font-medium px-8 py-4 hover:bg-navy-light transition-colors">
              Subscribe to the Newsletter
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
