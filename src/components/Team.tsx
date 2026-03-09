'use client'

import React from 'react'
import Image from 'next/image'
import teamData from '@/data/team.json'

export default function Team() {
  return (
    <section id="team" className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gold" />
          <span className="text-[12px] tracking-wide-custom uppercase text-navy/40 font-medium">
            Our Team
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-6 max-w-2xl">
          Meet Ontario&apos;s leading multifamily team
        </h2>

        <p className="text-lg text-navy/50 leading-relaxed mb-20 max-w-2xl">
          A focused group of professionals dedicated exclusively to multifamily investment 
          sales and advisory across Ontario.
        </p>

        {/* Team Grid - Dayma featured large */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Dayma - Large card */}
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-cream">
              <Image
                src={teamData[0].image}
                alt={teamData[0].name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-serif text-2xl text-navy mb-1">{teamData[0].name}</h3>
            <p className="text-[13px] text-navy/40 tracking-wide mb-3">{teamData[0].title}</p>
            <p className="text-[15px] text-navy/50 leading-relaxed">{teamData[0].bio}</p>
          </div>

          {/* Rest of team */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6">
            {teamData.slice(1).map(member => (
              <div key={member.id}>
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-cream">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-navy text-[15px] mb-0.5">{member.name}</h3>
                <p className="text-[12px] text-navy/40">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
