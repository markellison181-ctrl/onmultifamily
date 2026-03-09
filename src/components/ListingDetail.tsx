'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Listing {
  id: string; name: string; address: string; city: string; status: string
  price: number; suites: number; capRate: number; pricePerSuite: number
  yearBuilt: number; type: string; description: string; features: string[]
  image: string; featured: boolean
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n)
}

export default function ListingDetail({ listing, otherListings }: { listing: Listing; otherListings: Listing[] }) {
  return (
    <main>
      <Header />

      {/* Hero Image */}
      <section className="relative pt-20">
        <div className="relative aspect-[21/9] md:aspect-[3/1] bg-navy overflow-hidden">
          <Image src={listing.image} alt={listing.name} fill className="object-cover opacity-80" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
          {listing.status !== 'Active' && (
            <div className="absolute top-6 left-6 bg-white text-navy text-[11px] tracking-wide-custom uppercase font-semibold px-4 py-1.5">
              {listing.status}
            </div>
          )}
        </div>
      </section>

      {/* Property Header */}
      <section className="bg-navy pb-16 -mt-1">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Link href="/#listings" className="text-[12px] tracking-wide-custom uppercase text-white/30 hover:text-white/60 transition-colors mb-6 inline-block">
                ← All Listings
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-2">{listing.name}</h1>
              <p className="text-white/50 text-lg">{listing.address}</p>
            </div>
            <div className="md:text-right">
              <div className="font-serif text-3xl md:text-4xl text-white">{fmt(listing.price)}</div>
              <p className="text-white/40 text-sm mt-1">{fmt(listing.pricePerSuite)} per suite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="bg-cream py-10 border-b border-soft-gray">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { label: 'Suites', value: listing.suites.toString() },
              { label: 'Cap Rate', value: `${listing.capRate}%` },
              { label: 'Price/Suite', value: fmt(listing.pricePerSuite) },
              { label: 'Year Built', value: listing.yearBuilt.toString() },
              { label: 'Type', value: listing.type },
            ].map(m => (
              <div key={m.label}>
                <div className="text-[11px] tracking-wide-custom uppercase text-navy/30 font-medium mb-1">{m.label}</div>
                <div className="font-serif text-2xl text-navy">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl text-navy mb-6">Overview</h2>
              <p className="text-navy/60 text-[17px] leading-[1.8] mb-10">{listing.description}</p>

              <h3 className="font-serif text-xl text-navy mb-5">Investment Highlights</h3>
              <ul className="space-y-3 mb-10">
                {listing.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-navy/60 text-[16px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-xl text-navy mb-5">Location</h3>
              <p className="text-navy/60 text-[16px] leading-relaxed mb-10">
                Located in {listing.city}, Ontario. This {listing.type.toLowerCase()} apartment building
                is well-positioned within a strong rental market with access to local amenities,
                transit, and employment centres.
              </p>

              <h3 className="font-serif text-xl text-navy mb-5">Financial Summary</h3>
              <div className="border border-soft-gray">
                {[
                  { label: 'Asking Price', value: fmt(listing.price) },
                  { label: 'Number of Suites', value: listing.suites.toString() },
                  { label: 'Price Per Suite', value: fmt(listing.pricePerSuite) },
                  { label: 'Cap Rate', value: `${listing.capRate}%` },
                  { label: 'Year Built', value: listing.yearBuilt.toString() },
                  { label: 'Building Type', value: listing.type },
                  { label: 'Status', value: listing.status },
                ].map((row, i) => (
                  <div key={row.label} className={`flex justify-between py-4 px-6 ${i % 2 === 0 ? 'bg-cream/50' : 'bg-white'}`}>
                    <span className="text-navy/40 text-[15px]">{row.label}</span>
                    <span className="text-navy font-medium text-[15px]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-navy p-8 mb-8">
                <h3 className="font-serif text-xl text-white mb-4">Inquire About This Property</h3>
                <p className="text-white/40 text-sm mb-6">For detailed financials, site tours, and additional information.</p>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] focus:border-gold transition-colors" />
                  <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] focus:border-gold transition-colors" />
                  <input type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] focus:border-gold transition-colors" />
                  <textarea placeholder="Message (optional)" rows={3} className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] focus:border-gold transition-colors resize-none" />
                  <button type="submit" className="w-full bg-white text-navy text-[13px] tracking-wide-custom uppercase font-medium py-3.5 hover:bg-gold transition-colors duration-300 mt-2">
                    Request Information
                  </button>
                </form>
              </div>

              <div className="bg-cream p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/images/team/dayma.png" alt="Dayma Itamunoala" width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-navy text-[15px]">Dayma Itamunoala</div>
                    <div className="text-navy/40 text-[13px]">SVP, Head of Multifamily</div>
                  </div>
                </div>
                <a href="mailto:dayma.itamunoala@colliers.com" className="text-blue text-[14px] hover:text-navy transition-colors">
                  dayma.itamunoala@colliers.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Listings */}
      {otherListings.length > 0 && (
        <section className="py-20 md:py-28 bg-warm-gray border-t border-soft-gray">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <h2 className="font-serif text-2xl text-navy mb-10">Other Properties</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherListings.map(l => (
                <Link key={l.id} href={`/listings/${l.id}/`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden mb-4">
                    <Image src={l.image} alt={l.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    {l.status !== 'Active' && (
                      <div className="absolute top-3 left-3 bg-white text-navy text-[11px] tracking-wide-custom uppercase font-semibold px-3 py-1">{l.status}</div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-navy group-hover:text-blue transition-colors duration-300 mb-1">{l.name}</h3>
                  <p className="text-navy/40 text-sm mb-2">{l.city}, Ontario</p>
                  <p className="text-navy/60 text-[14px]">{l.suites} suites · {fmt(l.price)} · {l.capRate}% cap</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
