'use client'

const PILLARS = [
  {
    num: '01',
    title: 'Certified Installers',
    desc: 'Our technicians are trained, vetted, and insured. Every installation is signed off before we leave site.',
  },
  {
    num: '02',
    title: 'No Off-the-Shelf Designs',
    desc: 'We walk your property, map blind spots, and design the system around your actual risks. No copy-paste quotes.',
  },
  {
    num: '03',
    title: 'Locally Supported',
    desc: 'Based in Nairobi. When something needs attention we dispatch the same day, not next week.',
  },
  {
    num: '04',
    title: 'Transparent Pricing',
    desc: 'You see the cost of each camera, each cable run, and each labour hour. No surprises at handover.',
  },
]

const STATS = [
  { value: '500+', label: 'Cameras Installed' },
  { value: '120+', label: 'Active Clients' },
  { value: '24/7', label: 'Remote Monitoring' },
  { value: '< 4h', label: 'Response Time' },
]

export default function WhyUs({ inView }) {
  return (
    <section id="why" className="relative py-28 px-6 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="lg:col-span-5">
            <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-4">
              Why OmniVeil
            </div>
            <h2 className="text-[clamp(32px,4vw,52px)] font-black leading-tight tracking-tight text-white">
              Built By People<br />
              Who Actually<br />
              <span className="text-[#00e5ff]">Show Up.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-gray-400 text-base leading-relaxed">
              A CCTV system is only as good as the people behind it. We obsess over
              placement, cable runs, firmware, and the unglamorous parts nobody else
              talks about, because that is what keeps your cameras working three years
              from now.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(0,229,255,0.06)] mb-20">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              className={`relative bg-[#080c17] p-8 group hover:bg-[#0d1425] transition-colors duration-300 ${
                inView ? `animate-fade-up delay-${(i + 1) * 100}` : 'opacity-0'
              }`}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[3px] text-[#00e5ff] opacity-60">
                  {p.num}
                </span>
                <span className="font-mono text-[9px] tracking-[3px] text-gray-700 opacity-70">
                  PILLAR
                </span>
              </div>
              <div className="w-8 h-px bg-[#00e5ff] mb-6 group-hover:w-14 transition-all duration-300" />
              <h3 className="font-black text-base tracking-wide mb-3 text-white">
                {p.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.1)] ${
            inView ? 'animate-fade-up delay-500' : 'opacity-0'
          }`}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-[#080c17] px-6 py-8 flex flex-col items-start"
            >
              <div className="text-[clamp(28px,3vw,40px)] font-black text-white tracking-tight leading-none mb-2">
                {s.value}
              </div>
              <div className="text-[9px] tracking-[3px] text-gray-500 uppercase font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
