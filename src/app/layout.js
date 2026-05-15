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
    default: "CCTV Installation Nairobi | OmniVeil Security",
    template: "%s | OmniVeil Security Nairobi",
  },
  description:
    "Professional CCTV installation in Nairobi. OmniVeil Security supplies and installs Hikvision, Dahua and Tiandy cameras for homes and businesses across Nairobi, Kenya. Call +254 780 741 147.",
  applicationName: "OmniVeil Security",
  keywords: [
    "CCTV installation Nairobi",
    "CCTV cameras Nairobi",
    "security cameras Nairobi",
    "CCTV installer Nairobi",
    "CCTV installation Kenya",
    "Hikvision installer Nairobi",
    "Dahua installer Nairobi",
    "Tiandy cameras Kenya",
    "IP cameras Nairobi",
    "WiFi installation Nairobi",
    "security system Nairobi",
    "CCTV Westlands",
    "CCTV Karen Nairobi",
    "CCTV Kilimani",
    "CCTV Kasarani",
    "CCTV Parklands",
    "CCTV Lavington",
    "CCTV Langata",
    "surveillance system Nairobi",
    "OmniVeil Security",
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