import { Metadata } from 'next'

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
  return children
}
