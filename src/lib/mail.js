import nodemailer from 'nodemailer'

export function getMailTransporter() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass || host === 'smtp.example.com') {
    return null
  }

  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  })
}

export function generatePaymentEmailHtml({
  customerName,
  serviceName,
  amount,
  currency = 'DKK',
  paymentUrl,
  note,
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Top Notch Payment Link</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0D0D0D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0D0D0D; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #181818; border: 1px solid #2B2B2B; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 30px 20px; border-bottom: 1px solid #2B2B2B;">
              <h1 style="margin: 0; font-size: 26px; letter-spacing: 0.25em; text-transform: uppercase; color: #FFFFFF; font-weight: 700;">
                TOP NOTCH
              </h1>
              <p style="margin: 6px 0 0; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37;">
                BY NIK &bull; BALLERUP, DENMARK
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 35px 35px 25px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; color: #FFFFFF; font-weight: 400;">
                Hello <strong style="color: #D4AF37;">${customerName || 'Valued Client'}</strong>,
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #CFCFCF;">
                Thank you for choosing Top Notch by Nik. Your personalized Mollie payment link has been generated for your upcoming appointment or service.
              </p>

              <!-- Service Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #121212; border: 1px solid #2B2B2B; border-radius: 6px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #222222; font-size: 13px; color: #888888; text-transform: uppercase; letter-spacing: 0.1em;">
                    Service / Treatment
                  </td>
                  <td align="right" style="padding: 16px 20px; border-bottom: 1px solid #222222; font-size: 14px; color: #FFFFFF; font-weight: 600;">
                    ${serviceName || 'Custom Service'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; font-size: 13px; color: #888888; text-transform: uppercase; letter-spacing: 0.1em;">
                    Total Amount
                  </td>
                  <td align="right" style="padding: 16px 20px; font-size: 20px; color: #D4AF37; font-weight: 700;">
                    ${amount} ${currency}
                  </td>
                </tr>
              </table>

              ${note ? `
              <div style="background-color: rgba(212, 175, 55, 0.08); border-left: 3px solid #D4AF37; padding: 12px 16px; margin-bottom: 28px; font-size: 13px; color: #CFCFCF; line-height: 1.5;">
                <strong>Note from barber:</strong> ${note}
              </div>` : ''}

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${paymentUrl}" target="_blank" style="display: inline-block; background-color: #D4AF37; color: #0D0D0D; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; padding: 16px 36px; border-radius: 4px; box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35);">
                      Complete Payment via Mollie
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 0; font-size: 12px; color: #888888; text-align: center; line-height: 1.6;">
                Or copy and paste this secure link directly into your browser:<br>
                <a href="${paymentUrl}" style="color: #D4AF37; word-break: break-all; font-size: 11px;">${paymentUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 30px; background-color: #121212; border-top: 1px solid #2B2B2B; font-size: 11px; color: #666666; letter-spacing: 0.05em;">
              <p style="margin: 0 0 6px;">Top Notch by Nik &bull; Premium Grooming & Barber Shop</p>
              <p style="margin: 0 0 6px;">Ballerup, Denmark &bull; Tel: +45 91 42 88 02</p>
              <p style="margin: 0; color: #444444;">Secured via Mollie Payments &bull; SSL Encrypted</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export async function sendPaymentEmail({
  to,
  customerName,
  serviceName,
  amount,
  currency = 'DKK',
  paymentUrl,
  note,
}) {
  const transporter = getMailTransporter()

  if (!transporter) {
    if (process.env.NODE_ENV === 'development' || !process.env.SMTP_HOST) {
      return {
        success: true,
        isMock: true,
        message: 'SMTP credentials not configured in .env.local. Email dispatch simulated in development mode.',
      }
    }
    throw new Error('SMTP credentials are not configured in .env.local')
  }

  const from = process.env.SMTP_FROM || `Top Notch by Nik <${process.env.SMTP_USER}>`

  const html = generatePaymentEmailHtml({
    customerName,
    serviceName,
    amount,
    currency,
    paymentUrl,
    note,
  })

  const info = await transporter.sendMail({
    from,
    to,
    replyTo: process.env.SMTP_REPLY_TO || 'Mdhingra47@yahoo.com',
    subject: `Payment Link for your appointment at Top Notch by Nik (${amount} ${currency})`,
    html,
  })

  return {
    success: true,
    isMock: false,
    messageId: info.messageId,
  }
}
