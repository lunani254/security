export default function Footer() {
  return (
    <footer className="bg-[#080c17] border-t border-[rgba(0,229,255,0.08)] px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Brand */}
        <div>
          <div className="font-black tracking-[4px] text-sm leading-none text-white">
            OMNIVEIL
          </div>
          <div
            className="text-[8px] text-[#00e5ff] tracking-[5px] leading-none mt-1.5"
            style={{ fontWeight: 300 }}
          >
            SECURITY
          </div>
          <div className="text-[10px] text-gray-600 tracking-widest mt-3 font-mono">
            NAIROBI, KENYA
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8 text-[10px] tracking-[2px] text-gray-600 uppercase font-mono">
          <a href="#services" className="hover:text-[#00e5ff] transition-colors duration-200">
            Services
          </a>
          <a href="#products" className="hover:text-[#00e5ff] transition-colors duration-200">
            Products
          </a>
          <a href="#why" className="hover:text-[#00e5ff] transition-colors duration-200">
            Why Us
          </a>
          <a href="tel:+254780741147" className="hover:text-[#00e5ff] transition-colors duration-200">
            +254 780 741 147
          </a>
          <a href="tel:+254106871484" className="hover:text-[#00e5ff] transition-colors duration-200">
            +254 106 871 484
          </a>
        </div>

        {/* Copy */}
        <div className="text-[10px] text-gray-700 tracking-widest font-mono">
          2026 OMNIVEIL SECURITY
        </div>
      </div>
    </footer>
  )
}