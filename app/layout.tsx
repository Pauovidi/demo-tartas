import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import {
  BRAND_NAME,
  BRAND_TAGLINE,
  BRAND_URL,
  DEMO_DISCLAIMER,
} from "@/src/data/business"

import "./globals.css"

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
})

const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_URL),
  title: {
    default: `${BRAND_NAME} | Atelier de cheesecakes`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: `${BRAND_TAGLINE} ${DEMO_DISCLAIMER}`,
  applicationName: BRAND_NAME,
  keywords: [
    "demo portfolio",
    "atelier dulce",
    "cheesecake",
    "next.js",
    "chatbot ecommerce",
  ],
  openGraph: {
    title: BRAND_NAME,
    description: `${BRAND_TAGLINE} ${DEMO_DISCLAIMER}`,
    url: BRAND_URL,
    siteName: BRAND_NAME,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/brand/logo.svg",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: `${BRAND_TAGLINE} ${DEMO_DISCLAIMER}`,
    images: ["/brand/logo.svg"],
  },
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/favicon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#BB6C4A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${sansFont.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
