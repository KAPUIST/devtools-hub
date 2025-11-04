# Sprint 3 Planning - DevTools Hub 차기 작업

**작성일**: 2025-11-04
**목표**: 사용자 경험 개선 및 차별화 기능 구현
**기간**: 2일 (16시간)

---

## 📊 경쟁 분석: 우리의 차별점

### 경쟁사 대비 우리의 장점

#### 1. 속도 (Performance)
- **우리**: 페이지 로드 0.5초 이내, 실시간 처리
- **경쟁사** (jsonformatter.org, regex101.com 등): 3-5초 로딩, 광고 과다로 느림
- **차별점**: 광고는 최소화, Vercel Edge Network로 전세계 빠른 응답

#### 2. 모바일 최적화 (Mobile-First)
- **우리**: 완벽한 반응형, 모바일에서도 100% 사용 가능, 햄버거 메뉴
- **경쟁사**: 대부분 데스크톱 위주, 모바일에서 사용 불가능
- **차별점**: 개발자도 이동 중에 도구 필요함 (스타벅스, 지하철)

#### 3. 초보자 친화적 (Beginner-Friendly)
- **우리**: RegExp 15개 프리셋, 정규식 몰라도 사용 가능
- **경쟁사**: 정규식 지식 필수, 학습 곡선 높음
- **차별점**: "이메일 검증하기" 버튼 클릭만으로 즉시 사용

#### 4. 올인원 (All-in-One)
- **우리**: 10개 도구를 한 사이트에, Cmd+K로 즉시 전환
- **경쟁사**: 각 도구마다 다른 사이트 (탭 10개 열어야 함)
- **차별점**: 북마크 1개면 충분, 탭 지옥 해결

#### 5. 다국어 지원 (i18n)
- **우리**: 4개 언어 (en, ko, ja, zh) 완벽 지원
- **경쟁사**: 영어만 지원
- **차별점**: 아시아 시장 공략 가능 (한국/일본/중국 개발자)

#### 6. 키보드 중심 UX (Keyboard-Centric)
- **우리**: Cmd+K, Cmd+C, Cmd+Enter 등 모든 작업 단축키
- **경쟁사**: 마우스 클릭만 가능
- **차별점**: 개발자는 키보드를 선호함 (생산성 3배)

---

## 💡 개발자 Pain Points & 우리의 솔루션

| Pain Point | 현재 해결책 (경쟁사) | 우리의 솔루션 | 영향도 | 구현 상태 |
|------------|---------------------|---------------|--------|----------|
| "너무 느려!" | 광고 과다, 느린 서버 | 실시간 포맷팅 (300ms debounce) | ⭐⭐⭐ | ✅ 완료 |
| "모바일에서 못써!" | 데스크톱 전용 | 완벽한 모바일 최적화 | ⭐⭐⭐ | ✅ 완료 |
| "정규식 너무 어려워!" | 튜토리얼만 제공 | 15개 프리셋, 3단계 워크플로우 | ⭐⭐⭐ | ✅ 완료 |
| "탭 너무 많아!" | 도구마다 다른 사이트 | 올인원, Cmd+K로 전환 | ⭐⭐ | ✅ 완료 |
| "이전 작업 기록 없어!" | 매번 다시 입력 | 로컬 히스토리 | ⭐⭐ | 🚧 Sprint 3 |
| "붙여넣기 후 도구 찾기 귀찮아!" | 수동으로 도구 선택 | 자동 감지 | ⭐⭐ | 🚧 Sprint 3 |

---

## 🚀 Sprint 3 MVP - 우선순위별 구현 계획

### Priority 1: Local History (필수, 6시간)

**문제점**: 개발자들은 같은 JSON/JWT를 반복해서 검증함. 매번 복사-붙여넣기는 비효율적.

**해결책**: 각 도구의 최근 10개 입력/출력을 localStorage에 저장

#### 구현 상세

**1. useToolHistory Hook**
```typescript
// lib/hooks/useToolHistory.ts
import { useState, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'

interface HistoryItem {
  id: string
  timestamp: number
  input: string
  output?: string
  toolName: string
  isFavorite?: boolean
}

export function useToolHistory(toolName: string, maxItems = 10) {
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const key = `devtools-hub-history-${toolName}`
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load history:', error)
        setHistory([])
      }
    }
  }, [toolName])

  // Save to localStorage when history changes
  const addToHistory = useCallback((input: string, output?: string) => {
    const newItem: HistoryItem = {
      id: nanoid(),
      timestamp: Date.now(),
      input,
      output,
      toolName,
    }

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, maxItems)
      const key = `devtools-hub-history-${toolName}`
      localStorage.setItem(key, JSON.stringify(updated))
      return updated
    })
  }, [toolName, maxItems])

  const clearHistory = useCallback(() => {
    setHistory([])
    const key = `devtools-hub-history-${toolName}`
    localStorage.removeItem(key)
  }, [toolName])

  const toggleFavorite = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
      const key = `devtools-hub-history-${toolName}`
      localStorage.setItem(key, JSON.stringify(updated))
      return updated
    })
  }, [toolName])

  const favorites = history.filter((item) => item.isFavorite)

  return { history, addToHistory, clearHistory, toggleFavorite, favorites }
}
```

**2. HistoryPanel 컴포넌트**
```typescript
// components/tools/HistoryPanel.tsx
"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, ChevronUp, ChevronDown, Trash, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface HistoryItem {
  id: string
  timestamp: number
  input: string
  output?: string
  toolName: string
  isFavorite?: boolean
}

interface HistoryPanelProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onClear: () => void
  onToggleFavorite?: (id: string) => void
}

export function HistoryPanel({
  history,
  onSelect,
  onClear,
  onToggleFavorite
}: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()

  if (history.length === 0) return null

  return (
    <Card>
      <CardHeader
        className="cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <History className="h-4 w-4" />
            {t('common.history')} ({history.length})
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-md border hover:bg-accent cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                </span>
                {onToggleFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(item.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star
                      className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
                    />
                  </button>
                )}
              </div>
              <div onClick={() => onSelect(item)}>
                <pre className="text-xs truncate font-mono">{item.input}</pre>
              </div>
            </div>
          ))}

          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Trash className="h-4 w-4 mr-2" />
            {t('common.clearHistory')}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
```

**3. 적용 예시 (JSON Formatter)**
```typescript
// app/[locale]/json-formatter/page.tsx
import { useToolHistory } from '@/lib/hooks/useToolHistory'
import { HistoryPanel } from '@/components/tools/HistoryPanel'

export default function JsonFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const { history, addToHistory, clearHistory, toggleFavorite } = useToolHistory('json-formatter')

  const handleFormat = () => {
    const result = formatJson(input, indentSize)
    if (result.success && result.formatted) {
      addToHistory(input, result.formatted) // 히스토리에 저장
      setOutput(result.formatted)
    }
  }

  return (
    <div className="space-y-6">
      {/* 기존 UI */}

      {/* 히스토리 패널 */}
      <HistoryPanel
        history={history}
        onSelect={(item) => setInput(item.input)}
        onClear={clearHistory}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}
```

#### 적용 대상 도구 (10개)
- [x] JSON Formatter
- [ ] RegExp Tester
- [ ] Base64 Encoder/Decoder
- [ ] JWT Debugger
- [ ] Timestamp Converter
- [ ] URL Encoder/Decoder
- [ ] UUID Generator (히스토리 의미 없음, 제외 고려)
- [ ] Hash Generator
- [ ] Color Converter
- [ ] QR Code Generator

---

### Priority 2: Smart Paste Detection (핵심, 3시간)

**문제점**: 사용자가 JWT를 복사했는데 JSON Formatter에 붙여넣으면 자동으로 JWT Debugger로 이동해야 함.

**해결책**: 클립보드 내용을 분석해서 자동으로 적합한 도구로 리다이렉트

#### 구현 상세

**1. detectPasteType 유틸리티**
```typescript
// lib/tools/detectPasteType.ts
export type ToolType =
  | 'json-formatter'
  | 'jwt-debugger'
  | 'base64'
  | 'url-encoder'
  | 'timestamp-converter'
  | 'uuid-generator'
  | null

export function detectPasteType(text: string): ToolType {
  const trimmed = text.trim()

  // 1. JWT Detection (eyJ로 시작하는 3-part token)
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(trimmed)) {
    return 'jwt-debugger'
  }

  // 2. JSON Detection (가장 일반적)
  try {
    JSON.parse(trimmed)
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return 'json-formatter'
    }
  } catch {}

  // 3. Base64 Detection (길이 4의 배수, A-Za-z0-9+/= 문자만, 최소 20자)
  if (
    /^[A-Za-z0-9+/]+=*$/.test(trimmed) &&
    trimmed.length % 4 === 0 &&
    trimmed.length > 20
  ) {
    return 'base64'
  }

  // 4. URL Encoded Detection (%XX 패턴)
  if (/%[0-9A-Fa-f]{2}/.test(trimmed) && trimmed.length > 10) {
    return 'url-encoder'
  }

  // 5. Unix Timestamp Detection (10자리 또는 13자리 숫자)
  if (/^\d{10}$/.test(trimmed) || /^\d{13}$/.test(trimmed)) {
    return 'timestamp-converter'
  }

  // 6. UUID Detection (8-4-4-4-12 형식)
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) {
    return 'uuid-generator'
  }

  return null
}

// 도구 이름을 사람이 읽기 쉬운 형태로 변환
export function getToolDisplayName(toolType: ToolType): string {
  const names: Record<Exclude<ToolType, null>, string> = {
    'json-formatter': 'JSON Formatter',
    'jwt-debugger': 'JWT Debugger',
    'base64': 'Base64 Encoder/Decoder',
    'url-encoder': 'URL Encoder/Decoder',
    'timestamp-converter': 'Timestamp Converter',
    'uuid-generator': 'UUID Generator',
  }
  return toolType ? names[toolType] : ''
}
```

**2. SmartPasteDetector 글로벌 컴포넌트**
```typescript
// components/layout/SmartPasteDetector.tsx
"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { detectPasteType, getToolDisplayName } from '@/lib/tools/detectPasteType'
import { toast } from 'sonner'

export function SmartPasteDetector() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // textarea나 input에서 붙여넣기하면 무시 (정상적인 입력)
      const target = e.target as HTMLElement
      if (
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'INPUT' ||
        target.isContentEditable
      ) {
        return
      }

      const text = e.clipboardData?.getData('text')
      if (!text || text.length < 5) return

      const detectedType = detectPasteType(text)
      if (!detectedType) return

      const currentTool = pathname.split('/').pop()

      // 이미 올바른 도구에 있으면 무시
      if (currentTool === detectedType) return

      // 홈페이지에서는 작동하지 않음
      if (pathname.endsWith('/en') || pathname.endsWith('/ko') ||
          pathname.endsWith('/ja') || pathname.endsWith('/zh')) {
        return
      }

      e.preventDefault()

      // 자동으로 올바른 도구로 이동
      const displayName = getToolDisplayName(detectedType)
      toast.info(`Detected ${displayName}. Redirecting...`, {
        duration: 2000,
      })

      // URL 파라미터로 붙여넣은 텍스트 전달
      const encodedText = encodeURIComponent(text)
      router.push(`/${locale}/${detectedType}?paste=${encodedText}`)
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [router, pathname, locale])

  return null // 렌더링하지 않음
}
```

**3. Layout에 추가**
```typescript
// app/[locale]/layout.tsx
import { SmartPasteDetector } from '@/components/layout/SmartPasteDetector'
import { Toaster } from 'sonner' // Toast 알림용

export default async function LocaleLayout({ children, params }) {
  // ...

  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <SmartPasteDetector />
          <Toaster position="top-center" />
          {/* 기존 UI */}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**4. 각 도구에서 paste 파라미터 처리**
```typescript
// app/[locale]/json-formatter/page.tsx
import { useSearchParams } from 'next/navigation'

export default function JsonFormatterPage() {
  const searchParams = useSearchParams()
  const [input, setInput] = useState("")

  useEffect(() => {
    const pastedText = searchParams.get('paste')
    if (pastedText) {
      setInput(decodeURIComponent(pastedText))
      // URL에서 파라미터 제거 (깔끔하게)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [searchParams])

  // ...
}
```

---

### Priority 3: OG Image 생성 (필수, 1시간)

**문제점**: 소셜 미디어에서 공유할 때 기본 썸네일이 표시됨

**해결책**: 1200×630 전문 디자인 OG 이미지 생성

#### 디자인 요구사항

**크기**: 1200 × 630 (Facebook/Twitter 표준)

**내용**:
- DevTools Hub 로고 (중앙 상단)
- "10 Free Developer Tools" (대제목)
- "JSON, RegExp, Base64, JWT, and more" (부제목)
- 도구 아이콘 10개 (Grid 형태)
- "No Signup Required • Mobile Optimized • 4 Languages" (특징)
- devtools-hub-app.vercel.app (하단)

**색상**:
- Background: 다크 그라데이션 (#0f172a → #1e293b)
- Text: White (#ffffff)
- Accent: Blue (#3b82f6)

**도구**: Canva 또는 Figma 사용

#### 구현

```bash
# 1. Canva에서 디자인 생성
# 2. PNG로 다운로드
# 3. public/og-image.png에 저장
```

**메타 태그 검증**
```typescript
// app/[locale]/layout.tsx - 이미 설정되어 있음
export const metadata = {
  metadataBase: new URL('https://devtools-hub-app.vercel.app'),
  openGraph: {
    images: ['/og-image.png'], // ✅
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  }
}
```

**테스트**:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

### Priority 4: Share URL 기능 (Nice to Have, 5시간)

**문제점**: 팀원과 JSON/RegExp를 공유할 때 텍스트 전체를 복사해야 함

**해결책**: 짧은 URL 생성해서 쉽게 공유 (예: `devtools-hub.app/s/a3b4c5d6`)

#### 구현 상세

**1. Vercel KV 설정**
```bash
# Vercel Dashboard에서 KV 스토어 생성
# .env.local에 자동 추가됨
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

**2. Share 유틸리티**
```typescript
// lib/share.ts
import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid'

interface ShareData {
  toolName: string
  data: any
  createdAt: number
}

export async function createShareUrl(toolName: string, data: any): Promise<string> {
  const id = nanoid(8) // 8자리 짧은 ID (예: a3b4c5d6)

  const shareData: ShareData = {
    toolName,
    data,
    createdAt: Date.now(),
  }

  await kv.set(`share:${id}`, shareData, {
    ex: 60 * 60 * 24 * 30, // 30일 후 자동 삭제
  })

  return `https://devtools-hub-app.vercel.app/s/${id}`
}

export async function getShareData(id: string): Promise<ShareData | null> {
  return await kv.get<ShareData>(`share:${id}`)
}
```

**3. API Route**
```typescript
// app/api/share/route.ts
import { NextResponse } from 'next/server'
import { createShareUrl } from '@/lib/share'

export async function POST(req: Request) {
  try {
    const { toolName, data } = await req.json()

    if (!toolName || !data) {
      return NextResponse.json(
        { error: 'Missing toolName or data' },
        { status: 400 }
      )
    }

    const url = await createShareUrl(toolName, data)
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Share creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create share URL' },
      { status: 500 }
    )
  }
}
```

**4. Share 페이지**
```typescript
// app/s/[id]/page.tsx (locale 없음, 짧은 URL 유지)
import { redirect } from 'next/navigation'
import { getShareData } from '@/lib/share'

export default async function SharePage({
  params
}: {
  params: { id: string }
}) {
  const shareData = await getShareData(params.id)

  if (!shareData) {
    redirect('/en?error=share-not-found')
  }

  // 기본 언어(en)의 해당 도구로 리다이렉트
  const searchParams = new URLSearchParams({
    shared: params.id,
    data: JSON.stringify(shareData.data),
  })

  redirect(`/en/${shareData.toolName}?${searchParams.toString()}`)
}
```

**5. UI에 Share 버튼 추가**
```typescript
// components/tools/ShareButton.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  toolName: string
  data: any
}

export function ShareButton({ toolName, data }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolName, data }),
      })

      const { url } = await res.json()

      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Share URL copied to clipboard!')

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to create share URL')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button
      onClick={handleShare}
      disabled={isSharing}
      variant="outline"
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </Button>
  )
}
```

---

### Priority 5: Favorites (Nice to Have, 2시간)

**문제점**: 히스토리 10개 중 자주 쓰는 1-2개가 있는데 찾기 어려움

**해결책**: 별표로 즐겨찾기 표시, 상단에 고정

#### 구현 상세

이미 Priority 1의 useToolHistory에 `toggleFavorite`와 `favorites` 기능 포함됨.

**HistoryPanel 개선**
```typescript
// components/tools/HistoryPanel.tsx (개선)
export function HistoryPanel({ ... }: HistoryPanelProps) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const displayedHistory = showFavoritesOnly
    ? history.filter(item => item.isFavorite)
    : history

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {t('common.history')} ({displayedHistory.length})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Star className={showFavoritesOnly ? 'fill-yellow-400' : ''} />
            {showFavoritesOnly ? 'All' : 'Favorites'}
          </Button>
        </div>
      </CardHeader>
      {/* ... */}
    </Card>
  )
}
```

---

## 📅 Sprint 3 실행 계획 (2일 작업)

### Day 1 (8시간)

**09:00-12:00: Local History 기능 구현 (3시간)**
- [ ] lib/hooks/useToolHistory.ts 작성
- [ ] components/tools/HistoryPanel.tsx 작성
- [ ] JSON Formatter에 적용 및 테스트
- [ ] localStorage 작동 검증

**12:00-13:00: 점심 휴식**

**13:00-16:00: Smart Paste Detection (3시간)**
- [ ] lib/tools/detectPasteType.ts 유틸리티 작성
- [ ] components/layout/SmartPasteDetector.tsx 작성
- [ ] Layout에 통합 (Toaster 추가)
- [ ] 6개 도구 패턴 테스트 (JSON, JWT, Base64, URL, Timestamp, UUID)
- [ ] 각 도구에서 paste 파라미터 처리 로직 추가

**16:00-18:00: OG Image 생성 및 배포 (2시간)**
- [ ] Canva에서 OG 이미지 디자인 (1200×630)
- [ ] public/og-image.png에 저장
- [ ] 메타 태그 검증 (이미 설정되어 있음)
- [ ] Facebook Debugger, Twitter Card Validator 테스트
- [ ] Git commit & push

### Day 2 (8시간)

**09:00-12:00: 나머지 9개 도구에 History 적용 (3시간)**
- [ ] RegExp Tester
- [ ] Base64 Encoder/Decoder
- [ ] JWT Debugger
- [ ] Timestamp Converter
- [ ] URL Encoder/Decoder
- [ ] Hash Generator
- [ ] Color Converter
- [ ] QR Code Generator
- (UUID Generator는 제외 - 히스토리 의미 없음)

**12:00-13:00: 점심 휴식**

**13:00-15:00: 번역 작업 (2시간)**
- [ ] messages/en.json에 키 추가
  - `common.history`, `common.clearHistory`, `common.favorites`
  - `toast.smartPasteDetected`, `toast.redirecting`
- [ ] messages/ko.json 번역
- [ ] messages/ja.json 번역
- [ ] messages/zh.json 번역
- [ ] 타입 체크 (npx tsc --noEmit)

**15:00-17:00: 통합 테스트 (2시간)**
- [ ] 모든 도구 히스토리 작동 확인
- [ ] Smart Paste 모든 패턴 테스트
  - JSON → JSON Formatter
  - JWT → JWT Debugger
  - Base64 → Base64 Tool
  - URL Encoded → URL Encoder
  - Timestamp → Timestamp Converter
  - UUID → UUID Generator
- [ ] 모바일/데스크톱 반응형 검증
- [ ] 다크모드 테스트
- [ ] 4개 언어 번역 확인

**17:00-18:00: 문서 업데이트 및 배포 (1시간)**
- [ ] CLAUDE.md 업데이트 (Sprint 3 완료 표시)
- [ ] README.md 새 기능 추가
  - Local History
  - Smart Paste Detection
  - OG Image
- [ ] Git commit (깔끔한 메시지)
- [ ] Vercel 배포 확인

---

## 🎯 Sprint 3 성공 지표

### 정량적 지표
- [ ] 9개 도구 모두 히스토리 기능 작동 (UUID 제외)
- [ ] 6개 자동 감지 패턴 100% 작동률
- [ ] OG 이미지 Facebook/Twitter에서 정상 표시
- [ ] 모바일/데스크톱 모두 정상 작동
- [ ] TypeScript 에러 0개
- [ ] 번역 누락 0개 (4개 언어)

### 정성적 지표
- [ ] 히스토리가 실제로 생산성을 높이는가?
  - 같은 JSON을 3번 이상 검증할 때 클릭 1번으로 복원
- [ ] Smart Paste가 "마법"처럼 느껴지는가?
  - JWT 복사 → 아무데나 붙여넣기 → 자동 이동
- [ ] OG 이미지가 공유하고 싶게 만드는가?
  - 전문적인 디자인, 명확한 가치 전달

---

## 💭 다음 Sprint 고려사항 (Week 4+)

### AI 기능 (OpenAI API 필요)
- **JSON → TypeScript Interface**: 자동 변환 버튼 추가
- **RegExp 한글 설명**: "이메일 주소를 찾습니다" 같은 친절한 설명
- **에러 메시지 설명**: JSON 파싱 에러를 초보자도 이해할 수 있게

### Freemium 준비
- **Stripe 통합**: 결제 시스템
- **Pro 플랜 기능 정의**:
  - 광고 제거
  - 클라우드 히스토리 (기기 간 동기화)
  - AI 기능 무제한
  - 팀 공유 스니펫
  - API 액세스
- **가격**: $3/월 (연간 $30, 2개월 할인)

### 커뮤니티 기능
- **RegExp 패턴 공유**: 사용자가 만든 패턴 공유
- **JSON 스키마 라이브러리**: 자주 쓰는 JSON 구조 템플릿
- **투표 시스템**: 인기 패턴 선정

### 성능 최적화
- **Code Splitting**: 도구별 lazy loading
- **Image Optimization**: Next.js Image 컴포넌트 사용
- **CDN**: 정적 자산 캐싱

---

## 📝 체크리스트

### 구현 전 준비
- [ ] nanoid 설치: `npm install nanoid`
- [ ] sonner (Toast) 설치: `npm install sonner`
- [ ] date-fns 설치: `npm install date-fns`
- [ ] Vercel KV 설정 (Priority 4만 해당)

### 코드 리뷰 포인트
- [ ] localStorage 에러 핸들링 (try-catch)
- [ ] 타입 안정성 (TypeScript strict mode)
- [ ] 메모리 누수 방지 (cleanup 함수)
- [ ] 접근성 (키보드 네비게이션)
- [ ] 다크모드 지원

### 배포 전 체크
- [ ] 모든 번역 키 존재 확인
- [ ] OG 이미지 경로 확인 (`/og-image.png`)
- [ ] localStorage quota 초과 처리
- [ ] Smart Paste 무한 루프 방지 (현재 도구 확인)

---

**작성자**: AI Assistant
**검토자**: (프로젝트 리드)
**승인일**: (승인 후 작성)
