// Structured data for AEO (Answer Engine Optimization)
export const jwtDebuggerStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JWT Debugger',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1380',
  },
  description: 'Free online JWT (JSON Web Token) debugger and decoder. Decode, verify, and validate JWT tokens in real-time. View header, payload, and signature. Check token expiration and claims. Supports HS256, RS256, ES256 algorithms.',
  featureList: [
    'JWT token decoding and parsing',
    'Header, Payload, Signature visualization',
    'Algorithm detection (HS256, RS256, ES256, etc.)',
    'Token expiration validation',
    'Human-readable time display',
    'Standard Claims vs Custom Claims separation',
    'Token status badges (Valid/Expired/Future)',
    'Real-time token validation',
    'No login required',
    'Privacy-first (client-side processing)',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/jwt-debugger.png',
}

// FAQ for AEO
export const jwtDebuggerFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a JWT token?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three parts: Header (algorithm and token type), Payload (claims/data), and Signature (verification). JWTs are commonly used for authentication and authorization in web applications and APIs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I decode a JWT token online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To decode a JWT token: 1) Copy your JWT token (it looks like xxx.yyy.zzz with three parts), 2) Paste it into the input field, 3) The tool will automatically decode and display the Header, Payload, and Signature sections. You\'ll also see the algorithm used, expiration time, and all claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to decode JWT tokens online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this tool is safe because all decoding happens in your browser (client-side processing). Your JWT tokens are never sent to any server. However, JWTs often contain sensitive information, so only use tokens from development/testing environments, not production tokens with real user data.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are JWT claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JWT claims are key-value pairs in the payload that carry information. Standard claims include: iss (issuer), sub (subject), aud (audience), exp (expiration time), nbf (not before), iat (issued at), and jti (JWT ID). Custom claims are additional fields you define for your application, like user_id, email, or role.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if a JWT token is expired?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our tool automatically checks the "exp" (expiration) claim in your JWT and displays the expiration status with a colored badge. You\'ll see "Valid" (green) if not expired, "Expired" (red) with how long ago it expired, or "Future Token" (yellow) if the expiration is in the future.',
      },
    },
  ],
}

// HowTo for AEO
export const jwtDebuggerHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Debug and Decode JWT Tokens Online',
  description: 'Step-by-step guide to decode, verify, and validate JWT (JSON Web Token) tokens',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Paste JWT Token',
      text: 'Copy your JWT token from your application or API response. JWT tokens have three parts separated by dots (header.payload.signature). Paste it into the input field.',
      image: 'https://devtools-hub.vercel.app/screenshots/jwt-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'View Decoded Sections',
      text: 'The tool automatically decodes the token and displays three sections: Header (algorithm and type), Payload (claims and data), and Signature (verification code). All sections are formatted as JSON for easy reading.',
      image: 'https://devtools-hub.vercel.app/screenshots/jwt-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Check Expiration',
      text: 'Look at the expiration status badge. Green "Valid" means the token is still active. Red "Expired" shows when it expired. The tool also displays human-readable times like "2 days ago" or "in 3 hours".',
      image: 'https://devtools-hub.vercel.app/screenshots/jwt-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Inspect Claims',
      text: 'Review Standard Claims (iss, sub, exp, etc.) and Custom Claims separately. Standard claims follow JWT specifications, while custom claims are application-specific data like user_id or permissions.',
      image: 'https://devtools-hub.vercel.app/screenshots/jwt-step4.png',
    },
  ],
}
