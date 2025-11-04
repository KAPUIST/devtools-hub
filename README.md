# DevTools Hub

A collection of developer tools with best-in-class UX/DX. No signup required, instant access.

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black)](https://devtools-hub-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

## Features

### JSON Formatter/Validator
- Pretty print with configurable spacing (2/4/8 spaces)
- Minify JSON
- Real-time validation with error messages
- Internationalization support (en, ko, ja, zh)

### RegExp Tester
- 15 preset patterns (Email, URL, Phone, IPv4, Date, Time, Hex Color, HTML Tag, etc.)
- Real-time match highlighting
- Pattern transparency (shows actual regex being used)
- Beginner-friendly interface with progressive disclosure

### Base64 Encoder/Decoder
- Text mode with UTF-8 support
- File mode with drag-and-drop
- Image preview for image files
- One-click copy

### JWT Debugger
- Automatic header/payload/signature decoding
- Token expiration validation with relative time display
- Standard and custom claims separation
- Algorithm detection (HS256/384/512, RS256/384/512, ES256/384/512)

### Unix Timestamp Converter
- Bidirectional conversion (timestamp to date, date to timestamp)
- Automatic unit detection (seconds/milliseconds)
- Timezone conversion (UTC, KST, JST, CST, EST, PST)
- Relative time display
- ISO 8601 support

### URL Encoder/Decoder
- Encode/Decode URI and URI Component
- Query string parser with table view
- Example data loader

### UUID Generator
- UUID v1 (timestamp-based) and v4 (random) generation
- Bulk generation (1-50 UUIDs)
- Version and variant information display

### Hash Generator
- Multiple algorithms (SHA-1, SHA-256, SHA-384, SHA-512)
- Text and file hashing
- Parallel hash calculation

### Color Converter
- HEX ↔ RGB ↔ HSL conversion
- Real-time preview
- CSS color code generation
- Named color support

### QR Code Generator
- Custom text/URL to QR code
- Adjustable size
- Download as PNG
- Error correction level options

### Core UX Features
- **Command Palette** (Cmd+K) for quick tool access
- **Keyboard Shortcuts Modal** (Cmd+/ or ?) shows all available shortcuts
- **Error Boundary** catches runtime errors with friendly recovery options
- **Loading States** with skeleton screens for better perceived performance
- **Dark mode** with system preference detection
- **Full internationalization** (English, Korean, Japanese, Chinese)
- **Responsive layout** optimized for mobile/tablet/desktop
- **Mobile-friendly** sidebar with hamburger menu

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Icons**: lucide-react
- **Deployment**: Vercel

## Getting Started

```bash
# Clone repository
git clone https://github.com/yourusername/devtools-hub.git
cd devtools-hub

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

Available locales:
- English: http://localhost:3000/en
- Korean: http://localhost:3000/ko
- Japanese: http://localhost:3000/ja
- Chinese: http://localhost:3000/zh

## Project Structure

```
devtools-hub/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── json-formatter/
│       ├── regex-tester/
│       ├── base64/
│       ├── jwt-debugger/
│       ├── timestamp/
│       ├── url-encoder/
│       ├── uuid-generator/
│       ├── hash-generator/
│       ├── color-converter/
│       └── qr-generator/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── KeyboardShortcuts.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ThemeToggle.tsx
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   ├── CommandPalette.tsx
│   ├── ErrorBoundary.tsx
│   └── ui/ (shadcn/ui components)
├── lib/
│   ├── tools/
│   └── utils.ts
├── i18n/
│   └── request.ts
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   └── zh.json
├── public/
│   └── ads.txt
├── middleware.ts
└── next.config.ts
```

## Keyboard Shortcuts

Press `Cmd+/` or `?` to see all shortcuts in-app.

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Open Command Palette (Search Tools) |
| `Cmd+/` or `?` | Show Keyboard Shortcuts Modal |
| `Cmd+Shift+D` | Toggle Dark Mode |
| `Cmd+C` | Copy Result |
| `Cmd+Enter` | Execute/Format |
| `Esc` | Close Modal/Dialog |

## Internationalization

Supported languages:
- English (en)
- Korean (ko)
- Japanese (ja)
- Chinese (zh)

URL structure:
```
/en/              → English home
/ko/              → Korean home
/en/json-formatter → English JSON Formatter
/ko/regex-tester   → Korean RegExp Tester
```

The application automatically redirects based on browser language preference.

## Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Environment Variables

```bash
# .env.local (optional)
NEXT_PUBLIC_SITE_URL=https://devtools-hub-app.vercel.app

# Google AdSense (optional)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-9160245263564460
```

**Note**: Google AdSense verification is configured via `public/ads.txt`.

## License

MIT License

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl.dev/)
