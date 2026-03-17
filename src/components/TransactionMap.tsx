'use client'

import React, { useState, useEffect } from 'react'

// Types
interface Transaction {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  price: number
  suites: number
  capRate: number | null
  status: 'Active' | 'Under Contract' | 'Sold'
  year?: number
  image?: string
}

const statusColors: Record<string, string> = {
  Active: '#0072CE',
  'Under Contract': '#C9A84C',
  Sold: '#002B49',
}

const statusLabels: Record<string, string> = {
  Active: 'Active Listings',
  'Under Contract': 'Under Contract',
  Sold: 'Sold',
}

function fmt(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`
}

export default function TransactionMap({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState<string>('all')
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null)
  const [selected, setSelected] = useState<Transaction | null>(null)

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.status === filter)

  const totals = {
    all: transactions.length,
    Active: transactions.filter(t => t.status === 'Active').length,
    'Under Contract': transactions.filter(t => t.status === 'Under Contract').length,
    Sold: transactions.filter(t => t.status === 'Sold').length,
  }

  const totalValue = transactions.reduce((sum, t) => sum + (t.price || 0), 0)
  const totalSuites = transactions.reduce((sum, t) => sum + t.suites, 0)

  // Dynamic import leaflet (client only)
  useEffect(() => {
    import('./MapRenderer').then(mod => setMapComponent(() => mod.default))
  }, [])

  return (
    <div>
      {/* Stats Bar */}
      <div className="bg-navy py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <div>
                <div className="font-serif text-2xl text-white">{fmt(totalValue)}+</div>
                <div className="text-[11px] tracking-wide-custom uppercase text-white/40">Total Transactions</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-white">{transactions.length}</div>
                <div className="text-[11px] tracking-wide-custom uppercase text-white/40">Properties</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-white">{totalSuites.toLocaleString()}</div>
                <div className="text-[11px] tracking-wide-custom uppercase text-white/40">Total Suites</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-white/5 p-1">
              <button
                onClick={() => setFilter('all')}
                className={`text-[12px] tracking-wide-custom uppercase font-medium px-4 py-2 transition-all ${
                  filter === 'all' ? 'bg-white text-navy' : 'text-white/50 hover:text-white'
                }`}
              >
                All ({totals.all})
              </button>
              {(['Active', 'Under Contract', 'Sold'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`text-[12px] tracking-wide-custom uppercase font-medium px-4 py-2 transition-all ${
                    filter === s ? 'bg-white text-navy' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {s} ({totals[s]})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative" style={{ height: '70vh', minHeight: '500px' }}>
        {MapComponent ? (
          <MapComponent
            transactions={filtered}
            statusColors={statusColors}
            onSelect={setSelected}
          />
        ) : (
          <div className="w-full h-full bg-cream flex items-center justify-center">
            <p className="text-navy/30 text-sm">Loading map...</p>
          </div>
        )}

        {/* Selected Property Card */}
        {selected && (
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white shadow-xl z-[1000]">
            <div className="p-6">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-navy/30 hover:text-navy text-lg"
              >
                ×
              </button>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: statusColors[selected.status] }}
                />
                <span className="text-[11px] tracking-wide-custom uppercase font-semibold" style={{ color: statusColors[selected.status] }}>
                  {selected.status}
                </span>
              </div>
              <h3 className="font-serif text-xl text-navy mb-1">{selected.name}</h3>
              <p className="text-navy/40 text-sm mb-4">{selected.city}, Ontario</p>
              <div className="flex gap-6 text-[14px]">
                <div>
                  <div className="text-navy font-medium">{selected.price ? fmt(selected.price) : 'Confidential'}</div>
                  <div className="text-navy/30 text-[11px] uppercase">Price</div>
                </div>
                <div>
                  <div className="text-navy font-medium">{selected.suites}</div>
                  <div className="text-navy/30 text-[11px] uppercase">Suites</div>
                </div>
                {selected.capRate && (
                  <div>
                    <div className="text-navy font-medium">{selected.capRate}%</div>
                    <div className="text-navy/30 text-[11px] uppercase">Cap Rate</div>
                  </div>
                )}
              </div>
              {selected.status !== 'Sold' && (
                <a
                  href={`/listings/${selected.id}/`}
                  className="block mt-4 text-[12px] tracking-wide-custom uppercase font-medium text-blue hover:text-navy transition-colors"
                >
                  View Details →
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-cream py-4 border-t border-soft-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center gap-6">
          {Object.entries(statusLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[key] }} />
              <span className="text-[12px] text-navy/50">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
