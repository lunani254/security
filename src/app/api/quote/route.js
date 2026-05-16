import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
})

function htmlEmail({ title, preheader, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#080c17;padding:28px 32px;">
          <p style="margin:0;font-size:20px;font-weight:900;letter-spacing:6px;color:#ffffff;">OMNIVEIL</p>
          <p style="margin:4px 0 0;font-size:10px;letter-spacing:8px;color:#00e5ff;font-weight:300;">SECURITY</p>
        </td>
      </tr>

      <!-- Preheader -->
      <tr>
        <td style="background:#00e5ff;padding:10px 32px;">
          <p style="margin:0;font-size:11px;letter-spacing:3px;color:#080c17;font-weight:700;text-transform:uppercase;">${preheader}</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:32px;">
          ${body}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#080c17;padding:24px 32px;">
          <p style="margin:0;font-size:11px;color:#00e5ff;letter-spacing:2px;">OmniVeil Security — Nairobi, Kenya</p>
          <p style="margin:6px 0 0;font-size:11px;color:#666;">info@omniveil.co.ke &nbsp;|&nbsp; +254 780 741 147 &nbsp;|&nbsp; www.omniveil.co.ke</p>
          <p style="margin:10px 0 0;font-size:10px;color:#444;">This is an estimate. Final pricing confirmed before any work begins.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function quoteTable({ productName, productCode, productPrice, qty, subtotal, installation, installComplexity, installBase, installExtra, installExtras, installTotal, total }) {
  const fmt = (n) => 'KES ' + Number(n).toLocaleString('en-KE')

  const row = (label, value, highlight = false) => `
    <tr>
      <td style="padding:10px 14px;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;width:50%;">${label}</td>
      <td style="padding:10px 14px;font-size:12px;color:${highlight ? '#00e5ff' : '#111'};font-weight:${highlight ? '700' : '400'};border-bottom:1px solid #f0f0f0;text-align:right;">${value}</td>
    </tr>`

  const installRows = installation ? `
    ${row('Complexity', installComplexity)}
    ${row('First camera (base fee)', fmt(installBase))}
    ${qty > 1 ? row((qty - 1) + ' additional camera' + (qty - 1 > 1 ? 's' : '') + ' × ' + fmt(installExtra), fmt(installExtras)) : ''}
    ${row('Installation total', fmt(installTotal))}
  ` : row('Installation', 'Not required')

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:4px;overflow:hidden;margin-bottom:20px;">
    <tr style="background:#f8f9fa;">
      <td colspan="2" style="padding:10px 14px;font-size:10px;letter-spacing:3px;color:#888;font-weight:700;text-transform:uppercase;">Product</td>
    </tr>
    ${row('Item', productName + ' (' + productCode + ')')}
    ${row('Quantity', qty + ' camera' + (qty > 1 ? 's' : ''))}
    ${row('Unit price', fmt(productPrice))}
    ${row('Camera subtotal', fmt(subtotal))}

    <tr style="background:#f8f9fa;">
      <td colspan="2" style="padding:10px 14px;font-size:10px;letter-spacing:3px;color:#888;font-weight:700;text-transform:uppercase;">Installation</td>
    </tr>
    ${installRows}

    <tr style="background:#080c17;">
      <td style="padding:14px;font-size:12px;color:#ffffff;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Estimated Total</td>
      <td style="padding:14px;font-size:18px;color:#00e5ff;font-weight:900;text-align:right;">${fmt(total)}</td>
    </tr>
  </table>`
}

function customerTable({ name, phone, customerEmail, location, notes }) {
  const row = (label, value) => value ? `
    <tr>
      <td style="padding:10px 14px;font-size:12px;color:#555;border-bottom:1px solid #f0f0f0;width:40%;">${label}</td>
      <td style="padding:10px 14px;font-size:12px;color:#111;border-bottom:1px solid #f0f0f0;">${value}</td>
    </tr>` : ''

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:4px;overflow:hidden;margin-bottom:20px;">
    <tr style="background:#f8f9fa;">
      <td colspan="2" style="padding:10px 14px;font-size:10px;letter-spacing:3px;color:#888;font-weight:700;text-transform:uppercase;">Customer Details</td>
    </tr>
    ${row('Name', name)}
    ${row('Phone', phone)}
    ${row('Email', customerEmail || 'Not provided')}
    ${row('Location', location)}
    ${row('Notes', notes)}
  </table>`
}

export async function POST(request) {
  // Return success immediately — emails send in background
  const body = await request.json()

  const {
    name, phone, location, notes,
    productName, productCode, productPrice,
    qty, installation,
    installBase, installExtra, installExtras, installTotal, installComplexity,
    subtotal, total,
    customerEmail,
  } = body

  const qt = quoteTable({ productName, productCode, productPrice, qty, subtotal, installation, installComplexity, installBase, installExtra, installExtras, installTotal, total })
  const ct = customerTable({ name, phone, customerEmail, location, notes })

  // Fire emails without blocking
  const sendEmails = async () => {
    try {
      await transporter.sendMail({
        from: '"OmniVeil Website" <' + process.env.ZOHO_SMTP_USER + '>',
        to: process.env.QUOTE_TO,
        replyTo: customerEmail || undefined,
        subject: 'New Quote: ' + productName + ' x' + qty + ' — ' + name,
        html: htmlEmail({
          title: 'New Quote — ' + name,
          preheader: 'New quote request from omniveil.co.ke',
          body: `<p style="margin:0 0 20px;font-size:14px;color:#333;">A new quote was submitted on <strong>omniveil.co.ke</strong>.</p>${qt}${ct}`,
        }),
      })

      if (customerEmail) {
        await transporter.sendMail({
          from: '"OmniVeil Security" <' + process.env.ZOHO_SMTP_USER + '>',
          to: customerEmail,
          subject: 'Your Quote from OmniVeil Security — ' + productName,
          html: htmlEmail({
            title: 'Your OmniVeil Quote',
            preheader: 'Quote confirmation',
            body: `
              <p style="margin:0 0 6px;font-size:15px;color:#111;font-weight:700;">Hi ${name},</p>
              <p style="margin:0 0 24px;font-size:14px;color:#555;">Thank you for your interest in OmniVeil Security. Here is a copy of your quote.</p>
              ${qt}
              <p style="margin:24px 0 8px;font-size:13px;color:#555;">Our team will be in touch shortly on <strong>${phone}</strong>.</p>
              <p style="margin:0;font-size:13px;color:#555;">For urgent enquiries call <strong>+254 780 741 147</strong> or WhatsApp us at <a href="https://wa.me/254780741147" style="color:#00e5ff;">wa.me/254780741147</a></p>
            `,
          }),
        })
      }
    } catch (err) {
      console.error('Quote email error:', err)
    }
  }

  // Start sending but do not await
  sendEmails()

  // Return success immediately
  return Response.json({ ok: true })
}
