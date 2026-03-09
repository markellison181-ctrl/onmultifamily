'use client'

import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Photo */}
          <div className="relative">
            <Image
              src="/images/team/team-group.jpg"
              alt="OnMultifamily Team"
              width={800}
              height={1000}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy/20 to-transparent" />
          </div>

          {/* Copy */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-gold" />
              <span className="text-[12px] tracking-wide-custom uppercase text-navy/40 font-medium">
                About
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-8">
              The fastest-growing multifamily team in Ontario
            </h2>

            <div className="space-y-6 text-navy/60 text-lg leading-relaxed">
              <p>
                We are a specialist advisory team within Colliers, focused exclusively on 
                multifamily investment sales across Ontario. Our approach combines institutional 
                rigour with deep market intelligence developed over hundreds of transactions.
              </p>
              <p>
                From 11-unit walk-ups to 1,200+ suite portfolios, we advise private owners, 
                family offices, REITs, and institutional capital on acquisitions, dispositions, 
                and portfolio strategy.
              </p>
            </div>

            {/* Dayma Quote */}
            <div className="mt-12 pt-10 border-t border-soft-gray">
              <div className="flex items-start gap-6">
                <Image
                  src="/images/team/dayma.png"
                  alt="Dayma Itamunoala"
                  width={72}
                  height={72}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-navy/70 text-base italic leading-relaxed mb-3">
                    &ldquo;Every building tells a story. Our job is to understand that story and 
                    position it for the capital markets in a way that maximizes value.&rdquo;
                  </p>
                  <div className="text-[13px]">
                    <span className="font-semibold text-navy">Dayma Itamunoala</span>
                    <span className="text-navy/40 ml-2">SVP, Head of Multifamily — Colliers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
