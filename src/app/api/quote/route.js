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

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      name, phone, location, notes,
      productName, productCode, productPrice,
      qty, installation,
      installBase, installExtra, installExtras, installTotal, installComplexity,
      subtotal, total,
      customerEmail,
    } = body

    const installBlock = installation
      ? [
          'Installation Requested',
          '  Complexity   : ' + installComplexity,
          '  First camera : KES ' + Number(installBase).toLocaleString('en-KE'),
          qty > 1 ? '  Additional (' + (qty - 1) + ' x KES ' + Number(installExtra).toLocaleString('en-KE') + ') : KES ' + Number(installExtras).toLocaleString('en-KE') : null,
          '  Install total: KES ' + Number(installTotal).toLocaleString('en-KE'),
        ].filter(Boolean).join('\n')
      : 'Installation : Not required'

    const quoteBody = [
      'Product   : ' + productName + ' (' + productCode + ')',
      'Quantity  : ' + qty + ' camera' + (qty > 1 ? 's' : ''),
      'Unit price: KES ' + Number(productPrice).toLocaleString('en-KE'),
      'Subtotal  : KES ' + Number(subtotal).toLocaleString('en-KE'),
      '',
      installBlock,
      '',
      '─────────────────────────────────────',
      'ESTIMATED TOTAL : KES ' + Number(total).toLocaleString('en-KE'),
      '─────────────────────────────────────',
      '',
      'Customer Details',
      '  Name     : ' + name,
      '  Phone    : ' + phone,
      '  Email    : ' + (customerEmail || 'Not provided'),
      '  Location : ' + location,
      notes ? '  Notes    : ' + notes : null,
    ].filter((l) => l !== null).join('\n')

    // Email to OmniVeil team
    await transporter.sendMail({
      from: '"OmniVeil Website" <' + process.env.ZOHO_SMTP_USER + '>',
      to: process.env.QUOTE_TO,
      replyTo: customerEmail || undefined,
      subject: 'New Quote: ' + productName + ' x' + qty + ' — ' + name,
      text: 'New quote request from omniveil.co.ke\n\n' + quoteBody,
    })

    // Receipt to customer
    if (customerEmail) {
      await transporter.sendMail({
        from: '"OmniVeil Security" <' + process.env.ZOHO_SMTP_USER + '>',
        to: customerEmail,
        subject: 'Your Quote from OmniVeil Security — ' + productName,
        text: [
          'Hi ' + name + ',',
          '',
          'Thank you for your interest in OmniVeil Security.',
          'Here is a copy of your quote:',
          '',
          quoteBody,
          '',
          'Our team will be in touch shortly on ' + phone + '.',
          '',
          'For urgent enquiries:',
          '  Call     : +254 780 741 147',
          '  Call     : +254 106 871 484',
          '  WhatsApp : wa.me/254780741147',
          '',
          '─────────────────────────────────────',
          'OmniVeil Security',
          'Nairobi, Kenya',
          'info@omniveil.co.ke',
          'www.omniveil.co.ke',
          '─────────────────────────────────────',
          '',
          'This is an estimate. Final pricing is confirmed before any work begins.',
        ].join('\n'),
      })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Quote email error:', err)
    return Response.json({ ok: false, error: err.message }, { status: 500 })
  }
}
