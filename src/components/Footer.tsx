'use client'

import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-navy-deep overflow-hidden noise">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-[200px]" />

      <div className="relative z-10 pt-24 sm:pt-32 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-14 sm:gap-20 mb-24 sm:mb-32">
            <div>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gold to-gold-light" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-gold-light font-medium">
                  Contact
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[0.95] mb-5 sm:mb-6">
                Get in touch
              </h2>
              <p className="text-white/35 text-[15px] sm:text-[16px] leading-relaxed mb-10">
                Whether you&apos;re buying, selling, or want to understand your options — 
                we&apos;re here for a confidential conversation.
              </p>

              <div className="space-y-5 text-white/40 text-[14px] sm:text-[15px]">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 block mb-1.5">Email</span>
                  <a href="mailto:dayma.itamunoala@colliers.com" className="text-white/70 hover:text-gold transition-colors duration-500 break-all">
                    dayma.itamunoala@colliers.com
                  </a>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 block mb-1.5">Office</span>
                  Toronto, Ontario
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 block mb-1.5">Affiliation</span>
                  Colliers International
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Name"
                    className="bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500"
                />
                <input
                  type="text"
                  placeholder="Property address (optional)"
                  className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500"
                />
                <textarea
                  placeholder="How can we help?"
                  rows={3}
                  className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500 resize-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] tracking-[0.15em] uppercase font-bold px-10 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 w-full sm:w-auto mt-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Newsletter in Footer */}
          <div className="border-t border-white/8 pt-12 mb-14 sm:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <p className="text-white/30 text-[13px] sm:text-[14px]">Subscribe to our weekly market brief</p>
              <div className="flex gap-3 sm:max-w-md">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 bg-white/3 border border-white/8 text-white placeholder:text-white/20 px-5 py-3 text-sm focus:border-gold/30 transition-colors duration-500 min-w-0"
                />
                <button className="bg-white/5 border border-white/8 text-white/50 text-[11px] tracking-[0.15em] uppercase font-medium px-6 py-3 hover:bg-white/10 hover:text-white transition-all duration-500 whitespace-nowrap flex-shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-8 border-t border-white/5">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/images/logos/logo.svg"
                alt="OnMultifamily"
                width={140}
                height={32}
                className="h-5 sm:h-6 w-auto opacity-40"
              />
              <span className="text-white/10 text-[10px]">|</span>
              <Image
                src="/images/logos/colliers.png"
                alt="Colliers"
                width={80}
                height={20}
                className="h-3.5 sm:h-4 w-auto brightness-0 invert opacity-25"
              />
            </div>
            <div className="flex gap-5 sm:gap-6 text-[10px] sm:text-[11px] text-white/20 tracking-wide">
              <a href="/insights/" className="hover:text-white/40 transition-colors">Insights</a>
              <a href="/resources/" className="hover:text-white/40 transition-colors">Resources</a>
              <a href="#listings" className="hover:text-white/40 transition-colors">Listings</a>
              <a href="/map/" className="hover:text-white/40 transition-colors">Map</a>
              <a href="#team" className="hover:text-white/40 transition-colors">Team</a>
            </div>
            <span className="text-white/10 text-[10px] sm:text-[11px]">© {new Date().getFullYear()} OnMultifamily</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
