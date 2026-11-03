'use client'

import React, { useState } from 'react'
import { useMailchimp } from '@/lib/mailchimp'

export default function SubscribeCTA({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('')
  const { status, message, subscribe } = useMailchimp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) await subscribe(email)
  }

  const dark = variant === 'dark'

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto py-4">
        <div className={`w-5 h-5 rounded-full ${dark ? 'bg-gold/20' : 'bg-navy/10'} flex items-center justify-center flex-shrink-0`}>
          <svg className={`w-3 h-3 ${dark ? 'text-gold' : 'text-navy'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className={`text-[13px] tracking-wide ${dark ? 'text-white/60' : 'text-navy/60'}`}>{message}</span>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className={
            dark
              ? 'flex-1 bg-white/5 border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/25 focus:border-gold/50 transition-all duration-300 outline-none'
              : 'flex-1 bg-white border border-soft-gray px-5 py-3.5 text-sm text-navy placeholder:text-navy/30 focus:border-navy transition-colors outline-none'
          }
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={
            dark
              ? 'bg-gradient-to-r from-gold to-gold-light text-navy text-[12px] tracking-[0.15em] uppercase font-bold px-8 py-4 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500 whitespace-nowrap disabled:opacity-50'
              : 'bg-navy text-white text-[12px] tracking-wide-custom uppercase font-medium px-8 py-3.5 hover:bg-navy-light transition-colors whitespace-nowrap disabled:opacity-50'
          }
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-[12px] mt-3 text-center">{message}</p>
      )}
    </div>
  )
}
