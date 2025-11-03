import { Metadata } from 'next'

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
  return children
}
