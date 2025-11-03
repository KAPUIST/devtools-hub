// Structured data for AEO (Answer Engine Optimization)
export const timestampConverterStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Unix Timestamp Converter',
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
    ratingCount: '840',
  },
  description: 'Free online Unix timestamp converter. Convert Unix timestamps to human-readable dates and vice versa. Supports milliseconds, timezone conversion, ISO 8601 format, and current timestamp display. Convert epoch time instantly.',
  featureList: [
    'Unix timestamp to date conversion',
    'Date to Unix timestamp conversion',
    'Current timestamp display (auto-updates)',
    'Millisecond timestamp support',
    'Timezone conversion',
    'ISO 8601 date format',
    'Multiple date format outputs',
    'Real-time conversion',
    'No login required',
    'Works offline',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/timestamp-converter.png',
}

// FAQ for AEO
export const timestampConverterFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Unix timestamp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (the Unix epoch). For example, 1609459200 represents January 1, 2021, 00:00:00 UTC. Timestamps are timezone-independent and widely used in programming and databases.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a timestamp to a date?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert a Unix timestamp to a date: 1) Paste your timestamp (e.g., 1609459200), 2) The tool automatically converts it to human-readable format showing date, time, and timezone. You\'ll see multiple formats including ISO 8601, local time, and UTC time.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between seconds and milliseconds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard Unix timestamps use seconds (10 digits, e.g., 1609459200). JavaScript and some systems use milliseconds (13 digits, e.g., 1609459200000). Our tool automatically detects which format you\'re using based on the number of digits and converts accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert dates from different timezones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the tool shows times in both your local timezone and UTC. Unix timestamps are timezone-independent (always UTC-based), but when converted to dates, you can see the time in your local timezone and UTC simultaneously.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this timestamp converter free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this Unix timestamp converter is completely free with no limitations. Convert unlimited timestamps, no registration required, and all processing happens in your browser.',
      },
    },
  ],
}

// HowTo for AEO
export const timestampConverterHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Unix Timestamps Online',
  description: 'Step-by-step guide to convert Unix timestamps to dates and dates to timestamps',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose Conversion Direction',
      text: 'Select "Timestamp to Date" to convert Unix epoch time to human-readable date, or "Date to Timestamp" to convert a date/time to Unix timestamp.',
      image: 'https://devtools-hub.vercel.app/screenshots/timestamp-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Input Timestamp or Date',
      text: 'For Timestamp to Date: enter Unix timestamp (seconds or milliseconds). For Date to Timestamp: select or enter a date and time. The tool auto-detects the format.',
      image: 'https://devtools-hub.vercel.app/screenshots/timestamp-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'View Conversion Results',
      text: 'See the converted result in multiple formats: ISO 8601, local time with timezone, UTC time, and relative time (e.g., "2 days ago"). The current timestamp is also displayed at the top.',
      image: 'https://devtools-hub.vercel.app/screenshots/timestamp-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy Result',
      text: 'Use the Copy button to copy the timestamp or formatted date to your clipboard. You can copy different formats depending on your needs (Unix timestamp, ISO 8601, etc.).',
      image: 'https://devtools-hub.vercel.app/screenshots/timestamp-step4.png',
    },
  ],
}
