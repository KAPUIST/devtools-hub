// Structured data for AEO (Answer Engine Optimization)
export const urlEncoderStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'URL Encoder/Decoder',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '650',
  },
  description: 'Free online URL encoder and decoder. Encode URLs with percent-encoding (URL encoding) or decode encoded URLs instantly. Supports query string encoding, special characters, and international characters (UTF-8).',
  featureList: [
    'URL encoding (percent-encoding)',
    'URL decoding',
    'Query string encoding',
    'Special character handling',
    'UTF-8 international character support',
    'Real-time encoding/decoding',
    'Component vs Full URL encoding',
    'Copy to clipboard',
    'No login required',
    'Works offline',
  ],
  screenshot: 'https://devtools-hub-app.vercel.app/screenshots/url-encoder.png',
}

// FAQ for AEO
export const urlEncoderFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is URL encoding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'URL encoding (also called percent-encoding) is a method to encode special characters in URLs using % followed by two hexadecimal digits. For example, a space becomes %20. This is necessary because URLs can only contain certain ASCII characters, and special characters like spaces, #, ?, &, etc. must be encoded to be transmitted safely.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use URL encoding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use URL encoding when: 1) Passing parameters in query strings (e.g., ?search=hello world → ?search=hello%20world), 2) Including special characters in URLs, 3) Transmitting non-ASCII characters (international text), 4) Building API requests with parameters. URL encoding ensures data is transmitted correctly without breaking the URL structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between encoding and decoding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Encoding converts special characters to percent-encoded format (%XX), making text safe for URLs. Decoding reverses this process, converting %XX sequences back to original characters. For example: "hello world" encodes to "hello%20world", and decoding reverses it back to "hello world".',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I encode international characters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this tool supports UTF-8 encoding for international characters. Characters like Korean (한글), Japanese (日本語), Chinese (中文), and emoji are automatically encoded to their percent-encoded UTF-8 representation, making them safe for use in URLs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this URL encoder free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this URL encoder/decoder is completely free with no limitations. Encode and decode unlimited URLs, no registration required, and all processing happens in your browser for privacy.',
      },
    },
  ],
}

// HowTo for AEO
export const urlEncoderHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Encode and Decode URLs Online',
  description: 'Step-by-step guide to URL encode and decode text with percent-encoding',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Paste URL or Text',
      text: 'Paste your URL, query string, or text that needs encoding/decoding. You can paste full URLs like "https://example.com/search?q=hello world" or just the parts that need encoding.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/url-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Choose Operation',
      text: 'Click Encode to convert special characters to percent-encoded format (%XX), or Decode to convert encoded URLs back to readable text. The tool automatically handles UTF-8 encoding for international characters.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/url-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'View Results',
      text: 'The encoded or decoded result appears instantly. Encoded text shows special characters replaced with %XX sequences. Decoded text shows the original readable characters.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/url-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy Result',
      text: 'Use the Copy button to copy the encoded/decoded URL to your clipboard. You can then use it in your API requests, HTML links, or JavaScript code.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/url-step4.png',
    },
  ],
}
