'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const MarketSnapshot = () => {
  const marketData = [
    {
      metric: "Avg Cap Rate",
      value: "4.8%",
      change: -0.2,
      period: "vs Q4 2025"
    },
    {
      metric: "Avg $/Suite", 
      value: "$195K",
      change: 8.5,
      period: "YoY"
    },
    {
      metric: "Rent Growth",
      value: "+4.2%",
      change: 1.1,
      period: "YoY"
    },
    {
      metric: "Vacancy Rate",
      value: "2.1%",
      change: -0.4,
      period: "vs Q4 2025"
    },
    {
      metric: "Transactions",
      value: "$1.2B", 
      change: 15.2,
      period: "YTD 2026"
    },
    {
      metric: "Avg DOM",
      value: "127 days",
      change: -18,
      period: "vs 2025"
    }
  ]

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-500"
    if (change < 0) return "text-red-500"  
    return "text-gray-400"
  }

  return (
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="container-full">
        <div className="bg-colliers-blue-dark text-white rounded-lg p-12">
          <div className="text-center mb-12">
            <h3 className="heading-sm text-white mb-4">
              Ontario Multifamily Market Snapshot
            </h3>
            <p className="text-gray-300">
              Current market metrics as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {marketData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-serif text-white mb-2 font-light">
                  {item.value}
                </div>
                
                <div className="text-gray-400 text-sm mb-3 uppercase tracking-wide">
                  {item.metric}
                </div>
                
                <div className="flex items-center justify-center gap-1">
                  {getTrendIcon(item.change)}
                  <span className={`text-xs font-medium ${getTrendColor(item.change)}`}>
                    {Math.abs(item.change)}%
                  </span>
                </div>
                
                <div className="text-gray-500 text-xs mt-1">
                  {item.period}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              Data sourced from Colliers Research, CMHC, and proprietary transaction database
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarketSnapshot