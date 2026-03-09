'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import articlesData from '@/data/articles.json'

const Newsletter = () => {
  // Get latest 3 featured articles
  const featuredArticles = articlesData.filter(article => article.featured).slice(0, 3)

  return (
    <section className="section-light">
      <div className="container-full">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="gold-line mx-auto mb-8"></div>
          <h2 className="heading-lg text-colliers-blue-dark mb-8">
            Market Intelligence
          </h2>
          <p className="body-xl text-colliers-gray-80 max-w-4xl mx-auto mb-12">
            Weekly Ontario multifamily market intelligence. Cap rates, deal flow, CMHC policy, and actionable analysis for apartment building owners and investors.
          </p>

          {/* Newsletter Subscribe CTA */}
          <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto mb-20">
            <h3 className="heading-sm text-colliers-blue-dark mb-4">
              Join 14,000+ Subscribers
            </h3>
            <p className="body-md text-colliers-gray-80 mb-8">
              Get weekly market intelligence delivered to your inbox. Cap rate analysis, policy updates, and investment opportunities across Ontario.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 border border-gray-300 rounded-none focus:border-colliers-blue-dark focus:outline-none"
              />
              <button 
                type="submit"
                className="btn-secondary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Featured Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {featuredArticles.map((article, index) => (
            <article key={article.id} className="group">
              {/* Article Meta */}
              <div className="mb-6">
                <div className="flex items-center gap-4 text-sm text-colliers-gray-80 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-colliers-pale-blue text-colliers-blue-dark text-xs font-medium px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Title */}
              <h3 className="text-2xl font-serif text-colliers-blue-dark mb-6 leading-tight group-hover:text-colliers-blue transition-colors duration-300">
                {article.title}
              </h3>
              
              {/* Article Excerpt */}
              <p className="body-md text-colliers-gray-80 mb-8 leading-relaxed">
                {article.excerpt}
              </p>
              
              {/* Read Link */}
              <Link 
                href={`/insights/${article.id}`}
                className="inline-flex items-center gap-2 text-colliers-blue-dark font-medium hover:text-colliers-blue transition-colors duration-300 group"
              >
                <span>Read →</span>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16">
          <Link 
            href="/insights"
            className="inline-flex items-center gap-2 text-colliers-blue-dark font-medium hover:text-colliers-blue transition-colors duration-300 text-lg group"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Testimonial */}
        <div className="text-center mt-20 max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-12">
            <blockquote className="body-lg text-colliers-blue-dark italic mb-6 leading-relaxed">
              "Dayma's weekly insights are essential reading for anyone serious about Ontario multifamily investing. The cap rate analysis and market commentary consistently help us identify opportunities ahead of the competition."
            </blockquote>
            <div className="text-sm text-colliers-gray-80">
              <div className="font-semibold">Michael Chen</div>
              <div>Portfolio Manager, Institutional Real Estate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter