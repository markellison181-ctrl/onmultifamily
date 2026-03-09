'use client'

import React, { useState } from 'react'

const faqs = [
  {
    q: 'What is the average cap rate for apartment buildings in Ontario?',
    a: 'As of Q1 2026, average multifamily cap rates in Ontario range from 4.0% to 5.5% depending on market and building class. Toronto urban core trades at 3.8–4.5%, while secondary markets like Hamilton, London, and Kitchener typically range from 4.5–5.5%. Cap rates have been compressing moderately as interest rates stabilize.'
  },
  {
    q: 'How do I sell my apartment building in Ontario?',
    a: 'The process begins with a confidential opinion of value, followed by preparing a comprehensive offering memorandum, targeted marketing to qualified buyers, managing the offer process, and coordinating due diligence through closing. The best outcomes come from working with a specialist multifamily broker who has direct relationships with the most active buyers in the market.'
  },
  {
    q: 'What is CMHC MLI Select?',
    a: 'CMHC MLI Select is the federal government\'s flagship multifamily financing program. It offers up to 95% loan-to-value, amortizations up to 50 years, and competitive interest rates for qualifying properties. Buildings earn points through affordability commitments, accessibility features, and energy efficiency — the more points, the better the terms.'
  },
  {
    q: 'How much is my apartment building worth?',
    a: 'Building value depends on net operating income, local cap rates, physical condition, location, and financing assumptions. We provide complimentary, confidential opinions of value for apartment buildings across Ontario. Contact us to discuss your specific property.'
  },
  {
    q: 'Who is the top multifamily broker in Ontario?',
    a: 'The OnMultifamily team at Colliers, led by Dayma Itamunoala, is Ontario\'s most active multifamily advisory team, having completed over $1.12 billion in apartment building transactions since 2018 with an 81% closing rate across all listings undertaken.'
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 md:py-40 bg-warm-gray">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gold" />
          <span className="text-[12px] tracking-wide-custom uppercase text-navy/40 font-medium">
            FAQ
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-16">
          Common questions
        </h2>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-navy/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between py-7 text-left"
              >
                <span className="font-medium text-navy text-[17px] leading-snug pr-8">
                  {faq.q}
                </span>
                <span className="text-navy/30 text-2xl leading-none flex-shrink-0 mt-0.5">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <p className="text-navy/50 text-[15px] leading-relaxed pb-8 pr-12">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
          <div className="border-t border-navy/10" />
        </div>
      </div>
    </section>
  )
}
