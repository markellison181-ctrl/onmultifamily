import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TrackRecord from '@/components/TrackRecord'
import Listings from '@/components/Listings'
import Newsletter from '@/components/Newsletter'
import ValuationCTA from '@/components/ValuationCTA'
import TransactionTicker from '@/components/TransactionTicker'
import MarketSnapshot from '@/components/MarketSnapshot'
import Team from '@/components/Team'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Structured Data for SEO & AI Discovery */}
      <StructuredData />
      
      {/* Header */}
      <Header />

      {/* Hero Section - Full viewport, cinematic */}
      <Hero />

      {/* About Section - Editorial feel with team photo */}
      <About />

      {/* Track Record - Dark section with stats and client logos */}
      <TrackRecord />

      {/* Market Snapshot - Bloomberg-style data widget */}
      <MarketSnapshot />

      {/* Listings Section - Premium cards, max 6 visible */}
      <Listings />

      {/* Newsletter Section - The anchor with actual valuable content */}
      <Newsletter />

      {/* Valuation CTA - Elegant, not salesy */}
      <ValuationCTA />

      {/* Transaction Ticker - Social proof */}
      <TransactionTicker />

      {/* Team Section - Editorial portraits */}
      <Team />

      {/* FAQ Section - Premium accordion style */}
      <FAQ />

      {/* Contact Section - Minimal */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}