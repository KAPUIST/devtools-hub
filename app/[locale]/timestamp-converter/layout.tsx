import { Metadata } from 'next'
import { timestampConverterStructuredData, timestampConverterFAQ, timestampConverterHowTo } from './metadata'

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter - Convert Unix Time to Date Online',
  description: 'Free online Unix timestamp converter. Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds. Multiple timezone conversions.',
  keywords: [
    'unix timestamp converter',
    'timestamp to date',
    'unix time converter',
    'epoch converter',
    'unix timestamp to date',
    'timestamp converter online',
    'epoch time converter',
    'unix time to date',
  ],
  openGraph: {
    title: 'Unix Timestamp Converter - Convert Unix Time to Date Online',
    description: 'Free online Unix timestamp converter. Convert timestamps to dates instantly with timezone support.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Unix Timestamp Converter - Convert Unix Time to Date Online',
    description: 'Free online Unix timestamp converter with timezone support.',
  },
}

export default function TimestampConverterLayout({
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
          __html: JSON.stringify(timestampConverterStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(timestampConverterFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(timestampConverterHowTo),
        }}
      />
      {children}
    </>
  )
}
