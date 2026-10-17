import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { sendPaymentEmail } from '@/lib/mail'

export async function POST(request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      to,
      customerName,
      serviceName,
      amount,
      currency = 'DKK',
      paymentUrl,
      note,
    } = body

    if (!to || !to.includes('@')) {
      return NextResponse.json(
        { error: 'Valid recipient email is required' },
        { status: 400 }
      )
    }

    if (!paymentUrl) {
      return NextResponse.json(
        { error: 'Payment URL is required' },
        { status: 400 }
      )
    }

    const result = await sendPaymentEmail({
      to,
      customerName,
      serviceName,
      amount,
      currency,
      paymentUrl,
      note,
    })

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('Error sending email:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}
