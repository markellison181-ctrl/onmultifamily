'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, TrendingUp, Users, DollarSign, Award } from 'lucide-react'

const Hero = () => {
  const [counters, setCounters] = useState({
    sales: 0,
    closeRate: 0,
    units: 0,
    subscribers: 0
  })

  const targetValues = {
    sales: 1120000000, // $1.12B
    closeRate: 81, // 81%
    units: 3000, // 3,000+ units
    subscribers: 14000 // 14,000+ subscribers
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepTime = duration / steps

    const intervals = Object.keys(targetValues).map(key => {
      const target = targetValues[key as keyof typeof targetValues]
      const increment = target / steps
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(intervals.find(i => i === intervals[Object.keys(targetValues).indexOf(key)]))
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, stepTime)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  const formatNumber = (num: number, type: string) => {
    switch (type) {
      case 'sales':
        return `$${(num / 1000000000).toFixed(2)}B+`
      case 'closeRate':
        return `${num}%+`
      case 'units':
        return `${(num / 1000).toFixed(1)}K+`
      case 'subscribers':
        return `${(num / 1000).toFixed(1)}K+`
      default:
        return num.toLocaleString()
    }
  }

  const stats = [
    {
      icon: DollarSign,
      value: formatNumber(counters.sales, 'sales'),
      label: 'in completed multifamily sales',
      color: 'text-colliers-light-blue'
    },
    {
      icon: TrendingUp,
      value: formatNumber(counters.closeRate, 'closeRate'),
      label: 'closing percentage',
      color: 'text-green-400'
    },
    {
      icon: Award,
      value: formatNumber(counters.units, 'units'),
      label: 'units sold since 2018',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      value: formatNumber(counters.subscribers, 'subscribers'),
      label: 'newsletter subscribers',
      color: 'text-colliers-blue'
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-colliers-blue rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-colliers-light-blue rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="container-width relative z-10">
        <div className="text-center">
          {/* Hero Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-colliers-blue/20 backdrop-blur-sm px-4 py-2 rounded-full border border-colliers-blue/30 mb-8">
              <Award className="w-4 h-4 text-colliers-light-blue" />
              <span className="text-colliers-light-blue font-medium text-sm">Ontario's #1 Multifamily Team</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Ontario's Premier
              <span className="block text-gradient">Multifamily Advisory</span>
              <span className="block">Team</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-colliers-gray-10 max-w-4xl mx-auto mb-12 leading-relaxed">
              Institutional-grade multifamily investment advisory services across Ontario. 
              Led by <span className="text-colliers-light-blue font-semibold">Dayma Itamunoala</span> at Colliers.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <a
                href="#listings"
                className="btn-primary flex items-center space-x-2 text-lg"
              >
                <span>View Listings</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#newsletter"
                className="btn-secondary text-lg"
              >
                Subscribe to Newsletter
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 card-hover"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-colliers-gray-10 text-sm leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero