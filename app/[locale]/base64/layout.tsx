import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online',
  description: 'Free online Base64 encoder and decoder. Encode text, images, and files to Base64 or decode Base64 strings. Supports drag-and-drop file upload. No login required.',
  keywords: [
    'base64 encode',
    'base64 decode',
    'base64 encoder',
    'base64 decoder',
    'encode base64 online',
    'decode base64 online',
    'base64 converter',
    'base64 image encoder',
  ],
  openGraph: {
    title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online',
    description: 'Free online Base64 encoder and decoder. Encode text, images, and files to Base64 or decode Base64 strings.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Base64 Encoder/Decoder - Encode & Decode Base64 Online',
    description: 'Free online Base64 encoder and decoder. Encode text, images, and files to Base64.',
  },
}

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
