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

        {/* Dayma Large + Team Grid */}
        <div className="grid md:grid-cols-12 gap-8 sm:gap-10">
          {/* Dayma - Large */}
          <div className="md:col-span-5 group">
            <div className="relative overflow-hidden mb-5 sm:mb-6">
              <div className="relative aspect-[3/4]">
                <Image
                  src={teamData[0].image}
                  alt={teamData[0].name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent" />
              </div>
              {/* Name overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1 drop-shadow-lg">{teamData[0].name}</h3>
                <p className="text-[12px] text-gold tracking-[0.15em] uppercase font-medium drop-shadow-lg">{teamData[0].title}</p>
              </div>
            </div>
            <p className="text-[14px] sm:text-[15px] text-navy/45 leading-relaxed">{teamData[0].bio}</p>
          </div>

          {/* Rest of team - 2x2 grid */}
          <div className="md:col-span-7 grid grid-cols-2 gap-5 sm:gap-6">
            {teamData.slice(1).map(member => (
              <div key={member.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-3 sm:mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-transparent" />
                </div>
                <h3 className="font-medium text-navy text-[14px] sm:text-[15px] mb-0.5">{member.name}</h3>
                <p className="text-[11px] sm:text-[12px] text-navy/35 tracking-wide">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
