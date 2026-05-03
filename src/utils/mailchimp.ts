const MAILCHIMP_URL = 'https://colliers.us20.list-manage.com/subscribe/post-json?u=87232bcc93f1dd394870ffcbd&id=bf5db1af99'

export interface MailchimpResponse {
  result: 'success' | 'error'
  msg: string
}

export async function subscribeToMailchimp(email: string): Promise<MailchimpResponse> {
  return new Promise((resolve) => {
    // Create a unique callback name to avoid conflicts
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`
    
    // Add the callback function to window
    ;(window as any)[callbackName] = function(data: MailchimpResponse) {
      // Clean up
      delete (window as any)[callbackName]
      document.body.removeChild(script)
      
      resolve(data)
    }
    
    // Create script element for JSONP
    const script = document.createElement('script')
    script.src = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=${callbackName}`
    script.onerror = () => {
      // Clean up on error
      delete (window as any)[callbackName]
      document.body.removeChild(script)
      resolve({ result: 'error', msg: 'Network error' })
    }
    
    document.body.appendChild(script)
  })
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}