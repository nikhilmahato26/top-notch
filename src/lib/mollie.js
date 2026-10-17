import { createMollieClient } from '@mollie/api-client'

export function getMollieClient() {
  const apiKey = process.env.MOLLIE_API_KEY
  if (!apiKey || apiKey === 'your_mollie_api_key_here') {
    return null
  }
  return createMollieClient({ apiKey })
}

export async function createMolliePayment({
  amount,
  currency = 'DKK',
  description,
  redirectUrl,
  customerName,
  customerEmail,
  serviceName,
}) {
  const mollieClient = getMollieClient()

  // Format amount to 2 decimal places string: "170.00"
  const formattedValue = Number(amount).toFixed(2)

  // If no Mollie API key is configured yet, handle gracefully for preview/testing
  if (!mollieClient) {
    if (process.env.NODE_ENV === 'development' || !process.env.MOLLIE_API_KEY) {
      const mockId = 'tr_mock_' + Math.random().toString(36).substring(2, 10)
      return {
        id: mockId,
        checkoutUrl: `${redirectUrl || 'http://localhost:3000/payment-success'}?mock_payment_id=${mockId}&status=paid`,
        isMock: true,
        amount: { currency, value: formattedValue },
        description,
        status: 'open',
      }
    }
    throw new Error('MOLLIE_API_KEY is not configured in .env.local')
  }

  const paymentData = {
    amount: {
      currency,
      value: formattedValue,
    },
    description: description || 'Top Notch by Nik - Barber Service',
    redirectUrl: redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment-success`,
    metadata: {
      customerName: customerName || 'Valued Customer',
      customerEmail: customerEmail || '',
      serviceName: serviceName || '',
    },
  }

  // Webhook is only valid for publicly accessible URLs (https)
  const webhookUrl = process.env.MOLLIE_WEBHOOK_URL
  if (webhookUrl && webhookUrl.startsWith('https://')) {
    paymentData.webhookUrl = webhookUrl
  }

  try {
    const payment = await mollieClient.payments.create(paymentData)
    const checkoutUrl = payment.getCheckoutUrl ? payment.getCheckoutUrl() : payment._links?.checkout?.href

    return {
      id: payment.id,
      checkoutUrl,
      isMock: false,
      amount: payment.amount,
      status: payment.status,
      description: payment.description,
    }
  } catch (err) {
    if (err.field === 'terminalId' || err.message?.toLowerCase().includes('terminal id')) {
      throw new Error(
        'No online payment methods (Cards, Apple Pay, etc.) are activated in your Mollie profile. Go to Mollie Dashboard > Settings > Website Profiles > Payment Methods and switch on Credit Card / Apple Pay.'
      )
    }
    throw err
  }
}

export async function getPaymentStatus(paymentId) {
  if (paymentId?.startsWith('tr_mock_')) {
    return { id: paymentId, status: 'paid', isMock: true }
  }
  const mollieClient = getMollieClient()
  if (!mollieClient) {
    throw new Error('MOLLIE_API_KEY is not configured')
  }
  const payment = await mollieClient.payments.get(paymentId)
  return {
    id: payment.id,
    status: payment.status,
    amount: payment.amount,
    description: payment.description,
    paidAt: payment.paidAt,
  }
}
