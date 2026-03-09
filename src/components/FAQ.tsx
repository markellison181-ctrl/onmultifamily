'use client'

import React, { useState } from 'react'

const faqs = [
  {
    q: 'What is the average cap rate for Ontario multifamily?',
    a: 'Cap rates for stabilized apartment buildings in Ontario currently range from 4.25% to 5.75%, depending on market, building condition, and suite count. Greater Toronto Area properties typically trade at the lower end, while secondary markets offer higher yields.',
  },
  {
    q: 'What is CMHC MLI Select?',
    a: 'MLI Select is CMHC\'s points-based mortgage insurance program that offers enhanced terms — lower interest rates, longer amortization (up to 50 years), and higher LTV (up to 95%) — for projects meeting affordability, accessibility, and energy efficiency criteria.',
  },
  {
    q: 'How long does a typical multifamily sale take?',
    a: 'From listing to close, a well-positioned multifamily sale typically takes 90-120 days. The marketing period is usually 4-6 weeks, followed by due diligence and closing. Portfolio transactions and larger assets may take longer.',
  },
  {
    q: 'What information do I need for a valuation?',
    a: 'At minimum, we need the property address, unit count, current rent roll, and a summary of operating expenses. Ideally, we\'d also review the last 2-3 years of financial statements, capital expenditure history, and any lease abstracts for commercial units.',
  },
  {
    q: 'Do you work with buyers as well?',
    a: 'Yes. We represent both sellers and buyers in multifamily transactions. For buyers, we provide access to on-market and off-market opportunities, underwriting support, and transaction management from offer through close.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative py-24 sm:py-32 md:py-44 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          {/* Left - Header */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
                <span className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-navy/35 font-medium">
                  FAQ
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-navy leading-[1.1] mb-4">
                Common
                <br />
                questions
              </h2>
              <p className="text-navy/40 text-[14px] leading-relaxed">
                Don&apos;t see your question? Reach out — we&apos;re always happy to talk multifamily.
              </p>
            </div>
          </div>

          {/* Right - Accordion */}
          <div className="md:col-span-8">
            <div className="divide-y divide-soft-gray">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-7 sm:py-8 text-left group"
                  >
                    <span className={`font-serif text-[17px] sm:text-xl leading-snug transition-colors duration-300 ${
                      open === i ? 'text-navy' : 'text-navy/70 group-hover:text-navy'
                    }`}>
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-500 ${
                      open === i 
                        ? 'border-gold bg-gold text-navy rotate-45' 
                        : 'border-soft-gray text-navy/30 group-hover:border-navy/20'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
                      </svg>
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    open === i ? 'max-h-60 pb-7 sm:pb-8' : 'max-h-0'
                  }`}>
                    <p className="text-navy/45 text-[14px] sm:text-[15px] leading-[1.75] pr-14">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
