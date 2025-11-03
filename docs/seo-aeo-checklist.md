# SEO/AEO 체크리스트 및 다음 단계

## 📊 현재 상태

### ✅ 완료된 것

- [x] sitemap.xml 자동 생성 (44개 URL)
- [x] robots.txt 설정
- [x] 루트 메타데이터 최적화 (Open Graph, Twitter Card)
- [x] 10개 도구별 SEO 메타데이터
- [x] Privacy Policy 페이지
- [x] Footer (Privacy 링크)
- [x] AEO 최적화 (JSON Formatter만)
  - [x] SoftwareApplication Schema
  - [x] FAQPage Schema (4개 질문)
  - [x] HowTo Schema (4단계)

### ⏳ 진행 중

- [ ] Vercel URL 확인 및 수정 (devtools-hub-six 문제)
- [ ] Google AdSense 승인 대기

### 🎯 다음 단계

---

## 1️⃣ 즉시 해야 할 것 (오늘)

### A. Vercel URL 확인 및 수정

**현재 문제**:
- 코드에는 `devtools-hub.vercel.app` 하드코딩
- 실제 배포는 `devtools-hub-six.vercel.app`
- → 불일치!

**해결 방법**:

```bash
# 1단계: 실제 프로덕션 URL 확인
# https://vercel.com/dashboard → Settings → Domains

# 2단계: URL 일괄 수정 (실제 URL이 -six라면)
cd /Users/taegwonson/Desktop/devtools-hub
./scripts/update-url.sh devtools-hub-six.vercel.app

# 3단계: 커밋 및 푸시
git add -A
git commit -m "fix: Update domain to devtools-hub-six.vercel.app"
git push origin main
```

**또는 Vercel에서 프로젝트 이름 변경**:
```
Vercel Dashboard → Settings → General → Project Name
→ 다른 사용 가능한 이름으로 변경 (예: devtoolshub)
```

---

## 2️⃣ Google Search Console 등록 (30분)

**왜 필요한가?**
- Google이 사이트를 크롤링하고 인덱싱
- sitemap 제출로 빠른 색인
- 검색 성능 모니터링
- SEO 문제 알림

**단계**:

### 1. Search Console 등록
```
1. https://search.google.com/search-console 접속
2. "속성 추가" 클릭
3. URL 입력: https://devtools-hub-six.vercel.app (실제 URL)
4. 소유권 확인 방법 선택
```

### 2. 소유권 확인 (HTML 태그 방법 추천)

Search Console이 제공하는 메타 태그를 복사:
```html
<meta name="google-site-verification" content="ABC123..." />
```

`.env.local` 파일 생성 또는 수정:
```bash
# .env.local
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ABC123...
```

`app/layout.tsx` 수정:
```typescript
// 65번째 줄 수정
verification: {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
},
```

커밋 및 배포:
```bash
git add .env.local app/layout.tsx
git commit -m "feat: Add Google Search Console verification"
git push origin main
```

Vercel 환경 변수 추가:
```
Vercel Dashboard → Settings → Environment Variables
Name: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
Value: ABC123...
```

### 3. Sitemap 제출

Search Console에서:
```
Sitemaps → 새 사이트맵 추가
URL: https://devtools-hub-six.vercel.app/sitemap.xml
제출
```

---

## 3️⃣ 나머지 9개 도구에 AEO 적용 (2-3시간)

**현재**: JSON Formatter만 AEO 적용됨
**목표**: 10개 도구 모두 AEO 적용

### 우선순위

#### High Priority (먼저 할 것)
1. **RegExp Tester** - 검색량 높음
2. **Base64 Encoder** - 많이 사용됨
3. **JWT Debugger** - 개발자들이 자주 검색

#### Medium Priority
4. UUID Generator
5. Hash Generator
6. URL Encoder
7. Timestamp Converter

#### Low Priority (나중에)
8. Color Converter
9. QR Generator

### 작업 프로세스 (각 도구마다)

#### 1. metadata.ts 파일 생성

예시: `app/[locale]/regex-tester/metadata.ts`

```typescript
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
  description: 'Free online regular expression tester with real-time matching and group capturing.',
  featureList: [
    'Real-time regex matching',
    '15 preset patterns',
    'Group capturing display',
    'Flags support (g, i, m)',
    'No login required',
  ],
}

export const regexTesterFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a regular expression tester?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A regular expression tester is a tool that helps you test and validate regex patterns against sample text. It shows matches, groups, and helps debug regex patterns in real-time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test a regex pattern online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To test regex online: 1) Enter your regex pattern, 2) Add test text, 3) See real-time matching results with highlighting. Our tool supports all common regex flags (g, i, m).',
      },
    },
    // 2-3개 더 추가
  ],
}

export const regexTesterHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Test Regular Expressions Online',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose or Enter Pattern',
      text: 'Select a preset pattern or enter your own regex pattern.',
    },
    // 3-4단계 더 추가
  ],
}
```

#### 2. layout.tsx 수정

`app/[locale]/regex-tester/layout.tsx`에 JSON-LD 추가

#### 3. 검증

```bash
# Rich Results Test로 검증
https://search.google.com/test/rich-results

# URL 입력:
https://devtools-hub-six.vercel.app/en/regex-tester
```

---

## 4️⃣ OG 이미지 생성 (1시간)

**현재 문제**: Open Graph 이미지 없음
**효과**:
- 소셜 미디어 공유 시 예쁜 카드 표시
- ProductHunt 출시 시 필수
- CTR 2-3배 상승

### 도구별 OG 이미지 만들기

**사이즈**: 1200 x 630px

**디자인 툴**:
- Canva (무료): https://www.canva.com
- Figma (무료): https://www.figma.com
- OG Image Generator: https://og-playground.vercel.app

**템플릿**:
```
┌─────────────────────────────────────┐
│  DevTools Hub                       │
│                                     │
│  JSON Formatter                     │
│                                     │
│  Format, Validate & Minify          │
│  JSON Online for Free               │
│                                     │
│  ✓ Real-time  ✓ No Login           │
│  ✓ 4 Languages  ✓ Privacy First    │
└─────────────────────────────────────┘
```

**저장 위치**:
```
public/og/
  ├── json-formatter.png
  ├── regex-tester.png
  ├── base64.png
  ├── jwt-debugger.png
  └── ...
```

**메타데이터 추가**:
```typescript
// app/[locale]/json-formatter/layout.tsx
export const metadata: Metadata = {
  openGraph: {
    images: ['/og/json-formatter.png'],
  },
}
```

---

## 5️⃣ 블로그/문서 콘텐츠 추가 (나중에)

**목표**: AI가 참고할 고품질 콘텐츠

### 추천 콘텐츠

```
app/[locale]/blog/
  ├── what-is-json-formatter/
  ├── json-validation-guide/
  ├── regex-patterns-explained/
  ├── jwt-token-security/
  └── ...
```

**각 글 구조**:
```markdown
# What is a JSON Formatter?

## Introduction
A JSON formatter is...

## Why Use JSON Formatter?
1. Readability
2. Debugging
3. Validation

## How to Use
Step-by-step guide...

## Common Use Cases
- API development
- Configuration files
- Data analysis

## FAQ
Q: Is it safe?
A: Yes, all processing is local...
```

---

## 6️⃣ 성능 최적화 (선택)

### 이미지 최적화
```bash
# Next.js Image 컴포넌트 사용
import Image from 'next/image'
```

### 코드 스플리팅
```typescript
// 큰 라이브러리는 동적 import
const QRCode = dynamic(() => import('qrcode'))
```

### 폰트 최적화
```typescript
// 이미 Geist 폰트 사용 중 - OK!
```

---

## 📊 SEO/AEO 효과 측정

### 1개월 후 확인할 지표

**Google Search Console**:
- 노출수 (Impressions)
- 클릭수 (Clicks)
- 평균 CTR
- 평균 게재순위

**Google Analytics**:
- Organic 트래픽
- 페이지별 조회수
- 사용자 행동 (체류 시간, 이탈률)

**AI 검색 테스트**:
```
ChatGPT: "How do I format JSON online?"
Perplexity: "Best free JSON formatter"
Bing Copilot: "Online regex tester"

→ DevTools Hub가 언급/추천되는지 확인
```

---

## 🎯 우선순위 정리

### 🔴 지금 당장 (오늘)
1. [ ] Vercel URL 확인 및 수정
2. [ ] Google Search Console 등록
3. [ ] Sitemap 제출

### 🟡 이번 주 (Week 1)
1. [ ] RegExp Tester AEO 적용
2. [ ] Base64 Encoder AEO 적용
3. [ ] JWT Debugger AEO 적용
4. [ ] OG 이미지 3개 생성 (JSON, RegExp, Base64)

### 🟢 다음 주 (Week 2)
1. [ ] 나머지 7개 도구 AEO 적용
2. [ ] 모든 OG 이미지 생성
3. [ ] ProductHunt 출시 준비

### 🔵 장기 (Month 1-3)
1. [ ] 블로그 콘텐츠 작성 (10-20개 글)
2. [ ] 성능 최적화
3. [ ] AI 기능 추가 (JSON → TypeScript 등)

---

## 💡 추가 SEO 팁

### 1. 내부 링크 강화
각 도구 페이지에서 다른 도구로 링크:
```
"You might also like:
- RegExp Tester
- Base64 Encoder"
```

### 2. Breadcrumbs 추가
```
Home > Tools > JSON Formatter
```

### 3. 스키마 마크업 검증
```
https://validator.schema.org/
https://search.google.com/test/rich-results
```

### 4. 페이지 속도 최적화
```
https://pagespeed.web.dev/
목표: 90+ 점수
```

---

## 📚 참고 자료

- [Google Search Console 가이드](https://support.google.com/webmasters/answer/9128668)
- [Schema.org 문서](https://schema.org/)
- [Open Graph 프로토콜](https://ogp.me/)
- [AEO 최적화 가이드](docs/aeo-optimization.md)

---

**시작하세요!** 🚀

우선순위대로 하나씩 완료하면 3개월 내에 상위 검색 결과에 노출됩니다.
