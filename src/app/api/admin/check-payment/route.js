import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { getPaymentStatus } from '@/lib/mollie'

export async function GET(request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('id')

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      )
    }

    const status = await getPaymentStatus(paymentId)
    return NextResponse.json({ success: true, payment: status })
  } catch (err) {
    console.error('Error checking payment:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to check payment status' },
      { status: 500 }
    )
  }
}
