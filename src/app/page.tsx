import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ValuationCTA from '@/components/ValuationCTA'
import Listings from '@/components/Listings'
import ResourceHub from '@/components/ResourceHub'
import Newsletter from '@/components/Newsletter'
import FAQ from '@/components/FAQ'
import Insights from '@/components/Insights'
import Team from '@/components/Team'
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

      {/* Hero Section */}
      <Hero />

      {/* Valuation CTA Banner */}
      <ValuationCTA variant="banner" className="sticky top-16 z-40" />

      {/* Listings Section */}
      <Listings />

      {/* Subtle CTA Section 1 */}
      <section className="py-16 bg-white">
        <div className="container-width text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-colliers-blue-dark mb-4">
              Thinking about selling? We've closed 81% of every listing we've taken on.
            </h3>
            <p className="text-colliers-gray-80 mb-6">
              Our proven track record speaks for itself. From initial valuation to closing day, 
              we guide you through every step of the process with expert advice and institutional-grade marketing.
            </p>
            <a 
              href="#contact" 
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Let's Talk</span>
            </a>
          </div>
        </div>
      </section>

      {/* Resource Hub */}
      <ResourceHub />

      {/* Valuation CTA Section (full form) */}
      <ValuationCTA />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Subtle CTA Section 2 */}
      <section className="py-16 bg-colliers-pale-blue">
        <div className="container-width text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-colliers-blue-dark mb-4">
              Need financing guidance? Our team structures deals with every major lender in Canada.
            </h3>
            <p className="text-colliers-gray-80 mb-6">
              From CMHC MLI Select to private lending, we have relationships with institutional lenders, 
              credit unions, and alternative capital sources to optimize your financing strategy.
            </p>
            <a 
              href="#contact" 
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Insights Section */}
      <Insights />

      {/* Team Section */}
      <Team />

      {/* Contact Section */}
      <Contact />

      {/* Recent Transactions Ticker */}
      <section className="py-12 bg-colliers-blue-dark text-white">
        <div className="container-width">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">Recent Transactions</h3>
            <p className="text-colliers-gray-10">A sample of our recent multifamily closings across Ontario</p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-8 pb-4" style={{ minWidth: 'max-content' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px]">
                <div className="font-semibold">Hamilton Downtown Complex</div>
                <div className="text-sm text-colliers-gray-10 mb-2">Hamilton • 142 Units</div>
                <div className="text-lg font-bold text-colliers-light-blue">$18.75M</div>
                <div className="text-xs text-colliers-gray-10">$132K/unit • 5.1% cap</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px]">
                <div className="font-semibold">Ottawa South Gardens</div>
                <div className="text-sm text-colliers-gray-10 mb-2">Ottawa • 245 Units</div>
                <div className="text-lg font-bold text-colliers-light-blue">$31.2M</div>
                <div className="text-xs text-colliers-gray-10">$127K/unit • 4.1% cap</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px]">
                <div className="font-semibold">Burlington Maple Grove</div>
                <div className="text-sm text-colliers-gray-10 mb-2">Burlington • 172 Units</div>
                <div className="text-lg font-bold text-colliers-light-blue">$27.9M</div>
                <div className="text-xs text-colliers-gray-10">$162K/unit • 4.4% cap</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px]">
                <div className="font-semibold">Markham Heights</div>
                <div className="text-sm text-colliers-gray-10 mb-2">Markham • 218 Units</div>
                <div className="text-lg font-bold text-colliers-light-blue">$33.75M</div>
                <div className="text-xs text-colliers-gray-10">$155K/unit • 3.9% cap</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[280px]">
                <div className="font-semibold">London West Towers</div>
                <div className="text-sm text-colliers-gray-10 mb-2">London • 208 Units</div>
                <div className="text-lg font-bold text-colliers-light-blue">$22.3M</div>
                <div className="text-xs text-colliers-gray-10">$107K/unit • 4.8% cap</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="text-colliers-gray-10 text-sm mb-4">
              Over $130M+ in transactions represented above • Average time on market: 4.2 months
            </div>
            <a 
              href="#listings" 
              className="btn-secondary text-sm"
            >
              View All Listings
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}