const SERVICES = [
  {
    title: 'CCTV Installation',
    desc: 'Professional installation of indoor and outdoor cameras for homes, offices and commercial premises across Nairobi.',
  },
  {
    title: 'WiFi Network Setup',
    desc: 'High-speed wireless network design and installation for seamless, secure connectivity at home and business.',
  },
  {
    title: 'Remote Monitoring',
    desc: 'Live feed access from your phone, anywhere in the world. We configure everything before we leave your site.',
  },
  {
    title: 'Maintenance and Support',
    desc: 'Scheduled servicing, health checks and rapid-response technical support for all installed systems.',
  },
]

export default function Services({ inView }) {
  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className={`mb-16 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-4">
            What We Do
          </div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-black leading-tight tracking-tight text-white">
            Complete Security<br />Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(0,229,255,0.06)]">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`bg-[#080c17] p-8 hover:bg-[#0d1425] transition-colors duration-300 group ${inView ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'}`}
            >
              <div className="w-8 h-px bg-[#00e5ff] mb-6 group-hover:w-14 transition-all duration-300" />
              <h3 className="font-black text-base tracking-wide mb-3 text-white">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}