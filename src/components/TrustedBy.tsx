'use client'

import React from 'react'

const TrustedBy = () => {
  const clients = [
    {
      name: "Hazelview Properties",
      logo: "/images/credibility/hazelview.jpg",
      alt: "Hazelview Properties"
    },
    {
      name: "Horizons Properties",
      logo: "/images/credibility/horizons.jpg",
      alt: "Horizons Properties"
    },
    {
      name: "Lanking Properties",
      logo: "/images/credibility/lanking.jpg",
      alt: "Lanking Properties"
    },
    {
      name: "Peakhill Properties",
      logo: "/images/credibility/peakhill.jpg",
      alt: "Peakhill Properties"
    }
  ]

  return (
    <section className="py-16 bg-colliers-pale-blue">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-colliers-blue-dark mb-4">
            Trusted by the Best and Brightest
          </h2>
          <p className="text-xl text-colliers-gray-80 max-w-3xl mx-auto">
            Leading institutional investors and property managers trust our team 
            to deliver exceptional results in Ontario's multifamily market.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 w-full h-24 flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.alt}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-colliers-blue-dark font-semibold text-lg mb-2">
              "Your Building is Worth More Than You Think"
            </div>
            <p className="text-colliers-gray-80">
              Our data-driven approach and institutional relationships consistently 
              deliver above-market pricing for our clients across Ontario.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBy