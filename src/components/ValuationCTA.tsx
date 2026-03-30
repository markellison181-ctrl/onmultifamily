'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function ValuationCTA() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Valuation Request: ' + (form.address || 'New Inquiry'))
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProperty Address: ${form.address}\n\n(Submitted via onmultifamily.com)`
    )
    window.location.href = `mailto:dayma.itamunoala@colliers.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="valuation" className="relative py-28 sm:py-36 md:py-48 bg-navy-deep overflow-hidden noise">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[200px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left - Copy */}
          <div>
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-gold-light font-medium">
                Complimentary
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-white leading-[0.95] mb-6 sm:mb-8">
              Considering your
              <br />
              <span className="text-gradient-gold">options?</span>
            </h2>

            <p className="text-[15px] sm:text-[17px] text-white/40 leading-[1.75] mb-4 sm:mb-5 max-w-lg">
              Whether you&apos;re exploring a sale, refinancing, or simply want to understand 
              your building&apos;s current market position - we provide confidential,
              complimentary opinions of value for apartment buildings across Ontario.
            </p>

            <p className="text-[13px] sm:text-[15px] text-white/25 max-w-md mb-10">
              We have closed 81% of every listing we have taken on. 
              When you are ready, we are the team you want in your corner.
            </p>

            {/* Dayma headshot + credentials */}
            <div className="flex items-center gap-4">
              <Image
                src="/images/team/dayma-square.png"
                alt="Dayma Itamunoala"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gold/20"
              />
              <div>
                <div className="text-white text-[14px] font-medium">Dayma Itamunoala</div>
                <div className="text-white/30 text-[12px]">Senior Vice President, Colliers</div>
                <div className="text-gold/60 text-[12px]">647-915-3193</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            {submitted ? (
              <div className="bg-white/[0.03] border border-white/[0.06] p-10 sm:p-12 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">Thank you</h3>
                <p className="text-white/40 text-[15px]">
                  Your email client should open with a pre-filled message. 
                  A member of our team will follow up within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.06] p-8 sm:p-10 md:p-12">
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">Request a Valuation</h3>
                <p className="text-white/30 text-[13px] mb-8">
                  A member of our team will reach out within 24 hours to schedule a confidential conversation.
                </p>

                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/10 text-white text-[15px] py-3 placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/10 text-white text-[15px] py-3 placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/10 text-white text-[15px] py-3 placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Property address"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/10 text-white text-[15px] py-3 placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full mt-10 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] sm:text-[13px] tracking-[0.15em] uppercase font-bold px-12 py-5 hover:shadow-[0_0_50px_rgba(201,168,76,0.3)] transition-all duration-500"
                >
                  Request a Valuation
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-white/15 text-[11px] mt-5 text-center">
                  Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
