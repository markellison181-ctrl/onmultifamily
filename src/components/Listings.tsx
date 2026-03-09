'use client'

import React, { useState, useEffect } from 'react'
import { Building2, MapPin, DollarSign, Users, Calendar, Filter, Search, Eye } from 'lucide-react'
import listingsData from '@/data/listings.json'

type ListingStatus = 'Active' | 'Under Contract' | 'Sold' | 'Reduced'
type ListingType = 'All' | 'Low-Rise' | 'Mid-Rise' | 'High-Rise'

interface Listing {
  id: string
  name: string
  address: string
  city: string
  status: ListingStatus
  price: number
  originalPrice?: number
  suites: number
  capRate: number
  pricePerSuite: number
  yearBuilt: number
  type: string
  description: string
  features: string[]
  image: string
  featured: boolean
}

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>(listingsData as Listing[])
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings)
  const [activeTab, setActiveTab] = useState<string>('All')
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minSuites: '',
    maxSuites: '',
    city: '',
    type: 'All' as ListingType
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const tabs = [
    { id: 'All', name: 'All Listings', count: listings.length },
    { id: 'Active', name: 'Active Listings', count: listings.filter(l => l.status === 'Active').length },
    { id: 'Under Contract', name: 'Under Contract', count: listings.filter(l => l.status === 'Under Contract').length },
    { id: 'Sold', name: 'Recently Sold', count: listings.filter(l => l.status === 'Sold').length }
  ]

  const cities = Array.from(new Set(listings.map(l => l.city))).sort()
  const buildingTypes = ['All', 'Low-Rise', 'Mid-Rise', 'High-Rise']

  useEffect(() => {
    let filtered = listings

    // Filter by tab
    if (activeTab !== 'All') {
      filtered = filtered.filter(listing => listing.status === activeTab)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filters
    if (filters.minPrice) {
      filtered = filtered.filter(listing => listing.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(listing => listing.price <= parseInt(filters.maxPrice))
    }
    if (filters.minSuites) {
      filtered = filtered.filter(listing => listing.suites >= parseInt(filters.minSuites))
    }
    if (filters.maxSuites) {
      filtered = filtered.filter(listing => listing.suites <= parseInt(filters.maxSuites))
    }
    if (filters.city) {
      filtered = filtered.filter(listing => listing.city === filters.city)
    }
    if (filters.type !== 'All') {
      filtered = filtered.filter(listing => listing.type === filters.type)
    }

    setFilteredListings(filtered)
  }, [activeTab, filters, searchTerm, listings])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-CA').format(num)
  }

  const getStatusBadge = (status: ListingStatus, originalPrice?: number) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
    
    switch (status) {
      case 'Active':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>
      case 'Under Contract':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Under Contract</span>
      case 'Sold':
        return <span className={`${baseClasses} bg-colliers-red text-white`}>Sold</span>
      case 'Reduced':
        return <span className={`${baseClasses} bg-orange-100 text-orange-800`}>Price Reduced</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>
    }
  }

  return (
    <section id="listings" className="section-padding bg-colliers-pale-blue">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Investment Opportunities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            Ontario Multifamily Listings
          </h2>
          
          <p className="text-xl text-colliers-gray-80 max-w-3xl mx-auto">
            Exclusive access to Ontario's premier multifamily investment opportunities. 
            Current listings, recent transactions, and off-market opportunities.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-colliers-gray-40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, city, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <select
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value as ListingType})}
                className="px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue"
              >
                {buildingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center space-x-2 whitespace-nowrap"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-colliers-gray-10 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-colliers-blue-dark mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="5,000,000"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-colliers-blue-dark mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="50,000,000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-colliers-blue-dark mb-2">Min Units</label>
                  <input
                    type="number"
                    placeholder="50"
                    value={filters.minSuites}
                    onChange={(e) => setFilters({...filters, minSuites: e.target.value})}
                    className="w-full px-3 py-2 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-colliers-blue-dark mb-2">Max Units</label>
                  <input
                    type="number"
                    placeholder="500"
                    value={filters.maxSuites}
                    onChange={(e) => setFilters({...filters, maxSuites: e.target.value})}
                    className="w-full px-3 py-2 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-colliers-blue text-white shadow-md'
                  : 'text-colliers-gray-80 hover:text-colliers-blue hover:bg-colliers-blue/5'
              }`}
            >
              <span>{tab.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-colliers-gray-10 text-colliers-gray-80'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Summary */}
        <div className="text-center mb-8">
          <p className="text-colliers-gray-80">
            Showing {filteredListings.length} of {listings.length} properties
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredListings.map((listing, index) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Property Image */}
              <div className="relative h-64 bg-gradient-to-br from-colliers-blue-dark to-colliers-blue flex items-center justify-center">
                <Building2 className="w-16 h-16 text-white/50" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {getStatusBadge(listing.status, listing.originalPrice)}
                </div>
                
                {/* Featured Badge */}
                {listing.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Property Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-colliers-blue-dark mb-2 leading-tight">
                    {listing.name}
                  </h3>
                  <div className="flex items-center text-colliers-gray-80 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{listing.address}</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-colliers-pale-blue rounded-lg">
                    <div className="text-2xl font-bold text-colliers-blue-dark">
                      {formatPrice(listing.price)}
                    </div>
                    {listing.originalPrice && listing.status === 'Reduced' && (
                      <div className="text-sm text-colliers-gray-40 line-through">
                        {formatPrice(listing.originalPrice)}
                      </div>
                    )}
                    <div className="text-xs text-colliers-gray-80">Price</div>
                  </div>
                  <div className="text-center p-3 bg-colliers-pale-blue rounded-lg">
                    <div className="text-2xl font-bold text-colliers-blue-dark">
                      {listing.capRate}%
                    </div>
                    <div className="text-xs text-colliers-gray-80">Cap Rate</div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-colliers-gray-80">Units:</span>
                    <span className="font-semibold text-colliers-blue-dark">{listing.suites}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-colliers-gray-80">Price/Unit:</span>
                    <span className="font-semibold text-colliers-blue-dark">
                      {formatPrice(listing.pricePerSuite)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-colliers-gray-80">Year Built:</span>
                    <span className="font-semibold text-colliers-blue-dark">{listing.yearBuilt}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-colliers-gray-80">Type:</span>
                    <span className="font-semibold text-colliers-blue-dark">{listing.type}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-colliers-gray-80 text-sm mb-6 leading-relaxed">
                  {listing.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {listing.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-colliers-blue/10 text-colliers-blue px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {listing.features.length > 3 && (
                      <span className="text-colliers-gray-40 text-xs py-1">
                        +{listing.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-colliers-gray-40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-colliers-blue-dark mb-2">No listings found</h3>
            <p className="text-colliers-gray-80 mb-6">
              Try adjusting your filters or search terms to see more results.
            </p>
            <button
              onClick={() => {
                setFilters({
                  minPrice: '',
                  maxPrice: '',
                  minSuites: '',
                  maxSuites: '',
                  city: '',
                  type: 'All'
                })
                setSearchTerm('')
                setActiveTab('All')
              }}
              className="btn-secondary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-colliers-blue-dark mb-4">
              Looking for Off-Market Opportunities?
            </h3>
            <p className="text-colliers-gray-80 mb-6">
              Get exclusive access to pocket listings and pre-market opportunities. 
              Our team sees deals before they hit the market.
            </p>
            <a href="#contact" className="btn-primary">
              Get Exclusive Access
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Listings