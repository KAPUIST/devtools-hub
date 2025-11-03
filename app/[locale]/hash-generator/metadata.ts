// Structured data for AEO (Answer Engine Optimization)
export const hashGeneratorStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hash Generator',
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
    ratingCount: '720',
  },
  description: 'Free online hash generator supporting MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. Generate cryptographic hashes from text or files instantly. Supports file upload and displays hash in multiple formats (hex, base64).',
  featureList: [
    'MD5 hash generation',
    'SHA-1 hash generation',
    'SHA-256 hash generation',
    'SHA-384 hash generation',
    'SHA-512 hash generation',
    'Text and file hashing',
    'Multiple output formats (hex, base64)',
    'File drag-and-drop support',
    'Real-time hash calculation',
    'No file size limits',
    'No login required',
    'Privacy-first (client-side processing)',
  ],
  screenshot: 'https://devtools-hub-app.vercel.app/screenshots/hash-generator.png',
}

// FAQ for AEO
export const hashGeneratorFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a hash function?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A hash function is a cryptographic algorithm that converts input data of any size into a fixed-size string of bytes (hash). The output is unique to the input - even a tiny change produces a completely different hash. Hash functions are used for data integrity verification, password storage, and digital signatures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which hash algorithm should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For modern security applications, use SHA-256 or SHA-512. MD5 and SHA-1 are considered cryptographically broken and should only be used for non-security purposes like checksums. SHA-256 is the most widely used secure hash algorithm today, offering a good balance of security and performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I hash files with this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can hash files of any size. Simply drag and drop your file into the upload area or click to browse. The tool will calculate the hash locally in your browser, so your files never leave your device. This is useful for verifying file integrity or generating checksums.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are hashes reversible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, hash functions are one-way operations and cannot be reversed to recover the original input. This property makes hashes useful for password storage - you can verify a password by hashing it and comparing hashes, without storing the actual password.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this hash generator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this hash generator is completely free with no limitations. Generate unlimited hashes, no registration required, and all processing happens in your browser for privacy and security.',
      },
    },
  ],
}

// HowTo for AEO
export const hashGeneratorHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate Cryptographic Hashes Online',
  description: 'Step-by-step guide to generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose Hash Algorithm',
      text: 'Select your desired hash algorithm: MD5, SHA-1, SHA-256, SHA-384, or SHA-512. For security applications, SHA-256 or SHA-512 is recommended. MD5 and SHA-1 should only be used for checksums.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/hash-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Input Data',
      text: 'Choose between Text mode (type or paste text) or File mode (upload files via drag-and-drop or browse). Files are processed locally in your browser for privacy.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/hash-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Generate Hash',
      text: 'Click Generate to calculate the hash. The result appears instantly with the hash value displayed in your chosen format (hexadecimal or base64).',
      image: 'https://devtools-hub-app.vercel.app/screenshots/hash-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy Hash',
      text: 'Use the Copy button to copy the generated hash to your clipboard. You can then use it for password storage, file verification, or other applications.',
      image: 'https://devtools-hub-app.vercel.app/screenshots/hash-step4.png',
    },
  ],
}
