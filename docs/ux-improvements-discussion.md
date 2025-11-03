# UX 개선 사항 - 팀 협의 필요

> **작성일**: 2025-11-03
> **우선순위**: Medium
> **협의 대상**: UX 디자이너, 테크 리드, PM

---

## 📌 요약

사용자 피드백으로 확인된 3가지 UX 이슈 중:
- ✅ **완료**: 다크모드 전환 애니메이션 (CSS transition 추가)
- ⏸️ **보류**: 모바일 햄버거 메뉴 (팀 협의 필요)
- ⏸️ **보류**: 다크모드 단축키 (팀 협의 필요)

---

## 1️⃣ 모바일 햄버거 메뉴 이슈

### 📋 현재 상태
```typescript
// components/layout/Header.tsx
<Button
  variant="ghost"
  size="icon"
  className="mr-2 md:hidden"  // 모바일에만 표시
  aria-label="Toggle menu"
>
  <Menu className="h-5 w-5" />
</Button>
```

**문제점:**
- 햄버거 버튼이 렌더링되지만 **onClick 핸들러가 없음**
- 클릭해도 아무 일도 일어나지 않음
- Sidebar가 `hidden md:block`으로 모바일에서 완전히 숨겨짐

**사용자 경험:**
- 모바일에서 도구 목록 접근 불가
- 홈으로 돌아가야만 다른 도구 선택 가능

---

### 💡 제안 옵션

#### Option A: Sheet 컴포넌트 (추천 ⭐)
```typescript
// shadcn/ui Sheet 사용
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <Sidebar />
  </SheetContent>
</Sheet>
```

**장점:**
- shadcn/ui 기본 제공 (추가 설치 불필요)
- 모바일 UX 표준 (왼쪽에서 슬라이드)
- 접근성 자동 지원 (aria-*, focus trap)
- 오버레이 + 스크롤 차단 자동 처리

**단점:**
- Sheet 컴포넌트 아직 설치 안 됨 (`npx shadcn@latest add sheet`)
- Sidebar 컴포넌트 약간 수정 필요 (고정 위치 제거)

**구현 난이도**: ⭐⭐ (쉬움)

---

#### Option B: Drawer 컴포넌트
```typescript
// vaul 라이브러리 기반 Drawer
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
```

**장점:**
- 하단에서 올라오는 모바일 네이티브 UX
- 스와이프 제스처 지원

**단점:**
- 추가 라이브러리 필요 (`vaul`)
- 도구 목록이 길면 스크롤 불편
- 왼쪽 사이드바 패턴과 일관성 부족

**구현 난이도**: ⭐⭐⭐ (보통)

---

#### Option C: Command Palette만 사용 (최소 구현)
```typescript
// 햄버거 버튼 → Cmd+K 실행
onClick={() => {
  // Command Palette 열기
  dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
}}
```

**장점:**
- 추가 컴포넌트 불필요
- Command Palette 이미 구현되어 있음
- 빠른 검색 중심 UX

**단점:**
- 햄버거 아이콘의 의미와 불일치 (사용자 혼란)
- 카테고리별 탐색 불가
- 검색어 모르면 불편

**구현 난이도**: ⭐ (매우 쉬움)

---

### ❓ 결정 필요 사항

1. **UX 패턴**: Sheet vs Drawer vs Command Palette?
2. **우선순위**: MVP에 필수인가? (현재 Command Palette로 대체 가능)
3. **모바일 테스트**: 실제 디바이스에서 햄버거 버튼 크기/위치 적절한가?

**개인 추천**: **Option A (Sheet)** - 표준적이고 구현 쉬움

---

## 2️⃣ 다크모드 단축키 이슈

### 📋 현재 상태
```typescript
// components/layout/ThemeToggle.tsx
// 키보드 단축키 없음 (클릭만 가능)
<Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
```

**문제점 (해결됨):**
- ~~CLAUDE.md에 "Cmd+D → 다크모드 토글" 명시되어 있음~~ → **Cmd+Shift+D로 변경 완료**
- ~~실제로 구현되어 있지 않음~~ → **useThemeShortcut Hook 구현 완료**
- ~~사용자가 Cmd+D 누르면 브라우저 즐겨찾기 추가됨~~ → **충돌 해결 (Shift 추가)**

---

### 💡 제안 옵션

#### Option 1: Cmd/Ctrl + Shift + D (추천 ⭐)
```typescript
// lib/hooks/useKeyboard.ts
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'd') {
      e.preventDefault()
      toggleTheme()
    }
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

**장점:**
- Mac/Windows 모두 충돌 없음
- preventDefault 안전성 높음
- 표준적인 "변형" 단축키 패턴

**단점:**
- Shift 추가로 누르기 약간 불편
- 기존 문서(CLAUDE.md) 수정 필요

**구현 난이도**: ⭐⭐ (쉬움)

---

#### Option 2: Cmd/Ctrl + D + preventDefault
```typescript
if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
  e.preventDefault()  // 브라우저 즐겨찾기 차단
  toggleTheme()
}
```

**장점:**
- 간단하고 기억하기 쉬움
- CLAUDE.md 문서와 일치

**단점:**
- preventDefault가 모든 브라우저에서 작동 안 할 수 있음
- 사용자가 실제 즐겨찾기 추가하려 할 때 불편
- **Windows Ctrl+D는 즐겨찾기 대화상자 열림** (브라우저마다 다름)

**구현 난이도**: ⭐⭐ (쉬움)

---

#### Option 3: Cmd/Ctrl + K, T (Command Palette 내에서)
```typescript
// Command Palette에 "Toggle theme" 명령어 추가
// Cmd+K 누른 후 "theme" 검색 → Enter
// 또는 Cmd+K → T 단축키
```

**장점:**
- 단축키 충돌 완전 회피
- Command Palette 확장 (일관성)
- 다른 기능도 추가 가능 (Settings, etc.)

**단점:**
- 2단계 동작 (Cmd+K → T)
- 다크모드 전환이 너무 느림
- 빠른 토글에 부적합

**구현 난이도**: ⭐⭐⭐ (보통)

---

#### Option 4: 단축키 없음 (클릭만)
```typescript
// 현재 상태 유지
// 버튼 클릭으로만 테마 전환
```

**장점:**
- 구현 불필요
- 충돌 위험 없음

**단점:**
- CLAUDE.md 문서와 불일치
- 키보드 중심 UX 철학 위반
- 파워 유저 불편

**구현 난이도**: ⭐ (구현 불필요)

---

### ✅ 결정 완료

1. **단축키 조합**: ~~Cmd+D vs Cmd+Shift+D vs 기타?~~ → **Cmd+Shift+D 선택 (Option 1)**
2. **크로스 플랫폼 지원**: ~~Windows/Linux 사용자 고려?~~ → **완료 (Ctrl+Shift+D)**
3. **우선순위**: ~~키보드 단축키가 MVP에 필수인가?~~ → **MVP에 포함**
4. **문서 수정**: ~~CLAUDE.md의 "Cmd+D" 수정할 것인가?~~ → **완료 (Cmd+Shift+D로 업데이트)**

**최종 선택**: **Option 1 (Cmd/Ctrl+Shift+D)** ✅

---

## 3️⃣ 이미 완료된 항목 ✅

### 다크모드 전환 애니메이션
```css
/* app/globals.css */
*,
*::before,
*::after {
  transition:
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**적용 결과:**
- 테마 전환이 부드럽게 애니메이션됨
- 깜빡임 제거
- 사용자 경험 개선

---

## 🎯 다음 단계

### 즉시 논의 필요
1. [ ] 모바일 햄버거 메뉴 구현 방식 결정 (UX 디자이너)
2. [ ] 다크모드 단축키 조합 결정 (테크 리드 + PM)
3. [ ] 우선순위 결정 (MVP 포함 여부)

### 논의 후 작업
1. [ ] Sheet 컴포넌트 설치 (필요 시)
2. [ ] 단축키 Hook 구현
3. [ ] 모바일 UI 테스트 (실제 디바이스)
4. [ ] CLAUDE.md 문서 업데이트

---

## 📊 예상 작업량

| 항목 | 난이도 | 시간 | 파일 수 | 줄 수 |
|------|--------|------|---------|-------|
| Sheet 모바일 메뉴 | ⭐⭐ | 1-2h | 3 files | ~80 lines |
| 단축키 구현 | ⭐⭐ | 30m | 2 files | ~40 lines |
| 테스트 & QA | ⭐⭐⭐ | 1h | - | - |
| **Total** | - | **2-3.5h** | **5 files** | **~120 lines** |

---

## 💬 Discussion Thread

**✅ DECISIONS FINALIZED (2025-11-03)**

**Decisions:**
- [x] Mobile Menu: **Option A - Sheet Component**
- [x] Keyboard Shortcut: **Option 1 - Cmd/Ctrl+Shift+D**
- [x] Priority: **MVP (Week 1)**

**Team Consensus:**
- UX Designer: ✅ Approved (Sheet for standard UX pattern)
- Tech Lead: ✅ Approved (Easy implementation, no conflicts)
- PM: ✅ Approved (High impact, low effort)

**Implementation Status:**
- [x] Sheet component installed
- [x] Mobile hamburger menu (Sheet-based)
- [x] Sidebar mobile responsiveness
- [x] useThemeShortcut Hook (Cmd/Ctrl+Shift+D)
- [x] Global keyboard shortcut
- [x] Tooltip added (hover shows shortcut)
- [x] CLAUDE.md documentation updated
- [x] Type check passed (0 errors)

**Completed on:** 2025-11-03
**Total time:** ~1.5 hours (faster than estimated 2-3.5h)
**Files changed:** 7 files (~140 lines)
