'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import soldData from '@/data/track-record.json'

interface SoldRecord {
  year: number
  address: string
  units: number
  price: number
  pricePerUnit: number
  city: string
  lat: number | null
  lng: number | null
  precision?: string
  note?: string
}

const records = soldData as SoldRecord[]

const fmtPrice = (n: number) =>
  n >= 1000000 ? `$${(n / 1000000).toFixed(n >= 10000000 ? 1 : 2)}M` : `$${(n / 1000).toFixed(0)}K`

const fmtPerUnit = (n: number) => `$${Math.round(n / 1000)}K`

/* ---------- Count-up stat ---------- */
function StatNumber({ value, prefix = '', suffix = '', decimals = 0, duration = 1600 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(value * eased)
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-CA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

/* ---------- Main component ---------- */
export default function TrackRecord() {
  const [yearFilter, setYearFilter] = useState<string>('all')
  const [cityFilter, setCityFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'year' | 'price' | 'units' | 'ppu'>('year')
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null)
  const [selected, setSelected] = useState<any | null>(null)

  useEffect(() => {
    import('./MapRenderer').then(mod => setMapComponent(() => mod.default))
  }, [])

  const years = useMemo(
    () => Array.from(new Set(records.map(r => r.year))).sort((a, b) => b - a),
    []
  )
  const cities = useMemo(
    () => Array.from(new Set(records.map(r => r.city))).sort(),
    []
  )

  const filtered = useMemo(() => {
    let out = records.filter(r => {
      if (yearFilter !== 'all' && String(r.year) !== yearFilter) return false
      if (cityFilter !== 'all' && r.city !== cityFilter) return false
      if (search && !r.address.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    out = [...out].sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price
        case 'units': return b.units - a.units
        case 'ppu': return b.pricePerUnit - a.pricePerUnit
        default: return b.year - a.year || b.price - a.price
      }
    })
    return out
  }, [yearFilter, cityFilter, search, sortBy])

  const filteredVolume = filtered.reduce((s, r) => s + r.price, 0)
  const filteredUnits = filtered.reduce((s, r) => s + r.units, 0)

  // Map data (only geocoded records)
  const mapTransactions = filtered
    .filter(r => r.lat && r.lng)
    .map((r, i) => ({
      id: `sold-${i}-${r.address}`,
      name: r.address.split(',')[0],
      address: r.address,
      city: r.city,
      lat: r.lat as number,
      lng: r.lng as number,
      price: r.price,
      suites: r.units,
      capRate: null,
      status: 'Sold' as const,
    }))

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative bg-navy-deep pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden noise">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/3 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
            <span className="text-[12px] tracking-[0.2em] uppercase text-gold-light font-medium">
              Completed Transactions
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-[4rem] text-white leading-[1.03] mb-6 max-w-3xl">
            A Track Record<br />Measured in Billions
          </h1>
          <p className="text-white/40 text-[17px] leading-relaxed max-w-xl mb-16">
            Every market cycle. Every asset class within multifamily. From 10-suite
            walk-ups to institutional portfolios, this is what execution looks like.
          </p>

          {/* Stat bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { label: 'Total Sales Volume', node: <><StatNumber value={1.59} prefix="$" decimals={2} />B+</> },
              { label: 'Suites Sold', node: <><StatNumber value={5100} />+</> },
              { label: 'Buildings Sold', node: <><StatNumber value={100} />+</> },
              { label: 'Closing Rate', node: <><StatNumber value={81} />%</> },
            ].map((s, i) => (
              <div key={i} className="bg-navy-deep px-6 py-8 md:py-10">
                <div className="font-serif text-3xl md:text-[2.6rem] text-white leading-none mb-3">
                  {s.node}
                </div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-gold-light/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-[12px] mt-4">
            Closing rate vs. an industry average of roughly 50%. Selected transactions shown below.
          </p>
        </div>
      </section>

      {/* ============ MAP ============ */}
      <section className="relative bg-navy">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pt-14 pb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">Where We&apos;ve Closed</h2>
          <p className="text-white/35 text-[15px]">
            Every gold marker is a completed sale. Toronto to Sault Ste. Marie.
          </p>
        </div>
        <div className="relative" style={{ height: '60vh', minHeight: '440px' }}>
          {MapComponent ? (
            <MapComponent
              transactions={mapTransactions}
              statusColors={{ Sold: '#C9A84C' }}
              onSelect={setSelected}
            />
          ) : (
            <div className="w-full h-full bg-cream flex items-center justify-center">
              <p className="text-navy/30 text-sm">Loading map...</p>
            </div>
          )}

          {selected && (
            <div className="absolute bottom-6 left-6 z-[1000] bg-white shadow-2xl max-w-sm p-6 border-l-2 border-gold">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-navy/30 hover:text-navy text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-[10px] tracking-[0.18em] uppercase text-gold font-bold mb-2">Sold</div>
              <h3 className="font-serif text-xl text-navy mb-1">{selected.name}</h3>
              <p className="text-navy/40 text-[13px] mb-3">{selected.city}, Ontario</p>
              <div className="flex gap-6 text-[14px] text-navy/70">
                <span>{selected.suites} suites</span>
                {selected.price > 0 && <span>{fmtPrice(selected.price)}</span>}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ TABLE ============ */}
      <section className="bg-cream py-20 md:py-28 noise">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gold" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold">
              Transaction History
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight">
              Selected Completed<br />Transactions
            </h2>
            <div className="text-right">
              <div className="font-serif text-2xl text-navy">{fmtPrice(filteredVolume)}</div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-navy/40">
                {filtered.length} transactions · {filteredUnits.toLocaleString()} suites shown
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex gap-1 bg-navy/5 p-1">
              <button
                onClick={() => setYearFilter('all')}
                className={`text-[12px] tracking-[0.1em] uppercase font-medium px-4 py-2 transition-all ${
                  yearFilter === 'all' ? 'bg-navy text-white' : 'text-navy/50 hover:text-navy'
                }`}
              >
                All Years
              </button>
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => setYearFilter(String(y))}
                  className={`text-[12px] tracking-[0.1em] uppercase font-medium px-4 py-2 transition-all ${
                    yearFilter === String(y) ? 'bg-navy text-white' : 'text-navy/50 hover:text-navy'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              className="bg-white border border-navy/10 text-navy/70 text-[13px] px-4 py-2.5 outline-none focus:border-gold/60 transition-colors"
            >
              <option value="all">All Cities</option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-white border border-navy/10 text-navy/70 text-[13px] px-4 py-2.5 outline-none focus:border-gold/60 transition-colors"
            >
              <option value="year">Newest First</option>
              <option value="price">Highest Price</option>
              <option value="units">Most Suites</option>
              <option value="ppu">Highest $/Suite</option>
            </select>

            <input
              type="text"
              placeholder="Search address..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 min-w-[180px] bg-white border border-navy/10 text-navy text-[13px] px-4 py-2.5 placeholder:text-navy/25 outline-none focus:border-gold/60 transition-colors"
            />
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy/8">
                  <th className="text-left text-[11px] tracking-[0.15em] uppercase text-navy/40 font-semibold px-6 py-4">Property</th>
                  <th className="text-left text-[11px] tracking-[0.15em] uppercase text-navy/40 font-semibold px-6 py-4">City</th>
                  <th className="text-right text-[11px] tracking-[0.15em] uppercase text-navy/40 font-semibold px-6 py-4">Year</th>
                  <th className="text-right text-[11px] tracking-[0.15em] uppercase text-navy/40 font-semibold px-6 py-4">Suites</th>
                  <th className="text-right text-[11px] tracking-[0.15em] uppercase text-navy/40 font-semibold px-6 py-4">Sale Price</th>
                  <th className="text-right text-[11px] tracking-[0.15em] uppercase text-navy/40 font-semibold px-6 py-4">Per Suite</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy/5 last:border-0 hover:bg-gold/5 transition-colors duration-300 group"
                  >
                    <td className="px-6 py-4">
                      <span className="text-navy text-[15px] font-medium group-hover:text-navy">
                        {r.address.split(',')[0]}
                      </span>
                      {r.note && (
                        <span className="block text-navy/35 text-[12px] mt-0.5">{r.note}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-navy/50 text-[14px]">{r.city}</td>
                    <td className="px-6 py-4 text-right text-navy/50 text-[14px]">{r.year}</td>
                    <td className="px-6 py-4 text-right text-navy/70 text-[14px]">{r.units}</td>
                    <td className="px-6 py-4 text-right font-serif text-[16px] text-navy">{fmtPrice(r.price)}</td>
                    <td className="px-6 py-4 text-right text-navy/50 text-[14px]">{fmtPerUnit(r.pricePerUnit)}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-navy/30 text-sm">
                      No transactions match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((r, i) => (
              <div key={i} className="bg-white p-5 shadow-sm border-l-2 border-gold/60">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-navy text-[15px] font-medium leading-snug">
                    {r.address.split(',')[0]}
                  </h3>
                  <span className="font-serif text-[17px] text-navy whitespace-nowrap">{fmtPrice(r.price)}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-navy/45">
                  <span>{r.city}</span>
                  <span>{r.year}</span>
                  <span>{r.units} suites</span>
                  <span>{fmtPerUnit(r.pricePerUnit)}/suite</span>
                </div>
                {r.note && <p className="text-navy/35 text-[12px] mt-2">{r.note}</p>}
              </div>
            ))}
          </div>

          <p className="text-navy/30 text-[13px] mt-6">
            Partial list. Full transaction history available on request.
          </p>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-navy-deep py-20 md:py-28 overflow-hidden noise">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/4 rounded-full blur-[140px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-[2.75rem] text-white leading-tight mb-5">
            Your Building Could Be<br />the Next One on This Page
          </h2>
          <p className="text-white/40 text-[16px] leading-relaxed max-w-xl mx-auto mb-10">
            Get a confidential, no-obligation opinion of value from the team that has
            closed more Ontario multifamily than anyone else.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] tracking-[0.18em] uppercase font-bold px-10 py-4.5 py-4 hover:shadow-[0_0_35px_rgba(201,168,76,0.35)] transition-all duration-500"
          >
            Request a Valuation
          </Link>
        </div>
      </section>
    </>
  )
}
