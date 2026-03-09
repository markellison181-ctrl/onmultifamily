'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import listingsData from '@/data/listings.json'

export default function Listings() {
  const [tab, setTab] = useState<'active' | 'sold'>('active')

  const activeListing = listingsData.filter(l => l.status === 'Active' || l.status === 'Under Contract')
  const soldListing = listingsData.filter(l => l.status === 'Sold')
  const current = tab === 'active' ? activeListing : soldListing

  const fmt = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`

  return (
    <section id="listings" className="py-28 md:py-40 bg-navy">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gold" />
          <span className="text-[12px] tracking-wide-custom uppercase text-gold font-medium">
            Current Offerings
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6 md:mb-0">
            Featured Properties
          </h2>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 p-1">
            <button
              onClick={() => setTab('active')}
              className={`text-[13px] tracking-wide-custom uppercase font-medium px-6 py-2.5 transition-all duration-300 ${
                tab === 'active' ? 'bg-white text-navy' : 'text-white/50 hover:text-white'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setTab('sold')}
              className={`text-[13px] tracking-wide-custom uppercase font-medium px-6 py-2.5 transition-all duration-300 ${
                tab === 'sold' ? 'bg-white text-navy' : 'text-white/50 hover:text-white'
              }`}
            >
              Sold
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.slice(0, 6).map(listing => (
            <div key={listing.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-navy-light">
                {listing.image && !listing.image.includes('placeholder') ? (
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-light to-navy flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
                {/* Status */}
                {listing.status === 'Under Contract' && (
                  <div className="absolute top-4 left-4 bg-white text-navy text-[11px] tracking-wide-custom uppercase font-semibold px-3 py-1">
                    Under Contract
                  </div>
                )}
                {listing.status === 'Sold' && (
                  <div className="absolute top-4 left-4 bg-white text-navy text-[11px] tracking-wide-custom uppercase font-semibold px-3 py-1">
                    Sold
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-gold transition-colors duration-300">
                {listing.name}
              </h3>
              <p className="text-white/40 text-sm mb-3">{listing.city}, Ontario</p>
              <p className="text-white/60 text-[14px]">
                {listing.suites} suites · {fmt(listing.price)} · {listing.capRate}% cap
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm mb-4">Looking for off-market opportunities?</p>
          <a href="#contact" className="text-[13px] tracking-wide-custom uppercase font-medium text-gold hover:text-white transition-colors duration-300">
            Contact Us →
          </a>
        </div>
      </div>
    </section>
  )
}
