# Google AdSense 설정 가이드

## 📋 개요

DevTools Hub는 Google AdSense를 통한 광고 수익화를 지원합니다.

---

## 🚀 AdSense 계정 승인받기

### 1단계: AdSense 계정 생성

1. https://www.google.com/adsense 접속
2. "시작하기" 클릭
3. 웹사이트 URL 입력: `https://devtools-hub.vercel.app`
4. 이메일 주소 입력 (Gmail 추천)

### 2단계: 사이트에 AdSense 코드 추가

AdSense에서 제공하는 코드는 **이미 구현되어 있습니다!**

다음 파일에 코드가 추가되어 있습니다:
- `app/layout.tsx` - AdSense 스크립트 로드
- `components/ads/AdSense.tsx` - 광고 컴포넌트
- `components/ads/AdSenseScript.tsx` - 스크립트 컴포넌트

### 3단계: 승인 대기 (1-2주)

AdSense 팀이 사이트를 검토합니다.

**승인 기준**:
- ✅ 10개 이상의 고품질 페이지 (완료!)
- ✅ 유용한 콘텐츠 제공 (완료!)
- ✅ 개인정보 보호정책 필요 (추가 필요)
- ✅ 충분한 트래픽 (배포 후 수집 필요)

### 4단계: 클라이언트 ID 받기

승인되면:
1. AdSense 대시보드에서 "계정 → 계정 정보"
2. "게시자 ID" 복사 (형식: `ca-pub-XXXXXXXXXXXXXXXX`)

---

## 🔧 프로젝트에 적용하기

### 환경 변수 설정

`.env.local` 파일 생성 또는 수정:

```bash
# .env.local
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

`.env.example`에 템플릿이 있습니다.

### Vercel 환경 변수 설정

1. Vercel 대시보드 → Settings → Environment Variables
2. `NEXT_PUBLIC_ADSENSE_CLIENT` 추가
3. Value: `ca-pub-XXXXXXXXXXXXXXXX`
4. Production, Preview, Development 모두 체크
5. Save

---

## 📍 광고 배치하기

### 자동 광고 (추천)

AdSense가 자동으로 최적 위치에 광고를 배치합니다.

AdSense 대시보드에서:
1. "광고" → "사이트별" 클릭
2. 사이트 선택
3. "자동 광고" 켜기

### 수동 광고 (커스텀 배치)

특정 위치에 광고를 배치하려면:

```tsx
import AdSense from '@/components/ads/AdSense'

export default function SomePage() {
  return (
    <div>
      <h1>Page Title</h1>

      {/* 광고 추가 */}
      <AdSense
        adSlot="1234567890"  // AdSense에서 생성한 광고 단위 ID
        adFormat="auto"      // auto, fluid, rectangle, vertical, horizontal
      />

      <p>Content...</p>
    </div>
  )
}
```

### 광고 단위 생성

AdSense 대시보드에서:
1. "광고" → "광고 단위별" 클릭
2. "디스플레이 광고" 선택
3. 이름 입력 (예: "JSON Formatter - Top")
4. 생성 → 광고 슬롯 ID 복사

---

## 💡 광고 배치 권장 위치

### 각 도구 페이지

```
┌─────────────────────────┐
│  Header                 │
├─────────────────────────┤
│  Tool Title             │
│  [광고 1 - Horizontal]   │ ← 추천 위치
├─────────────────────────┤
│  Input Section          │
│  Output Section         │
├─────────────────────────┤
│  [광고 2 - Rectangle]    │ ← 추천 위치
├─────────────────────────┤
│  Tips Section           │
└─────────────────────────┘
```

### 홈페이지

```
┌─────────────────────────┐
│  Hero Section           │
├─────────────────────────┤
│  [광고 - Horizontal]     │ ← 추천 위치
├─────────────────────────┤
│  Tool Cards Grid        │
└─────────────────────────┘
```

---

## 📊 예상 수익

### 트래픽별 예상 수익 (평균)

```
일 방문자   →  월 수익 (예상)
─────────────────────────
1,000명     →  $10-30
10,000명    →  $100-300
50,000명    →  $500-1,500
100,000명   →  $1,000-3,000
```

**실제 수익은 다음에 따라 달라집니다**:
- 트래픽 국가 (미국/유럽 > 아시아)
- 광고 클릭률 (CTR)
- 광고 단가 (CPC)
- 사용자 행동 (체류 시간, 페이지뷰)

---

## 🎯 수익 최적화 팁

### 1. 트래픽 늘리기
- SEO 최적화 (완료!)
- ProductHunt 출시
- Reddit, Hacker News 홍보
- 유용한 콘텐츠 추가

### 2. 광고 배치 최적화
- 사용자 경험 해치지 않는 선에서
- A/B 테스트로 최적 위치 찾기
- 자동 광고 + 수동 광고 조합

### 3. 페이지 로딩 속도 유지
- 광고가 너무 많으면 느려짐
- 페이지당 2-3개 광고 권장

### 4. 고품질 트래픽 유지
- 봇 트래픽 차단
- 유기적 트래픽 증가
- 사용자 체류 시간 증가

---

## ⚠️ 주의사항

### 금지 사항

AdSense 정책을 위반하면 계정이 정지될 수 있습니다:

❌ **절대 하지 말 것**:
- 자신의 광고 클릭
- 광고 클릭 유도 ("여기 클릭!" 등)
- 봇 트래픽 사용
- 성인 콘텐츠
- 불법 콘텐츠

✅ **꼭 지킬 것**:
- 자연스러운 광고 배치
- 유용한 콘텐츠 제공
- 개인정보 보호정책 게시
- 쿠키 동의 배너 추가

### 개인정보 보호정책 필수

AdSense 사용 시 개인정보 보호정책 페이지가 필요합니다.

템플릿: https://www.privacypolicygenerator.info/

필수 포함 내용:
- 쿠키 사용
- Google AdSense 사용
- 데이터 수집 및 사용
- 사용자 권리

---

## 📈 성과 추적

### AdSense 대시보드

https://www.google.com/adsense 에서:
- 일일 수익 확인
- 클릭률 (CTR) 분석
- 페이지별 성과 비교
- 최적화 제안 확인

### Google Analytics 연동

광고 성과를 더 자세히 분석하려면:
1. Google Analytics 4 설정
2. AdSense와 연동
3. 사용자 행동과 광고 성과 비교

---

## 🆘 문제 해결

### 광고가 표시되지 않을 때

1. **개발 환경에서는 광고가 안 보입니다**
   - Production 빌드에서만 표시됩니다
   - 대신 "Ad Placeholder" 표시

2. **환경 변수 확인**
   ```bash
   echo $NEXT_PUBLIC_ADSENSE_CLIENT
   ```

3. **브라우저 콘솔 확인**
   - 에러 메시지 확인
   - AdBlock 꺼보기

4. **AdSense 승인 확인**
   - AdSense 대시보드에서 상태 확인
   - 승인 이메일 확인

### 수익이 적을 때

1. **트래픽 분석**
   - Google Analytics로 트래픽 확인
   - 어떤 페이지가 인기있는지 확인

2. **광고 배치 최적화**
   - 히트맵 도구 사용 (Hotjar 등)
   - 사용자가 많이 보는 위치에 광고

3. **콘텐츠 개선**
   - 고품질 도구 추가
   - 사용자 피드백 반영

---

## 📚 참고 자료

- [AdSense 고객센터](https://support.google.com/adsense)
- [AdSense 정책 센터](https://support.google.com/adsense/answer/48182)
- [Next.js와 AdSense 통합](https://nextjs.org/docs/basic-features/script)

---

**준비 완료!** 🎉

AdSense 승인만 받으면 바로 광고를 게재할 수 있습니다.
