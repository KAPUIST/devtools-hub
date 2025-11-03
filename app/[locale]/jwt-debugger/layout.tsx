import { Metadata } from 'next'
import { jwtDebuggerStructuredData, jwtDebuggerFAQ, jwtDebuggerHowTo } from './metadata'

export const metadata: Metadata = {
  title: 'JWT Debugger - Decode & Verify JSON Web Tokens Online',
  description: 'Free online JWT debugger and decoder. Decode, verify, and validate JSON Web Tokens (JWT) in real-time. Supports HS256, RS256, ES256 algorithms. No login required.',
  keywords: [
    'jwt debugger',
    'jwt decoder',
    'jwt validator',
    'decode jwt online',
    'verify jwt',
    'json web token decoder',
    'jwt parser',
    'jwt verifier',
  ],
  openGraph: {
    title: 'JWT Debugger - Decode & Verify JSON Web Tokens Online',
    description: 'Free online JWT debugger and decoder. Decode, verify, and validate JSON Web Tokens in real-time.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JWT Debugger - Decode & Verify JSON Web Tokens Online',
    description: 'Free online JWT debugger and decoder. Decode and verify JWT tokens instantly.',
  },
}

export default function JwtDebuggerLayout({
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
          __html: JSON.stringify(jwtDebuggerStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jwtDebuggerFAQ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jwtDebuggerHowTo),
        }}
      />
      {children}
    </>
  )
}
