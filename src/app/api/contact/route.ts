import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'OnMultifamily <info@onmultifamily.com>'
const TO_EMAIL = 'dayma.itamunoala@colliers.com'
const CC_EMAILS = ['d.itamuno@gmail.com', 'zoe.prachter@colliers.com']

// ---------- Spam defenses ----------
// Layer 1: honeypot field (hidden input bots auto-fill)
// Layer 2: timing token (fts = form render timestamp; humans take > 4s, and
//          direct-to-API bots never send it at all)
// Layer 3: gibberish scoring (backup heuristics)

const MIN_FILL_MS = 4000
const MAX_FILL_MS = 24 * 60 * 60 * 1000

// Words that look like random keyboard output: long consonant runs / few vowels.
// y counts as a vowel to protect real names (Krystyna, Yianni).
function isGibberishWord(word: string): boolean {
  const letters = word.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 5) return false
  const vowels = (letters.match(/[aeiouyAEIOUY]/g) || []).length
  if (vowels / letters.length < 0.2) return true
  if (/[bcdfghjklmnpqrstvwxz]{4,}/i.test(letters)) return true
  return false
}

function isSpam(fields: Record<string, string | undefined>): boolean {
  let score = 0
  const name = fields.name || ''
  const address = fields.address || ''
  const email = fields.email || ''
  const message = fields.message || ''

  // Gibberish words in name or property address (e.g. "Mzgui Rhygwhx", "Dkzinxtriw")
  const nameWords = name.split(/\s+/).filter(Boolean)
  const addrWords = address.split(/\s+/).filter(Boolean)
  if (nameWords.some(isGibberishWord)) score += 2
  if (addrWords.some(isGibberishWord)) score += 2

  // Valuation "address" with no digits and no known street/location words is suspicious
  if (address && !/\d/.test(address) && !/\b(st|street|ave|avenue|rd|road|dr|drive|blvd|boulevard|lane|ln|court|crt|ct|cres|crescent|way|circle|cir|pkwy|parkway|place|pl|toronto|ontario|hamilton|ottawa|london|kitchener|mississauga|brampton|unit|suite|portfolio|building|apartment)\b/i.test(address)) {
    score += 1
  }

  // Random mixed-case token with no spaces (e.g. "UQnEKMluwsxXmAaeFueeeZBZ")
  for (const val of [name, address, message]) {
    if (val.length > 8 && !/\s/.test(val) && /[a-z][A-Z].*[a-z][A-Z]|[A-Z][a-z]+[A-Z][a-z]+[A-Z]/.test(val) && !val.includes('@')) {
      score += 2
    }
  }

  // Spam-tool email pattern: dotted/numbered local part (e.g. ja.ym.e.s.k.in.g@gmail.com)
  const local = email.split('@')[0] || ''
  const dots = (local.match(/\./g) || []).length
  if (dots >= 3) score += 2
  else if (dots >= 2 && /\d/.test(local)) score += 1

  // Links in message = classic spam
  if (/https?:\/\//i.test(message)) score += 1

  return score >= 3
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, address, message, type, website, fts } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Layer 1: honeypot - hidden field only bots fill in
    if (website) {
      console.log('Spam blocked (honeypot):', { name, email })
      return NextResponse.json({ success: true })
    }

    // Layer 2: timing token - our forms always send fts (render timestamp).
    // Missing/invalid token means the API was hit directly; instant fills are bots.
    const elapsed = Date.now() - Number(fts)
    if (!fts || Number.isNaN(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
      console.log('Spam blocked (timing):', { name, email, fts, elapsed })
      return NextResponse.json({ success: true })
    }

    // Layer 3: gibberish scoring (silent reject so bots don't retry)
    if (isSpam({ name, email, phone, address, message })) {
      console.log('Spam blocked (heuristics):', { name, email })
      return NextResponse.json({ success: true })
    }

    const isValuation = type === 'valuation'
    const subject = isValuation
      ? `Valuation Request: ${address || 'New Inquiry'}`
      : `Contact Inquiry from ${name}`

    // Email to Dayma's team
    const teamHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 24px 32px;">
          <h2 style="color: #c9a84c; margin: 0; font-size: 18px; font-weight: 600;">
            ${isValuation ? 'New Valuation Request' : 'New Contact Inquiry'}
          </h2>
          <p style="color: rgba(255,255,255,0.4); margin: 4px 0 0; font-size: 13px;">via OnMultifamily.com</p>
        </div>
        <div style="padding: 32px; background: #f8f7f4;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0072CE;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #0072CE;">${phone}</a></td></tr>` : ''}
            ${address ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Property</td><td style="padding: 8px 0; font-weight: 500;">${address}</td></tr>` : ''}
          </table>
          ${message ? `<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0ddd6;"><p style="color: #666; font-size: 13px; margin: 0 0 8px;">Message:</p><p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p></div>` : ''}
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0ddd6; color: #999; font-size: 11px;">
            Submitted ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET
          </div>
        </div>
      </div>
    `

    // Confirmation email to the person
    const confirmHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 500; letter-spacing: 0.05em;">
            MULTIFAMILY ONTARIO
          </h1>
          <div style="width: 40px; height: 2px; background: #c9a84c; margin: 12px auto 0;"></div>
        </div>
        <div style="padding: 40px 32px; background: #ffffff;">
          <h2 style="color: #0a1628; margin: 0 0 16px; font-size: 22px; font-weight: 600;">
            ${isValuation ? 'Thank you for your valuation request.' : 'Thank you for reaching out.'}
          </h2>
          <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            We have received your ${isValuation ? 'request' : 'inquiry'} and a member of our team will follow up within 24 hours.
          </p>
          ${isValuation && address ? `
          <div style="background: #f8f7f4; padding: 20px; margin-bottom: 24px;">
            <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px;">Property</p>
            <p style="color: #0a1628; font-size: 16px; font-weight: 500; margin: 0;">${address}</p>
          </div>
          ` : ''}
          <p style="color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 8px;">
            In the meantime, feel free to explore our latest market insights and current listings at
            <a href="https://www.onmultifamily.com" style="color: #0072CE;">onmultifamily.com</a>.
          </p>
        </div>
        <div style="background: #f8f7f4; padding: 24px 32px; text-align: center; border-top: 1px solid #e8e5de;">
          <p style="color: #0a1628; font-size: 14px; font-weight: 500; margin: 0 0 4px;">Dayma Itamunoala</p>
          <p style="color: #999; font-size: 12px; margin: 0 0 2px;">Senior Vice President | Colliers</p>
          <p style="color: #999; font-size: 12px; margin: 0;">647-915-3193 | dayma.itamunoala@colliers.com</p>
        </div>
      </div>
    `

    // Send both emails
    const [teamResult, confirmResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        cc: CC_EMAILS,
        replyTo: email,
        subject,
        html: teamHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: isValuation
          ? 'Your Valuation Request - OnMultifamily'
          : 'Thank You for Contacting Us - OnMultifamily',
        html: confirmHtml,
      }),
    ])

    if (teamResult.status === 'fulfilled' && teamResult.value.error) {
      console.error('Resend team email error:', teamResult.value.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    if (confirmResult.status === 'rejected') {
      console.error('Confirmation email failed (non-blocking):', confirmResult.reason)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
