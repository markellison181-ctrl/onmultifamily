'use client'

import React, { useState } from 'react'
import { Download, TrendingUp, FileText, BarChart3, Users, Calendar, ExternalLink } from 'lucide-react'

const ResourceHub = () => {
  const [emailCapture, setEmailCapture] = useState<{ show: boolean; resource: string }>({
    show: false,
    resource: ''
  })

  const marketData = [
    {
      region: "Toronto (GTA)",
      avgCapRate: "3.8%",
      rentGrowth: "+4.2%",
      medianPrice: "$165K/unit",
      trend: "up",
      quarterlyChange: "+0.2%"
    },
    {
      region: "Ottawa",
      avgCapRate: "4.6%",
      rentGrowth: "+3.8%",
      medianPrice: "$142K/unit",
      trend: "up",
      quarterlyChange: "+0.3%"
    },
    {
      region: "Hamilton",
      avgCapRate: "4.9%",
      rentGrowth: "+5.1%",
      medianPrice: "$138K/unit",
      trend: "up",
      quarterlyChange: "+0.4%"
    },
    {
      region: "London",
      avgCapRate: "5.2%",
      rentGrowth: "+4.7%",
      medianPrice: "$128K/unit",
      trend: "up",
      quarterlyChange: "+0.3%"
    },
    {
      region: "Kitchener-Waterloo",
      avgCapRate: "4.7%",
      rentGrowth: "+4.4%",
      medianPrice: "$145K/unit",
      trend: "up",
      quarterlyChange: "+0.2%"
    },
    {
      region: "Windsor",
      avgCapRate: "6.1%",
      rentGrowth: "+6.2%",
      medianPrice: "$98K/unit",
      trend: "up",
      quarterlyChange: "+0.5%"
    }
  ]

  const resources = [
    {
      title: "2025 Ontario Multifamily Market Report",
      description: "Comprehensive analysis of cap rates, rent growth, and investment opportunities across Ontario's major markets.",
      type: "Market Report",
      pages: "42 pages",
      icon: FileText,
      featured: true
    },
    {
      title: "Cap Rate Survey Q1 2026",
      description: "Latest cap rate data from 150+ recent transactions across Ontario, segmented by market and asset class.",
      type: "Market Data",
      pages: "28 pages",
      icon: BarChart3,
      featured: true
    },
    {
      title: "Seller's Guide: Maximizing Your Multifamily Exit",
      description: "Step-by-step guide to preparing your apartment building for sale and maximizing value realization.",
      type: "Strategy Guide",
      pages: "35 pages",
      icon: TrendingUp,
      featured: false
    },
    {
      title: "CMHC MLI Select Financing Guide",
      description: "Complete guide to CMHC multifamily financing including qualification requirements and application process.",
      type: "Financing Guide",
      pages: "24 pages",
      icon: FileText,
      featured: false
    },
    {
      title: "Ontario Rent Control & Regulation Handbook",
      description: "Up-to-date guide to Ontario's rental regulations, rent increase guidelines, and landlord responsibilities.",
      type: "Regulatory Guide",
      pages: "31 pages",
      icon: FileText,
      featured: false
    },
    {
      title: "Institutional Buyer Profile Directory",
      description: "Profiles of active multifamily buyers in Ontario including investment criteria and contact information.",
      type: "Buyer Directory",
      pages: "18 pages",
      icon: Users,
      featured: false
    }
  ]

  const recentSales = [
    { property: "Hamilton Downtown Complex", units: 142, price: 18750000, location: "Hamilton" },
    { property: "Ottawa South Gardens", units: 245, price: 31200000, location: "Ottawa" },
    { property: "Burlington Maple Grove", units: 172, price: 27900000, location: "Burlington" },
    { property: "Markham Heights", units: 218, price: 33750000, location: "Markham" },
    { property: "London West Towers", units: 208, price: 22300000, location: "London" }
  ]

  const handleResourceClick = (resourceTitle: string) => {
    setEmailCapture({ show: true, resource: resourceTitle })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(price)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-colliers-pale-blue to-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <BarChart3 className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Market Intelligence Hub</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            Ontario Multifamily Market Intelligence
          </h2>
          
          <p className="text-xl text-colliers-gray-80 max-w-4xl mx-auto mb-8">
            The most comprehensive source of multifamily market data, research, and intelligence for Ontario. 
            Trusted by 14,000+ owners, investors, and operators across the province.
          </p>
        </div>

        {/* Market Data Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-colliers-blue-dark mb-8 text-center">
            Current Market Data (Q1 2026)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketData.map((market, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-colliers-blue-dark">{market.region}</h4>
                  <div className={`flex items-center space-x-1 text-sm ${
                    market.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    <span>{market.quarterlyChange}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-colliers-gray-80">Avg Cap Rate:</span>
                    <span className="font-semibold text-colliers-blue-dark">{market.avgCapRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-colliers-gray-80">Rent Growth:</span>
                    <span className="font-semibold text-green-600">{market.rentGrowth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-colliers-gray-80">Median $/Unit:</span>
                    <span className="font-semibold text-colliers-blue-dark">{market.medianPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-colliers-gray-80 mb-4">
              Data based on transactions closed in Q4 2025 - Q1 2026. Updated monthly.
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-colliers-blue-dark mb-8 text-center">
            Exclusive Market Reports & Guides
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-6 card-hover cursor-pointer ${
                    resource.featured ? 'ring-2 ring-colliers-blue/20' : ''
                  }`}
                  onClick={() => handleResourceClick(resource.title)}
                >
                  {resource.featured && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-colliers-blue text-white text-xs font-medium mb-4">
                      Featured
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-colliers-blue/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-colliers-blue" />
                    </div>
                    <div>
                      <div className="text-sm text-colliers-gray-80">{resource.type}</div>
                      <div className="text-xs text-colliers-gray-40">{resource.pages}</div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-lg text-colliers-blue-dark mb-3 leading-tight">
                    {resource.title}
                  </h4>
                  
                  <p className="text-colliers-gray-80 text-sm mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-colliers-blue font-semibold text-sm">Free Download</span>
                    <Download className="w-5 h-5 text-colliers-blue" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Transactions Ticker */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-colliers-blue" />
            <h3 className="text-2xl font-bold text-colliers-blue-dark">Recent Transactions</h3>
            <span className="text-sm text-colliers-gray-80">(Last 90 Days)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {recentSales.map((sale, index) => (
              <div key={index} className="border border-colliers-gray-10 rounded-xl p-4">
                <div className="text-sm font-semibold text-colliers-blue-dark mb-1">
                  {sale.property}
                </div>
                <div className="text-xs text-colliers-gray-80 mb-2">{sale.location}</div>
                <div className="text-lg font-bold text-colliers-blue mb-1">
                  {formatPrice(sale.price)}
                </div>
                <div className="text-xs text-colliers-gray-80">
                  {sale.units} units • {formatPrice(sale.price / sale.units)}/unit
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <a
              href="#listings"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View All Listings</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Email Capture Modal */}
        {emailCapture.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <Download className="w-12 h-12 text-colliers-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-colliers-blue-dark mb-2">
                  Download: {emailCapture.resource}
                </h3>
                <p className="text-colliers-gray-80 text-sm">
                  Enter your email to receive this exclusive resource and join our weekly market intelligence brief.
                </p>
              </div>
              
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                  required
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Download Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailCapture({ show: false, resource: '' })}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              <p className="text-xs text-colliers-gray-80 text-center mt-4 leading-relaxed">
                Join 14,000+ multifamily professionals receiving our weekly intelligence brief. Unsubscribe anytime.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourceHub