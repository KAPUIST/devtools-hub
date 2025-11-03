import { Metadata } from 'next'
import { uuidGeneratorStructuredData, uuidGeneratorFAQ, uuidGeneratorHowTo } from './metadata'

export const metadata: Metadata = {
  title: 'UUID Generator - Generate UUID v1/v4 Online',
  description: 'Free online UUID generator. Generate UUID v1 (timestamp-based) or UUID v4 (random) instantly. Supports bulk generation up to 50 UUIDs. No login required.',
  keywords: [
    'uuid generator',
    'uuid v4 generator',
    'uuid v1 generator',
    'generate uuid online',
    'random uuid',
    'bulk uuid generator',
    'guid generator',
    'unique id generator',
  ],
  openGraph: {
    title: 'UUID Generator - Generate UUID v1/v4 Online',
    description: 'Free online UUID generator. Generate UUID v1 or v4 instantly with bulk generation support.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'UUID Generator - Generate UUID v1/v4 Online',
    description: 'Free online UUID generator with bulk generation support.',
  },
}

export default function UuidGeneratorLayout({
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
          __html: JSON.stringify(uuidGeneratorStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(uuidGeneratorFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(uuidGeneratorHowTo),
        }}
      />
      {children}
    </>
  )
}
