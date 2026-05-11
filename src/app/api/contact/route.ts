import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'OnMultifamily <info@onmultifamily.com>'
const TO_EMAIL = 'dayma.itamunoala@colliers.com'
const CC_EMAILS = ['d.itamuno@gmail.com', 'zoe.prachter@colliers.com']

// Spam detection: reject gibberish submissions before sending any emails
function isSpam(fields: Record<string, string | undefined>): boolean {
  const values = Object.values(fields).filter(Boolean) as string[]
  for (const val of values) {
    // Random mixed-case strings with no spaces (e.g. "UQnEKMluwsxXmAaeFueeeZBZ")
    if (val.length > 8 && !/\s/.test(val) && /[A-Z].*[a-z].*[A-Z]|[a-z].*[A-Z].*[a-z]/.test(val) && !/^https?:\/\//.test(val) && !val.includes('@') && !val.includes('.')) {
      return true
    }
    // Consonant ratio check: real words have vowels
    const letters = val.replace(/[^a-zA-Z]/g, '')
    if (letters.length > 10) {
      const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length
      if (vowels / letters.length < 0.15) return true
    }
  }
  // Email pattern: random dots/numbers in local part (e.g. p.aulhorridg.e69@gmail.com)
  const email = fields.email || ''
  const local = email.split('@')[0] || ''
  if ((local.match(/\./g) || []).length >= 2 && /\d/.test(local) && local.length > 12) {
    // Combined with a gibberish name, very likely spam
    const name = fields.name || ''
    if (name.length > 15 && !/\s/.test(name)) return true
  }
  return false
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, address, message, type } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Silently reject spam (return success so bots don't retry)
    if (isSpam({ name, email, phone, address, message })) {
      console.log('Spam submission blocked:', { name, email })
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
