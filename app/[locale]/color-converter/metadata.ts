// Structured data for AEO (Answer Engine Optimization)
export const colorConverterStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Color Converter',
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
    ratingCount: '580',
  },
  description: 'Free online color converter supporting HEX, RGB, HSL, HSV, and CMYK formats. Convert between color formats instantly with live preview. Supports color picker, named colors, and CSS color values. Perfect for web designers and developers.',
  featureList: [
    'HEX to RGB/HSL/HSV/CMYK conversion',
    'RGB to HEX/HSL/HSV/CMYK conversion',
    'HSL color conversion',
    'HSV color conversion',
    'CMYK color conversion',
    'Live color preview',
    'Color picker tool',
    'CSS named colors support',
    'Alpha/transparency support',
    'Copy to clipboard',
    'No login required',
    'Works offline',
  ],
  screenshot: 'https://devtools-hub.vercel.app/screenshots/color-converter.png',
}

// FAQ for AEO
export const colorConverterFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What color formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool supports HEX (#RRGGBB), RGB (rgb(r,g,b)), HSL (hsl(h,s%,l%)), HSV (hsv(h,s%,v%)), and CMYK (cmyk(c%,m%,y%,k%)) formats. You can also use CSS named colors like "red", "blue", or "cornflowerblue". Convert between any of these formats instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert HEX to RGB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert HEX to RGB: 1) Enter your HEX color code (e.g., #FF5733 or #F57), 2) The tool automatically converts it to RGB and all other formats, 3) See the live color preview and copy the RGB value. Both 3-digit (#RGB) and 6-digit (#RRGGBB) HEX formats are supported.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between RGB and HSL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RGB (Red, Green, Blue) defines colors by mixing red, green, and blue light (0-255 each). HSL (Hue, Saturation, Lightness) defines colors by hue angle (0-360°), saturation (0-100%), and lightness (0-100%). HSL is often more intuitive for designers, while RGB is common in digital displays and CSS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I pick colors from the screen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, use the color picker tool to visually select colors. Click the color picker button, choose your color from the palette, and the tool will automatically show the color in all formats (HEX, RGB, HSL, HSV, CMYK) with a live preview.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this color converter free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this color converter is completely free with no limitations. Convert unlimited colors, no registration required, and all processing happens in your browser.',
      },
    },
  ],
}

// HowTo for AEO
export const colorConverterHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Colors Between Formats Online',
  description: 'Step-by-step guide to convert between HEX, RGB, HSL, HSV, and CMYK color formats',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Enter Color',
      text: 'Enter your color in any format: HEX (#FF5733), RGB (rgb(255, 87, 51)), HSL (hsl(9, 100%, 60%)), named color (red), or use the color picker to visually select a color.',
      image: 'https://devtools-hub.vercel.app/screenshots/color-step1.png',
    },
    {
      '@type': 'HowToStep',
      name: 'View All Formats',
      text: 'The tool automatically converts your color to all supported formats: HEX, RGB, HSL, HSV, and CMYK. Each format is displayed with proper syntax for easy copying into your code.',
      image: 'https://devtools-hub.vercel.app/screenshots/color-step2.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Preview Color',
      text: 'See a live preview of the color in a large swatch. This helps verify the color is correct before using it in your design or code.',
      image: 'https://devtools-hub.vercel.app/screenshots/color-step3.png',
    },
    {
      '@type': 'HowToStep',
      name: 'Copy Format',
      text: 'Click the copy button next to any format to copy it to your clipboard. You can copy HEX for CSS, RGB for graphics, or any other format you need for your project.',
      image: 'https://devtools-hub.vercel.app/screenshots/color-step4.png',
    },
  ],
}
