import { Metadata } from 'next'
import { regexTesterStructuredData, regexTesterFAQ, regexTesterHowTo } from './metadata'

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
  return (
    <>
      {/* Structured Data for AEO (Answer Engine Optimization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(regexTesterStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(regexTesterFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(regexTesterHowTo),
        }}
      />
      {children}
    </>
  )
}
