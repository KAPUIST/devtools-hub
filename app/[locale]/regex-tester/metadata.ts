// Structured data for AEO (Answer Engine Optimization)
export const regexTesterStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RegExp Tester',
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
    ratingCount: '980',
  },
  description: 'Free online regular expression tester with real-time matching and group capturing. Test regex patterns instantly with syntax highlighting. 15 preset patterns included.',
  featureList: [
    'Real-time regex matching with highlighting',
    '15 preset patterns for common use cases',
    'Capture group display',
    'Flags support (global, case-insensitive, multiline)',
    'No login required',
    'Works offline',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/regex-tester.png',
}

// FAQ for AEO
export const regexTesterFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a regex tester?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A regex tester is a tool that helps you test and validate regular expression patterns against sample text. It shows matches in real-time, displays captured groups, and helps debug complex regex patterns without writing code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test a regular expression online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To test regex online: 1) Enter or select a regex pattern, 2) Type or paste your test text, 3) See matches highlighted in real-time. You can use flags like g (global), i (case-insensitive), and m (multiline) for advanced matching.',
      },
    },
    {
      '@type': 'Question',
      name: 'What regex patterns are commonly used?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common regex patterns include: Email validation, URL matching, Phone numbers, Dates and times, Credit card numbers, IP addresses, Hex colors, and HTML tags. Our tool includes 15 preset patterns for these common use cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this regex tester free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this regex tester is completely free to use. No registration, no login, and no limitations. All processing happens in your browser for privacy and speed.',
      },
    },
  ],
}

// HowTo for AEO
export const regexTesterHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Test Regular Expressions Online',
  description: 'Step-by-step guide to test and validate regex patterns using online tool',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose or Enter Pattern',
      text: 'Select a preset pattern from 15 common patterns (Email, URL, Phone, etc.) or enter your own custom regex pattern.',
      image: 'https://devtools-hub.vercel.app/screenshots/regex-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Add Test Text',
      text: 'Type or paste the text you want to test your regex pattern against.',
      image: 'https://devtools-hub.vercel.app/screenshots/regex-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Set Flags',
      text: 'Choose regex flags: g (global match all), i (case-insensitive), m (multiline matching).',
      image: 'https://devtools-hub.vercel.app/screenshots/regex-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'View Results',
      text: 'See matched text highlighted in yellow, with capture groups displayed separately below.',
      image: 'https://devtools-hub.vercel.app/screenshots/regex-step4.png',
    },
  ],
}
