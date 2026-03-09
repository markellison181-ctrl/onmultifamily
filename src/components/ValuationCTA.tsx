'use client'

import React from 'react'
import { Calculator, TrendingUp, Clock, CheckCircle } from 'lucide-react'

interface ValuationCTAProps {
  variant?: 'banner' | 'section'
  className?: string
}

const ValuationCTA: React.FC<ValuationCTAProps> = ({ variant = 'section', className = '' }) => {
  if (variant === 'banner') {
    return (
      <div className={`bg-colliers-blue text-white py-4 ${className}`}>
        <div className="container-width">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Calculator className="w-5 h-5 text-colliers-light-blue" />
              <div>
                <span className="font-semibold">Wondering what your building is worth?</span>
                <span className="hidden md:inline ml-2 text-colliers-gray-10">Get a complimentary opinion of value from Ontario's leading team.</span>
              </div>
            </div>
            <a
              href="#valuation-form"
              className="bg-white text-colliers-blue hover:bg-colliers-gray-10 px-6 py-2 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Get Free Valuation
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`section-padding bg-gradient-to-br from-colliers-pale-blue to-white ${className}`}>
      <div className="container-width">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <Calculator className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Complimentary Service</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            What's Your Building Worth?
          </h2>
          
          <p className="text-xl text-colliers-gray-80 mb-8 leading-relaxed">
            Get a professional, no-obligation opinion of value from Ontario's most trusted multifamily advisory team. 
            We analyze comparable sales, current market conditions, and your property's unique characteristics.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-colliers-blue/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-colliers-blue" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-colliers-blue-dark mb-1">Current Market Analysis</h4>
                <p className="text-sm text-colliers-gray-80">Based on recent comparable sales and market trends</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-colliers-blue/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-colliers-blue" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-colliers-blue-dark mb-1">48-Hour Turnaround</h4>
                <p className="text-sm text-colliers-gray-80">Fast, professional opinion delivered to your inbox</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-colliers-blue/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-colliers-blue" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-colliers-blue-dark mb-1">No Obligation</h4>
                <p className="text-sm text-colliers-gray-80">Complimentary service with no strings attached</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="(416) 555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                    Number of Units
                  </label>
                  <input
                    type="number"
                    id="units"
                    name="units"
                    className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                    placeholder="24"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                  placeholder="123 Main Street, Toronto, ON"
                />
              </div>
              
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-colliers-blue-dark mb-2">
                  Selling Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className="w-full px-4 py-3 border border-colliers-gray-10 rounded-lg focus:ring-2 focus:ring-colliers-blue focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="immediately">Ready to sell now</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="1-year">Within 1 year</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                Get My Free Valuation
              </button>
              
              <p className="text-xs text-colliers-gray-80 text-center leading-relaxed">
                By submitting this form, you consent to receive marketing communications from our team. 
                You can unsubscribe at any time. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValuationCTA