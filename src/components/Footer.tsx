'use client'

import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy pt-20 sm:pt-28 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-12 sm:gap-16 mb-20 sm:mb-28">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4 sm:mb-6">
              Get in touch
            </h2>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Whether you&apos;re buying, selling, or want to understand your options — 
              we&apos;re here for a confidential conversation.
            </p>

            <div className="space-y-4 text-white/50 text-[14px] sm:text-[15px]">
              <div>
                <span className="text-[11px] sm:text-[12px] tracking-wide-custom uppercase text-white/30 block mb-1">Email</span>
                <a href="mailto:dayma.itamunoala@colliers.com" className="text-white hover:text-gold transition-colors break-all">
                  dayma.itamunoala@colliers.com
                </a>
              </div>
              <div>
                <span className="text-[11px] sm:text-[12px] tracking-wide-custom uppercase text-white/30 block mb-1">Office</span>
                Toronto, Ontario
              </div>
              <div>
                <span className="text-[11px] sm:text-[12px] tracking-wide-custom uppercase text-white/30 block mb-1">Affiliation</span>
                Colliers International
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-5 sm:space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] sm:text-[15px] focus:border-gold transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] sm:text-[15px] focus:border-gold transition-colors"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone (optional)"
                className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] sm:text-[15px] focus:border-gold transition-colors"
              />
              <input
                type="text"
                placeholder="Property address (optional)"
                className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] sm:text-[15px] focus:border-gold transition-colors"
              />
              <textarea
                placeholder="How can we help?"
                rows={3}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 pb-3 text-[14px] sm:text-[15px] focus:border-gold transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-white text-navy text-[12px] sm:text-[13px] tracking-wide-custom uppercase font-medium px-8 sm:px-10 py-3.5 sm:py-4 hover:bg-gold hover:text-navy transition-colors duration-300 mt-2 w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Newsletter in Footer */}
        <div className="border-t border-white/10 pt-10 sm:pt-12 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="text-white/40 text-sm">Subscribe to our weekly market brief</p>
            <div className="flex gap-3 sm:max-w-md">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/30 px-4 sm:px-5 py-3 text-sm focus:border-white/30 transition-colors min-w-0"
              />
              <button className="bg-white/10 text-white text-[11px] sm:text-[12px] tracking-wide-custom uppercase font-medium px-4 sm:px-6 py-3 hover:bg-white/20 transition-colors whitespace-nowrap flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6 sm:pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/images/logos/logo.svg"
              alt="OnMultifamily"
              width={140}
              height={32}
              className="h-5 sm:h-6 w-auto opacity-50"
            />
            <span className="text-white/20 text-[11px] sm:text-[12px]">A Colliers Multifamily Team</span>
          </div>
          <div className="flex gap-4 sm:gap-6 text-[11px] sm:text-[12px] text-white/20">
            <a href="/insights/" className="hover:text-white/50 transition-colors">Insights</a>
            <a href="#listings" className="hover:text-white/50 transition-colors">Listings</a>
            <a href="/map/" className="hover:text-white/50 transition-colors">Map</a>
            <a href="#team" className="hover:text-white/50 transition-colors">Team</a>
          </div>
          <span className="text-white/15 text-[11px] sm:text-[12px]">© {new Date().getFullYear()} OnMultifamily</span>
        </div>
      </div>
    </footer>
  )
}
