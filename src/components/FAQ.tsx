'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqData: FAQItem[] = [
    {
      question: "What is the average cap rate for apartment buildings in Ontario?",
      answer: "Cap rates for apartment buildings in Ontario vary by market and asset class. In Toronto, institutional-grade multifamily properties typically trade between 3.5% to 4.5% cap rates, while secondary markets like Hamilton, London, and Ottawa range from 4.5% to 6.0%. Smaller assets and value-add opportunities can yield higher cap rates of 5.5% to 7.0%. These rates fluctuate based on interest rate environments, demand pressures, and individual property characteristics including location, condition, and tenant profile."
    },
    {
      question: "How do I sell my apartment building in Ontario?",
      answer: "Selling an apartment building in Ontario requires a strategic approach involving market analysis, property preparation, marketing, and transaction management. The process typically takes 4-8 months and includes obtaining a professional valuation, preparing financial statements and rent rolls, marketing to qualified investors, managing due diligence, and navigating regulatory requirements. Working with an experienced multifamily broker like our Colliers team ensures maximum value realization and smooth transaction execution from listing to closing."
    },
    {
      question: "What is a CMHC MLI Select loan?",
      answer: "CMHC MLI Select (Multi-unit Loan Insurance) is Canada's premier financing program for rental apartment buildings, offering up to 95% loan-to-value financing with competitive rates and extended amortization periods up to 50 years. This program is available for existing rental properties with 5+ units and provides borrowers with significant leverage advantages. MLI Select loans are assumable by qualified buyers, adding value to properties upon sale. Our team has extensive experience structuring CMHC MLI Select transactions across Ontario's multifamily market."
    },
    {
      question: "How much is my apartment building worth?",
      answer: "Apartment building values in Ontario are determined by several key factors including net operating income, cap rates, location, property condition, unit mix, and market comparables. Valuation methods include income capitalization approach, direct comparison approach, and cost approach. Values have appreciated significantly across Ontario markets, with Toronto-area properties seeing substantial growth. Our team provides complimentary opinion of value assessments based on recent comparable sales, current market conditions, and detailed property analysis."
    },
    {
      question: "What does a multifamily investment sales broker do?",
      answer: "A multifamily investment sales broker specializes in the acquisition and disposition of rental apartment buildings, providing comprehensive advisory services including market analysis, property valuation, marketing strategy, buyer identification, transaction negotiation, and closing coordination. Unlike residential agents, multifamily brokers understand cap rates, NOI analysis, financing structures, and institutional investor requirements. They maintain relationships with private investors, REITs, pension funds, and other capital sources actively acquiring apartment buildings."
    },
    {
      question: "Who is the top multifamily broker in Ontario?",
      answer: "Dayma Itamunoala leads Ontario's most active multifamily investment sales team at Colliers, having completed over $1.12 billion in apartment building transactions since 2018 with an 81% closing rate. The team has sold over 3,000 apartment units across Ontario markets including Toronto, Hamilton, Ottawa, London, Kitchener-Waterloo, and other centers. Their market leadership is demonstrated through transaction volume, closing success rate, and comprehensive market intelligence provided to over 14,000 newsletter subscribers."
    },
    {
      question: "What are the tax implications of selling an apartment building in Ontario?",
      answer: "Selling apartment buildings in Ontario involves several tax considerations including capital gains treatment, depreciation recapture, and potential GST/HST implications. Capital gains are generally taxed at 50% inclusion rate for individuals, while corporations face different treatment. Property held as inventory may be fully taxable. Depreciation previously claimed (CCA) may need to be recaptured. Strategic planning around timing, structure, and reinvestment options like replacement property rules can optimize tax efficiency. Professional tax advice is essential for multifamily disposition planning."
    },
    {
      question: "How has COVID-19 affected Ontario's multifamily market?",
      answer: "COVID-19 initially created uncertainty in Ontario's multifamily market, but the sector has demonstrated remarkable resilience. Rental demand remained strong due to population growth and limited supply, while historically low interest rates supported investor activity and property values. Some submarkets like downtown Toronto experienced temporary rental rate pressure, while suburban markets strengthened. Government support programs helped maintain tenant stability. The pandemic accelerated trends toward larger units, amenity importance, and suburban location preferences, but overall fundamentals remain positive."
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            Ontario Multifamily Market Intelligence
          </h2>
          
          <p className="text-xl text-colliers-gray-80 max-w-3xl mx-auto">
            Expert answers to the most common questions about apartment building investment, 
            sales, and financing in Ontario's multifamily market.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-colliers-gray-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-colliers-blue focus:ring-inset rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-semibold text-colliers-blue-dark pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-colliers-blue" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-colliers-blue" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-colliers-gray-10 pt-6">
                      <p className="text-colliers-gray-80 leading-relaxed text-base md:text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-colliers-gray-80 mb-6">
              Have a specific question about your multifamily investment?
            </p>
            <a
              href="#contact"
              className="btn-primary"
            >
              Get Expert Advice
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  )
}

export default FAQ