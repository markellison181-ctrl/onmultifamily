'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, ExternalLink, ArrowRight, Building2, TrendingUp, Users, CheckCircle } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Listings', href: '#listings' },
    { name: 'Insights', href: '#insights' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    { name: 'Property Valuations', href: '#valuation-form' },
    { name: 'Investment Sales', href: '#contact' },
    { name: 'Market Intelligence', href: '#insights' },
    { name: 'CMHC Financing', href: '#contact' },
    { name: 'Portfolio Advisory', href: '#contact' }
  ]

  const markets = [
    'Toronto (GTA)',
    'Ottawa',
    'Hamilton', 
    'London',
    'Kitchener-Waterloo',
    'Windsor',
    'Kingston',
    'Barrie'
  ]

  return (
    <footer className="bg-colliers-blue-dark text-white">
      {/* Main Footer Content */}
      <div className="container-width py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-colliers-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">OM</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">OnMultifamily</div>
                <div className="text-colliers-gray-10 text-sm">by Colliers</div>
              </div>
            </div>
            
            <p className="text-colliers-gray-10 mb-6 leading-relaxed">
              Ontario's premier multifamily advisory team. Over $1.12B in completed transactions 
              since 2018. Led by Dayma Itamunoala, SVP at Colliers International.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-lg font-bold text-colliers-light-blue">$1.12B+</div>
                <div className="text-xs text-colliers-gray-10">Transactions</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-lg font-bold text-colliers-light-blue">81%</div>
                <div className="text-xs text-colliers-gray-10">Close Rate</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-lg font-bold text-colliers-light-blue">3,000+</div>
                <div className="text-xs text-colliers-gray-10">Units Sold</div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3">
                <div className="text-lg font-bold text-colliers-light-blue">14K+</div>
                <div className="text-xs text-colliers-gray-10">Subscribers</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-colliers-light-blue" />
                <a 
                  href="mailto:dayma.itamunoala@colliers.com"
                  className="text-colliers-gray-10 hover:text-white transition-colors duration-200"
                >
                  dayma.itamunoala@colliers.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-colliers-light-blue" />
                <span className="text-colliers-gray-10">Available through Colliers Toronto</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-colliers-light-blue" />
                <span className="text-colliers-gray-10">Toronto, Ontario, Canada</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-colliers-gray-10 hover:text-colliers-light-blue transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-6 mt-8">Services</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className="block text-colliers-gray-10 hover:text-colliers-light-blue transition-colors duration-200"
                >
                  {service.name}
                </a>
              ))}
            </div>
          </div>

          {/* Markets Served */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Markets Served</h3>
            <div className="grid grid-cols-1 gap-2">
              {markets.map((market, index) => (
                <div key={index} className="text-colliers-gray-10 text-sm">
                  {market}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white mb-4">Why Choose Our Team?</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 text-colliers-light-blue mt-0.5 flex-shrink-0" />
                  <span className="text-colliers-gray-10 text-sm">Most active multifamily team in Ontario</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="w-4 h-4 text-colliers-light-blue mt-0.5 flex-shrink-0" />
                  <span className="text-colliers-gray-10 text-sm">Institutional buyer networks</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Building2 className="w-4 h-4 text-colliers-light-blue mt-0.5 flex-shrink-0" />
                  <span className="text-colliers-gray-10 text-sm">Comprehensive market intelligence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Weekly Market Brief</h3>
            <p className="text-colliers-gray-10 mb-6 leading-relaxed">
              Join 14,000+ multifamily professionals receiving our exclusive market intelligence. 
              Delivered every Tuesday morning.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-colliers-gray-10 focus:bg-white/15 focus:border-colliers-light-blue focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-colliers-light-blue hover:bg-blue-400 text-colliers-blue-dark font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {subscribed && (
                <div className="p-3 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Successfully subscribed!</span>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <div className="text-sm font-semibold text-white mb-2">What you'll get:</div>
              <ul className="text-colliers-gray-10 text-sm space-y-1">
                <li>• Weekly transaction updates</li>
                <li>• Cap rate analysis</li>
                <li>• Policy & financing updates</li>
                <li>• Off-market opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-8">
        <div className="container-width">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright & Colliers Brand */}
            <div className="flex items-center space-x-6 text-colliers-gray-10 text-sm">
              <div>
                © 2026 OnMultifamily Team. All rights reserved.
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center space-x-2">
                <span>Powered by</span>
                <a 
                  href="https://www.colliers.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-colliers-light-blue hover:text-white transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>Colliers International</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-colliers-gray-10 text-sm">
              <a href="#" className="hover:text-colliers-light-blue transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-colliers-light-blue transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-colliers-light-blue transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>

          {/* Professional Disclaimer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-colliers-gray-40 text-xs leading-relaxed text-center max-w-4xl mx-auto">
              OnMultifamily operates as part of Colliers International. All team members are licensed real estate professionals. 
              Market data and analysis are provided for informational purposes and should not be considered as investment advice. 
              Past performance does not guarantee future results. Properties subject to prior sale, price change, or withdrawal from market.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer