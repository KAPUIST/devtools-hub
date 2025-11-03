import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RegExp Tester - Test Regular Expressions Online',
  description: 'Free online regular expression tester with real-time matching and group capturing. 15 preset patterns for common use cases. Test regex patterns instantly with syntax highlighting.',
  keywords: [
    'regex tester',
    'regexp tester',
    'regular expression tester',
    'regex online',
    'regex validator',
    'regex pattern tester',
    'regex match tester',
    'test regex online',
  ],
  openGraph: {
    title: 'RegExp Tester - Test Regular Expressions Online',
    description: 'Free online regular expression tester with real-time matching and group capturing. 15 preset patterns for common use cases.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'RegExp Tester - Test Regular Expressions Online',
    description: 'Free online regular expression tester with real-time matching and group capturing.',
  },
}

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
