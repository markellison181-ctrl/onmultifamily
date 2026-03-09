'use client'

import React from 'react'
import Image from 'next/image'

const TrackRecord = () => {
  return (
    <section className="section-dark">
      <div className="container-full">
        {/* Track Record Stats */}
        <div className="text-center mb-32">
          <div className="gold-line mx-auto mb-8"></div>
          <h2 className="heading-lg text-white mb-20">
            Track Record
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="text-center">
              <div className="stat-number text-white mb-4">$1.12B+</div>
              <div className="stat-label text-gray-400">Completed Transactions</div>
            </div>
            
            <div className="text-center">
              <div className="stat-number text-white mb-4">81%</div>
              <div className="stat-label text-gray-400">Close Rate</div>
            </div>
            
            <div className="text-center">
              <div className="stat-number text-white mb-4">3,000+</div>
              <div className="stat-label text-gray-400">Units Sold</div>
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="border-t border-white/20 pt-20">
          <div className="text-center mb-16">
            <p className="body-lg text-gray-400 tracking-wide uppercase mb-12">
              Trusted by
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/credibility/hazelview.jpg"
                alt="Hazelview Properties"
                width={180}
                height={60}
                className="opacity-60 hover:opacity-80 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
            
            <div className="flex justify-center">
              <Image
                src="/images/credibility/horizons.jpg"
                alt="Horizons ETFs"
                width={180}
                height={60}
                className="opacity-60 hover:opacity-80 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
            
            <div className="flex justify-center">
              <Image
                src="/images/credibility/lanking.jpg"
                alt="Lanking Group"
                width={180}
                height={60}
                className="opacity-60 hover:opacity-80 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
            
            <div className="flex justify-center">
              <Image
                src="/images/credibility/peakhill.jpg"
                alt="Peakhill Capital"
                width={180}
                height={60}
                className="opacity-60 hover:opacity-80 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrackRecord