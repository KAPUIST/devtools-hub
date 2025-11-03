import { Metadata } from 'next'
import { urlEncoderStructuredData, urlEncoderFAQ, urlEncoderHowTo } from './metadata'

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder - Encode & Decode URLs Online',
  description: 'Free online URL encoder and decoder. Encode or decode URLs and query parameters instantly. Supports encodeURI and encodeURIComponent. No login required.',
  keywords: [
    'url encoder',
    'url decoder',
    'encode url online',
    'decode url online',
    'url encode',
    'url decode',
    'query string encoder',
    'percent encoding',
  ],
  openGraph: {
    title: 'URL Encoder/Decoder - Encode & Decode URLs Online',
    description: 'Free online URL encoder and decoder. Encode or decode URLs and query parameters instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'URL Encoder/Decoder - Encode & Decode URLs Online',
    description: 'Free online URL encoder and decoder with query string parser.',
  },
}

export default function UrlEncoderLayout({
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
          __html: JSON.stringify(urlEncoderStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(urlEncoderFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(urlEncoderHowTo),
        }}
      />
      {children}
    </>
  )
}
