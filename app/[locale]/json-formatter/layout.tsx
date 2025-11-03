import { Metadata } from 'next'
import { jsonFormatterStructuredData, jsonFormatterFAQ, jsonFormatterHowTo } from './metadata'

export const metadata: Metadata = {
  title: 'JSON Formatter - Format, Validate & Minify JSON Online',
  description: 'Free online JSON formatter and validator. Format, validate, and minify JSON with real-time syntax highlighting. Supports 2, 4, and 8 space indentation. No login required.',
  keywords: [
    'json formatter',
    'json validator',
    'json beautifier',
    'json minifier',
    'format json online',
    'validate json',
    'json pretty print',
    'json lint',
  ],
  openGraph: {
    title: 'JSON Formatter - Format, Validate & Minify JSON Online',
    description: 'Free online JSON formatter and validator. Format, validate, and minify JSON with real-time syntax highlighting.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JSON Formatter - Format, Validate & Minify JSON Online',
    description: 'Free online JSON formatter and validator. Format, validate, and minify JSON with real-time syntax highlighting.',
  },
}

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonFormatterStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonFormatterFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonFormatterHowTo),
        }}
      />
      {children}
    </>
  )
}
