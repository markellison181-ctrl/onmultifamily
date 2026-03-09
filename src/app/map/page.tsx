'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TransactionMap from '@/components/TransactionMap'
import transactions from '@/data/transactions.json'

export default function MapPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="bg-navy pt-28 pb-10 md:pt-36 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-[12px] tracking-wide-custom uppercase text-gold font-medium">
              Transaction Map
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3">
            Our Footprint Across Ontario
          </h1>
          <p className="text-white/40 text-lg">
            Active listings, deals under contract, and completed transactions.
          </p>
        </div>
      </section>

      {/* Map */}
      <TransactionMap transactions={transactions as any} />

      <Footer />
    </main>
  )
}
