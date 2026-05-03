'use client'

import React from 'react'
import Image from 'next/image'
import teamData from '@/data/team.json'

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32 md:py-44 bg-cream overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-soft-gray to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
          <span className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-navy/35 font-medium">
            Our Team
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-[3.25rem] text-navy leading-[1.05] mb-4 sm:mb-6 max-w-2xl">
          Meet Ontario&apos;s leading
          <br />
          <span className="text-gradient-gold">multifamily team</span>
        </h2>

        <p className="text-[15px] sm:text-[17px] text-navy/40 leading-[1.75] mb-14 sm:mb-20 max-w-2xl">
          A focused group of professionals dedicated exclusively to multifamily investment 
          sales and advisory across Ontario.
        </p>

        {/* Team Grid - All Same Size */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {teamData.map(member => (
            <div key={member.id} className="group text-center transition-transform duration-300 hover:-translate-y-1">
              <div className="relative w-full aspect-square overflow-hidden rounded-sm mb-4 sm:mb-5 bg-navy/5 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Consistent navy overlay for cohesion */}
                <div className="absolute inset-0 bg-navy/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-700" />
              </div>
              <h3 className="font-medium text-navy text-[14px] sm:text-[15px] mb-0.5 transition-colors duration-300 group-hover:text-gold">{member.name}</h3>
              <p className="text-[11px] sm:text-[12px] text-navy/35 tracking-wide leading-snug">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
