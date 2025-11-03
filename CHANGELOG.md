# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Be Released
- UUID Generator
- Hash Generator (MD5, SHA256)
- Color Converter
- QR Code Generator
- Vercel deployment
- SEO optimization

---

## [0.4.1] - 2025-11-03

### 🔒 JWT Signature Verification Update!

#### Added

**JWT Debugger - Signature Verification**
- JWT signature verification with `jose` library
- Support for 12 algorithms:
  - HS256/384/512 (HMAC with Secret Key)
  - RS256/384/512 (RSA with Public Key)
  - ES256/384/512 (ECDSA with Public Key)
  - PS256/384/512 (RSA-PSS with Public Key)
- PEM format public key support
- Visual verification result (✓ Valid / ✗ Invalid / ⚠ Failed)
- Security warning banner (never use production secrets)
- Full i18n support (4 languages)

**Technical Improvements**
- Added `jose` library for JWT verification
- Created `verifyJWTSignature()` function in `lib/tools/jwt.ts`
- Proper error handling with error codes
- Loading state during verification
- Zero TypeScript errors

---

## [0.4.0] - 2025-11-03

### 🔗 URL Encoder/Decoder Release!

#### Added

**URL Encoder/Decoder**
- Encode/Decode tabs for separated workflow
- Encode URI (full URL encoding - preserves :, /, ?, &)
- Encode URI Component (query parameter encoding - encodes all special chars)
- Decode URI (full URL decoding)
- Decode URI Component (query parameter decoding)
- Query String Parser with table display
- Individual parameter copy functionality
- Auto-loaded example data
- Full i18n support (4 languages)

**Technical Improvements**
- Created `lib/tools/url.ts` with URL encoding/decoding logic
- Implemented proper error handling with error codes
- Added `components/ui/table.tsx` and `components/ui/tabs.tsx`
- Comprehensive translations for all features
- Zero TypeScript errors
- Perfect i18n compliance (no hardcoded strings)

---

## [0.3.0] - 2025-11-03

### ⏱️ Unix Timestamp Converter Release!

#### Added

**Unix Timestamp Converter**
- Real-time current timestamp display (updates every second)
- Timestamp → Date conversion with auto-detection (seconds/milliseconds)
- Date → Timestamp conversion with datetime-local input
- Timezone conversion (UTC, KST, JST, CST, EST, PST)
- Relative time display ("3 hours from now", "2 days ago")
- ISO 8601 standard format support
- Copy functionality for all results
- Auto-loaded example data
- Full i18n support (4 languages)

**Technical Improvements**
- Created `lib/tools/timestamp.ts` with timestamp conversion logic
- Implemented proper i18n architecture (error codes instead of hardcoded messages)
- Added `RelativeTimeResult` type for type-safe relative time formatting
- Comprehensive translations for all features
- Zero TypeScript errors
- Code review passed with all critical issues resolved

---

## [0.2.0] - 2025-11-03

### 🚀 Base64 & JWT Debugger Release!

#### Added

**Base64 Encoder/Decoder**
- Text encoding/decoding (UTF-8 support)
- File upload with drag & drop
- Image preview for image files
- One-click Base64 copy
- File download from Base64
- Auto-loaded example data
- Full i18n support (4 languages)

**JWT Debugger**
- JWT token decoding (Header, Payload, Signature)
- Algorithm display (HS256, RS256, etc.)
- Expiration time validation
- Time remaining display ("2 days until expiration")
- Standard Claims extraction (iss, sub, aud, exp, iat, nbf, jti)
- Custom Claims display
- Status badges (Valid, Expired, Not Yet Valid)
- Auto-loaded example JWT token
- Full i18n support (4 languages)

**Technical Improvements**
- Created `lib/tools/base64.ts` with Base64 encoding/decoding logic
- Created `lib/tools/jwt.ts` with JWT decoding and validation logic
- Added comprehensive translations for all new features
- Zero TypeScript errors

---

## [0.1.0] - 2025-11-03

### 🎉 Initial Release - Week 1 MVP Complete!

#### Added

**Core Infrastructure**
- Next.js 16 project with App Router
- TypeScript configuration
- Tailwind CSS v3 + shadcn/ui components
- Dark mode support (next-themes)
- Internationalization (next-intl) - 4 languages: English, Korean, Japanese, Chinese
- Responsive layout (Header + Sidebar)
- Command Palette (Cmd+K) for quick tool search

**JSON Formatter**
- Pretty print with customizable indentation (2/4/8 spaces)
- Minify JSON
- Validation with error messages
- Real-time formatting
- Full i18n support across 4 languages
- Copy to clipboard
- Example JSON pre-loaded

**RegExp Tester (Beginner-Friendly!)**
- 🌟 **3-step workflow**: Select pattern → Enter text → See results
- 🌟 **15 common pattern presets**:
  - Email, URL, Phone (US/KR), IPv4
  - Date (YYYY-MM-DD, MM/DD/YYYY), Time (HH:MM)
  - Hex Color, HTML Tag, Credit Card
  - Username (@mention), Hashtag
  - Number (Integer, Decimal)
- Real-time match highlighting (yellow background)
- **Pattern transparency** - Show current regex being used
- **Korean flag descriptions** - "전체 검색", "대소문자 무시", etc.
- **Collapsible advanced settings** - Regex experts only
- 100% usable without knowing regex!

**UX Improvements**
- Tool names in English (only categories translated)
- Improved header layout (search bar left-aligned)
- Full i18n coverage for JSON Formatter
- Full i18n coverage for RegExp Tester
- Zero TypeScript errors

#### Technical Details
- Framework: Next.js 16
- Language: TypeScript 5
- Styling: Tailwind CSS v3
- UI Components: shadcn/ui (Button, Card, Input, Textarea, Checkbox, Dialog, Command, Dropdown)
- i18n: next-intl
- Theme: next-themes
- Icons: lucide-react

---

## Version History

- **0.1.0** (2025-11-03) - Initial release with JSON Formatter and RegExp Tester
- More versions coming soon...

---

Made with ❤️ by DevTools Hub Team
