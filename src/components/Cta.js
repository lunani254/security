import Link from 'next/link'
import CCTVBrackets from './CCTVBrackets'

export default function CTA({ inView }) {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">

      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className={`relative z-10 max-w-4xl mx-auto text-center ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-6">
          Get Started Today
        </div>

        <h2 className="text-[clamp(36px,5vw,70px)] font-black leading-tight tracking-tight mb-6 text-white">
          Ready to Secure<br />
          Your Property?
        </h2>

        <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto mb-12">
          Browse the full product range, pick your cameras and request
          installation in one place. We handle the rest.
        </p>

        <CCTVBrackets className="inline-block">
          <div className="flex flex-col sm:flex-row gap-4 p-8">
            <Link
              href="/products"
              className="bg-[#00e5ff] text-[#080c17] font-black text-[11px] tracking-[3px] uppercase px-10 py-4 hover:opacity-90 transition-opacity duration-200"
            >
              Browse All Products
            </Link>
            <a
              href="https://wa.me/254780741147?text=Hello%20OmniVeil%20Security%2C%20I%20would%20like%20a%20quote."
              target="_blank"
              rel="noreferrer"
              className="border border-[rgba(0,229,255,0.25)] text-gray-400 text-[11px] tracking-[3px] uppercase px-10 py-4 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </CCTVBrackets>
      </div>
    </section>
  )
}