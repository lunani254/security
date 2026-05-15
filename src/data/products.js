// Central product catalogue.
// Every camera card, the homepage preview, and the /products page read from here.
// Prices in KES. Images live in /public/products/*.jpg
// "types" drives filter buttons. "environment": indoor | outdoor | hybrid.

export const PRODUCTS = [
  // --------------------------- HIKVISION ---------------------------
  {
    id: 1,
    code: 'hk-ptz-4mp',
    brand: 'Hikvision',
    name: '4MP DarkFighter PTZ',
    model: 'DS-2DE4415IW-DE(T5)',
    category: 'PTZ / OUTDOOR',
    environment: 'outdoor',
    resolution: '4MP',
    types: ['ptz', 'outdoor'],
    price: 55000,
    desc: 'Flagship pan-tilt-zoom dome that tracks movement across large perimeters. DarkFighter low-light tech reads plates and faces even at night.',
    long:
      'A proper enterprise PTZ. 25x optical zoom, DarkFighter sensor for usable colour footage in near-total darkness, and auto-tracking that follows subjects across the field of view. Ideal for estates, yards, petrol stations, and any site where one camera has to cover a lot of ground.',
    specs: ['4MP', '25x Zoom', 'DarkFighter', 'Auto-Track', '100m IR'],
    img: '/products/hk-ptz-4mp.jpg',
  },
  {
    id: 2,
    code: 'hk-acusense-4mp',
    brand: 'Hikvision',
    name: '4MP AcuSense Bullet',
    category: 'BULLET / OUTDOOR',
    environment: 'outdoor',
    resolution: '4MP',
    types: ['bullet', 'outdoor', 'ai'],
    price: 24500,
    desc: 'AI-driven bullet that ignores branches and animals and only alerts you to real people and vehicles.',
    long:
      'AcuSense on-board AI filters out false alarms from wind, shadows, and pets so you only get pinged for humans and vehicles. Sharp 4MP detail, solid IR night range, and a rugged outdoor housing.',
    specs: ['4MP', 'AcuSense AI', 'Human/Vehicle', 'IP67', 'IR 40m'],
    img: '/products/hk-acusense-4mp.jpg',
  },
  {
    id: 3,
    code: 'hk-colorvu-mini',
    brand: 'Hikvision',
    name: '2MP ColorVu Mini Bullet',
    category: 'COLORVU / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['bullet', 'colourvu', 'outdoor'],
    price: 6200,
    desc: 'Compact bullet that stays in full colour 24/7 thanks to ColorVu lighting. Great value entry-level camera.',
    long:
      'The mini ColorVu gives you day-time colour at night without an obvious IR array. Tiny footprint, easy to mount, and priced so you can put several around a home or small shop.',
    specs: ['2MP Full HD', 'ColorVu', 'Warm-Light', 'IP67', 'Mini Form'],
    img: '/products/hk-colorvu-mini.jpg',
  },
  {
    id: 4,
    code: 'hk-shlf-2mp',
    brand: 'Hikvision',
    name: '2MP Smart Hybrid Audio Bullet',
    category: 'HYBRID / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['bullet', 'hybrid', 'audio'],
    price: 7950,
    desc: 'Hybrid lighting flips between IR and warm white with built-in audio for two-way warnings.',
    long:
      'Smart Hybrid Light keeps footage black-and-white crisp when nothing is around, then snaps to full colour when motion is detected. The built-in mic captures audio too, useful for shops and driveways.',
    specs: ['2MP', 'Hybrid Light', 'Built-in Mic', 'IP67', 'IR 40m'],
    img: '/products/hk-shlf-2mp.jpg',
  },
  {
    id: 5,
    code: 'hk-turret-3k',
    brand: 'Hikvision',
    name: '3K ColorVu Indoor Turret',
    model: 'DS-2CE70KF0T-PFS',
    category: 'TURRET / INDOOR',
    environment: 'indoor',
    resolution: '3K',
    types: ['turret', 'colourvu', 'audio', 'indoor'],
    price: 6700,
    desc: 'Indoor turret with 3K colour video and built-in audio. Perfect for shops, clinics, and living rooms.',
    long:
      'Turret form factor is less intrusive than a bullet. 3K resolution is a clean upgrade over 1080p and ColorVu keeps the scene in colour after dark if there is any ambient light. Audio pickup included.',
    specs: ['3K', 'ColorVu', 'Built-in Mic', 'Turret Form', 'Low Light'],
    img: '/products/hk-turret-3k.jpg',
  },
  {
    id: 6,
    code: 'hk-lpfs-2mp',
    brand: 'Hikvision',
    name: '2MP ColorVu Hybrid Bullet',
    model: 'DS-2CE12DF0T-LPFS',
    category: 'HYBRID / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['bullet', 'colourvu', 'hybrid', 'outdoor'],
    price: 6498,
    desc: 'ColorVu bullet with smart hybrid light, tuned for gate-side and driveway installs.',
    long:
      'Full-colour night vision when something enters the scene, otherwise a low-power standby that keeps running 24/7. A popular workhorse in residential and SME installs.',
    specs: ['2MP', 'ColorVu', 'Hybrid Light', 'IP67', 'Wide Angle'],
    img: '/products/hk-lpfs-2mp.jpg',
  },
  {
    id: 7,
    code: 'hk-shybrid-4mp',
    brand: 'Hikvision',
    name: '4MP Smart Hybrid Dome ColourVu',
    category: 'DOME / OUTDOOR',
    environment: 'outdoor',
    resolution: '4MP',
    types: ['dome', 'colourvu', 'hybrid', 'outdoor'],
    price: 12500,
    desc: 'Vandal-resistant 4MP dome with hybrid lighting. Ideal for exposed ceilings, garages, and shopfronts.',
    long:
      'A proper outdoor dome. Metal base, impact rated, and hybrid ColourVu lighting so you keep detail after dark without a bright IR flood blinding everyone.',
    specs: ['4MP', 'ColourVU', 'Hybrid Light', 'IK10 Vandal', 'IP67'],
    img: '/products/hk-shybrid-4mp.jpg',
  },
  {
    id: 8,
    code: 'hk-shybrid-2mp',
    brand: 'Hikvision',
    name: '2MP Smart Hybrid Dome',
    category: 'DOME / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['dome', 'hybrid', 'outdoor'],
    price: 7500,
    desc: 'Outdoor-ready 2MP dome with hybrid lighting. Budget-friendly where coverage matters more than pixel count.',
    long:
      'A great default for parking lots, compounds, and back yards where you need multiple cameras and proper night coverage without breaking the budget.',
    specs: ['2MP Full HD', 'Hybrid Light', 'IR 30m', 'IK10', 'IP67'],
    img: '/products/hk-shybrid-2mp.jpg',
  },
  {
    id: 9,
    code: 'hk-cube-4mp',
    brand: 'Hikvision',
    name: '4MP Network Cube',
    category: 'CUBE / INDOOR',
    environment: 'indoor',
    resolution: '4MP',
    types: ['cube', 'indoor', 'wifi'],
    price: 15800,
    desc: 'Desk-friendly cube camera for offices, reception areas, and home studies.',
    long:
      'Sits on a shelf or mounts on a wall. 4MP clarity, PIR sensor, and built-in mic. Clean choice when you do not want a big bullet pointing at your visitors.',
    specs: ['4MP', 'PIR Sensor', 'Built-in Mic', 'PoE', 'Table Mount'],
    img: '/products/hk-cube-4mp.jpg',
  },

  // --------------------------- UNIVIEW ---------------------------
  {
    id: 10,
    code: 'uv-bullet-4mp',
    brand: 'Uniview',
    name: '4MP Mini Bullet',
    category: 'BULLET / OUTDOOR',
    environment: 'outdoor',
    resolution: '4MP',
    types: ['bullet', 'outdoor'],
    price: 7500,
    desc: 'Lightweight 4MP bullet at a very friendly price point. A workhorse for SME and residential installs.',
    long:
      'Uniview punches above its weight. Clean 4MP image, decent IR range, easy PoE setup, and a price that lets you cover more of the property for the same budget.',
    specs: ['4MP', 'IR 30m', 'IP67', 'PoE', 'Low-light'],
    img: '/products/uv-bullet-4mp.jpg',
  },
  {
    id: 11,
    code: 'uv-dome-2mp',
    brand: 'Uniview',
    name: '2MP Dome',
    category: 'DOME / INDOOR',
    environment: 'indoor',
    resolution: '2MP',
    types: ['dome', 'indoor'],
    price: 5200,
    desc: 'Cheapest entry into a proper IP dome. Fit several across a shop or office and still keep the budget tight.',
    long:
      'Basic, reliable, and easy to configure. Pair with an NVR and you have a complete small-business setup without overspending.',
    specs: ['2MP Full HD', 'IR 20m', 'PoE', 'Wide Lens', 'Indoor'],
    img: '/products/uv-dome-2mp.jpg',
  },
  {
    id: 12,
    code: 'uv-ptz-5mp',
    brand: 'Uniview',
    name: '5MP Light Hunter Mini PTZ',
    category: 'PTZ / HYBRID',
    environment: 'outdoor',
    resolution: '5MP',
    types: ['ptz', 'outdoor', 'hybrid'],
    price: 32500,
    desc: 'Compact PTZ with Light Hunter low-light tech and a built-in alarm strobe. Active deterrent, not just a camera.',
    long:
      'Smaller and lighter than the Hikvision PTZ but with a strobe + siren built in. Great for sites where you want a visible, active deterrent, not just silent surveillance.',
    specs: ['5MP', 'Light Hunter', 'Strobe + Siren', 'Mini PTZ', 'Auto-Track'],
    img: '/products/uv-ptz-5mp.jpg',
  },

  // --------------------------- TIANDY ---------------------------
  {
    id: 13,
    code: 'td-dual-2mp',
    brand: 'Tiandy',
    name: '2MP Dual-Lens Panoramic',
    category: 'DUAL LENS / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['bullet', 'dual', 'outdoor'],
    price: 12000,
    desc: 'Two lenses, one stitched wide image. Cover a whole driveway or yard with a single camera.',
    long:
      'Dual-lens design fuses two views into a seamless panoramic feed. Fewer cameras, less cabling, and zero blind spots between adjacent angles.',
    specs: ['2MP Dual Lens', 'Panoramic', 'IR Night', 'IP67', 'Wide-Angle'],
    img: '/products/td-dual-2mp.jpg',
  },
  {
    id: 14,
    code: 'td-bullet-nv',
    brand: 'Tiandy',
    name: '2MP Night Vision Bullet',
    category: 'BULLET / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['bullet', 'outdoor'],
    price: 5200,
    desc: 'No-frills outdoor bullet with proper IR range. Solid entry point for a first CCTV install.',
    long:
      'You know what you are getting: a compact outdoor bullet, clear 1080p picture, dependable IR at night, and a very reasonable price. Good for small retail, flats, gates.',
    specs: ['2MP', 'IR Night', 'IP67', 'PoE', 'Compact'],
    img: '/products/td-bullet-nv.jpg',
  },
  {
    id: 15,
    code: 'td-2mp',
    brand: 'Tiandy',
    name: '2MP Bullet',
    category: 'BULLET / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['bullet', 'outdoor'],
    price: 4200,
    desc: 'The most affordable camera in the catalogue. Good HD video, basic IR, outdoor rated.',
    long:
      'When the job is just cover this one angle and the budget is tight, this is the one. Do not expect AI features, but picture quality is honest.',
    specs: ['2MP', 'IR 20m', 'IP66', 'PoE', 'Budget Pick'],
    img: '/products/td-2mp.jpg',
  },
  {
    id: 16,
    code: 'td-colourmaker',
    brand: 'Tiandy',
    name: '4MP Colourmaker Turret',
    category: 'TURRET / HYBRID',
    environment: 'hybrid',
    resolution: '4MP',
    types: ['turret', 'colourvu'],
    price: 7200,
    desc: 'Colourmaker lighting keeps detail in full colour after dark. Low-profile turret form.',
    long:
      'Turret looks cleaner than a bullet and fits flush to a wall or ceiling. Colourmaker tech means you still get a usable colour picture at 2 AM.',
    specs: ['4MP', 'Colourmaker', 'Turret', 'IR Fallback', 'Low-Profile'],
    img: '/products/td-colourmaker.jpg',
  },
  {
    id: 17,
    code: 'td-6mp-4g',
    brand: 'Tiandy',
    name: '6MP Double-View 4G Solar',
    category: '4G / SOLAR',
    environment: 'outdoor',
    resolution: '6MP',
    types: ['ptz', '4g', 'solar', 'outdoor'],
    price: 29500,
    desc: 'Solar-powered 4G camera with two lenses. Zero cabling, zero WiFi required.',
    long:
      'Mount it anywhere: farms, construction sites, remote gates. Solar panel keeps it running and a 4G SIM handles the data. Two lenses cover wide and close.',
    specs: ['6MP Dual Lens', '4G SIM', 'Solar Panel', 'PTZ', 'Off-grid'],
    img: '/products/td-6mp-4g.jpg',
  },
  {
    id: 18,
    code: 'td-tc32-wifi',
    brand: 'Tiandy',
    name: 'TC32 WiFi Battery Cam',
    category: 'WIFI / BATTERY',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['wifi', 'battery', 'outdoor'],
    price: 14500,
    desc: 'Completely wireless. Battery-powered WiFi camera for spots where you cannot run a cable.',
    long:
      'No cables, no drilling. Charge the battery, stick it to a wall with the included bracket, and connect to your WiFi. Perfect for rentals or temporary monitoring.',
    specs: ['2MP', 'WiFi', 'Battery', 'PIR Motion', 'App Alerts'],
    img: '/products/td-tc32-wifi.jpg',
  },
  {
    id: 19,
    code: 'td-2mp-wifi',
    brand: 'Tiandy',
    name: '2MP WiFi Bullet',
    category: 'WIFI / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['wifi', 'bullet', 'outdoor'],
    price: 13000,
    desc: 'WiFi bullet for DIY installs. No NVR required. Watch the feed from the app.',
    long:
      'Plug into power, pair with your WiFi, watch from anywhere on the mobile app. A solid self-install option for homeowners and small shops.',
    specs: ['2MP', 'WiFi', 'IR Night', 'App Based', 'Outdoor'],
    img: '/products/td-2mp-wifi.jpg',
  },
  {
    id: 20,
    code: 'td-tch33-wifi',
    brand: 'Tiandy',
    name: 'TCH33 WiFi PT Cam',
    category: 'WIFI / INDOOR',
    environment: 'indoor',
    resolution: '2MP',
    types: ['wifi', 'pt', 'indoor'],
    price: 11500,
    desc: 'Pan-tilt WiFi camera for the home. Swipe on the app and the camera follows.',
    long:
      'Good fit for checking on kids, pets, or shop counters. Motorised pan and tilt through the app, two-way audio, cloud or SD recording.',
    specs: ['2MP', 'Pan / Tilt', 'Two-Way Audio', 'WiFi', 'microSD'],
    img: '/products/td-tch33-wifi.jpg',
  },

  // --------------------------- IMOU / EZVIZ / OTHER ---------------------------
  {
    id: 21,
    code: 'imou-cell-pt4g',
    brand: 'Imou',
    name: 'CELL PT 4G Solar',
    category: '4G / SOLAR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['4g', 'solar', 'pt', 'outdoor'],
    price: 19500,
    desc: 'Fully off-grid 4G solar PT camera. Drop-and-go security for sites with no power or WiFi.',
    long:
      'Solar panel + 4G SIM means no cables, no WiFi, no NVR. Pan-tilt control from the Imou app. Good for farms, plots, and construction sites.',
    specs: ['2MP', '4G SIM', 'Solar Panel', 'Pan / Tilt', 'App Based'],
    img: '/products/imou-cell-pt4g.jpg',
  },
  {
    id: 22,
    code: 'imou-turret-se',
    brand: 'Imou',
    name: 'Turret SE WiFi',
    category: 'WIFI / TURRET',
    environment: 'indoor',
    resolution: '2MP',
    types: ['wifi', 'turret', 'indoor'],
    price: 11500,
    desc: 'Clean turret design with smart alarms, human detection, and a built-in mic.',
    long:
      'A polished indoor turret that feels like a consumer product, not enterprise gear. Solid choice for a home with kids or a boutique shop.',
    specs: ['1080p', 'Human Detect', 'Smart Alarm', 'Built-in Mic', 'WiFi'],
    img: '/products/imou-turret-se.jpg',
  },
  {
    id: 23,
    code: 'ez-eb3',
    brand: 'Ezviz',
    name: 'EB3 Smart Battery Cam',
    category: 'WIFI / BATTERY',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['wifi', 'battery', 'outdoor'],
    price: 19500,
    desc: 'Fully wireless Ezviz battery cam with AI human detection and encrypted cloud storage.',
    long:
      'Premium battery camera. Long runtime per charge, AI filters out animals and trees, cloud storage option. A fit-and-forget DIY install.',
    specs: ['2MP', 'Battery', 'AI Detection', 'Encrypted Cloud', 'WiFi'],
    img: '/products/ez-eb3.jpg',
  },
  {
    id: 24,
    code: 'lp-x83-wifi',
    brand: 'LongPlus',
    name: 'X83 WiFi Camera',
    category: 'WIFI / OUTDOOR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['wifi', 'bullet', 'outdoor'],
    price: 15500,
    desc: 'WiFi bullet with phone-based remote viewing and alerts. Low fuss, high utility.',
    long:
      'Another strong contender if you want an outdoor WiFi cam and would rather not deal with PoE wiring. Works with its own app and plays well with most home WiFi.',
    specs: ['2MP', 'WiFi', 'Mobile App', 'IR Night', 'Outdoor'],
    img: '/products/lp-x83-wifi.jpg',
  },
  {
    id: 25,
    code: 'ubox-wifi-solar',
    brand: 'U-BOX',
    name: 'WiFi + 4G Solar PTZ',
    category: '4G / SOLAR',
    environment: 'outdoor',
    resolution: '2MP',
    types: ['4g', 'solar', 'ptz', 'wifi', 'outdoor'],
    price: 24500,
    desc: 'Dual-mode 4G or WiFi PTZ with integrated solar panel. Remote sites, remote control.',
    long:
      'Pick 4G or WiFi depending on the site. Solar keeps the battery topped up. Pan and tilt from the app, full remote live view over cellular.',
    specs: ['2MP', '4G + WiFi', 'Solar', 'PTZ', 'Off-grid'],
    img: '/products/ubox-wifi-solar.jpg',
  },
  {
    id: 26,
    code: 'wifi-dome-2mp',
    brand: 'OmniVeil',
    name: '2MP Fixed IR WiFi Dome',
    category: 'WIFI / DOME',
    environment: 'indoor',
    resolution: '2MP',
    types: ['wifi', 'dome', 'indoor'],
    price: 13500,
    desc: 'WiFi IR dome for ceilings. No cabling headache, proper wide-angle indoor coverage.',
    long:
      'Indoor ceiling dome that runs on WiFi instead of PoE. Fit one per room, each connects to your network directly, no NVR needed.',
    specs: ['2MP', 'WiFi', 'IR Night', 'Wide Angle', 'Ceiling Mount'],
    img: '/products/wifi-dome-2mp.jpg',
  },
  {
    id: 27,
    code: 'spy-wifi',
    brand: 'OmniVeil',
    name: 'Discreet WiFi Spy Cam',
    category: 'WIFI / COVERT',
    environment: 'indoor',
    resolution: '2MP',
    types: ['wifi', 'covert', 'indoor'],
    price: 9500,
    desc: 'Pinhole WiFi camera for covert monitoring. Records to microSD or streams over the app.',
    long:
      'Small enough to hide inside a smoke detector or picture frame. Use responsibly. Good for staff areas, evidence gathering, and valuables rooms.',
    specs: ['2MP Pinhole', 'WiFi', 'microSD', 'Motion Record', 'Covert'],
    img: '/products/spy-wifi.jpg',
  },
]

// ── FILTER OPTIONS ───────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'all',      label: 'All Products' },
  { id: 'bullet',   label: 'Bullet' },
  { id: 'dome',     label: 'Dome' },
  { id: 'turret',   label: 'Turret' },
  { id: 'ptz',      label: 'PTZ' },
  { id: 'cube',     label: 'Cube' },
  { id: 'wifi',     label: 'WiFi' },
  { id: '4g',       label: '4G / Cellular' },
  { id: 'solar',    label: 'Solar' },
  { id: 'battery',  label: 'Battery' },
  { id: 'colourvu', label: 'ColorVu' },
  { id: 'ai',       label: 'AI Detection' },
  { id: 'covert',   label: 'Covert' },
]

export const ENVIRONMENTS = [
  { id: 'indoor',  label: 'Indoor' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'hybrid',  label: 'Hybrid' },
]

export const RESOLUTIONS = [
  { id: '2MP', label: '2MP' },
  { id: '3K',  label: '3K' },
  { id: '4MP', label: '4MP' },
  { id: '5MP', label: '5MP' },
  { id: '6MP', label: '6MP' },
]

export const BRANDS = [
  'Hikvision', 'Uniview', 'Tiandy', 'Imou', 'Ezviz', 'LongPlus', 'U-BOX', 'OmniVeil',
]

// ── UTILITIES ────────────────────────────────────────────────────────────────

export function formatKES(amount) {
  return `KES ${Number(amount).toLocaleString('en-KE')}`
}

export function findProductByCode(code) {
  if (!code) return undefined
  const needle = String(code).toLowerCase()
  return PRODUCTS.find((p) => p.code.toLowerCase() === needle)
}

// ── INSTALLATION CALCULATOR ──────────────────────────────────────────────────
// Pricing logic:
//   - KES 3,500 covers the first camera (travel, mounting, cabling, config)
//   - KES 1,000 for each additional camera after the first
//   - A complexity multiplier is applied based on camera type
//     Standard (dome/bullet/turret/cube) : 1.0x  → base 3,500  extra 1,000
//     WiFi / Dual-lens / Covert          : 1.2x  → base 4,200  extra 1,200
//     4G / Solar                         : 1.3x  → base 4,550  extra 1,300
//     PTZ                                : 1.5x  → base 5,250  extra 1,500

export const INSTALL_BASE      = 3500   // first camera base fee
export const INSTALL_PER_EXTRA = 1000   // each camera after the first

export function complexityMultiplier(product) {
  if (!product) return 1
  const t = product.types || []
  if (t.includes('ptz'))    return 1.5
  if (t.includes('4g'))     return 1.3
  if (t.includes('solar'))  return 1.3
  if (t.includes('wifi'))   return 1.2
  if (t.includes('dual'))   return 1.2
  if (t.includes('covert')) return 1.2
  return 1
}

export function complexityLabel(product) {
  if (!product) return 'Standard'
  const t = product.types || []
  if (t.includes('ptz'))    return 'Complex — PTZ'
  if (t.includes('4g'))     return 'Advanced — 4G'
  if (t.includes('solar'))  return 'Advanced — Solar'
  if (t.includes('wifi'))   return 'Moderate — WiFi'
  if (t.includes('dual'))   return 'Moderate — Dual-lens'
  if (t.includes('covert')) return 'Moderate — Covert'
  return 'Standard'
}

// Total installation cost for a job
export function installationTotal(qty, product) {
  const m     = complexityMultiplier(product)
  const base  = Math.round(INSTALL_BASE * m)
  const extra = Math.round(INSTALL_PER_EXTRA * m)
  return base + Math.max(0, qty - 1) * extra
}

// Full breakdown for display in the quote form
export function installationBreakdown(qty, product) {
  const m      = complexityMultiplier(product)
  const base   = Math.round(INSTALL_BASE * m)
  const extra  = Math.round(INSTALL_PER_EXTRA * m)
  const extras = Math.max(0, qty - 1) * extra
  return {
    base,
    extra,
    extras,
    total:      base + extras,
    complexity: complexityLabel(product),
  }
}

// ── WHATSAPP CONTACTS ────────────────────────────────────────────────────────

export const WHATSAPP_NUMBERS = [
  { label: 'Sales Team', number: '254780741147' },
  { label: 'Support',    number: '254106871484' },
]