import { NextRequest, NextResponse } from 'next/server'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const FROM_EMAIL = 'noreply@signalstackmedia.com'
const TO_EMAIL = 'dayma.itamunoala@colliers.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, address, message, type } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    if (!SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const isValuation = type === 'valuation'
    const subject = isValuation
      ? `Valuation Request: ${address || 'New Inquiry'} (OnMultifamily)`
      : `Contact Inquiry from ${name} (OnMultifamily)`

    const textContent = [
      `${isValuation ? 'Valuation Request' : 'Contact Inquiry'} from OnMultifamily.com`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      address ? `Property Address: ${address}` : null,
      message ? `\nMessage:\n${message}` : null,
      '',
      `Type: ${type || 'unknown'}`,
      `Submitted: ${new Date().toISOString()}`,
    ].filter(Boolean).join('\n')

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 24px 32px;">
          <h2 style="color: #c9a84c; margin: 0; font-size: 18px;">
            ${isValuation ? 'New Valuation Request' : 'New Contact Inquiry'}
          </h2>
          <p style="color: rgba(255,255,255,0.4); margin: 4px 0 0; font-size: 13px;">via OnMultifamily.com</p>
        </div>
        <div style="padding: 32px; background: #f8f7f4;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
            ${address ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Property</td><td style="padding: 8px 0;">${address}</td></tr>` : ''}
          </table>
          ${message ? `<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0ddd6;"><p style="color: #666; font-size: 13px; margin: 0 0 8px;">Message:</p><p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p></div>` : ''}
        </div>
      </div>
    `

    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: TO_EMAIL }],
            cc: [{ email: 'd.itamuno@gmail.com' }],
          },
        ],
        from: { email: FROM_EMAIL, name: 'OnMultifamily' },
        reply_to: { email, name },
        subject,
        content: [
          { type: 'text/plain', value: textContent },
          { type: 'text/html', value: htmlContent },
        ],
      }),
    })

    if (sgResponse.ok || sgResponse.status === 202) {
      return NextResponse.json({ success: true })
    } else {
      const errorText = await sgResponse.text()
      console.error('SendGrid error:', sgResponse.status, errorText)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
