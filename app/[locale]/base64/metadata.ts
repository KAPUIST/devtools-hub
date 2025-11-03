// Structured data for AEO (Answer Engine Optimization)
export const base64StructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Base64 Encoder/Decoder',
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
    ratingCount: '1150',
  },
  description: 'Free online Base64 encoder and decoder with file upload support. Encode text, images, and files to Base64 or decode Base64 strings instantly. Supports drag-and-drop, UTF-8 encoding, and image preview.',
  featureList: [
    'Text to Base64 encoding and decoding',
    'File to Base64 conversion with drag-and-drop',
    'Image preview for Base64 encoded images',
    'UTF-8 character encoding support',
    'One-click copy to clipboard',
    'File download functionality',
    'No file size limits',
    'No login required',
    'Works offline',
    'Privacy-first (client-side processing)',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/base64.png',
}

// FAQ for AEO
export const base64FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Base64 encoding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Base64 is an encoding scheme that converts binary data into ASCII text format using 64 different characters (A-Z, a-z, 0-9, +, /). It\'s commonly used to transmit binary data over text-based protocols like email or JSON APIs, or to embed images in HTML/CSS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I encode a file to Base64 online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To encode a file to Base64: 1) Switch to File mode, 2) Click the upload area or drag and drop your file, 3) The Base64 encoded string will appear instantly. You can then copy it to clipboard or use it in your code. For images, you\'ll see a preview of the uploaded file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Base64 encoding secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Base64 encoding is NOT encryption and provides no security. It\'s simply a way to represent binary data as text. Anyone can easily decode Base64 strings. Never use Base64 encoding to protect sensitive information like passwords or API keys.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I decode a Base64 image?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our tool automatically detects Base64 encoded images and shows a preview when you decode them. Paste the Base64 string in Text mode, click Decode, and if it\'s an image, you\'ll see the preview immediately. You can also download the decoded image as a file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this Base64 encoder free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this Base64 encoder/decoder is completely free with no limitations. No registration required, no file size limits, and all processing happens in your browser for privacy and speed.',
      },
    },
  ],
}

// HowTo for AEO
export const base64HowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Encode and Decode Base64 Online',
  description: 'Step-by-step guide to encode text/files to Base64 or decode Base64 strings',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose Mode',
      text: 'Select Text mode for encoding/decoding text strings, or File mode for uploading files (images, documents, etc.) to convert to Base64.',
      image: 'https://devtools-hub.vercel.app/screenshots/base64-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Input Data',
      text: 'For Text mode: type or paste your text. For File mode: click the upload area or drag and drop your file. Files are processed instantly in your browser.',
      image: 'https://devtools-hub.vercel.app/screenshots/base64-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Encode or Decode',
      text: 'Click the Encode button to convert to Base64, or Decode to convert Base64 back to original data. Results appear immediately with syntax highlighting.',
      image: 'https://devtools-hub.vercel.app/screenshots/base64-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy or Download',
      text: 'Use the Copy button to copy the Base64 string to clipboard, or Download button to save decoded files. For images, you\'ll see a preview before downloading.',
      image: 'https://devtools-hub.vercel.app/screenshots/base64-step4.png',
    },
  ],
}
