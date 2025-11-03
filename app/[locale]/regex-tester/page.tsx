"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { testRegex, commonPatterns } from "@/lib/tools/regex"
import { AlertCircle, Sparkles, ChevronDown, ChevronUp } from "lucide-react"

export default function RegexTesterPage() {
  const t = useTranslations()
  const [selectedPattern, setSelectedPattern] = useState(commonPatterns[0])
  const [pattern, setPattern] = useState(selectedPattern.pattern)
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false, y: false })
  const [testString, setTestString] = useState(selectedPattern.example)
  const [error, setError] = useState<string | null>(null)
  const [advancedMode, setAdvancedMode] = useState(false)

  const flagsString = Object.entries(flags)
    .filter(([_, enabled]) => enabled)
    .map(([flag]) => flag)
    .join('')

  const result = testRegex(pattern, flagsString, testString)

  useEffect(() => {
    if (!result.success) {
      setError(result.error || null)
    } else {
      setError(null)
    }
  }, [pattern, flagsString, testString])

  const handlePresetClick = (preset: typeof commonPatterns[0]) => {
    setSelectedPattern(preset)
    setPattern(preset.pattern)
    const newFlags = { g: false, i: false, m: false, s: false, u: false, y: false }
    preset.flags.split('').forEach(flag => {
      if (flag in newFlags) {
        newFlags[flag as keyof typeof newFlags] = true
      }
    })
    setFlags(newFlags)
    setTestString(preset.example)
  }

  const highlightMatches = (): { text: string; isMatch: boolean }[] => {
    if (!result.success || !result.matches || result.matches.length === 0) {
      return [{ text: testString, isMatch: false }]
    }

    const parts: { text: string; isMatch: boolean }[] = []
    let lastIndex = 0

    result.matches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          text: testString.substring(lastIndex, match.index),
          isMatch: false,
        })
      }

      // Add match
      parts.push({
        text: match.match,
        isMatch: true,
      })

      lastIndex = match.index + match.match.length
    })

    // Add remaining text
    if (lastIndex < testString.length) {
      parts.push({
        text: testString.substring(lastIndex),
        isMatch: false,
      })
    }

    return parts
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('regexTester.title')}</h1>
        <p className="text-muted-foreground">{t('regexTester.description')}</p>
      </div>

      {/* Step 1: 무엇을 찾고 싶으신가요? */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">1. 무엇을 찾고 싶으신가요?</CardTitle>
          </div>
          <CardDescription>아래에서 원하는 패턴을 선택하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {commonPatterns.map((preset) => (
              <Button
                key={preset.name}
                variant={selectedPattern.name === preset.name ? "default" : "outline"}
                className="justify-start h-auto p-3"
                onClick={() => handlePresetClick(preset)}
              >
                <div className="text-left space-y-1 w-full">
                  <div className="font-semibold text-sm">{preset.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    예: {preset.example.substring(0, 40)}...
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* 선택된 패턴 표시 */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">사용 중인 패턴:</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(`/${pattern}/${flagsString}`)
                }}
              >
                복사
              </Button>
            </div>
            <div className="font-mono text-sm bg-background rounded px-3 py-2">
              <span className="text-muted-foreground">/</span>
              <span className="text-primary">{pattern}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{flagsString}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              💡 이 패턴이 "{selectedPattern.name}"을(를) 찾는데 사용됩니다
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: 텍스트 입력 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">2. 텍스트를 입력하세요</CardTitle>
          <CardDescription>찾고 싶은 내용이 포함된 텍스트를 붙여넣으세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="여기에 텍스트를 입력하세요..."
            className="min-h-[150px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            3. 결과 {result.success && result.matches ? `(${result.matches.length}개 발견)` : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">{t('regexTester.invalidRegex')}</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          ) : result.success && result.matches && result.matches.length > 0 ? (
            <div className="space-y-4">
              {/* Highlighted Text */}
              <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap">
                {highlightMatches().map((part, idx) => (
                  <span
                    key={idx}
                    className={part.isMatch ? "bg-yellow-300 dark:bg-yellow-700 font-semibold" : ""}
                  >
                    {part.text}
                  </span>
                ))}
              </div>

              {/* Match Details */}
              <div className="space-y-2">
                {result.matches.map((match, idx) => (
                  <div key={idx} className="rounded-lg border p-3 space-y-1 bg-card">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">발견 #{idx + 1}</span>
                      <span className="text-xs text-muted-foreground">위치: {match.index}</span>
                    </div>
                    <div className="font-mono text-sm bg-muted/50 p-2 rounded">
                      {match.match}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{t('regexTester.noMatches')}</p>
          )}
        </CardContent>
      </Card>

      {/* Advanced Mode Toggle */}
      <Card>
        <CardHeader>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto"
            onClick={() => setAdvancedMode(!advancedMode)}
          >
            <CardTitle className="text-lg">고급 설정</CardTitle>
            {advancedMode ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </CardHeader>
        {advancedMode && (
          <CardContent className="space-y-4">
            {/* Pattern Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">패턴 (정규식)</label>
              <div className="font-mono flex items-center border rounded-md px-3 py-2">
                <span className="text-muted-foreground">/</span>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="정규식 패턴..."
                  className="border-0 shadow-none focus-visible:ring-0 font-mono"
                />
                <span className="text-muted-foreground">/</span>
                <span className="text-primary font-semibold ml-1">{flagsString}</span>
              </div>
            </div>

            {/* Flags */}
            <div className="space-y-3">
              <label className="text-sm font-medium">플래그 (옵션)</label>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="flag-g"
                    checked={flags.g}
                    onCheckedChange={(checked) => setFlags({ ...flags, g: !!checked })}
                  />
                  <div className="grid gap-1 leading-none">
                    <label htmlFor="flag-g" className="text-sm font-medium cursor-pointer">
                      <code className="bg-muted px-1 py-0.5 rounded">g</code> 전체 검색
                    </label>
                    <p className="text-xs text-muted-foreground">
                      모든 일치 항목 찾기 (첫 번째만 아님)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="flag-i"
                    checked={flags.i}
                    onCheckedChange={(checked) => setFlags({ ...flags, i: !!checked })}
                  />
                  <div className="grid gap-1 leading-none">
                    <label htmlFor="flag-i" className="text-sm font-medium cursor-pointer">
                      <code className="bg-muted px-1 py-0.5 rounded">i</code> 대소문자 무시
                    </label>
                    <p className="text-xs text-muted-foreground">
                      A와 a를 같게 처리
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="flag-m"
                    checked={flags.m}
                    onCheckedChange={(checked) => setFlags({ ...flags, m: !!checked })}
                  />
                  <div className="grid gap-1 leading-none">
                    <label htmlFor="flag-m" className="text-sm font-medium cursor-pointer">
                      <code className="bg-muted px-1 py-0.5 rounded">m</code> 여러 줄 모드
                    </label>
                    <p className="text-xs text-muted-foreground">
                      각 줄의 시작과 끝을 인식
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="flag-s"
                    checked={flags.s}
                    onCheckedChange={(checked) => setFlags({ ...flags, s: !!checked })}
                  />
                  <div className="grid gap-1 leading-none">
                    <label htmlFor="flag-s" className="text-sm font-medium cursor-pointer">
                      <code className="bg-muted px-1 py-0.5 rounded">s</code> 점 확장
                    </label>
                    <p className="text-xs text-muted-foreground">
                      점(.)이 줄바꿈도 포함
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pattern Display */}
            <div className="rounded-lg bg-muted p-3 text-xs font-mono">
              <div className="text-muted-foreground mb-1">현재 패턴:</div>
              <div>/{pattern}/{flagsString}</div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 사용 팁</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 위에서 찾고 싶은 항목을 선택하고, 텍스트만 입력하면 자동으로 찾아줍니다</p>
          <p>• 노란색으로 하이라이트된 부분이 찾은 결과입니다</p>
          <p>• 고급 설정을 열면 패턴을 직접 수정할 수 있습니다</p>
          <p>• 정규식을 몰라도 됩니다! 패턴 선택만으로 충분해요 ✨</p>
        </CardContent>
      </Card>
    </div>
  )
}
