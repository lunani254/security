import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://omniveil.co.ke";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OmniVeil Security | Professional CCTV in Nairobi",
    template: "%s | OmniVeil Security",
  },
  description:
    "OmniVeil Security designs, supplies, and installs professional CCTV and surveillance systems for homes and businesses across Nairobi, Kenya.",
  applicationName: "OmniVeil Security",
  keywords: [
    "OmniVeil",
    "OmniVeil Security",
    "CCTV Nairobi",
    "CCTV installation Kenya",
    "Hikvision Nairobi",
    "Dahua Nairobi",
    "IP cameras Kenya",
    "security systems Nairobi",
    "surveillance Kenya",
  ],
  authors: [{ name: "OmniVeil Security" }],
  creator: "OmniVeil Security",
  publisher: "OmniVeil Security",
  robots: {
    index: true,
    follow: true,
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
    title: "OmniVeil Security | Professional CCTV in Nairobi",
    description:
      "Professional CCTV and surveillance systems for homes and businesses across Nairobi, Kenya. Supply, design, and installation.",
    locale: "en_KE",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OmniVeil Security, Professional CCTV in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniVeil Security | Professional CCTV in Nairobi",
    description:
      "Professional CCTV and surveillance systems for homes and businesses across Nairobi, Kenya.",
    images: ["/twitter-image.png"],
  },
  category: "security",
};

export const viewport = {
  themeColor: "#080c17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
