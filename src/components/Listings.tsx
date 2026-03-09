'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import listingsData from '@/data/listings.json'

export default function Listings() {
  const [tab, setTab] = useState<'all' | 'active' | 'sold'>('all')

  const filtered = tab === 'all'
    ? listingsData
    : tab === 'active'
    ? listingsData.filter(l => l.status === 'Active' || l.status === 'Under Contract')
    : listingsData.filter(l => l.status === 'Sold')

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
            {[
              { id: 'all' as const, label: 'All' },
              { id: 'active' as const, label: 'Active' },
              { id: 'sold' as const, label: 'Sold' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`text-[13px] tracking-wide-custom uppercase font-medium px-6 py-2.5 transition-all duration-300 ${
                  tab === t.id ? 'bg-white text-navy' : 'text-white/50 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map(listing => (
            <a key={listing.id} href={`/listings/${listing.id}/`} className="group block">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-5">
                <Image
                  src={listing.image}
                  alt={listing.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Status Badge */}
                {listing.status !== 'Active' && (
                  <div className="absolute top-4 left-4 bg-white text-navy text-[11px] tracking-wide-custom uppercase font-semibold px-3 py-1">
                    {listing.status}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-white font-medium text-lg mb-1 group-hover:text-gold transition-colors duration-300">
                {listing.name}
              </h3>
              <p className="text-white/40 text-sm mb-3">{listing.city}, Ontario</p>
              <p className="text-white/60 text-[14px] mb-3">
                {listing.suites} suites · {fmt(listing.price)} · {listing.capRate}% cap
              </p>
              <span className="text-[12px] tracking-wide-custom uppercase text-white/25 group-hover:text-gold transition-colors duration-300">
                View Details →
              </span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-white/60 text-[15px] mb-1">Looking for off-market opportunities?</p>
            <p className="text-white/30 text-sm">We see deals before they hit the market.</p>
          </div>
          <a href="#contact" className="border border-white/30 text-white text-[13px] tracking-wide-custom uppercase font-medium px-10 py-4 hover:bg-white/10 transition-all duration-300 text-center whitespace-nowrap">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
