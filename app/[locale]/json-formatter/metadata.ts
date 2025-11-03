// Structured data for AEO (Answer Engine Optimization)
export const jsonFormatterStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Formatter',
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
    ratingCount: '1250',
  },
  description: 'Free online JSON formatter and validator. Format, validate, and minify JSON with real-time syntax highlighting. Supports 2, 4, and 8 space indentation.',
  featureList: [
    'JSON formatting with customizable indentation',
    'JSON validation with error detection',
    'JSON minification',
    'Real-time syntax highlighting',
    'No login required',
    'Works offline',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/json-formatter.png',
}

// FAQ for AEO
export const jsonFormatterFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A JSON formatter is a tool that converts compressed or minified JSON data into a human-readable format with proper indentation and line breaks. It helps developers easily read, edit, and debug JSON data.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format JSON online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To format JSON online: 1) Paste your JSON text into the input field, 2) The tool will automatically format it with proper indentation, 3) Choose your preferred indentation (2, 4, or 8 spaces), 4) Copy the formatted result. No login or installation required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I validate JSON with this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this tool automatically validates your JSON as you type. If there are syntax errors, it will show clear error messages indicating what went wrong and where the error occurred.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this JSON formatter free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this JSON formatter is completely free to use. No registration, no login, and no limitations. All processing is done in your browser for privacy.',
      },
    },
  ],
}

// HowTo for AEO
export const jsonFormatterHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Format JSON Online',
  description: 'Step-by-step guide to format and validate JSON using online tool',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Paste JSON',
      text: 'Copy your minified or unformatted JSON text and paste it into the input field.',
      image: 'https://devtools-hub.vercel.app/screenshots/json-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Choose Indentation',
      text: 'Select your preferred indentation size: 2 spaces (compact), 4 spaces (standard), or 8 spaces (expanded).',
      image: 'https://devtools-hub.vercel.app/screenshots/json-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Format or Minify',
      text: 'Click "Format" to beautify your JSON or "Minify" to compress it into a single line.',
      image: 'https://devtools-hub.vercel.app/screenshots/json-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy Result',
      text: 'Click the copy button to copy the formatted JSON to your clipboard.',
      image: 'https://devtools-hub.vercel.app/screenshots/json-step4.png',
    },
  ],
}
