'use client'

import React, { useState } from 'react'
import { Calendar, Clock, User, TrendingUp, FileText, ArrowRight, ExternalLink, Star } from 'lucide-react'
import articlesData from '@/data/articles.json'

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: number
  author: string
  featured: boolean
  tags: string[]
}

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  const articles = articlesData as Article[]
  const featuredArticles = articles.filter(article => article.featured)
  const categories = ['All'].concat(Array.from(new Set(articles.map(article => article.category))))
  
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Market Analysis': 'bg-blue-100 text-blue-800',
      'Policy & Regulation': 'bg-purple-100 text-purple-800',
      'Market Fundamentals': 'bg-green-100 text-green-800',
      'Capital Markets': 'bg-orange-100 text-orange-800',
      'Investment Strategy': 'bg-red-100 text-red-800',
      'ESG & Sustainability': 'bg-emerald-100 text-emerald-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <section id="insights" className="section-padding bg-white">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-colliers-blue/10 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 text-colliers-blue" />
            <span className="text-colliers-blue font-medium text-sm">Market Intelligence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-colliers-blue-dark mb-6">
            Insights & Market Analysis
          </h2>
          
          <p className="text-xl text-colliers-gray-80 max-w-4xl mx-auto mb-12 leading-relaxed">
            Stay ahead of Ontario's multifamily market with exclusive insights, analysis, and commentary 
            from our experienced advisory team. Deep dives into market trends, policy changes, 
            and investment opportunities.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-2xl font-bold text-colliers-blue-dark">Featured Analysis</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredArticles.slice(0, 3).map((article, index) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-lg border border-colliers-gray-10 overflow-hidden card-hover"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Article Header */}
                <div className="relative h-48 bg-gradient-to-br from-colliers-blue-dark to-colliers-blue flex items-center justify-center">
                  <FileText className="w-16 h-16 text-white/50" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Article Meta */}
                  <div className="flex items-center space-x-4 text-sm text-colliers-gray-80 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-colliers-blue-dark mb-3 leading-tight">
                    {article.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-colliers-gray-80 text-sm mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-colliers-gray-40" />
                      <span className="text-sm font-medium text-colliers-blue-dark">
                        {article.author}
                      </span>
                    </div>
                    <button className="text-colliers-blue hover:text-colliers-blue-dark font-semibold text-sm flex items-center space-x-1 transition-colors duration-200">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-colliers-blue text-white shadow-md'
                  : 'bg-colliers-gray-10 text-colliers-gray-80 hover:bg-colliers-blue/10 hover:text-colliers-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.slice(0, 9).map((article, index) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-lg border border-colliers-gray-10 overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Article Header */}
              <div className="relative h-32 bg-gradient-to-r from-colliers-pale-blue to-colliers-light-blue/30 flex items-center justify-center">
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Article Meta */}
                <div className="flex items-center space-x-4 text-xs text-colliers-gray-80 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime} min</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-colliers-blue-dark mb-3 leading-tight">
                  {article.title}
                </h4>

                {/* Excerpt */}
                <p className="text-colliers-gray-80 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-colliers-blue/10 text-colliers-blue px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-colliers-gray-40" />
                    <span className="text-xs font-medium text-colliers-blue-dark">
                      {article.author}
                    </span>
                  </div>
                  <button className="text-colliers-blue hover:text-colliers-blue-dark font-semibold text-xs flex items-center space-x-1 transition-colors duration-200">
                    <span>Read</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup CTA */}
        <div className="bg-gradient-to-r from-colliers-blue-dark to-colliers-blue rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Get These Insights Delivered Weekly
          </h3>
          <p className="text-xl text-colliers-gray-10 mb-8 max-w-3xl mx-auto">
            Join 14,000+ multifamily professionals who receive our exclusive market intelligence 
            brief every Tuesday morning. Deep analysis, market data, and investment insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <div className="text-lg font-bold">14,000+</div>
              <div className="text-sm text-colliers-gray-10">Subscribers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <div className="text-lg font-bold">6 Years</div>
              <div className="text-sm text-colliers-gray-10">Publishing</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <div className="text-lg font-bold">Every Tuesday</div>
              <div className="text-sm text-colliers-gray-10">9:00 AM ET</div>
            </div>
          </div>

          <a
            href="#newsletter"
            className="bg-white text-colliers-blue hover:bg-colliers-gray-10 px-8 py-4 rounded-xl font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Subscribe to Weekly Brief</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Insights