import { Metadata } from 'next'

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
  return children
}
