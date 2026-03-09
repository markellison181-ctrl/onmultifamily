'use client'

import React from 'react'

const TransactionTicker = () => {
  const recentTransactions = [
    {
      address: "294 Saulsbury Road",
      city: "Strathroy",
      units: 24,
      price: "$4.2M",
      capRate: "4.8%",
      status: "SOLD"
    },
    {
      address: "75 Emma Street",
      city: "Hamilton", 
      units: 42,
      price: "$8.9M",
      capRate: "4.5%",
      status: "SOLD"
    },
    {
      address: "17-19 Collier Street",
      city: "Toronto",
      units: 18,
      price: "$6.1M", 
      capRate: "3.9%",
      status: "SOLD"
    },
    {
      address: "Hamilton Downtown Complex",
      city: "Hamilton",
      units: 142,
      price: "$18.75M",
      capRate: "5.1%",
      status: "SOLD"
    },
    {
      address: "Ottawa South Gardens", 
      city: "Ottawa",
      units: 245,
      price: "$31.2M",
      capRate: "4.1%", 
      status: "SOLD"
    },
    {
      address: "Burlington Maple Grove",
      city: "Burlington",
      units: 172,
      price: "$27.9M",
      capRate: "4.4%",
      status: "SOLD"
    }
  ]

  return (
    <section className="section-dark">
      <div className="container-full">
        <div className="text-center mb-16">
          <h3 className="heading-sm text-white mb-4">Recent Transactions</h3>
          <p className="body-md text-gray-400">
            A sample of our multifamily closings across Ontario
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-8 pb-4" style={{ minWidth: 'max-content' }}>
            {recentTransactions.map((transaction, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-8 min-w-[320px] border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="mb-2">
                  <span className="inline-block bg-green-500 text-white text-xs font-medium px-2 py-1 rounded uppercase tracking-wide">
                    {transaction.status}
                  </span>
                </div>
                
                <div className="text-white font-semibold text-lg mb-2 leading-tight">
                  {transaction.address}
                </div>
                
                <div className="text-gray-300 text-sm mb-4">
                  {transaction.city} • {transaction.units} Units
                </div>
                
                <div className="text-2xl font-serif text-white mb-2">
                  {transaction.price}
                </div>
                
                <div className="text-gray-400 text-sm">
                  {transaction.capRate} cap rate
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="text-gray-400 text-sm mb-6">
            Over $130M+ in transactions above • Average time on market: 4.2 months
          </div>
          <a 
            href="#listings" 
            className="btn-primary text-sm"
          >
            View All Listings
          </a>
        </div>
      </div>
    </section>
  )
}

export default TransactionTicker