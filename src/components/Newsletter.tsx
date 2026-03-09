'use client'

import React, { useState } from 'react'
import { Mail, Users, TrendingUp, Calendar, Star, CheckCircle, ArrowRight } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  const recentIssues = [
    {
      title: "Why Ontario Cap Rates Are Compressing in 2026",
      excerpt: "Interest rate stability and institutional demand are driving cap rate compression across Ontario's major markets. Here's what it means for owners and buyers.",
      date: "March 5, 2026",
      category: "Market Analysis",
      readTime: "6 min read",
      subscribers: "14,247 readers"
    },
    {
      title: "CMHC MLI Select: What Every Landlord Needs to Know",
      excerpt: "Recent updates to CMHC's multifamily lending program create new opportunities for refinancing and acquisition. Our complete breakdown of the changes.",
      date: "February 28, 2026", 
      category: "Financing",
      readTime: "8 min read",
      subscribers: "13,892 readers"
    },
    {
      title: "The Hidden Value in Small-Town Ontario Multifamily",
      excerpt: "While everyone focuses on GTA and Ottawa, secondary markets like Kingston, Barrie, and Peterborough offer compelling risk-adjusted returns.",
      date: "February 21, 2026",
      category: "Investment Strategy", 
      readTime: "10 min read",
      subscribers: "14,156 readers"
    }
  ]

  const testimonials = [
    {
      quote: "The weekly brief is the first thing I read Monday morning. Dayma's team provides insights you can't get anywhere else.",
      author: "Private Investor",
      location: "Toronto",
      type: "Portfolio Owner"
    },
    {
      quote: "Their market intelligence has directly influenced three of our acquisition decisions this year. Invaluable resource.",
      author: "Investment Manager", 
      location: "Hamilton",
      type: "Institutional Investor"
    }
  ]

  const keyInsights = [
    "Weekly transaction updates with pricing and cap rate analysis",
    "Exclusive CMHC policy updates and financing market intelligence", 
    "Early access to off-market opportunities and pocket listings",
    "Quarterly detailed market reports for all Ontario regions",
    "Direct insights from Ontario's most active multifamily team"
  ]

  return (
    <section id="newsletter" className="section-padding gradient-bg">
      <div className="container-width">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
              <Mail className="w-5 h-5 text-colliers-light-blue" />
              <span className="text-white font-medium text-sm">Weekly Market Intelligence</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join 14,000+ Multifamily Professionals
            </h2>
            
            <p className="text-xl text-colliers-gray-10 max-w-3xl mx-auto mb-8 leading-relaxed">
              Get exclusive market insights, deal flow analysis, and capital markets intelligence 
              from Ontario's most trusted multifamily advisory team. Delivered every Tuesday morning.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 text-colliers-light-blue mb-12">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">14,000+ Subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">6 Years Publishing</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">98% Open Rate</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Subscribe to Ontario's Leading Multifamily Intelligence Brief
              </h3>
              <p className="text-colliers-gray-10">
                Join owners, investors, and operators who rely on our weekly insights to make better decisions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 rounded-xl border-0 text-colliers-blue-dark placeholder-colliers-gray-40 focus:ring-2 focus:ring-colliers-light-blue"
                  required
                />
                <button
                  type="submit"
                  className="bg-colliers-light-blue hover:bg-blue-400 text-colliers-blue-dark font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-colliers-gray-10 text-sm text-center mt-4">
                Free forever. Unsubscribe anytime. We respect your privacy.
              </p>
              
              {subscribed && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Successfully subscribed! Check your email.</span>
                  </div>
                </div>
              )}
            </form>

            {/* What You'll Get */}
            <div className="mt-12">
              <h4 className="text-lg font-bold text-white text-center mb-6">What you'll get every week:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-colliers-gray-10 text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Issues Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-12">Recent Issues</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {recentIssues.map((issue, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-colliers-light-blue/20 text-colliers-light-blue px-3 py-1 rounded-full text-sm font-medium">
                      {issue.category}
                    </span>
                    <span className="text-colliers-gray-10 text-sm">{issue.date}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3 leading-tight">
                    {issue.title}
                  </h4>
                  
                  <p className="text-colliers-gray-10 text-sm mb-4 leading-relaxed">
                    {issue.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-colliers-gray-40">
                    <span>{issue.readTime}</span>
                    <span>{issue.subscribers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-2xl font-bold text-white text-center mb-12">What Subscribers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-white text-lg mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="text-colliers-gray-10">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm">{testimonial.type} • {testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter