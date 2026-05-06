'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Listing {
  id: string
  title: string
  location: string
  address: string
  type: string
  units: number | null
  price: number | null
  pricePerUnit: number | null
  lotSize: string | null
  status: string
  image: string | null
  brochure: string
  ndaLink: string | null
  headline: string
  description: string
  fullDescription: string
  features: string[]
  noi?: number
  yearBuilt?: number
  yearRenovated?: string
  unitMix?: string
  gfa?: number
  lat?: number
  lng?: number
}

function fmt(n: number | null) {
  if (!n) return null
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n)
}

function LocationMap({ lat, lng, title }: { lat: number; lng: number; title: string }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    let map: any = null

    import('leaflet').then((L) => {
      if (!mapRef.current) return

      // Inject leaflet CSS if not already present
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution('&copy; OpenStreetMap &middot; CARTO')
        .addTo(map)

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 18px; height: 18px;
          background: #c9a84c;
          border: 3px solid #0a1628;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      L.marker([lat, lng], { icon }).addTo(map)
        .bindPopup(`<strong>${title}</strong>`, { closeButton: false, offset: [0, -8] })
    })

    return () => {
      if (map) map.remove()
    }
  }, [lat, lng, title])

  return <div ref={mapRef} className="w-full h-full" />
}

export default function ListingDetail({ listing, otherListings }: { listing: Listing; otherListings: Listing[] }) {
  return (
    <main>
      <Header />

      {/* Hero with prominent photo */}
      <section className="relative bg-navy-deep pt-24 sm:pt-28 overflow-hidden">
        {/* Back link - overlaid on top */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pt-4 pb-6">
          <Link href="/#listings" className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white/60 hover:text-gold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Listings
          </Link>
        </div>

        {/* Prominent property photo */}
        {listing.image && (
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-0">
            <div className="relative aspect-[16/9] sm:aspect-[2.2/1] overflow-hidden shadow-2xl">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              {/* Subtle gradient at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Status badge */}
              {listing.status !== 'For Sale' && (
                <div className="absolute top-5 left-5 bg-gold text-navy text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-bold px-4 py-2">
                  {listing.status}
                </div>
              )}
              {/* Title overlay on photo */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] drop-shadow-lg mb-2">
                  {listing.title}
                </h1>
                <p className="text-white/70 text-[14px] sm:text-[16px] drop-shadow">{listing.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* If no image, text-only hero */}
        {!listing.image && (
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-12 sm:pb-16">
            <div className="max-w-4xl">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] text-white leading-[1.05] mb-4 sm:mb-6">
                {listing.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/60">{listing.location}</p>
            </div>
          </div>
        )}
      </section>

      {/* Headline bar */}
      <section className="bg-navy-deep py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <p className="text-lg sm:text-xl md:text-2xl text-gold-light leading-relaxed max-w-4xl">
            {listing.headline}
          </p>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="bg-white border-b border-navy/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { label: 'Units', value: listing.units ? listing.units.toString() : '\u2014' },
              { label: 'Price', value: listing.price ? fmt(listing.price) : 'Price Upon Request' },
              { label: 'Price/Unit', value: listing.pricePerUnit ? fmt(listing.pricePerUnit) : '\u2014' },
              { label: 'Lot Size', value: listing.lotSize || '\u2014' },
              { label: 'Type', value: listing.type },
            ].map(m => (
              <div key={m.label}>
                <div className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-navy/30 font-medium mb-1 sm:mb-2">{m.label}</div>
                <div className="font-serif text-xl sm:text-2xl text-navy">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12 sm:mb-16">
                <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-6 sm:mb-8">Overview</h2>
                <p className="text-navy/60 text-[16px] sm:text-[17px] leading-[1.8] mb-6">{listing.description}</p>
                <p className="text-navy/60 text-[16px] sm:text-[17px] leading-[1.8]">{listing.fullDescription}</p>
              </div>

              {/* Features */}
              <div className="mb-12 sm:mb-16">
                <h3 className="font-serif text-xl sm:text-2xl text-navy mb-6 sm:mb-8">Investment Highlights</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {listing.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-navy/70 text-[15px] sm:text-[16px]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16">
                {listing.brochure && (
                  <a
                    href={listing.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500 text-center"
                  >
                    Download Brochure
                  </a>
                )}
                {listing.ndaLink && (
                  <a
                    href={listing.ndaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-navy/20 text-navy hover:bg-navy/5 hover:border-navy/30 transition-all duration-500 text-center px-8 py-3"
                  >
                    <span className="block text-[12px] sm:text-[13px] font-medium tracking-[0.15em] uppercase">Request Information</span>
                    <span className="block text-[10px] sm:text-[11px] text-navy/40 mt-0.5 normal-case tracking-normal">Confidentiality agreement required</span>
                  </a>
                )}
                {!listing.brochure && !listing.ndaLink && (
                  <a
                    href={`mailto:dayma.itamunoala@colliers.com?subject=Inquiry: ${listing.title}`}
                    className="group bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500 text-center"
                  >
                    Contact Us
                  </a>
                )}
              </div>

              {/* Property Summary */}
              {(listing.yearBuilt || listing.yearRenovated || listing.noi || listing.unitMix) && (
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-navy mb-6 sm:mb-8">Property Details</h3>
                  <div className="bg-cream border border-soft-gray p-6 sm:p-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {listing.yearBuilt && (
                        <div>
                          <div className="text-[11px] tracking-[0.15em] uppercase text-navy/30 font-medium mb-2">Year Built</div>
                          <div className="text-navy font-medium">{listing.yearBuilt}</div>
                        </div>
                      )}
                      {listing.yearRenovated && (
                        <div>
                          <div className="text-[11px] tracking-[0.15em] uppercase text-navy/30 font-medium mb-2">Renovated</div>
                          <div className="text-navy font-medium">{listing.yearRenovated}</div>
                        </div>
                      )}
                      {listing.noi && (
                        <div>
                          <div className="text-[11px] tracking-[0.15em] uppercase text-navy/30 font-medium mb-2">Projected Year 1 NOI</div>
                          <div className="text-navy font-medium">{fmt(listing.noi)}</div>
                        </div>
                      )}
                      {listing.unitMix && (
                        <div>
                          <div className="text-[11px] tracking-[0.15em] uppercase text-navy/30 font-medium mb-2">Unit Mix</div>
                          <div className="text-navy font-medium">{listing.unitMix}</div>
                        </div>
                      )}
                      {listing.gfa && (
                        <div>
                          <div className="text-[11px] tracking-[0.15em] uppercase text-navy/30 font-medium mb-2">Gross Floor Area</div>
                          <div className="text-navy font-medium">{listing.gfa.toLocaleString()} SF</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact section */}
              <div className="bg-navy-deep p-6 sm:p-8 mb-8 noise">
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-4">Inquire About This Property</h3>
                <p className="text-white/40 text-sm mb-6">For detailed financials, site tours, and additional information.</p>

                <a
                  href={`mailto:dayma.itamunoala@colliers.com?subject=Inquiry about ${listing.title}&body=Hi Dayma,%0D%0A%0D%0AI'm interested in learning more about ${listing.title} located at ${listing.address}.%0D%0A%0D%0APlease send me:%0D%0A- Detailed financials%0D%0A- Unit mix and rent roll%0D%0A- Property condition information%0D%0A- Site tour availability%0D%0A%0D%0AThank you,%0D%0A`}
                  className="block w-full bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] tracking-[0.15em] uppercase font-bold px-8 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 text-center mb-6"
                >
                  Contact Us
                </a>

                <div className="text-center text-white/30 text-[11px] tracking-[0.15em] uppercase">
                  Email: dayma.itamunoala@colliers.com
                </div>
              </div>

              {/* Team agent card */}
              <div className="bg-cream border border-soft-gray p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/images/team/dayma.png"
                    alt="Dayma Itamunoala"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-navy text-[15px] sm:text-[16px]">Dayma Itamunoala</div>
                    <div className="text-navy/40 text-[12px] sm:text-[13px] tracking-[0.1em] uppercase">SVP, Head of Multifamily</div>
                  </div>
                </div>
                <p className="text-navy/60 text-[13px] sm:text-[14px] mb-4">
                  Specializing in multifamily investment sales across Ontario with over $1.2B+ in completed transactions.
                </p>
                <a
                  href="mailto:dayma.itamunoala@colliers.com"
                  className="text-gold text-[13px] sm:text-[14px] hover:text-gold-light transition-colors"
                >
                  dayma.itamunoala@colliers.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      {listing.lat && listing.lng && (
        <section className="py-16 sm:py-20 md:py-28 bg-cream border-t border-navy/8">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
              <span className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-navy/35 font-medium">
                Location
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-3 sm:mb-4">{listing.address}</h2>
            <p className="text-navy/40 text-[14px] sm:text-[15px] mb-8 sm:mb-10 max-w-xl">
              {listing.location}
            </p>
            <div className="relative overflow-hidden shadow-lg border border-navy/8" style={{ height: '400px' }}>
              <LocationMap lat={listing.lat} lng={listing.lng} title={listing.title} />
            </div>
          </div>
        </section>
      )}

      {/* Other Listings */}
      {otherListings.length > 0 && (
        <section className="py-16 sm:py-20 md:py-28 bg-white border-t border-navy/8">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-10 sm:mb-12">Other Current Offerings</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {otherListings.map(l => (
                <Link key={l.id} href={`/listings/${l.id}/`} className="group block bg-white border border-soft-gray p-6 hover-lift">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="relative aspect-[4/3] sm:aspect-[3/2] sm:w-32 overflow-hidden flex-shrink-0">
                      {l.image ? (
                        <Image
                          src={l.image}
                          alt={l.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-navy-deep to-navy/80 flex items-center justify-center">
                          <div className="text-gold text-sm font-serif">{l.type}</div>
                        </div>
                      )}
                      {l.status !== 'For Sale' && (
                        <div className="absolute top-2 left-2 bg-gold text-navy text-[10px] tracking-[0.1em] uppercase font-bold px-2 py-1">
                          {l.status}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-lg sm:text-xl text-navy group-hover:text-gold transition-colors duration-300 mb-1">
                        {l.title}
                      </h3>
                      <p className="text-navy/40 text-sm mb-3">{l.location}</p>
                      <div className="flex items-center gap-4 text-[13px] text-navy/60">
                        <span>{l.units ? `${l.units} units` : l.type}</span>
                        <span className="w-1 h-1 rounded-full bg-navy/20" />
                        <span>{l.price ? fmt(l.price) : 'Price Upon Request'}</span>
                      </div>
                    </div>
                  </div>
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
