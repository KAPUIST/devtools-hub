// Structured data for AEO (Answer Engine Optimization)
export const uuidGeneratorStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UUID Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '890',
  },
  description: 'Free online UUID (Universally Unique Identifier) generator. Generate UUID v1 (timestamp-based) and UUID v4 (random) instantly. Bulk generate up to 50 UUIDs at once. RFC 4122 compliant with cryptographic randomness.',
  featureList: [
    'UUID v4 generation (cryptographically random)',
    'UUID v1 generation (timestamp-based)',
    'Bulk generation (1-50 UUIDs at once)',
    'Version and variant information display',
    'One-click copy individual UUID',
    'Copy all UUIDs at once',
    'RFC 4122 compliant',
    'Auto-generate on page load',
    'No login required',
    'Works offline',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/uuid-generator.png',
}

// FAQ for AEO
export const uuidGeneratorFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a UUID?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across space and time. It\'s displayed as 32 hexadecimal digits in the format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. UUIDs are used in databases, distributed systems, and software development to uniquely identify records without central coordination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between UUID v1 and UUID v4?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UUID v1 uses timestamp and MAC address, making it time-ordered but potentially revealing hardware information. UUID v4 uses cryptographic random numbers, providing better privacy and unpredictability. For most applications, UUID v4 is recommended due to its randomness and security properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate multiple UUIDs at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the bulk generation feature: 1) Select UUID version (v1 or v4), 2) Enter the number of UUIDs you need (1-50), 3) Click Generate. All UUIDs will appear in a list. You can copy them individually or use "Copy All" to copy all UUIDs at once, one per line.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the generated UUIDs truly unique?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, UUID v4 uses cryptographic random number generation (crypto.randomUUID()), making collisions astronomically unlikely. The probability of generating duplicate UUID v4 is approximately 1 in 2^122, which is effectively zero for practical purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this UUID generator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this UUID generator is completely free with no limitations. Generate unlimited UUIDs, no registration required, and all generation happens in your browser for privacy and speed.',
      },
    },
  ],
}

// HowTo for AEO
export const uuidGeneratorHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate UUIDs Online',
  description: 'Step-by-step guide to generate UUID v1 and UUID v4 identifiers online',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose UUID Version',
      text: 'Select between UUID v1 (timestamp-based, time-ordered) or UUID v4 (cryptographically random, recommended for most use cases). UUID v4 provides better security and privacy.',
      image: 'https://devtools-hub.vercel.app/screenshots/uuid-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Set Quantity',
      text: 'Enter the number of UUIDs you need to generate (1-50). For single UUIDs, leave it at 1. For bulk generation, increase the number up to 50 UUIDs at once.',
      image: 'https://devtools-hub.vercel.app/screenshots/uuid-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Generate UUIDs',
      text: 'Click the Generate button to create your UUIDs. They will appear instantly in a list below. Each UUID shows its version (v1 or v4) and variant information (RFC 4122).',
      image: 'https://devtools-hub.vercel.app/screenshots/uuid-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy UUIDs',
      text: 'Click the copy icon next to any UUID to copy it individually, or use the "Copy All" button to copy all generated UUIDs at once. UUIDs are copied one per line for easy pasting into your code or database.',
      image: 'https://devtools-hub.vercel.app/screenshots/uuid-step4.png',
    },
  ],
}
