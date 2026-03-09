import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import articlesData from '@/data/articles.json'

export default function InsightsPage() {
  const featuredArticles = articlesData.filter(article => article.featured)
  const recentArticles = articlesData.filter(article => !article.featured)

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="section-light border-b border-gray-100">
        <div className="container-narrow text-center">
          <div className="gold-line mx-auto mb-8"></div>
          <h1 className="heading-lg text-colliers-blue-dark mb-6">
            Market Intelligence
          </h1>
          <p className="body-xl text-colliers-gray-80 max-w-3xl mx-auto mb-12">
            Weekly analysis on Ontario multifamily markets. Cap rates, deal flow, policy updates, and actionable insights for apartment building owners and investors.
          </p>
          
          {/* Newsletter CTA */}
          <div className="bg-gray-50 rounded-lg p-12 max-w-2xl mx-auto">
            <h3 className="heading-sm text-colliers-blue-dark mb-4">
              Never miss an insight
            </h3>
            <p className="body-md text-colliers-gray-80 mb-6">
              Join 14,000+ multifamily professionals receiving weekly market intelligence.
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
      </section>

      {/* Featured Articles */}
      <section className="section-light">
        <div className="container-wide">
          <div className="text-center mb-20">
            <h2 className="heading-md text-colliers-blue-dark mb-4">
              Featured Analysis
            </h2>
            <p className="body-lg text-colliers-gray-80">
              In-depth market research and actionable investment guidance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {featuredArticles.map((article, index) => (
              <article key={article.id} className="group">
                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm text-colliers-gray-80 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="inline-block bg-colliers-pale-blue text-colliers-blue-dark text-xs font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                <h3 className="heading-sm text-colliers-blue-dark mb-6 group-hover:text-colliers-blue transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="body-md text-colliers-gray-80 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <Link 
                  href={`/insights/${article.id}`}
                  className="inline-flex items-center gap-2 text-colliers-blue-dark font-medium hover:text-colliers-blue transition-colors duration-300 group"
                >
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="section-light bg-gray-50">
          <div className="container-wide">
            <div className="text-center mb-20">
              <h2 className="heading-md text-colliers-blue-dark mb-4">
                Recent Insights
              </h2>
              <p className="body-lg text-colliers-gray-80">
                Stay current with the latest market developments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {recentArticles.map((article) => (
                <article key={article.id} className="group">
                  <div className="flex items-center gap-4 text-sm text-colliers-gray-80 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-white text-colliers-blue-dark text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-colliers-blue-dark mb-4 leading-tight group-hover:text-colliers-blue transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="body-md text-colliers-gray-80 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <Link 
                    href={`/insights/${article.id}`}
                    className="inline-flex items-center gap-2 text-colliers-blue-dark font-medium hover:text-colliers-blue transition-colors duration-300 group"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}