import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { createMolliePayment } from '@/lib/mollie'
import { sendPaymentEmail } from '@/lib/mail'

export async function POST(request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      amount,
      currency = process.env.MOLLIE_CURRENCY || 'DKK',
      customerName,
      customerEmail,
      serviceName,
      note,
      sendEmailNow = true,
    } = body

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: 'A valid payment amount greater than zero is required' },
        { status: 400 }
      )
    }

    if (!customerEmail || !customerEmail.includes('@')) {
      return NextResponse.json(
        { error: 'A valid customer email address is required' },
        { status: 400 }
      )
    }

    const description = `Top Notch by Nik - ${serviceName || 'Grooming Service'} (${customerName || 'Client'})`

    // Generate Mollie payment
    const payment = await createMolliePayment({
      amount: Number(amount),
      currency,
      description,
      customerName,
      customerEmail,
      serviceName,
    })

    let emailResult = null

    // If requested, send email directly via SMTP
    if (sendEmailNow) {
      try {
        emailResult = await sendPaymentEmail({
          to: customerEmail,
          customerName,
          serviceName,
          amount: Number(amount).toFixed(2),
          currency,
          paymentUrl: payment.checkoutUrl,
          note,
        })
      } catch (mailErr) {
        console.error('Failed to send email:', mailErr)
        emailResult = {
          success: false,
          error: mailErr.message || 'Failed to dispatch email',
        }
      }
    }

    return NextResponse.json({
      success: true,
      payment,
      emailResult,
    })
  } catch (err) {
    console.error('Error creating payment link:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to create payment link' },
      { status: 500 }
    )
  }
}
