'use client'

import { useState } from 'react'

const MAILCHIMP_URL = 'https://colliers.us20.list-manage.com/subscribe/post-json?u=87232bcc93f1dd394870ffcbd&id=bf5db1af99'

export function useMailchimp() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (email: string) => {
    setStatus('loading')
    try {
      // Use JSONP approach since Mailchimp doesn't support CORS
      const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=__mcCallback`
      
      return new Promise<void>((resolve) => {
        // Create JSONP callback
        const callbackName = '__mcCallback'
        ;(window as any)[callbackName] = (data: { result: string; msg: string }) => {
          if (data.result === 'success') {
            setStatus('success')
            setMessage("You're subscribed. Look for the first issue in your inbox.")
          } else {
            // Mailchimp returns HTML in error messages, strip tags
            const cleanMsg = data.msg.replace(/<[^>]*>/g, '').trim()
            if (cleanMsg.includes('already subscribed')) {
              setStatus('success')
              setMessage("You're already subscribed!")
            } else {
              setStatus('error')
              setMessage(cleanMsg || 'Something went wrong. Please try again.')
            }
          }
          // Cleanup
          delete (window as any)[callbackName]
          document.getElementById('mc-jsonp')?.remove()
          resolve()
        }

        // Create script tag for JSONP
        const script = document.createElement('script')
        script.id = 'mc-jsonp'
        script.src = url
        script.onerror = () => {
          setStatus('error')
          setMessage('Network error. Please try again.')
          delete (window as any)[callbackName]
          script.remove()
          resolve()
        }
        document.body.appendChild(script)
      })
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const reset = () => {
    setStatus('idle')
    setMessage('')
  }

  return { status, message, subscribe, reset }
}
