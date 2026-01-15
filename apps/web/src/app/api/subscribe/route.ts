import { NextRequest, NextResponse } from 'next/server'

// In production, this would connect to an email service like ConvertKit, Buttondown, etc.
// For now, we'll just validate and return success

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Log for demo (in production, send to email service)
    console.log('New subscriber:', email)

    // In production, you would:
    // 1. Add to ConvertKit: await fetch('https://api.convertkit.com/v3/forms/FORM_ID/subscribe', {...})
    // 2. Or Buttondown: await fetch('https://api.buttondown.email/v1/subscribers', {...})
    // 3. Or send to your own database

    return NextResponse.json(
      { message: 'Successfully subscribed!', email },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
