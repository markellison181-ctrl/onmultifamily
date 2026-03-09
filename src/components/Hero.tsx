'use client'

import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="section-dark min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-img.png"
          alt="Ontario Multifamily"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-colliers-blue-dark/60"></div>
      </div>

      {/* Content */}
      <div className="container-full relative z-10">
        <div className="max-w-6xl">
          {/* Small Intro Line */}
          <div className="mb-12">
            <div className="gold-line mb-4"></div>
            <p className="body-lg text-gray-300 tracking-wide">
              A Colliers Multifamily Team
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="heading-xl text-white mb-12 max-w-5xl">
            Ontario's Premier
            <br />
            Multifamily Advisory
            <br />
            Team
          </h1>

          {/* Subheading */}
          <p className="body-xl text-gray-200 max-w-3xl mb-20">
            Institutional-grade advisory for apartment building owners and investors. 
            Led by Dayma Itamunoala at Colliers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-28">
            <a href="#listings" className="btn-primary text-lg">
              Our Listings
            </a>
            <a href="/insights" className="btn-primary text-lg">
              Subscribe
            </a>
          </div>

          {/* Stats Strip */}
          <div className="border-t border-white/20 pt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              <div className="text-center lg:text-left">
                <div className="stat-number text-white mb-2">$1.12B+</div>
                <div className="stat-label text-gray-400">Transactions</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="stat-number text-white mb-2">81%</div>
                <div className="stat-label text-gray-400">Close Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="stat-number text-white mb-2">3,000+</div>
                <div className="stat-label text-gray-400">Units Sold</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="stat-number text-white mb-2">14,000+</div>
                <div className="stat-label text-gray-400">Subscribers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero