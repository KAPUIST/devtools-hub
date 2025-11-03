# DevTools Hub

> 개발자들이 매일 사용하는 도구를 모아놓은 웹사이트

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-black)](https://devtools-hub.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

## 🎯 프로젝트 목표

**최고의 UX/DX를 가진 개발자 도구 모음 웹사이트**

- 로그인 불필요
- 즉시 사용 가능
- 키보드 중심 인터페이스
- 실시간 피드백
- 정규식 몰라도 OK - 초보자 친화적 UI

## ✨ 구현된 기능

### 🔧 JSON Formatter/Validator
- ✅ Pretty print (2/4/8 spaces)
- ✅ Minify
- ✅ Validation with error messages
- ✅ 실시간 포맷팅
- ✅ 다국어 지원 (영어, 한국어, 일본어, 중국어)
- ⏳ AI TypeScript Interface 생성 (예정)

### 📝 RegExp Tester (초보자 친화적!)
- ✅ **3단계 사용법** - 패턴 선택 → 텍스트 입력 → 결과 확인
- ✅ **15개 자주 쓰는 패턴** 프리셋
  - Email, URL, Phone (US/KR), IPv4, Date, Time
  - Hex Color, HTML Tag, Credit Card, Username, Hashtag
  - Number (Integer/Decimal) 등
- ✅ **실시간 매칭 하이라이트** (노란색)
- ✅ **사용 중인 패턴 표시** - 어떤 정규식이 사용되는지 투명하게 공개
- ✅ **한글 플래그 설명** - "전체 검색", "대소문자 무시" 등
- ✅ **고급 설정 접기/펴기** - 정규식 아는 사람만 사용
- ✅ 정규식을 몰라도 100% 사용 가능!

### 🔐 Base64 Encoder/Decoder
- ✅ **Text 모드** - 텍스트를 Base64로 인코딩/디코딩
- ✅ **File 모드** - 드래그 앤 드롭으로 파일 업로드
- ✅ **이미지 프리뷰** - 이미지 파일 자동 미리보기
- ✅ **원클릭 복사** - Base64 문자열 즉시 복사
- ✅ 예시 데이터 자동 로드

### 🔓 JWT Debugger
- ✅ **JWT 디코딩** - Header, Payload, Signature 자동 분리
- ✅ **서명 검증** - HS256/384/512, RS256/384/512, ES256/384/512 지원
- ✅ **알고리즘 표시** - HS256, RS256 등 사람이 읽기 쉬운 형식
- ✅ **만료 시간 체크** - 실시간 유효성 검증 + 남은 시간 표시
- ✅ **클레임 구분** - Standard Claims와 Custom Claims 자동 분리
- ✅ **상태 배지** - 유효/만료/미래 토큰 시각적 표시
- ✅ **보안 경고** - 프로덕션 시크릿 사용 금지 안내
- ✅ 예시 JWT 토큰 자동 로드

### ⏱️ Unix Timestamp Converter
- ✅ **현재 시간 표시** - Unix 타임스탬프 실시간 업데이트 (1초마다)
- ✅ **Timestamp → Date 변환** - 초/밀리초 자동 감지
- ✅ **Date → Timestamp 변환** - datetime-local 입력
- ✅ **타임존 변환** - UTC, KST, JST, CST, EST, PST 6개 타임존
- ✅ **상대 시간 표시** - "3시간 후", "2일 전" 등
- ✅ **ISO 8601 지원** - 국제 표준 날짜 형식
- ✅ **완벽한 다국어** - i18n 준수, 4개 언어 지원

### 🔗 URL Encoder/Decoder
- ✅ **Encode/Decode 탭** - 인코딩과 디코딩을 분리된 탭으로 제공
- ✅ **Encode URI** - 전체 URL 인코딩 (:, /, ?, & 보존)
- ✅ **Encode URI Component** - 쿼리 파라미터 인코딩 (모든 특수문자)
- ✅ **Decode URI** - 전체 URL 디코딩
- ✅ **Decode URI Component** - 쿼리 파라미터 디코딩
- ✅ **Query String Parser** - URL에서 쿼리 파라미터 자동 추출 (테이블 형식)
- ✅ **원클릭 복사** - 인코딩/디코딩된 값 즉시 복사
- ✅ **예시 데이터** - 자동 로드 기능

### 🎨 핵심 UX
- ✅ **Command Palette (Cmd+K)** - 도구 빠른 검색
- ✅ **다크모드** - 시스템 설정 자동 감지
- ✅ **다국어 지원** - 영어, 한국어, 일본어, 중국어
- ✅ **반응형 레이아웃** - 모바일/태블릿/데스크톱
- ✅ **헤더 + 사이드바** - 직관적인 네비게이션
- ⏳ 자동 감지 (예정)
- ⏳ 로컬 히스토리 (예정)

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/yourusername/devtools-hub.git
cd devtools-hub

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 열기
open http://localhost:3000
```

개발 서버가 시작되면 다음 URL에서 확인할 수 있습니다:
- 영어: http://localhost:3000/en
- 한국어: http://localhost:3000/ko
- 일본어: http://localhost:3000/ja
- 중국어: http://localhost:3000/zh

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui (Button, Card, Input, Textarea, Checkbox, Dialog, Command, Dropdown)
- **Internationalization**: next-intl (4개 언어)
- **Theme**: next-themes (다크모드)
- **Icons**: lucide-react
- **Deployment**: Vercel (예정)
- **Analytics**: Vercel Analytics (예정)

## 📁 프로젝트 구조

```
devtools-hub/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃 (폰트만)
│   ├── globals.css                 # 글로벌 스타일 (Tailwind + 테마)
│   └── [locale]/                   # 다국어 라우팅
│       ├── layout.tsx              # Header, Sidebar, ThemeProvider
│       ├── page.tsx                # 홈페이지 (도구 목록)
│       ├── json-formatter/         # JSON Formatter
│       │   └── page.tsx
│       ├── regex-tester/           # RegExp Tester
│       │   └── page.tsx
│       ├── base64/                 # Base64 Encoder/Decoder
│       │   └── page.tsx
│       ├── jwt-debugger/           # JWT Debugger
│       │   └── page.tsx
│       ├── timestamp/              # Unix Timestamp Converter
│       │   └── page.tsx
│       └── url-encoder/            # URL Encoder/Decoder
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # 헤더 (로고, 검색, 언어, 다크모드)
│   │   ├── Sidebar.tsx             # 사이드바 (도구 목록)
│   │   ├── LanguageSwitcher.tsx    # 언어 선택 드롭다운
│   │   └── ThemeToggle.tsx         # 다크모드 토글
│   ├── providers/
│   │   └── ThemeProvider.tsx       # next-themes Provider
│   ├── CommandPalette.tsx          # Cmd+K 검색 (Command)
│   └── ui/                         # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── command.tsx
│       └── ...
├── lib/
│   ├── tools/
│   │   ├── json.ts                 # JSON 포맷/검증 로직
│   │   ├── regex.ts                # RegExp 테스트 로직 + 15개 패턴
│   │   ├── base64.ts               # Base64 인코딩/디코딩 로직
│   │   ├── jwt.ts                  # JWT 디코딩/검증 로직
│   │   ├── timestamp.ts            # Unix Timestamp 변환 로직
│   │   └── url.ts                  # URL 인코딩/디코딩/파싱 로직
│   └── utils.ts                    # cn() 유틸리티
├── i18n/
│   └── request.ts                  # next-intl 설정
├── messages/                       # 번역 파일
│   ├── en.json                     # 영어
│   ├── ko.json                     # 한국어
│   ├── ja.json                     # 일본어
│   └── zh.json                     # 중국어
├── middleware.ts                   # next-intl 미들웨어
├── components.json                 # shadcn/ui 설정
├── tailwind.config.js              # Tailwind v3 설정
├── next.config.ts                  # Next.js + next-intl 설정
└── .claude/
    └── CLAUDE.md                   # 개발 컨텍스트 문서
```

## ⌨️ 키보드 단축키

| 단축키 | 기능 |
|--------|------|
| `Cmd+K` | 도구 검색 (Command Palette) |
| `Cmd+D` | 다크모드 토글 |
| `Cmd+C` | 결과 복사 |
| `Cmd+V` | 붙여넣기 |

## 🌍 다국어 지원

4개 언어를 완벽하게 지원합니다:

- 🇺🇸 English (en) - 기본 언어
- 🇰🇷 한국어 (ko)
- 🇯🇵 日本語 (ja)
- 🇨🇳 中文 (zh)

### URL 구조
```
/en/                    → 영어 홈
/ko/                    → 한국어 홈
/en/json-formatter      → 영어 JSON Formatter
/ko/regex-tester        → 한국어 RegExp Tester
```

브라우저 언어 설정에 따라 자동으로 리다이렉트됩니다.

## 🎨 디자인 원칙

1. **즉시 사용 가능**: 로그인 없이 바로 사용
2. **초보자 친화적**: 전문 용어 없이도 사용 가능 (특히 RegExp Tester!)
3. **투명성**: 내부 로직을 숨기지 않음 (사용 중인 패턴 표시)
4. **점진적 공개**: 기본은 쉽게, 고급 기능은 접어두기
5. **실시간 피드백**: 타이핑하면 즉시 결과
6. **모바일 최적화**: 완벽한 반응형

## 📊 개발 로드맵

### ✅ Week 1: MVP (완료!)
- [x] Next.js 16 프로젝트 생성
- [x] shadcn/ui 설치 및 설정
- [x] 기본 레이아웃 (Header, Sidebar)
- [x] 다크모드 구현 (next-themes)
- [x] i18n 설정 (next-intl, 4개 언어)
- [x] JSON Formatter 구현 + 번역
- [x] RegExp Tester 구현 (초보자 친화적!)
- [x] Command Palette (Cmd+K)
- [x] 15개 정규식 패턴 프리셋
- [x] Base64 Encoder/Decoder (드래그 앤 드롭!)
- [x] JWT Debugger (만료 시간 체크!)
- [x] Unix Timestamp Converter (타임존 변환!)
- [x] URL Encoder/Decoder (쿼리 파서!)

### 🚧 Week 2: 추가 도구 (진행 중)
- [ ] UUID Generator
- [ ] Hash Generator (MD5, SHA256)
- [ ] Vercel 배포
- [ ] SEO 최적화

### 📅 Week 3: AI 기능 (계획)
- [ ] JSON → TypeScript Interface (OpenAI API)
- [ ] RegExp AI 설명
- [ ] Freemium 모델 설계

## 💰 수익 모델

### Free (현재)
- 모든 도구 무료 사용
- 로컬 스토리지만 사용 (프라이버시)

### Pro (계획 중 - $3/월)
- ✅ 광고 제거
- ✅ AI 기능 무제한
- ✅ 클라우드 히스토리 동기화
- ✅ 팀 공유 스니펫
- ✅ API 액세스 (100 req/day)

## 🔧 개발 스크립트

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 린트
npm run lint

# 타입 체크
npx tsc --noEmit
```

## 📝 환경 변수

```bash
# .env.local (선택사항)
NEXT_PUBLIC_SITE_URL=https://devtools-hub.vercel.app
OPENAI_API_KEY=sk-...                      # AI 기능용 (나중에)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...      # 광고용 (나중에)
```

## 🤝 기여하기

이 프로젝트는 개인 프로젝트이지만, 아이디어와 피드백은 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

MIT License

## 📚 관련 문서

- [Claude Context](./.claude/CLAUDE.md) - AI 개발 컨텍스트
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl.dev/)

## 🎯 주요 특징 요약

### RegExp Tester의 혁신
기존 정규식 테스터들은 정규식을 알아야만 사용할 수 있었습니다. 하지만 DevTools Hub의 RegExp Tester는:

1. **패턴 선택** - "Email 찾기", "전화번호 찾기" 같은 일반 언어로 선택
2. **텍스트 입력** - 찾고 싶은 텍스트만 붙여넣기
3. **결과 확인** - 노란색 하이라이트로 즉시 확인

정규식을 하나도 몰라도 됩니다! 🎉

---

Made with ❤️ by DevTools Hub Team
