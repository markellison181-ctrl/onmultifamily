'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useMailchimp } from '@/lib/mailchimp'
export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const { status: nlStatus, message: nlMessage, subscribe: nlSubscribe } = useMailchimp()

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setSendError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact' }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setSendError('Failed to send. Please email dayma.itamunoala@colliers.com directly.')
      }
    } catch {
      setSendError('Network error. Please email dayma.itamunoala@colliers.com directly.')
    } finally {
      setSending(false)
    }
  }

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) await nlSubscribe(newsletterEmail)
  }

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
                Whether you&apos;re buying, selling, or want to understand your options,
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
              {sent ? (
                <div className="flex items-start gap-4 py-8">
                  <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/80 text-[15px] font-medium mb-1">Message sent</p>
                    <p className="text-white/35 text-[14px]">Thank you. A member of our team will follow up within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleContact}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500 outline-none"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Property address (optional)"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500 outline-none"
                  />
                  <textarea
                    placeholder="How can we help?"
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 pb-3 text-[14px] sm:text-[15px] focus:border-gold/50 transition-colors duration-500 resize-none outline-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] tracking-[0.15em] uppercase font-bold px-10 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 w-full sm:w-auto mt-2 disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                  {sendError && <p className="text-red-400 text-[13px] mt-3">{sendError}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Newsletter in Footer */}
          <div className="border-t border-white/8 pt-12 mb-14 sm:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <div className="flex-shrink-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-1">Weekly Brief</p>
                <p className="text-white/50 text-[13px] sm:text-[14px]">14,000+ investors read our weekly insights</p>
              </div>
              {nlStatus === 'success' ? (
                <div className="flex items-center gap-3 py-1">
                  <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-white/50 tracking-wide">{nlMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-3 sm:max-w-md w-full">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/3 border border-white/8 text-white placeholder:text-white/20 px-5 py-3 text-sm focus:border-gold/30 transition-colors duration-500 outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    disabled={nlStatus === 'loading'}
                    className="bg-gradient-to-r from-gold to-gold-light text-navy text-[11px] tracking-[0.15em] uppercase font-bold px-6 py-3 hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] transition-all duration-500 whitespace-nowrap flex-shrink-0 disabled:opacity-50"
                  >
                    {nlStatus === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-8 border-t border-white/5">
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                src="/images/logos/logo.svg"
                alt="OnMultifamily"
                width={140}
                height={32}
                className="h-5 sm:h-6 w-auto opacity-50"
              />
              <div className="w-px h-5 bg-white/15" />
              <Image
                src="/images/logos/colliers.png"
                alt="Colliers"
                width={100}
                height={28}
                className="h-7 sm:h-8 w-auto rounded-sm opacity-70"
              />
            </div>
            <div className="flex gap-5 sm:gap-6 text-[10px] sm:text-[11px] text-white/20 tracking-wide">
              <a href="/insights/" className="hover:text-white/40 transition-colors">Insights</a>
              <a href="/resources/" className="hover:text-white/40 transition-colors">Resources</a>
              <a href="/#listings" className="hover:text-white/40 transition-colors">Listings</a>
              {/* Map link hidden until ready */}
              <a href="/#team" className="hover:text-white/40 transition-colors">Team</a>
            </div>
            <span className="text-white/10 text-[10px] sm:text-[11px]">© {new Date().getFullYear()} OnMultifamily</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
