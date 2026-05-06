'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import teamData from '@/data/team.json'

interface TeamMember {
  id: string
  name: string
  title: string
  company: string
  bio: string
  email: string
  phone?: string
  directPhone?: string
  linkedin?: string
  colliers?: string
  image: string
  order: number
}

function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-navy/30 hover:text-navy transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with photo */}
        <div className="bg-navy-deep p-8 sm:p-10 noise">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-sm ring-2 ring-gold/20">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1">{member.name}</h3>
              <p className="text-gold-light text-[13px] sm:text-[14px] tracking-[0.1em] uppercase mb-4">{member.title}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                {member.linkedin && member.linkedin !== '#' && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.1em] uppercase text-white/40 hover:text-gold border border-white/10 hover:border-gold/30 px-3 py-1.5 transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                )}
                {member.colliers && (
                  <a
                    href={member.colliers}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.1em] uppercase text-white/40 hover:text-gold border border-white/10 hover:border-gold/30 px-3 py-1.5 transition-all duration-300"
                  >
                    Colliers Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="border-b border-navy/8 px-8 sm:px-10 py-5 sm:py-6">
          <div className="flex flex-wrap gap-6 sm:gap-10">
            <a href={`mailto:${member.email}`} className="group flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                <svg className="w-4 h-4 text-navy/30 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-navy/25">Email</div>
                <div className="text-[14px] text-navy group-hover:text-gold transition-colors">{member.email}</div>
              </div>
            </a>

            {(member.phone || member.directPhone) && (
              <a href={`tel:${member.phone || member.directPhone}`} className="group flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <svg className="w-4 h-4 text-navy/30 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-navy/25">
                    Mobile
                  </div>
                  <div className="text-[14px] text-navy group-hover:text-gold transition-colors">
                    {member.phone}
                  </div>
                  {member.directPhone && (
                    <div className="text-[12px] text-navy/35 mt-0.5">Direct: {member.directPhone}</div>
                  )}
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="px-8 sm:px-10 py-8 sm:py-10">
          <p className="text-navy/60 text-[15px] sm:text-[16px] leading-[1.85]">{member.bio}</p>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-navy/8">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] tracking-[0.15em] uppercase font-bold px-8 py-4 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500 cursor-pointer"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <>
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

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            {teamData.map(member => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member as TeamMember)}
                className="group text-center transition-transform duration-300 hover:-translate-y-1 cursor-pointer text-left"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-sm mb-4 sm:mb-5 bg-navy/5 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-700" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/40 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white text-[11px] tracking-[0.15em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/90 text-navy px-4 py-2">
                      View Profile
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-navy text-[14px] sm:text-[15px] mb-0.5 transition-colors duration-300 group-hover:text-gold text-center">{member.name}</h3>
                <p className="text-[11px] sm:text-[12px] text-navy/35 tracking-wide leading-snug text-center">{member.title}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </>
  )
}
