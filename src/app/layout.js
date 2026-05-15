import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

const SITE_URL = "https://omniveil.co.ke"

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
  default: 'CCTV Installation Nairobi | Buy & Install Security Cameras Kenya',
  template: '%s | OmniVeil Security Nairobi',
},
description:
  'Professional CCTV camera installation in Nairobi, Kenya. We supply and install Hikvision, Dahua and Tiandy cameras for homes, offices, shops and businesses. Serving Westlands, Karen, Kilimani, Kasarani, Parklands, Lavington and all Nairobi areas. Call +254 780 741 147 for a free quote.',
keywords: [
  // Brand and business
  'OmniVeil Security',
  'CCTV installation Nairobi',
  'CCTV installer Nairobi',
  'CCTV company Nairobi',
  'security camera installer Nairobi',
  'CCTV installation Kenya',
  'security cameras Kenya',
  'CCTV Kenya',

  // Camera brands
  'Hikvision Nairobi',
  'Hikvision installer Kenya',
  'Hikvision camera price Kenya',
  'Dahua Nairobi',
  'Dahua installer Kenya',
  'Tiandy cameras Kenya',
  'Imou camera Kenya',
  'Ezviz camera Kenya',

  // Camera types
  'dome camera Nairobi',
  'bullet camera Nairobi',
  'PTZ camera Nairobi',
  'WiFi camera Nairobi',
  'IP camera Nairobi',
  'night vision camera Nairobi',
  'outdoor camera Kenya',
  'indoor camera Kenya',
  '4K camera Nairobi',
  'solar camera Kenya',
  '4G camera Kenya',
  'ColorVu camera Kenya',
  'AcuSense camera Kenya',

  // Services
  'CCTV installation service Nairobi',
  'CCTV setup Nairobi',
  'security camera installation Nairobi',
  'CCTV repair Nairobi',
  'CCTV maintenance Nairobi',
  'WiFi installation Nairobi',
  'WiFi setup Nairobi',
  'network installation Nairobi',
  'remote monitoring setup Nairobi',
  'CCTV remote viewing Kenya',

  // Nairobi areas
  'CCTV Westlands',
  'CCTV Karen',
  'CCTV Kilimani',
  'CCTV Kasarani',
  'CCTV Parklands',
  'CCTV Lavington',
  'CCTV Langata',
  'CCTV South B',
  'CCTV South C',
  'CCTV Eastleigh',
  'CCTV Ruaka',
  'CCTV Ruiru',
  'CCTV Thika',
  'CCTV Kiambu',
  'CCTV Ngong',
  'CCTV Syokimau',
  'CCTV Kitengela',
  'CCTV Rongai',
  'CCTV Roysambu',
  'CCTV Zimmerman',
  'CCTV Kahawa',
  'CCTV Embakasi',
  'CCTV Donholm',
  'CCTV Buruburu',
  'CCTV Umoja',
  'CCTV Githurai',
  'CCTV Kikuyu',
  'CCTV Gigiri',
  'CCTV Runda',
  'CCTV Muthaiga',
  'CCTV Spring Valley',
  'CCTV Loresho',
  'CCTV Upper Hill',
  'CCTV CBD Nairobi',
  'CCTV Ngara',
  'CCTV Pangani',

  // Property types
  'home CCTV installation Nairobi',
  'house security cameras Nairobi',
  'office CCTV Nairobi',
  'shop CCTV Nairobi',
  'supermarket CCTV Kenya',
  'warehouse CCTV Nairobi',
  'school CCTV Kenya',
  'church CCTV Kenya',
  'apartment CCTV Nairobi',
  'estate CCTV Nairobi',
  'compound security cameras Kenya',
  'gate camera Nairobi',
  'perimeter security Nairobi',

  // Search intent
  'buy CCTV camera Nairobi',
  'CCTV camera price Nairobi',
  'CCTV camera price Kenya',
  'cheap CCTV camera Nairobi',
  'affordable CCTV Kenya',
  'best CCTV camera Kenya',
  'CCTV full set Kenya',
  'CCTV package Nairobi',
  'CCTV quote Nairobi',
  'CCTV free quote Kenya',
  'CCTV same day installation Nairobi',
  'CCTV installation cost Kenya',
  'how much does CCTV cost Kenya',

  // Problem based
  'home security Nairobi',
  'business security Kenya',
  'surveillance system Nairobi',
  'property security Kenya',
  'burglary prevention Nairobi',
  'security solution Kenya',
  'monitor home remotely Kenya',
  'watch cameras on phone Kenya',
],

  authors: [{ name: "OmniVeil Security" }],
  creator: "OmniVeil Security",
  publisher: "OmniVeil Security",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "OmniVeil Security",
    title: "CCTV Installation Nairobi | OmniVeil Security",
    description:
      "Professional CCTV installation across Nairobi. Supply, design and installation of security cameras for homes and businesses.",
    locale: "en_KE",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OmniVeil Security - CCTV Installation Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTV Installation Nairobi | OmniVeil Security",
    description:
      "Professional CCTV installation across Nairobi, Kenya. Call +254 780 741 147.",
    images: ["/twitter-image.png"],
  },
  category: "security",
}

export const viewport = {
  themeColor: "#080c17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "OmniVeil Security",
  "image": `${SITE_URL}/opengraph-image.png`,
  "logo": `${SITE_URL}/icon.png`,
  "url": SITE_URL,
  "telephone": "+254780741147",
  "priceRange": "KES 4,200 - KES 55,000",
  "description": "Professional CCTV and WiFi installation for homes and businesses across Nairobi, Kenya.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nairobi",
    "addressRegion": "Nairobi County",
    "addressCountry": "KE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -1.2921,
    "longitude": 36.8219
  },
  "areaServed": [
    "Nairobi", "Westlands", "Karen", "Kilimani",
    "Kasarani", "Parklands", "Lavington", "Langata",
    "South B", "South C", "Eastleigh", "Ruaka",
    "Ruiru", "Thika", "Kiambu", "Ngong",
    "Syokimau", "Kitengela", "Rongai"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+254780741147",
      "contactType": "sales",
      "areaServed": "KE",
      "availableLanguage": ["English", "Swahili"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+254106871484",
      "contactType": "customer support",
      "areaServed": "KE",
      "availableLanguage": ["English", "Swahili"]
    }
  ],
  "sameAs": ["https://wa.me/254780741147"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "CCTV Camera Catalogue",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CCTV Installation Nairobi",
          "description": "Professional indoor and outdoor CCTV camera installation across Nairobi."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WiFi Network Setup Nairobi",
          "description": "High-speed wireless network installation for homes and businesses in Nairobi."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Remote Monitoring Setup",
          "description": "Live CCTV feed access from your phone anywhere in the world."
        }
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}