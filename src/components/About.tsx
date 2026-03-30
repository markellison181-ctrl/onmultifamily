'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [imageVisible, setImageVisible] = useState(false)
  const [copyVisible, setCopyVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === imageRef.current && entry.isIntersecting) setImageVisible(true)
          if (entry.target === copyRef.current && entry.isIntersecting) setCopyVisible(true)
        })
      },
      { threshold: 0.15 }
    )
    if (imageRef.current) observer.observe(imageRef.current)
    if (copyRef.current) observer.observe(copyRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24 sm:py-32 md:py-44 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo with overlapping accent */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-700 ease-out ${imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Gold accent block behind image */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-full h-full bg-gradient-to-br from-gold/10 to-gold/5" />
            <div className="relative">
              <Image
                src="/images/team/team-group.jpg"
                alt="OnMultifamily Team"
                width={800}
                height={1000}
                className="w-full aspect-[4/3] md:aspect-[4/5] object-cover relative z-10"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/20 to-transparent z-10 pointer-events-none" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 sm:bottom-8 sm:-left-8 z-20 bg-navy p-5 sm:p-6 shadow-2xl">
              <p className="font-serif text-3xl sm:text-4xl text-white number-display">$1.12B+</p>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-gold mt-1">In Transactions</p>
            </div>
          </div>

          {/* Copy */}
          <div
            ref={copyRef}
            className={`transition-all duration-700 ease-out delay-200 ${copyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-3 mb-8 sm:mb-10">
              <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
              <span className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-navy/35 font-medium">
                About Us
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-navy leading-[1.05] mb-6 sm:mb-8">
              The fastest-growing
              <br />
              <span className="text-gradient-gold">multifamily team</span>
              <br />
              in Ontario
            </h2>

            <div className="space-y-5 text-navy/55 text-[15px] sm:text-[16px] leading-[1.75]">
              <p>
                Led by Dayma Itamunoala, Senior Vice President at Colliers, we are a specialist
                advisory team focused exclusively on multifamily investment sales across Ontario.
                Our approach combines institutional rigour with deep market intelligence built
                across more than $1.12 billion in completed transactions.
              </p>
              <p>
                From 11-unit walk-ups to 1,200+ suite portfolios, we advise private owners,
                family offices, REITs, and institutional capital on acquisitions, dispositions,
                and portfolio strategy.
              </p>
            </div>

            {/* Dayma Quote */}
            <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-soft-gray">
              <div className="flex items-start gap-5 sm:gap-6">
                <div className="relative flex-shrink-0">
                  <Image
                    src="/images/team/dayma.png"
                    alt="Dayma Itamunoala"
                    width={72}
                    height={72}
                    className="w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-navy/65 text-[14px] sm:text-[15px] italic leading-relaxed mb-3">
                    &ldquo;Every building tells a story. Our job is to understand that story and
                    position it for the capital markets in a way that maximizes value.&rdquo;
                  </p>
                  <div className="text-[12px] sm:text-[13px]">
                    <span className="font-semibold text-navy">Dayma Itamunoala</span>
                    <span className="text-navy/35 ml-2">Senior Vice President, Sales Representative, Colliers</span>
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
