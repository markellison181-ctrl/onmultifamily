'use client'

import { useState } from 'react'

export function useMailchimp() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (email: string) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      
      if (data.result === 'success') {
        setStatus('success')
        setMessage(data.msg || "You're subscribed! Check your inbox.")
      } else {
        const cleanMsg = (data.msg || '').replace(/<[^>]*>/g, '').trim()
        if (cleanMsg.includes('already subscribed')) {
          setStatus('success')
          setMessage("You're already subscribed!")
        } else {
          setStatus('error')
          setMessage(cleanMsg || 'Something went wrong. Please try again.')
        }
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const reset = () => {
    setStatus('idle')
    setMessage('')
  }

  return { status, message, subscribe, reset }
}
