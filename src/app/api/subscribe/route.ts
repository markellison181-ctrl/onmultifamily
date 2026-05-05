import { NextRequest, NextResponse } from 'next/server'

const MAILCHIMP_URL = 'https://colliers.us20.list-manage.com/subscribe/post-json'
const U = '87232bcc93f1dd394870ffcbd'
const ID = 'bf5db1af99'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ result: 'error', msg: 'Please enter a valid email address.' }, { status: 400 })
    }

    const url = `${MAILCHIMP_URL}?u=${U}&id=${ID}&EMAIL=${encodeURIComponent(email)}`
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const text = await res.text()
    
    // Try to parse as JSON (Mailchimp sometimes returns JSON)
    try {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    } catch {
      // If it returned HTML, try the form post approach
      const formUrl = `https://colliers.us20.list-manage.com/subscribe/post`
      const formData = new URLSearchParams({
        u: U,
        id: ID,
        EMAIL: email,
        subscribe: 'Subscribe',
      })

      const formRes = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        redirect: 'follow',
      })

      const formText = await formRes.text()
      
      if (formText.includes('almost finished') || formText.includes('confirm') || formText.includes('Thank')) {
        return NextResponse.json({ result: 'success', msg: "Almost there! Check your email to confirm your subscription." })
      } else if (formText.includes('already subscribed')) {
        return NextResponse.json({ result: 'success', msg: "You're already subscribed!" })
      } else {
        return NextResponse.json({ result: 'success', msg: "Thanks for subscribing! Check your inbox." })
      }
    }
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ result: 'error', msg: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
