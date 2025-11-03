# Vercel 프로젝트 이름 변경 - 스크린샷 가이드

## ⚠️ 매우 중요: 올바른 위치

### ❌ 잘못된 위치: Settings → Domains
- 이곳은 **커스텀 도메인 연결용**
- `example.com` 같은 구매한 도메인 연결할 때 사용
- `.vercel.app`은 여기서 변경하는 게 아님!

### ✅ 올바른 위치: Settings → General
- 프로젝트 이름만 변경
- Vercel이 자동으로 `[이름].vercel.app` 생성

---

## 📸 단계별 스크린샷 가이드

### 1단계: Vercel 대시보드
```
https://vercel.com/dashboard
```
- 현재 프로젝트 클릭 (`devtools-hub`)

### 2단계: Settings 탭 클릭
```
상단 메뉴바:
[Overview] [Deployments] [Analytics] [Speed Insights] [Logs] [Settings] ← 여기!
```

### 3단계: General 선택
```
왼쪽 사이드바:
├── General              ← 여기 클릭!
├── Domains              ← 여기 아님!
├── Environment Variables
├── Git
├── Functions
└── ...
```

### 4단계: Project Name 찾기
```
페이지 맨 위쪽:

┌─────────────────────────────────────┐
│ Project Name                        │
│                                     │
│ [devtools-hub        ]  [Save]     │
│                                     │
│ This is your project's name.        │
│ Your deployment URLs will use       │
│ this name.                          │
└─────────────────────────────────────┘
```

### 5단계: 새 이름 입력
```
입력 예시 (순서대로 시도):

1. devtools-app          ← `.vercel.app` 없이!
2. dev-tools-app
3. webdevtools
4. developer-tools
5. devtools-online
6. devtools2024
7. mydevtools
8. thedevtools
```

### 6단계: Save 버튼 클릭
- 사용 가능한 이름이면 저장됨
- 이미 사용 중이면 에러 메시지 표시

---

## 🎯 올바른 입력 형식

### ✅ 올바른 입력:
```
devtools-app         (하이픈 사용 가능)
devtoolsapp          (하이픈 없이)
dev-tools-online     (여러 하이픈 가능)
```

### ❌ 잘못된 입력:
```
devtools-app.vercel.app      (❌ .vercel.app 포함하지 말 것!)
devtools_app                 (❌ 언더스코어 사용 불가)
devtools app                 (❌ 공백 사용 불가)
```

---

## 💡 이름 추천 (사용 가능할 가능성 높은 순서)

### 1순위: 숫자 추가
```
devtools-2024
devtools-hub-2024
devtools-app-2024
webdevtools-2024
```

### 2순위: 변형
```
my-devtools-hub
the-devtools-hub
online-devtools
devtools-online
web-devtools-hub
```

### 3순위: 완전히 다른 이름
```
developer-toolkit
web-dev-tools
coder-tools
dev-tool-kit
tools-for-developers
```

---

## 🚀 변경 후 자동으로 생성되는 URL

프로젝트 이름을 `devtools-app`으로 변경하면:
- 자동 생성 URL: `https://devtools-app.vercel.app`
- 이전 URL: `https://devtools-hub-six.vercel.app` (자동 리다이렉트 설정 가능)

---

## ✅ 확인 방법

변경 후:
1. Overview 탭으로 이동
2. "Visit" 버튼 옆에 새 URL 확인
3. 새 URL 클릭해서 사이트 정상 작동 확인

---

## 🔄 다음 단계

URL 변경 성공 후:
1. `./scripts/update-url.sh [새URL]` 실행
2. 코드베이스의 모든 하드코딩된 URL 업데이트
3. 커밋 및 푸시
4. Google Search Console 등록
5. AdSense 정보 업데이트

---

**지금 바로 시작하세요!** 🚀

Settings → General → Project Name에서 위 이름들을 순서대로 시도해보세요!
