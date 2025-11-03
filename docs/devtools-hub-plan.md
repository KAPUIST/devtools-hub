# DevTools Hub - 개발 계획서

**목표**: 개발자들이 매일 쓰는 도구를 모아놓은 웹사이트 (광고 수익 모델)

**도메인**: devtools-hub.vercel.app (임시)

**핵심 가치**: 최고의 UX/DX

---

## UX/DX 원칙

### 1. 즉시 사용 가능
- ❌ 로그인 불필요
- ❌ 설치 불필요
- ✅ 페이지 열자마자 바로 사용
- ✅ 예시 데이터 미리 채워져 있음

### 2. 키보드 중심 인터페이스
```
Cmd+K (Ctrl+K)      → 도구 검색 (Spotlight 스타일)
Cmd+V               → 붙여넣기 후 자동 감지
Cmd+C               → 결과 원클릭 복사
Cmd+Enter           → 실행/변환
Cmd+[               → 이전 도구
Cmd+]               → 다음 도구
Cmd+/               → 단축키 도움말
```

### 3. 스마트 자동 감지
```javascript
// 붙여넣은 내용 자동 감지
{"name": "John"}           → JSON 포맷터로
eyJhbGc...                 → JWT 디버거로
aGVsbG8gd29ybGQ=           → Base64 디코더로
2024-11-01T10:00:00Z       → Unix Time 변환기로
```

### 4. 실시간 피드백
- 타이핑하면 즉시 결과 업데이트 (debounce 300ms)
- 에러는 친절하게 설명
- 성공 시 초록색 체크마크

### 5. 모바일 최적화
- 반응형 디자인
- 터치 제스처 지원
- 세로 스크롤 최소화

---

## 핵심 도구 (Phase 1 - MVP)

### Tier 1: 매일 사용 (필수)
1. **JSON Formatter/Validator** ⭐⭐⭐
   - 포맷팅 (pretty print)
   - Validation
   - Minify
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

### Tier 2: 자주 사용
4. **JWT Debugger**
   - 자동 디코드
   - 시그니처 검증
   - 만료 시간 표시

5. **Unix Timestamp Converter**
   - Unix → 날짜
   - 날짜 → Unix
   - 상대 시간 표시 (2 hours ago)

6. **URL Encoder/Decoder**
   - Query string 파싱
   - Pretty print

7. **UUID/ULID Generator**
   - v4 UUID 대량 생성
   - ULID 생성
   - Collision 체크

### Tier 3: 추가 도구
8. **Hash Generator** (MD5, SHA256, SHA512)
9. **Color Converter** (HEX, RGB, HSL)
10. **QR Code Generator**

---

## 기술 스택

```typescript
// Frontend & Backend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

// 상태 관리
- Zustand (가벼움)
- Local Storage (히스토리)

// AI 기능
- OpenAI API (GPT-4o-mini)
- Vercel AI SDK

// 광고
- Google AdSense
- Carbon Ads (개발자 친화적)

// 배포
- Vercel
- 도메인: vercel.app (나중에 커스텀)

// 분석
- Vercel Analytics
- Google Analytics 4
```

---

## 레이아웃 디자인

```
┌─────────────────────────────────────────────────┐
│  [🔧 DevTools Hub]    [검색 Cmd+K]  [다크모드]   │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│ Sidebar  │         Main Tool Area               │
│          │                                      │
│ • JSON   │  [입력 영역]                          │
│ • RegExp │                                      │
│ • Base64 │  ──────────────                      │
│ • JWT    │                                      │
│ • Time   │  [출력 영역]                          │
│ • URL    │                                      │
│ • UUID   │                                      │
│          │  [광고 영역] ←──────────              │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### 모바일 레이아웃
```
┌──────────────────────┐
│ [☰]  DevTools Hub    │
├──────────────────────┤
│ [도구 선택 드롭다운]    │
├──────────────────────┤
│                      │
│   입력 영역           │
│                      │
├──────────────────────┤
│                      │
│   출력 영역           │
│                      │
├──────────────────────┤
│   [광고]             │
└──────────────────────┘
```

---

## 광고 전략

### 위치
1. **사이드바 하단** (300x250 - Medium Rectangle)
2. **도구 결과 하단** (728x90 - Leaderboard)
3. **모바일: 도구 사이** (320x100 - Mobile Banner)

### 예상 수익
```
월 10,000 PV → $10-30
월 100,000 PV → $100-300
월 1,000,000 PV → $1,000-3,000

목표: 월 100만 PV (SEO + 커뮤니티)
```

---

## SEO 전략

### 타겟 키워드
- "json formatter online"
- "regex tester online"
- "base64 decode"
- "jwt decoder"
- "개발자 도구"
- "온라인 개발 툴"

### 최적화
```html
<title>JSON Formatter - DevTools Hub</title>
<meta name="description" content="Free online JSON formatter, validator with TypeScript conversion. No signup required." />
<meta name="keywords" content="json, formatter, validator, online, free" />

<!-- Open Graph -->
<meta property="og:title" content="DevTools Hub - Developer Tools" />
<meta property="og:image" content="/og-image.png" />
```

### 블로그 콘텐츠
- "정규식 완벽 가이드"
- "JWT 토큰 이해하기"
- "Base64 인코딩이란?"
→ SEO 트래픽 유입

---

## 개발 일정

### Week 1: MVP 개발
**Day 1-2**: 프로젝트 셋업 + 레이아웃
- Next.js 프로젝트 생성
- Tailwind + shadcn/ui 설치
- 기본 레이아웃 (Sidebar, Main)
- 다크모드

**Day 3-4**: 핵심 도구 3개
- JSON Formatter
- RegExp Tester
- Base64 Encoder/Decoder

**Day 5**: UX 개선
- Cmd+K 검색
- 단축키 시스템
- 자동 감지 로직
- 로컬 스토리지 히스토리

**Day 6**: 광고 통합
- Google AdSense 신청 (승인 기다림)
- Carbon Ads 대안
- 광고 위치 최적화

**Day 7**: 배포 + SEO
- Vercel 배포
- Meta 태그
- Sitemap
- robots.txt

### Week 2: 추가 도구 + 마케팅
- JWT Debugger
- Unix Time Converter
- URL Encoder
- UUID Generator
- ProductHunt 준비
- Reddit, 개발자 커뮤니티 홍보

### Week 3: AI 기능 추가
- JSON → TypeScript Interface
- RegExp AI 설명
- 에러 로그 분석
- Freemium 모델 테스트

---

## 수익 모델

### Phase 1: 광고 (무료)
```
모든 도구 무료
광고 표시
목표: 트래픽 모으기
```

### Phase 2: Freemium
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
```

---

## 성공 지표

### 단기 (1개월)
- [ ] 배포 완료
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

## 차별화 포인트

1. **AI 통합** (경쟁자 없음)
   - JSON → TypeScript
   - RegExp 한글 설명

2. **최고의 UX**
   - 단축키
   - 자동 감지
   - 실시간 피드백

3. **빠른 속도**
   - 로그인 불필요
   - 즉시 사용

4. **모바일 최적화**
   - 대부분 경쟁자들 데스크탑 중심

---

## 경쟁 분석

| 경쟁자 | 장점 | 단점 | 우리의 차별화 |
|--------|------|------|---------------|
| JSONLint | 단순 | UI 구림, 광고 많음 | 더 나은 UI, AI 기능 |
| regex101 | 강력함 | 복잡함, 느림 | 더 간단, 한글 설명 |
| DevUtils (앱) | 오프라인 | $20, 앱 설치 필요 | 무료, 웹, 크로스플랫폼 |

---

## 다음 액션

1. ✅ 계획 수립 (완료)
2. [ ] Next.js 프로젝트 생성 (바탕화면)
3. [ ] 기본 레이아웃 구현
4. [ ] JSON Formatter 구현
5. [ ] 배포 테스트

준비 됐어요! 시작할까요?
