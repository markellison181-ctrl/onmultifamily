'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import listingsData from '@/data/listings.json'

export default function Listings() {
  const filtered = listingsData

  const fmt = (n: number | null) => {
    if (!n) return null
    return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`
  }

  const fmtPerUnit = (n: number | null) => {
    if (!n) return null
    return n >= 1000 ? `$${(n / 1000).toFixed(0)}K/unit` : `$${n.toLocaleString()}/unit`
  }

  return (
    <section id="listings" className="relative py-24 sm:py-32 md:py-44 bg-navy-deep overflow-hidden noise">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold/3 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
          <span className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-gold-light font-medium">
            Investment Sales
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-white leading-[1.05] mb-12 sm:mb-20">
          Current<br />Offerings
        </h2>

        {/* Featured U of T Student Housing */}
        {filtered.filter(l => l.type === 'Student Housing').length > 0 && (
          <>
            <div className="mb-12 sm:mb-16">
              <h3 className="font-serif text-xl sm:text-2xl text-white mb-6 sm:mb-8">Featured: University of Toronto</h3>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                {filtered
                  .filter(listing => listing.type === 'Student Housing')
                  .map(listing => (
                    <Link key={listing.id} href={`/listings/${listing.id}/`} className="group block hover-lift border border-transparent hover:border-gold/30 transition-colors duration-500 p-0.5">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden mb-5 sm:mb-6">
                        {listing.image ? (
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-navy-deep to-navy/80 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-gold text-2xl font-serif mb-2">{listing.type}</div>
                              <div className="text-white/30 text-sm">{listing.units ? listing.units + " Units" : listing.type}</div>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
                        {listing.status !== 'For Sale' && (
                          <div className="absolute top-4 left-4 bg-gold text-navy text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-bold px-3 py-1.5">
                            {listing.status}
                          </div>
                        )}
                        {/* Price overlay */}
                        <div className="absolute bottom-4 left-4">
                          {listing.price ? (
                            <p className="font-serif text-2xl text-white drop-shadow-lg">{fmt(listing.price)}</p>
                          ) : (
                            <p className="font-serif text-lg text-white drop-shadow-lg">Price Upon Request</p>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-white font-medium text-[15px] sm:text-lg mb-1.5 group-hover:text-gold transition-colors duration-500">
                        {listing.title}
                      </h3>
                      <p className="text-white/30 text-[13px] mb-3">{listing.location}</p>
                      
                      <div className="flex items-center gap-4 text-[13px] text-white/45">
                        <span>{listing.units ? listing.units + " units" : listing.type}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>
                          {listing.pricePerUnit ? fmtPerUnit(listing.pricePerUnit) : 'Contact for pricing'}
                        </span>
                      </div>

                      {/* View Details button */}
                      <div className="mt-4 pt-4 border-t border-white/8">
                        <span className="text-gold text-[12px] tracking-[0.15em] uppercase font-medium group-hover:text-gold-light transition-colors duration-300">
                          View Details
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* Other Investment Opportunities */}
        {filtered.filter(l => l.type !== 'Student Housing').length > 0 && (
          <>
            <div className="mb-8 sm:mb-12">
              <h3 className="font-serif text-xl sm:text-2xl text-white mb-6 sm:mb-8">Investment Opportunities</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {filtered
                  .filter(listing => listing.type !== 'Student Housing')
                  .map(listing => (
            <Link key={listing.id} href={`/listings/${listing.id}/`} className="group block hover-lift border border-transparent hover:border-gold/30 transition-colors duration-500 p-0.5">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-5 sm:mb-6">
                {listing.image ? (
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-navy-deep to-navy/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gold text-2xl font-serif mb-2">{listing.type}</div>
                      <div className="text-white/30 text-sm">{listing.units ? listing.units + " Units" : listing.type}</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
                {listing.status !== 'For Sale' && (
                  <div className="absolute top-4 left-4 bg-gold text-navy text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-bold px-3 py-1.5">
                    {listing.status}
                  </div>
                )}
                {/* Price overlay */}
                <div className="absolute bottom-4 left-4">
                  {listing.price ? (
                    <p className="font-serif text-2xl text-white drop-shadow-lg">{fmt(listing.price)}</p>
                  ) : (
                    <p className="font-serif text-lg text-white drop-shadow-lg">Price Upon Request</p>
                  )}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-white font-medium text-[15px] sm:text-lg mb-1.5 group-hover:text-gold transition-colors duration-500">
                {listing.title}
              </h3>
              <p className="text-white/30 text-[13px] mb-3">{listing.location}</p>
              
              <div className="flex items-center gap-4 text-[13px] text-white/45">
                <span>{listing.units ? listing.units + " units" : listing.type}</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>
                  {listing.pricePerUnit ? fmtPerUnit(listing.pricePerUnit) : 'Contact for pricing'}
                </span>
              </div>

              {/* View Details button */}
              <div className="mt-4 pt-4 border-t border-white/8">
                <span className="text-gold text-[12px] tracking-[0.15em] uppercase font-medium group-hover:text-gold-light transition-colors duration-300">
                  View Details
                </span>
              </div>
            </Link>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-white/8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-white/50 text-[15px] mb-1">Looking for off-market opportunities?</p>
              <p className="text-white/25 text-[13px]">We see deals before they hit the market.</p>
            </div>
            <a href="#contact" className="group flex items-center gap-3 border border-white/15 text-white text-[12px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:border-gold/50 hover:bg-gold/5 transition-all duration-500 self-start sm:self-auto">
              Contact Us
              <svg className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
