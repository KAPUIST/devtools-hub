# OG 이미지 생성 가이드

## 🎯 목표
각 도구별 Open Graph 이미지를 만들어 소셜 미디어 공유 최적화

---

## 🖼️ OG 이미지란?

### Open Graph Image
- 링크 공유 시 표시되는 미리보기 이미지
- Facebook, Twitter, LinkedIn, Kakao, Slack 등에서 사용
- 첫인상을 좌우하는 중요한 요소

### 효과:
- ✅ **CTR 2-3배 증가** (이미지 없음 vs 있음)
- ✅ **전문적인 브랜드 이미지**
- ✅ **ProductHunt 필수 요소**
- ✅ **소셜 미디어 바이럴 가능성 증가**

---

## 📐 디자인 규격

### 필수 사양:
```
크기: 1200 x 630 픽셀 (필수)
비율: 1.91:1
포맷: PNG 또는 JPG
용량: 1MB 이하 (권장)
```

### 안전 영역 (Safe Zone):
```
상하좌우 40px 여백 확보
중요한 텍스트는 중앙 800x400px 영역에 배치
```

---

## 🎨 디자인 템플릿

### 기본 레이아웃

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  DevTools Hub                     [ICON/LOGO]  │ ← Header (브랜드)
│                                                 │
│                                                 │
│          📊 JSON Formatter                      │ ← 도구 아이콘 + 이름
│                                                 │
│     Format, Validate & Minify                  │ ← 한 줄 설명
│        JSON Online for Free                    │
│                                                 │
│  ✓ Real-time  ✓ No Login  ✓ Privacy First    │ ← 주요 기능 (3-4개)
│                                                 │
│                devtools-hub-app.vercel.app      │ ← Footer (URL)
└─────────────────────────────────────────────────┘
```

### 색상 팔레트 (다크/라이트 모드)

#### 라이트 모드 (권장):
```css
배경: #FFFFFF
주 텍스트: #1A1A1A
부 텍스트: #6B7280
강조색: #3B82F6 (파란색)
아이콘: #8B5CF6 (보라색)
```

#### 다크 모드:
```css
배경: #0F172A
주 텍스트: #F1F5F9
부 텍스트: #94A3B8
강조색: #60A5FA
아이콘: #A78BFA
```

---

## 🛠️ 생성 도구

### 1. Canva (무료, 가장 쉬움) ⭐ 추천

**장점**:
- 드래그 앤 드롭 방식
- 템플릿 풍부
- 무료 버전으로 충분

**사용 방법**:
1. https://www.canva.com 접속
2. "Custom size" → 1200 x 630 px
3. 템플릿 검색: "Open Graph" 또는 "Social Media"
4. 텍스트 및 색상 커스터마이징
5. PNG로 다운로드

### 2. Figma (무료, 디자이너용)

**장점**:
- 완전한 디자인 자유도
- 컴포넌트 재사용 가능
- 협업 가능

**사용 방법**:
1. https://www.figma.com 접속
2. New file → Frame (1200 x 630)
3. 디자인 작업
4. Export → PNG

### 3. OG Image Generator (무료, 코드 기반)

**Vercel OG Image Playground**:
```
https://og-playground.vercel.app
```

**장점**:
- 코드로 자동 생성
- 다이나믹 이미지 가능
- 배포 후 자동 생성

**사용 방법**:
```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'DevTools Hub'

  return new ImageResponse(
    (
      <div style={{ /* 스타일 */ }}>
        <h1>{title}</h1>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

---

## 📋 도구별 OG 이미지 컨텐츠

### 1. JSON Formatter
```
아이콘: 📄 또는 { }
제목: JSON Formatter
설명: Format, Validate & Minify JSON Online
기능:
  ✓ Real-time formatting
  ✓ Syntax validation
  ✓ 4 languages support
```

### 2. RegExp Tester
```
아이콘: 🔍 또는 .*
제목: RegExp Tester
설명: Test Regular Expressions Online
기능:
  ✓ 15 preset patterns
  ✓ Real-time matching
  ✓ Group capturing
```

### 3. Base64 Encoder
```
아이콘: 🔐 또는 <>
제목: Base64 Encoder/Decoder
설명: Encode & Decode Base64 Online
기능:
  ✓ Text & file support
  ✓ Image preview
  ✓ Drag & drop
```

### 4. JWT Debugger
```
아이콘: 🔑 또는 JWT
제목: JWT Debugger
설명: Decode & Verify JSON Web Tokens
기능:
  ✓ Token validation
  ✓ Expiry check
  ✓ Claims display
```

### 5. UUID Generator
```
아이콘: 🆔 또는 #
제목: UUID Generator
설명: Generate UUID v1/v4 Online
기능:
  ✓ Bulk generation
  ✓ Copy to clipboard
  ✓ RFC 4122 compliant
```

### 6-10. 나머지 도구들
```
Hash Generator: 🔐 SHA-256, MD5, SHA-1 Online
URL Encoder: 🔗 Encode & Decode URLs Online
Timestamp Converter: ⏰ Unix Time to Date Converter
Color Converter: 🎨 HEX, RGB, HSL Converter
QR Code Generator: 📱 Create QR Codes Online Free
```

---

## 📁 파일 저장 구조

```
public/og/
├── json-formatter.png       (1200x630)
├── regex-tester.png
├── base64.png
├── jwt-debugger.png
├── uuid-generator.png
├── hash-generator.png
├── url-encoder.png
├── timestamp-converter.png
├── color-converter.png
├── qr-generator.png
└── home.png                 (홈페이지용)
```

---

## 💻 코드 통합

### 각 도구 layout.tsx 수정

예시: `app/[locale]/json-formatter/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'JSON Formatter - DevTools Hub',
  description: '...',
  openGraph: {
    title: 'JSON Formatter - DevTools Hub',
    description: 'Format, Validate & Minify JSON Online for Free',
    type: 'website',
    url: 'https://devtools-hub-app.vercel.app/en/json-formatter',
    images: [
      {
        url: '/og/json-formatter.png',
        width: 1200,
        height: 630,
        alt: 'JSON Formatter - DevTools Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',  // ← large_image로 변경!
    title: 'JSON Formatter - DevTools Hub',
    description: 'Format, Validate & Minify JSON Online',
    images: ['/og/json-formatter.png'],
  },
}
```

### 루트 layout.tsx 수정

`app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'DevTools Hub',
  description: '...',
  openGraph: {
    title: 'DevTools Hub - Online Developer Tools',
    description: '10 essential developer tools online for free',
    type: 'website',
    url: 'https://devtools-hub-app.vercel.app',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'DevTools Hub - Online Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@devtoolshub',  // 나중에 트위터 계정 생성 시
    title: 'DevTools Hub - Online Developer Tools',
    description: '10 essential developer tools online for free',
    images: ['/og/home.png'],
  },
}
```

---

## ✅ 검증 도구

### 1. Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```
- URL 입력 후 "Debug" 클릭
- OG 이미지 미리보기 확인
- 캐시 새로고침 가능

### 2. Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```
- URL 입력 후 "Preview card" 클릭
- Twitter 카드 미리보기 확인

### 3. LinkedIn Post Inspector
```
https://www.linkedin.com/post-inspector/
```
- URL 입력 후 검사
- LinkedIn 미리보기 확인

### 4. Open Graph 체크 도구
```
https://www.opengraph.xyz/
```
- 여러 플랫폼 미리보기 한 번에 확인

---

## 🎯 우선순위

### Phase 1: 핵심 3개 (먼저)
1. **홈페이지** (`/og/home.png`)
2. **JSON Formatter** (`/og/json-formatter.png`)
3. **RegExp Tester** (`/og/regex-tester.png`)

### Phase 2: 나머지 7개 (나중에)
4-10. Base64, JWT, UUID, Hash, URL, Timestamp, Color, QR

---

## 💡 디자인 팁

### DO ✅:
- **큰 텍스트 사용** (최소 60px)
- **대비 높은 색상** (가독성)
- **여백 충분히** (답답하지 않게)
- **브랜드 일관성** (모든 이미지 동일한 스타일)
- **아이콘 활용** (시각적 인지)

### DON'T ❌:
- 텍스트 너무 많이 (3-4줄 이내)
- 작은 글씨 (모바일에서 안 보임)
- 복잡한 그래픽 (단순하게)
- 저작권 있는 이미지 사용
- 흐릿한 이미지 (고해상도 필수)

---

## 📊 예상 효과

### OG 이미지 없음:
```
Twitter 공유 시:
┌──────────────────┐
│ DevTools Hub     │
│ devtools-hub...  │  ← 텍스트만 표시
└──────────────────┘
CTR: 1-2%
```

### OG 이미지 있음:
```
Twitter 공유 시:
┌──────────────────┐
│ [예쁜 이미지]     │  ← 1200x630 이미지
│ JSON Formatter   │
│ DevTools Hub     │
└──────────────────┘
CTR: 3-6% (2-3배 증가!)
```

---

## 🚀 빠른 시작

### 5분 버전 (Canva):
1. Canva 접속
2. 1200x630 캔버스 생성
3. "Social Media Post" 템플릿 선택
4. 텍스트 변경:
   - 제목: "JSON Formatter"
   - 설명: "Format & Validate JSON Online"
   - URL: "devtools-hub-app.vercel.app"
5. 색상 변경 (파란색 계열)
6. PNG 다운로드
7. `public/og/json-formatter.png` 저장

### 완성 버전 (10개 전부):
1. 첫 이미지 디자인 (30분)
2. 템플릿화 (10분)
3. 나머지 9개 복제 및 수정 (각 5분 = 45분)
4. 검증 및 업로드 (15분)
5. **총 소요 시간: 1.5-2시간**

---

**지금 바로 시작하세요!** 🎨

1. Canva 또는 Figma 접속
2. 1200x630 캔버스 생성
3. 첫 OG 이미지 디자인 (JSON Formatter)
4. `public/og/` 폴더에 저장
5. metadata에 추가
6. Facebook Debugger로 확인!
