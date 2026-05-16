'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  formatKES,
  installationBreakdown,
  WHATSAPP_NUMBERS,
} from '@/data/products'

const INITIAL_FORM = {
  qty: 1,
  installation: true,
  name: '',
  phone: '',
  email: '',
  location: '',
  notes: '',
}

export default function OrderForm({ product, onClose }) {
  const [form,      setForm]      = useState(INITIAL_FORM)
  const [errors,    setErrors]    = useState({})
  const [sending,   setSending]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [sendError, setSendError] = useState('')

  useEffect(() => {
    if (!product) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  const update = useCallback((field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
    setSendError('')
  }, [])

  const quote = useMemo(() => {
    if (!product) return { subtotal: 0, installCost: 0, total: 0, bd: null }
    const qty         = Math.max(1, Number(form.qty) || 1)
    const subtotal    = product.price * qty
    const bd          = installationBreakdown(qty, product)
    const installCost = form.installation ? bd.total : 0
    return { subtotal, installCost, total: subtotal + installCost, bd }
  }, [product, form.qty, form.installation])

  if (!product) return null

  const qty = Math.max(1, Number(form.qty) || 1)
  const { bd } = quote

  const validate = (requireEmail = false) => {
    const next = {}
    if (!form.name.trim())     next.name     = 'Required'
    if (!form.phone.trim())    next.phone    = 'Required'
    else if (!/^[+\d][\d\s]{7,}$/.test(form.phone.trim()))
      next.phone = 'Enter a valid number'
    if (!form.location.trim()) next.location = 'Required'
    if (requireEmail) {
      if (!form.email.trim())
        next.email = 'Required to receive a copy'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        next.email = 'Enter a valid email'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildWAMessage = () => {
    const lines = [
      'Hello OmniVeil Security,',
      '',
      'I would like a quote for the following:',
      '',
      'Product   : ' + product.name + ' (' + product.code + ')',
      'Quantity  : ' + qty + ' camera' + (qty > 1 ? 's' : ''),
      'Unit price: ' + formatKES(product.price),
      'Subtotal  : ' + formatKES(quote.subtotal),
    ]
    if (form.installation && bd) {
      lines.push('', 'Installation requested:')
      lines.push('  Complexity   : ' + bd.complexity)
      lines.push('  First camera : ' + formatKES(bd.base))
      if (qty > 1) lines.push('  Additional (' + (qty - 1) + ' x ' + formatKES(bd.extra) + ') : ' + formatKES(bd.extras))
      lines.push('  Install total: ' + formatKES(bd.total))
    } else {
      lines.push('Installation : Not required')
    }
    lines.push('', 'Estimated total : ' + formatKES(quote.total))
    lines.push('', 'My details:')
    lines.push('Name     : ' + form.name)
    lines.push('Phone    : ' + form.phone)
    if (form.email.trim()) lines.push('Email    : ' + form.email)
    lines.push('Location : ' + form.location)
    if (form.notes.trim()) lines.push('', 'Notes : ' + form.notes.trim())
    lines.push('', 'Sent from omniveil.co.ke')
    return lines.join('\n')
  }

  const sendEmail = async () => {
  if (!validate(true)) return
  setSending(true)
  setSendError('')
  try {
    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:              form.name,
        phone:             form.phone,
        location:          form.location,
        notes:             form.notes,
        customerEmail:     form.email,
        productName:       product.name,
        productCode:       product.code,
        productPrice:      product.price,
        qty,
        installation:      form.installation,
        installBase:       bd?.base       ?? 0,
        installExtra:      bd?.extra      ?? 0,
        installExtras:     bd?.extras     ?? 0,
        installTotal:      bd?.total      ?? 0,
        installComplexity: bd?.complexity ?? 'Standard',
        subtotal:          quote.subtotal,
        total:             quote.total,
      }),
    })
    // Show success immediately without waiting for email to send
    setSent(true)
  } catch {
    setSendError('Something went wrong. Please try WhatsApp instead.')
  } finally {
    setSending(false)
  }
}

  const openWhatsApp = (number) => {
    if (!validate(false)) return
    window.open(
      'https://wa.me/' + number + '?text=' + encodeURIComponent(buildWAMessage()),
      '_blank',
      'noopener,noreferrer',
    )
  }

  const sendBoth = () => {
  if (!validate(true)) return
  // Fire email in background
  fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:              form.name,
      phone:             form.phone,
      location:          form.location,
      notes:             form.notes,
      customerEmail:     form.email,
      productName:       product.name,
      productCode:       product.code,
      productPrice:      product.price,
      qty,
      installation:      form.installation,
      installBase:       bd?.base       ?? 0,
      installExtra:      bd?.extra      ?? 0,
      installExtras:     bd?.extras     ?? 0,
      installTotal:      bd?.total      ?? 0,
      installComplexity: bd?.complexity ?? 'Standard',
      subtotal:          quote.subtotal,
      total:             quote.total,
    }),
  })
  // Open WhatsApp immediately
  window.open(
    'https://wa.me/' + WHATSAPP_NUMBERS[0].number + '?text=' + encodeURIComponent(buildWAMessage()),
    '_blank',
    'noopener,noreferrer',
  )
  setSent(true)
}

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-form-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(4,7,14,0.82)] backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#0b111e] border border-[rgba(0,229,255,0.18)] shadow-[0_0_60px_rgba(0,229,255,0.06)] max-h-[92vh] overflow-y-auto">
        <CornerBrackets />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-[rgba(0,229,255,0.08)]">
          <div>
            <div className="text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono mb-2">
              Quote Builder / {product.code}
            </div>
            <h3 id="order-form-title" className="text-xl font-black text-white tracking-wide">
              {product.name}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>

        {/* Success screen */}
        {sent ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 border border-[#00e5ff] flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 12 L10 18 L20 6" stroke="#00e5ff" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-[10px] tracking-[4px] text-[#00e5ff] uppercase font-mono mb-3">Quote Sent</div>
            <p className="text-white font-black text-xl mb-3">We have received your quote</p>
            <p className="text-gray-400 text-sm mb-1">Our team will call you on {form.phone} shortly.</p>
            {form.email && (
              <p className="text-gray-500 text-sm">A copy was sent to {form.email}</p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-8 border border-[rgba(0,229,255,0.2)] text-gray-400 text-[11px] tracking-[3px] uppercase px-8 py-3 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">

            {/* Product preview */}
            <div className="flex items-center gap-4 p-4 bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.08)]">
              <img src={product.img} alt="" className="w-16 h-16 object-cover grayscale opacity-70 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[9px] tracking-[3px] text-gray-500 mb-1">{product.category}</div>
                <div className="font-black text-sm text-white mb-0.5 truncate">{product.name}</div>
                <div className="text-[11px] text-gray-500 font-mono">{formatKES(product.price)} per unit</div>
              </div>
            </div>

            {/* Qty + Installation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Quantity" error={errors.qty}>
                <div className="flex">
                  <button type="button" onClick={() => update('qty', Math.max(1, qty - 1))}
                    className="w-10 border border-[rgba(0,229,255,0.2)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.06)] transition-colors"
                    aria-label="Decrease">−</button>
                  <input type="number" min="1" value={form.qty}
                    onChange={(e) => update('qty', Math.max(1, Number(e.target.value) || 1))}
                    className="flex-1 bg-transparent border-y border-[rgba(0,229,255,0.2)] text-center text-white font-mono text-sm py-2 focus:outline-none focus:border-[#00e5ff]" />
                  <button type="button" onClick={() => update('qty', qty + 1)}
                    className="w-10 border border-[rgba(0,229,255,0.2)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.06)] transition-colors"
                    aria-label="Increase">+</button>
                </div>
              </Field>

              <Field label="Installation">
                <div className="grid grid-cols-2 gap-0 border border-[rgba(0,229,255,0.2)]">
                  <button type="button" onClick={() => update('installation', true)}
                    className={'py-2 text-[10px] tracking-[2px] uppercase font-mono transition-colors ' + (form.installation ? 'bg-[#00e5ff] text-[#080c17]' : 'text-gray-400 hover:text-[#00e5ff]')}>
                    Yes, install
                  </button>
                  <button type="button" onClick={() => update('installation', false)}
                    className={'py-2 text-[10px] tracking-[2px] uppercase font-mono transition-colors ' + (!form.installation ? 'bg-[#00e5ff] text-[#080c17]' : 'text-gray-400 hover:text-[#00e5ff]')}>
                    Delivery only
                  </button>
                </div>
              </Field>
            </div>

            {/* Installation breakdown */}
            {form.installation && bd && (
              <div className="border border-[rgba(0,229,255,0.12)] bg-[rgba(0,229,255,0.02)] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">Installation Breakdown</div>
                  <div className="text-[9px] font-mono text-gray-500 tracking-widest">{bd.complexity}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">First camera (base fee)</span>
                    <span className="font-mono text-gray-200">{formatKES(bd.base)}</span>
                  </div>
                  {qty > 1 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">{qty - 1} more × {formatKES(bd.extra)}</span>
                      <span className="font-mono text-gray-200">{formatKES(bd.extras)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t border-[rgba(0,229,255,0.08)]">
                    <span className="text-white">Installation total</span>
                    <span className="font-mono text-[#00e5ff]">{formatKES(bd.total)}</span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-600 font-mono leading-relaxed">
                  Final cost confirmed after site visit.
                </p>
              </div>
            )}

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.name}>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                  placeholder="Jane Wanjiku"
                  className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] text-white px-3 py-2 focus:outline-none focus:border-[#00e5ff] text-sm" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] text-white px-3 py-2 focus:outline-none focus:border-[#00e5ff] text-sm font-mono" />
              </Field>
            </div>

            <Field label="Email — optional, required to receive a copy" error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                placeholder="jane@gmail.com"
                className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] text-white px-3 py-2 focus:outline-none focus:border-[#00e5ff] text-sm font-mono" />
            </Field>

            <Field label="Location (area or estate)" error={errors.location}>
              <input type="text" value={form.location} onChange={(e) => update('location', e.target.value)}
                placeholder="e.g. Kilimani, Nairobi"
                className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] text-white px-3 py-2 focus:outline-none focus:border-[#00e5ff] text-sm" />
            </Field>

            <Field label="Notes (optional)">
              <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)}
                placeholder="Preferred install date, site access, existing cabling, etc."
                className="w-full bg-transparent border border-[rgba(0,229,255,0.2)] text-white px-3 py-2 focus:outline-none focus:border-[#00e5ff] text-sm resize-none" />
            </Field>

            {/* Quote summary */}
            <div className="border border-[rgba(0,229,255,0.12)] bg-[rgba(0,229,255,0.02)]">
              <div className="px-5 py-3 border-b border-[rgba(0,229,255,0.08)] text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
                Your Quote
              </div>
              <div className="px-5 py-4 space-y-2 text-sm">
                <QuoteRow label={product.name + ' x ' + qty} value={formatKES(quote.subtotal)} />
                <QuoteRow
                  label="Installation"
                  value={form.installation ? formatKES(quote.installCost) : 'Not included'}
                  muted={!form.installation}
                />
                <div className="h-px bg-[rgba(0,229,255,0.08)] my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[3px] text-gray-400 uppercase font-mono">Estimated Total</span>
                  <span className="text-xl font-black text-white">{formatKES(quote.total)}</span>
                </div>
              </div>
            </div>

            {/* Error message */}
            {sendError && (
              <p className="text-red-400 text-[11px] font-mono text-center tracking-wide">{sendError}</p>
            )}

            {/* Action buttons */}
            <div className="space-y-3">

              {/* Email */}
              <button
                type="button"
                onClick={sendEmail}
                disabled={sending}
                className="w-full flex items-center justify-center gap-3 bg-[#00e5ff] text-[#080c17] font-black text-[11px] tracking-[3px] uppercase py-4 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {sending ? 'Sending...' : 'Send Quote by Email'}
              </button>

              {/* WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHATSAPP_NUMBERS.map((w) => (
                  <button
                    key={w.number}
                    type="button"
                    onClick={() => openWhatsApp(w.number)}
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-[#05140a] font-black text-[11px] tracking-[3px] uppercase py-4 hover:opacity-90 transition-opacity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.52 3.48A11.77 11.77 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.85 11.85 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Zm-8.46 18.3h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.22-3.74.98 1-3.64-.23-.38a9.8 9.8 0 1 1 18.18-5.24 9.82 9.82 0 0 1-9.83 9.87Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16-.35.22-.65.07c-.3-.15-1.25-.46-2.38-1.46a8.95 8.95 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52s-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37s-1.05 1.03-1.05 2.5 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.15 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                    </svg>
                    WA {w.label}
                  </button>
                ))}
              </div>

              {/* Send both */}
              <button
                type="button"
                onClick={sendBoth}
                disabled={sending}
                className="w-full border border-[rgba(0,229,255,0.3)] text-[#00e5ff] text-[11px] tracking-[3px] uppercase py-3 hover:bg-[rgba(0,229,255,0.06)] transition-colors disabled:opacity-50"
              >
                Send Email + WhatsApp
              </button>

              <button type="button" onClick={onClose}
                className="w-full border border-[rgba(0,229,255,0.08)] text-gray-600 text-[11px] tracking-[3px] uppercase py-3 hover:text-gray-400 transition-colors">
                Cancel
              </button>
            </div>

            <p className="text-[10px] text-gray-600 leading-relaxed font-mono">
              Emails are sent from info@omniveil.co.ke. A receipt is delivered to the customer automatically. Final pricing confirmed before any work begins.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-[9px] tracking-[3px] text-gray-500 uppercase font-mono mb-2">
        {label}
        {error && <span className="text-red-400 ml-2 normal-case tracking-normal">{error}</span>}
      </span>
      {children}
    </label>
  )
}

function QuoteRow({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span className={(muted ? 'text-gray-600' : 'text-gray-400') + ' text-sm'}>{label}</span>
      <span className={(muted ? 'text-gray-600' : 'text-gray-200') + ' font-mono text-sm'}>{value}</span>
    </div>
  )
}

function CornerBrackets() {
  return (
    <>
      <svg className="absolute top-0 left-0 w-8 h-8 text-[#00e5ff] pointer-events-none" viewBox="0 0 32 32" fill="none">
        <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      </svg>
      <svg className="absolute top-0 right-0 w-8 h-8 text-[#00e5ff] pointer-events-none" viewBox="0 0 32 32" fill="none">
        <path d="M32 16 L32 0 L16 0" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-8 h-8 text-[#00e5ff] pointer-events-none" viewBox="0 0 32 32" fill="none">
        <path d="M0 16 L0 32 L16 32" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-8 h-8 text-[#00e5ff] pointer-events-none" viewBox="0 0 32 32" fill="none">
        <path d="M32 16 L32 32 L16 32" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      </svg>
    </>
  )
}