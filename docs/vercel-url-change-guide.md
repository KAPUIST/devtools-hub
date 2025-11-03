# Vercel URL 변경 가이드

## 문제
- 현재 URL: `https://devtools-hub-six.vercel.app`
- 원하는 URL: `https://[깔끔한이름].vercel.app`
- 원인: `devtools-hub` 이름이 이미 다른 사람이 사용 중

---

## 해결 방법

### 1️⃣ Vercel 대시보드에서 프로젝트 이름 변경

#### 단계별 가이드:

1. **Vercel 대시보드 접속**
   ```
   https://vercel.com/dashboard
   ```

2. **프로젝트 선택**
   - `devtools-hub` (또는 현재 프로젝트 이름) 클릭

3. **Settings 탭 이동**
   - 상단 메뉴에서 "Settings" 클릭

4. **General 섹션에서 이름 변경**
   - "Project Name" 입력란 찾기
   - 새 이름 입력 (아래 추천 이름 참고)
   - "Save" 버튼 클릭

5. **자동 재배포**
   - Vercel이 자동으로 새 URL로 재배포
   - 약 1-2분 소요

---

## 🎯 추천 프로젝트 이름

### 간결하고 기억하기 쉬운 이름 (우선순위 순)

1. **devtoolshub** ⭐⭐⭐
   - URL: `https://devtoolshub.vercel.app`
   - 장점: 짧고 간결, 하이픈 없음
   - 추천도: 최고

2. **dev-tools-online** ⭐⭐⭐
   - URL: `https://dev-tools-online.vercel.app`
   - 장점: 명확한 의미, SEO 친화적
   - 추천도: 높음

3. **devtools-io** ⭐⭐
   - URL: `https://devtools-io.vercel.app`
   - 장점: 짧고 기술적인 느낌
   - 추천도: 중간

4. **devtools-kit** ⭐⭐
   - URL: `https://devtools-kit.vercel.app`
   - 장점: 간결, toolkit 느낌
   - 추천도: 중간

5. **webdevtools-hub** ⭐
   - URL: `https://webdevtools-hub.vercel.app`
   - 장점: 명확한 타겟팅
   - 단점: 조금 김
   - 추천도: 낮음

---

## 🔄 코드베이스 URL 업데이트

새 이름으로 변경한 후, 코드의 하드코딩된 URL을 모두 업데이트해야 합니다.

### 자동 업데이트 스크립트 사용

```bash
# 예시: devtoolshub로 변경한 경우
./scripts/update-url.sh devtoolshub.vercel.app

# 변경 사항 확인
git diff

# 커밋 및 푸시
git add -A
git commit -m "fix: Update domain to devtoolshub.vercel.app"
git push origin main
```

### 업데이트되는 파일 목록:
- `.env.example`
- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/[locale]/json-formatter/metadata.ts`
- `app/[locale]/regex-tester/metadata.ts`
- `app/[locale]/base64/metadata.ts`
- `app/[locale]/jwt-debugger/metadata.ts`
- `app/[locale]/uuid-generator/metadata.ts`
- `app/[locale]/hash-generator/metadata.ts`
- `app/[locale]/url-encoder/metadata.ts`
- `app/[locale]/timestamp-converter/metadata.ts`
- `app/[locale]/color-converter/metadata.ts`
- `app/[locale]/qr-generator/metadata.ts`
- `app/[locale]/privacy/page.tsx`
- `app/[locale]/qr-generator/page.tsx`

---

## 💰 대안: 커스텀 도메인 구매 (권장)

### 장기적으로 더 나은 방법

**장점**:
- 브랜드 아이덴티티 강화
- SEO에 더 유리
- URL 변경 걱정 없음
- 전문적인 이미지

**추천 도메인**:
- `devtoolshub.com` (약 $12/년)
- `devtools.io` (약 $30/년)
- `devkit.app` (약 $20/년)

**구매처**:
- Namecheap (저렴)
- Google Domains (간편)
- Cloudflare (무료 SSL, CDN)

### 커스텀 도메인 연결 방법 (Vercel)

1. 도메인 구매 후 Vercel 대시보드 접속
2. Settings → Domains
3. "Add Domain" 클릭
4. 도메인 입력 (예: devtoolshub.com)
5. DNS 레코드 설정 (Vercel이 자동 안내)
6. 약 5분-24시간 후 활성화

---

## ✅ 체크리스트

### Vercel 이름 변경 후:
- [ ] Vercel 대시보드에서 프로젝트 이름 변경
- [ ] 새 URL 확인 (https://[새이름].vercel.app)
- [ ] `./scripts/update-url.sh` 실행
- [ ] 변경 사항 커밋 및 푸시
- [ ] 배포 완료 확인
- [ ] 새 URL에서 사이트 정상 작동 확인

### 커스텀 도메인 구매 시:
- [ ] 도메인 구매
- [ ] Vercel에 커스텀 도메인 연결
- [ ] DNS 레코드 설정
- [ ] SSL 인증서 자동 발급 확인 (Vercel 자동)
- [ ] `./scripts/update-url.sh` 실행 (커스텀 도메인으로)
- [ ] 변경 사항 커밋 및 푸시

---

## 🚨 주의사항

### Google AdSense
- URL 변경 후 AdSense 신청 정보 업데이트 필요
- AdSense 대시보드에서 사이트 URL 변경

### Google Search Console
- 새 URL로 다시 등록 필요
- 기존 등록 삭제 또는 병행 관리

### 소셜 미디어 링크
- 변경된 URL로 모든 링크 업데이트

---

## 💡 추천 결정

### 즉시 해결 (무료)
→ **Vercel 프로젝트 이름을 `devtoolshub`로 변경**
- 0원, 5분 소요
- 깔끔한 URL 확보

### 장기 투자 (유료)
→ **`devtoolshub.com` 도메인 구매**
- 연 $12, 브랜드 강화
- 3개월 후 트래픽 늘면 고려

---

**지금 바로 시작하세요!** 🚀

1. https://vercel.com/dashboard 접속
2. Settings → General → Project Name 변경
3. `devtoolshub` 입력 후 Save
4. `./scripts/update-url.sh devtoolshub.vercel.app` 실행
