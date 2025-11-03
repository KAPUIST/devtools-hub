import { Metadata } from 'next'
import { qrGeneratorStructuredData, qrGeneratorFAQ, qrGeneratorHowTo } from './metadata'

export const metadata: Metadata = {
  title: 'QR Code Generator - Create QR Codes Online Free',
  description: 'Free online QR code generator. Create QR codes for URLs, text, WiFi, email, and phone numbers. Adjustable size and error correction. Download as PNG. No login required.',
  keywords: [
    'qr code generator',
    'qr generator',
    'create qr code',
    'qr code maker',
    'generate qr code online',
    'free qr code generator',
    'wifi qr code',
    'qr code creator',
  ],
  openGraph: {
    title: 'QR Code Generator - Create QR Codes Online Free',
    description: 'Free online QR code generator. Create QR codes for URLs, text, WiFi, and more with customizable options.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'QR Code Generator - Create QR Codes Online Free',
    description: 'Free online QR code generator with customizable size and error correction.',
  },
}

export default function QrGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for AEO (Answer Engine Optimization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(qrGeneratorStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(qrGeneratorFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(qrGeneratorHowTo),
        }}
      />
      {children}
    </>
  )
}
