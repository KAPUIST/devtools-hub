import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hash Generator - Generate SHA-1, SHA-256, SHA-512 Hash Online',
  description: 'Free online hash generator. Generate cryptographic hashes (SHA-1, SHA-256, SHA-384, SHA-512) for text and files. Verify file integrity instantly. No login required.',
  keywords: [
    'hash generator',
    'sha256 generator',
    'sha1 generator',
    'sha512 generator',
    'generate hash online',
    'file hash calculator',
    'checksum calculator',
    'cryptographic hash',
  ],
  openGraph: {
    title: 'Hash Generator - Generate SHA-1, SHA-256, SHA-512 Hash Online',
    description: 'Free online hash generator. Generate cryptographic hashes for text and files instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hash Generator - Generate SHA-1, SHA-256, SHA-512 Hash Online',
    description: 'Free online hash generator with file support.',
  },
}

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
