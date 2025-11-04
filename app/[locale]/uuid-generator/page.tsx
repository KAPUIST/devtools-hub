"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { generateUUIDs, isValidUUID, parseUUID } from "@/lib/tools/uuid"
import { Check, Copy, RefreshCw, Info } from "lucide-react"

type UUIDVersion = 'v1' | 'v4'

export default function UUIDGeneratorPage() {
  const t = useTranslations()
  const [version, setVersion] = useState<UUIDVersion>('v4')
  const [count, setCount] = useState<number>(5)
  const [uuids, setUUIDs] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 초기 UUID 생성 (의존성 없는 초기화 전용)
  useEffect(() => {
    const result = generateUUIDs('v4', 5) // 기본값 직접 사용
    if (result.success && result.uuids) {
      setUUIDs(result.uuids)
      setError(null)
    } else {
      const errorMessage = result.errorCode
        ? t(`uuidGenerator.errors.${result.errorCode}`)
        : t('uuidGenerator.errors.GENERATION_ERROR')
      setError(errorMessage)
      setUUIDs([])
    }
  }, [t])

  // 컴포넌트 unmount 시 타이머 정리
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  const handleGenerate = () => {
    const result = generateUUIDs(version, count)

    if (result.success && result.uuids) {
      setUUIDs(result.uuids)
      setError(null)
    } else {
      const errorMessage = result.errorCode
        ? t(`uuidGenerator.errors.${result.errorCode}`)
        : t('uuidGenerator.errors.GENERATION_ERROR')
      setError(errorMessage)
      setUUIDs([])
    }
  }

  // 공통 복사 함수 (코드 중복 제거)
  const copyToClipboard = async (text: string, index: number): Promise<boolean> => {
    // 기존 타이머 정리 (빠른 클릭 시 누적 방지)
    if (copyTimerRef.current) {
      clearTimeout(copyTimerRef.current)
      copyTimerRef.current = null
    }

    try {
      // Modern Clipboard API 시도
      await navigator.clipboard.writeText(text)
    } catch (error) {
      // Fallback: 구식 방법으로 복사
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()

      try {
        document.execCommand('copy')
      } catch (fallbackError) {
        setError(t('uuidGenerator.errors.COPY_FAILED'))
        document.body.removeChild(textarea)
        return false
      } finally {
        document.body.removeChild(textarea)
      }
    }

    // 성공 시에만 타이머 설정
    setCopiedIndex(index)
    copyTimerRef.current = setTimeout(() => {
      setCopiedIndex(null)
      copyTimerRef.current = null
    }, 2000)

    return true
  }

  const handleCopyUUID = (uuid: string, index: number) => {
    copyToClipboard(uuid, index)
  }

  const handleCopyAll = () => {
    copyToClipboard(uuids.join('\n'), -1) // -1 = "Copy All" button
  }

  const getUUIDInfo = (uuid: string) => {
    const info = parseUUID(uuid)
    if (info.valid) {
      return `v${info.version} - ${info.variant}`
    }
    return 'Invalid'
  }

  const countOptions = [1, 5, 10, 20, 50]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('uuidGenerator.title')}</h1>
        <p className="text-muted-foreground">
          {t('uuidGenerator.description')}
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('uuidGenerator.settings')}</CardTitle>
          <CardDescription>{t('uuidGenerator.selectOptions')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Version Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('uuidGenerator.version')}</label>
            <div className="flex gap-2">
              <Button
                onClick={() => setVersion('v4')}
                variant={version === 'v4' ? 'default' : 'outline'}
                className="flex-1"
              >
                UUID v4 ({t('uuidGenerator.random')})
              </Button>
              <Button
                onClick={() => setVersion('v1')}
                variant={version === 'v1' ? 'default' : 'outline'}
                className="flex-1"
              >
                UUID v1 ({t('uuidGenerator.timestamp')})
              </Button>
            </div>
          </div>

          {/* Count Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('uuidGenerator.count')}</label>
            <div className="flex gap-2">
              {countOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => setCount(option)}
                  variant={count === option ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={handleGenerate} className="w-full gap-2" size="lg">
            <RefreshCw className="h-4 w-4" />
            {t('uuidGenerator.generate')}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">{t('uuidGenerator.results')}</CardTitle>
            <CardDescription>
              {uuids.length > 0
                ? `${uuids.length}${t('uuidGenerator.generated')}`
                : t('uuidGenerator.noResults')}
            </CardDescription>
          </div>
          {uuids.length > 1 && (
            <Button
              onClick={handleCopyAll}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {copiedIndex === -1 ? (
                <>
                  <Check className="h-4 w-4" />
                  {t('common.copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t('uuidGenerator.copyAll')}
                </>
              )}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <Info className="h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          ) : uuids.length > 0 ? (
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={`${uuid}-${index}`}
                  className="flex items-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:bg-accent"
                >
                  <div className="flex-1 space-y-1">
                    <Input
                      value={uuid}
                      readOnly
                      className="h-9 font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground pl-3">
                      {getUUIDInfo(uuid)}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleCopyUUID(uuid, index)}
                    variant="ghost"
                    size="sm"
                    className="shrink-0 gap-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t('common.copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t('common.copy')}
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[200px] text-center text-muted-foreground">
              <RefreshCw className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">{t('uuidGenerator.clickGenerate')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            {t('uuidGenerator.whatIsUUID')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground mb-1">UUID v4 ({t('uuidGenerator.random')})</p>
            <p>{t('uuidGenerator.v4Description')}</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">UUID v1 ({t('uuidGenerator.timestamp')})</p>
            <p>{t('uuidGenerator.v1Description')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('uuidGenerator.tip1')}</p>
          <p>• {t('uuidGenerator.tip2')}</p>
          <p>• {t('uuidGenerator.tip3')}</p>
          <p>• {t('uuidGenerator.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
