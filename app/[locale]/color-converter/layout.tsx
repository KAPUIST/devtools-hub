import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Converter - Convert HEX, RGB, HSL Colors Online',
  description: 'Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly. Color picker included. Perfect for web designers and developers. No login required.',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hsl to rgb',
    'color format converter',
    'hex color converter',
    'rgb color converter',
    'color picker',
  ],
  openGraph: {
    title: 'Color Converter - Convert HEX, RGB, HSL Colors Online',
    description: 'Free online color converter. Convert between HEX, RGB, and HSL formats with color picker.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Color Converter - Convert HEX, RGB, HSL Colors Online',
    description: 'Free online color converter with color picker support.',
  },
}

export default function ColorConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
