# DevTools Hub - Claude Context

## 프로젝트 개요

**이름**: DevTools Hub
**목적**: 개발자들이 매일 사용하는 도구를 모아놓은 웹사이트
**수익 모델**: 광고 수익 (Google AdSense) + Freemium
**타겟**: 웹 개발자, 프론트엔드/백엔드 엔지니어

---

## 핵심 철학

### UX/DX 최우선
1. **즉시 사용 가능** - 로그인 불필요, 페이지 열자마자 바로 입력
2. **키보드 중심** - 모든 작업을 단축키로 가능
3. **자동 감지** - 붙여넣기하면 자동으로 포맷 감지
4. **실시간 피드백** - 타이핑하면 즉시 결과 표시
5. **모바일 최적화** - 완벽한 반응형

---

## 기술 스택

```typescript
// Frontend & Backend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v3
- shadcn/ui

// 국제화 (i18n)
- next-intl (지원 언어: en, ko, ja, zh)
- URL 기반 라우팅 (/en/, /ko/, /ja/, /zh/)

// 상태 관리
- Zustand (가벼운 상태 관리)
- Local Storage (히스토리 저장)

// AI 기능
- OpenAI API (GPT-4o-mini)
- Vercel AI SDK

// 광고
- Google AdSense
- Carbon Ads (백업)

// 배포
- Vercel
- vercel.app 도메인 (나중에 커스텀)

// 분석
- Vercel Analytics
- Google Analytics 4
```

---

## 프로젝트 구조

```
devtools-hub/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트만)
│   ├── globals.css             # 글로벌 스타일 (Tailwind + 테마)
│   └── [locale]/               # 다국어 라우팅 (/en/, /ko/, /ja/, /zh/)
│       ├── layout.tsx          # 로케일별 레이아웃 (Header, Sidebar, ThemeProvider)
│       ├── page.tsx            # 홈페이지 (도구 목록)
│       └── json-formatter/     # JSON 도구
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 헤더 (로고, 검색, 언어선택, 다크모드)
│   │   ├── Sidebar.tsx         # 사이드바 (도구 목록)
│   │   ├── LanguageSwitcher.tsx # 언어 선택 드롭다운
│   │   ├── ThemeToggle.tsx     # 다크모드 토글
│   │   └── Footer.tsx
│   ├── providers/
│   │   └── ThemeProvider.tsx   # next-themes Provider
│   ├── tools/
│   │   ├── ToolCard.tsx
│   │   ├── CodeEditor.tsx
│   │   └── OutputPanel.tsx
│   └── ui/                     # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── dropdown-menu.tsx
│       └── ...
├── lib/
│   ├── tools/                  # 각 도구의 비즈니스 로직
│   │   └── json.ts             # JSON 포맷/검증 로직
│   ├── utils.ts                # cn() 유틸리티
│   ├── hooks/
│   │   ├── useKeyboard.ts
│   │   ├── useLocalStorage.ts
│   │   └── useAutoDetect.ts
│   └── store/
│       └── toolStore.ts
├── i18n/
│   └── request.ts              # next-intl 설정
├── messages/                   # 번역 파일
│   ├── en.json                 # 영어
│   ├── ko.json                 # 한국어
│   ├── ja.json                 # 일본어
│   └── zh.json                 # 중국어
├── public/
│   ├── og-image.png
│   └── favicon.ico
├── docs/                       # 프로젝트 문서
│   ├── devtools-hub-plan.md
│   └── product-ideas-brainstorm.md
├── .claude/
│   └── CLAUDE.md               # 이 파일
├── middleware.ts               # next-intl 미들웨어
├── components.json             # shadcn/ui 설정
├── tailwind.config.js          # Tailwind v3 설정
├── next.config.ts              # Next.js + next-intl 설정
├── tsconfig.json
├── package.json
└── README.md
```

---

## MVP 도구 (Phase 1)

### Tier 1: 필수 (Week 1)
1. **JSON Formatter/Validator** ⭐⭐⭐
   - Pretty print
   - Minify
   - Validation
   - JSON → TypeScript Interface (AI)

2. **RegExp Tester** ⭐⭐⭐
   - 실시간 매칭 하이라이트
   - 그룹 캡처 표시
   - AI 한글 설명
   - 자주 쓰는 패턴 스니펫

3. **Base64 Encode/Decode** ⭐⭐⭐
   - 텍스트 ↔ Base64
   - 이미지 → Base64
   - 파일 드래그 앤 드롭

### Tier 2: 추가 (Week 2)
4. JWT Debugger
5. Unix Timestamp Converter
6. URL Encoder/Decoder
7. UUID/ULID Generator

### Tier 3: 확장 (Week 3+)
8. Hash Generator (MD5, SHA256)
9. Color Converter (HEX, RGB, HSL)
10. QR Code Generator

---

## 핵심 기능

### 1. Command Palette (Cmd+K)
```typescript
// 모든 페이지에서 Cmd+K로 도구 검색
// Spotlight 스타일 UI
// 최근 사용 도구 우선 표시
```

### 2. 자동 감지 시스템
```typescript
// 붙여넣기하면 자동으로 감지
{"name": "John"}           → JSON Formatter
eyJhbGc...                 → JWT Debugger
aGVsbG8gd29ybGQ=           → Base64 Decoder
2024-11-01T10:00:00Z       → Unix Time Converter
```

### 3. 키보드 단축키
```
Cmd+K          → 도구 검색
Cmd+V          → 붙여넣기 & 자동 감지
Cmd+C          → 결과 복사
Cmd+Enter      → 실행/변환
Cmd+[          → 이전 도구
Cmd+]          → 다음 도구
Cmd+/          → 단축키 도움말
Cmd+D          → 다크모드 토글
```

### 4. 로컬 히스토리
```typescript
// 각 도구의 입력/출력 히스토리 저장
// 로컬 스토리지 사용 (프라이버시)
// 최근 10개 저장
```

### 5. AI 기능
```typescript
// JSON → TypeScript Interface 자동 생성
// RegExp AI 한글 설명
// 에러 메시지 친절한 설명
```

---

## 수익 모델

### Phase 1: 광고 (현재)
```
무료:
- 모든 도구 무료 사용
- 광고 표시 (Google AdSense)
- 로컬 히스토리

목표: 트래픽 모으기
```

### Phase 2: Freemium (3개월 후)
```
Free:
- 모든 도구 사용
- 광고 있음
- 로컬 히스토리만

Pro ($3/월):
- ✅ 광고 제거
- ✅ AI 기능 무제한
- ✅ 클라우드 히스토리 (동기화)
- ✅ 팀 공유 스니펫
- ✅ API 액세스 (100 req/day)

목표: 100명 구독자 = $300/월
```

---

## 개발 우선순위

### Week 1: MVP ✅ (완료 - 2025-11-03)
- [x] Next.js 16 프로젝트 생성
- [x] 프로젝트 문서화
- [x] 기본 레이아웃 (Header, Sidebar)
- [x] 다크모드 (next-themes)
- [x] i18n 설정 (4개 언어)
- [x] JSON Formatter 구현
- [x] RegExp Tester 구현 (초보자 친화적!)
- [x] Cmd+K 검색 (Command Palette)
- [x] 15개 정규식 패턴 프리셋
- [ ] Base64 Encoder/Decoder 구현
- [ ] 광고 통합 (Google AdSense)
- [ ] Vercel 배포

### Week 2: 추가 도구 (진행 예정)
- [ ] Base64 Encoder/Decoder
- [ ] JWT Debugger
- [ ] Unix Time Converter
- [ ] URL Encoder
- [ ] UUID Generator
- [ ] SEO 최적화
- [ ] ProductHunt 준비

### Week 3: AI 기능 (계획)
- [ ] JSON → TypeScript (OpenAI API)
- [ ] RegExp AI 설명
- [ ] Freemium 모델 설계

---

## 중요한 결정 사항

### 1. 코드 재사용 전략
- Template Repository 방식 사용
- 공통 코드는 복사-붙여넣기로 시작
- 3번 이상 재사용되면 패키지로 분리

### 2. 서버 구조
- Next.js만 사용 (별도 백엔드 불필요)
- API Routes로 충분
- Vercel 배포

### 3. 데이터베이스
- Phase 1: 불필요 (로컬 스토리지)
- Phase 2: Supabase (무료) or Vercel Postgres

### 4. AI 사용
- OpenAI API (GPT-4o-mini) - 비용 효율적
- Vercel AI SDK 활용

---

## 환경 변수

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://devtools-hub.vercel.app

# AI 기능 (나중에)
OPENAI_API_KEY=sk-...

# 광고 (나중에)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...

# 분석 (Vercel 자동)
# NEXT_PUBLIC_GA_ID=G-...
```

---

## Git 전략

```bash
# 브랜치 전략
main           # 프로덕션 (Vercel 자동 배포)
develop        # 개발
feature/*      # 기능 개발

# 커밋 메시지 컨벤션
feat: 새 기능
fix: 버그 수정
docs: 문서 수정
style: 스타일 변경
refactor: 리팩토링
test: 테스트
chore: 기타
```

---

## 배포 전략

```bash
# Vercel 자동 배포
main 브랜치 → devtools-hub.vercel.app

# 환경
Production: main 브랜치
Preview: PR마다 자동 배포 URL 생성
```

---

## SEO 전략

### 타겟 키워드
- json formatter online
- regex tester online
- base64 decode online
- jwt decoder online
- 개발자 도구
- 온라인 개발 툴

### 메타 태그
```typescript
// 각 도구 페이지마다
export const metadata = {
  title: 'JSON Formatter - DevTools Hub',
  description: 'Free online JSON formatter, validator with TypeScript conversion. No signup required.',
  keywords: 'json, formatter, validator, online, free',
  openGraph: {
    title: 'JSON Formatter - DevTools Hub',
    description: 'Free online JSON formatter',
    images: ['/og-image.png']
  }
}
```

---

## 성공 지표

### 단기 (1개월)
- [ ] MVP 배포 완료
- [ ] 일 100 방문자
- [ ] Google AdSense 승인
- [ ] ProductHunt 론칭

### 중기 (3개월)
- [ ] 월 10만 PV
- [ ] 월 $100 광고 수익
- [ ] 10명 Pro 구독자

### 장기 (6개월)
- [ ] 월 100만 PV
- [ ] 월 $1,000+ 수익
- [ ] 100명 Pro 구독자

---

## 개발 시 주의사항

### UX/DX 원칙 준수
1. 항상 키보드 접근성 고려
2. 로딩 상태 명확히 표시
3. 에러 메시지는 친절하게
4. 모바일에서도 테스트
5. 성능 최적화 (Code Splitting)

### 코드 품질
1. TypeScript 타입 엄격하게
2. ESLint 규칙 준수
3. 컴포넌트는 최대한 작게
4. 재사용 가능하게 설계
5. 주석은 최소화 (코드가 설명)

### 보안
1. API 키는 절대 클라이언트 노출 금지
2. 사용자 입력 검증
3. XSS 방지
4. CORS 설정

---

## 국제화 (i18n) 설정

### 지원 언어
- **영어 (en)**: 기본 언어
- **한국어 (ko)**
- **일본어 (ja)**
- **중국어 (zh)**

### URL 구조
```
/en/              → 영어 홈
/ko/              → 한국어 홈
/ja/              → 일본어 홈
/zh/              → 중국어 홈

/en/json-formatter → 영어 JSON Formatter
/ko/json-formatter → 한국어 JSON Formatter
```

### 주요 파일
1. **i18n/request.ts** - next-intl 설정
   - 지원 언어 목록 (locales)
   - 기본 언어 (defaultLocale = 'en')
   - 언어별 이름 (localeNames)

2. **messages/*.json** - 번역 파일
   - 모든 UI 텍스트를 JSON으로 관리
   - 중첩 구조로 조직화 (common, tools, home, etc.)

3. **middleware.ts** - 자동 언어 감지 및 리다이렉트
   - 브라우저 언어 자동 감지
   - URL 기반 언어 라우팅

4. **components/layout/LanguageSwitcher.tsx** - 언어 선택 UI
   - 드롭다운 메뉴로 언어 전환
   - 현재 페이지 유지하며 언어만 변경

### 사용 방법
```typescript
// 클라이언트 컴포넌트에서
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();

  return <h1>{t('home.title')}</h1>;
}
```

### Next.js 16 호환성
- **중요**: Next.js 16에서 `params`가 Promise로 변경됨
- Layout 컴포넌트에서 `await params` 필수

```typescript
// ❌ 잘못된 방법 (Next.js 15)
export default async function Layout({ params: { locale } }) {
  // ...
}

// ✅ 올바른 방법 (Next.js 16)
export default async function Layout({ params }) {
  const { locale } = await params;
  // ...
}
```

### i18n 구현 시 주의사항

1. **next.config.ts 설정 필수**
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts'); // 경로 명시 필수!
export default withNextIntl(nextConfig);
```

2. **Server Component vs Client Component**
```typescript
// ❌ Server Component에서 useTranslations() 사용 불가
export default function Page() {
  const t = useTranslations(); // Error!
}

// ✅ Client Component에서만 useTranslations() 사용
"use client"
export default function Page() {
  const t = useTranslations(); // OK!
}

// ✅ Server Component에서는 getTranslations() 사용
export default async function Page() {
  const t = await getTranslations(); // OK!
}
```

3. **Middleware 설정**
- Next.js 16에서 middleware.ts 사용 시 deprecation warning 발생
- 현재는 무시해도 작동함 (next-intl이 아직 proxy.ts 지원 안함)

---

## 다음 단계

### ✅ Week 1 완료 (2025-11-03)

#### 핵심 인프라
1. ✅ Next.js 16 프로젝트 생성
2. ✅ shadcn/ui 설치 및 설정 (Button, Card, Input, Textarea, Checkbox, Dialog, Command, Dropdown)
3. ✅ 기본 레이아웃 구현 (Header, Sidebar)
4. ✅ 다크모드 구현 (next-themes)
5. ✅ i18n 설정 완료 (next-intl, 4개 언어: en, ko, ja, zh)
6. ✅ i18n 버그 수정 (Next.js 16 호환성, requestLocale await)
7. ✅ Command Palette (Cmd+K) 구현

#### JSON Formatter (완료)
- ✅ Pretty print (2/4/8 spaces)
- ✅ Minify
- ✅ Validation with error messages
- ✅ 실시간 포맷팅
- ✅ 다국어 번역 완료 (4개 언어)

#### RegExp Tester (완료 - 초보자 친화적!)
- ✅ **3단계 워크플로우**: 패턴 선택 → 텍스트 입력 → 결과 확인
- ✅ **15개 자주 쓰는 패턴 프리셋**
  - Email, URL, Phone (US/KR), IPv4
  - Date (YYYY-MM-DD, MM/DD/YYYY), Time (HH:MM)
  - Hex Color, HTML Tag, Credit Card
  - Username (@mention), Hashtag
  - Number (Integer, Decimal)
- ✅ 실시간 매칭 하이라이트 (노란색)
- ✅ **사용 중인 패턴 표시** - 투명성 확보
- ✅ **한글 플래그 설명** - "전체 검색", "대소문자 무시" 등
- ✅ **고급 설정 접기/펴기** - 정규식 아는 사람만 사용
- ✅ 정규식을 몰라도 100% 사용 가능!

#### Base64 Encoder/Decoder (완료 - 2025-11-03)
- ✅ **Text 모드** - 텍스트 인코딩/디코딩 (UTF-8 지원)
- ✅ **File 모드** - 드래그 앤 드롭 파일 업로드
- ✅ **이미지 프리뷰** - 이미지 파일 자동 미리보기
- ✅ **원클릭 복사** - Base64 문자열 즉시 복사
- ✅ 파일 다운로드 기능
- ✅ 예시 데이터 자동 로드
- ✅ 다국어 번역 완료 (4개 언어)

#### JWT Debugger (완료 - 2025-11-03)
- ✅ **JWT 디코딩** - Header, Payload, Signature 자동 분리
- ✅ **알고리즘 표시** - HS256, RS256 등 사람이 읽기 쉬운 형식
- ✅ **만료 시간 체크** - 실시간 유효성 검증
- ✅ **시간 표시** - "2일 후 만료", "3시간 전 만료" 등
- ✅ **클레임 구분** - Standard Claims와 Custom Claims 자동 분리
- ✅ **상태 배지** - 유효/만료/미래 토큰 시각적 표시
- ✅ 예시 JWT 토큰 자동 로드
- ✅ 다국어 번역 완료 (4개 언어)

#### UUID Generator (완료 - 2025-11-03)
- ✅ **UUID v4 생성** - 암호학적 랜덤 생성 (crypto.randomUUID())
- ✅ **UUID v1 생성** - 타임스탬프 기반 생성
- ✅ **Bulk 생성** - 1~50개 일괄 생성 지원
- ✅ **버전 정보 표시** - v1/v4, RFC 4122 variant 표시
- ✅ **원클릭 복사** - 개별 UUID 복사
- ✅ **모두 복사** - 전체 UUID 한 번에 복사 (줄당 하나)
- ✅ **초기 로드** - 페이지 열면 자동으로 UUID v4 5개 생성
- ✅ 다국어 번역 완료 (4개 언어)

#### 번역 및 UX
- ✅ Sidebar 도구 이름 영문 유지 (카테고리만 번역)
- ✅ Header 검색창 레이아웃 개선 (왼쪽 정렬)
- ✅ JSON Formatter 완전 번역
- ✅ RegExp Tester 완전 번역
- ✅ Base64 Encoder/Decoder 완전 번역
- ✅ JWT Debugger 완전 번역
- ✅ UUID Generator 완전 번역
- ✅ 타입 체크 통과 (0 errors)

### 🚧 Week 2: 추가 도구 (다음 작업)
1. [ ] **Unix Timestamp Converter**
   - Unix timestamp ↔ 날짜
   - 현재 시간 표시
   - 타임존 변환
2. [ ] **URL Encoder/Decoder**
   - URL encoding/decoding
   - Query string parser
3. [ ] **Hash Generator**
   - MD5, SHA-1, SHA-256, SHA-512
   - 파일 해시 계산
4. [ ] Vercel 배포
5. [ ] SEO 최적화
6. [ ] ProductHunt 준비

### 📅 Week 3: AI 기능 (계획)
1. [ ] JSON → TypeScript Interface (OpenAI API)
2. [ ] RegExp AI 설명
3. [ ] Freemium 모델 설계

---

## 참고 링크

- [계획서 상세](../docs/devtools-hub-plan.md)
- [아이디어 브레인스토밍](../docs/product-ideas-brainstorm.md)
- [Next.js 문서](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel 배포](https://vercel.com/docs)
