"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
  getRelativeTime,
  detectTimestampUnit,
  type RelativeTimeResult,
} from "@/lib/tools/timestamp"
import { Check, Copy, Clock, Calendar, AlertCircle, RefreshCw } from "lucide-react"

export default function TimestampConverterPage() {
  const t = useTranslations()

  // 현재 시간 (1초마다 업데이트)
  const [currentTime, setCurrentTime] = useState(getCurrentTimestamp())

  // Timestamp → Date
  const [timestampInput, setTimestampInput] = useState("")
  const [timestampResult, setTimestampResult] = useState<ReturnType<typeof timestampToDate> | null>(null)
  const [detectedUnit, setDetectedUnit] = useState<'seconds' | 'milliseconds' | 'invalid' | null>(null)

  // Date → Timestamp
  const [dateInput, setDateInput] = useState("")
  const [dateResult, setDateResult] = useState<ReturnType<typeof dateToTimestamp> | null>(null)

  // 복사 상태
  const [copied, setCopied] = useState<string | null>(null)

  // 예시 타임스탬프 (현재 시간)
  const exampleTimestamp = Math.floor(Date.now() / 1000)

  // 상대 시간 포맷팅
  const formatRelativeTime = (result: RelativeTimeResult | null): string => {
    if (!result) return t('timestampConverter.errors.invalidTimestamp')
    if (result.unit === 'now') return t('timestampConverter.now')

    const unitKey = result.value === 1
      ? `timestampConverter.units.${result.unit}`
      : `timestampConverter.units.${result.unit}s`

    const unit = t(unitKey)

    if (result.isPast) {
      return t('timestampConverter.ago', { value: result.value, unit })
    } else {
      return t('timestampConverter.fromNow', { value: result.value, unit })
    }
  }

  // 에러 메시지 포맷팅
  const getErrorMessage = (errorCode?: string): string => {
    if (!errorCode) return t('common.error')

    const errorMap: Record<string, string> = {
      'EMPTY_INPUT': t('timestampConverter.errors.emptyInput'),
      'INVALID_TIMESTAMP': t('timestampConverter.errors.invalidTimestamp'),
      'CONVERSION_ERROR': t('timestampConverter.errors.conversionError'),
      'INVALID_INPUT': t('timestampConverter.errors.invalidInput'),
    }

    return errorMap[errorCode] || t('common.error')
  }

  // 초기 예시 데이터 설정 & 1초마다 현재 시간 업데이트
  useEffect(() => {
    setTimestampInput(exampleTimestamp.toString())
    handleTimestampConvert(exampleTimestamp.toString())

    // 현재 날짜/시간을 datetime-local 형식으로 설정
    const now = new Date()
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
    setDateInput(localDateTime)
    handleDateConvert(localDateTime)

    // 1초마다 현재 시간 업데이트
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimestamp())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleTimestampConvert = (value: string = timestampInput) => {
    if (!value.trim()) {
      setTimestampResult(null)
      setDetectedUnit(null)
      return
    }

    const timestamp = parseFloat(value)
    if (isNaN(timestamp)) {
      setTimestampResult({
        success: false,
        errorCode: 'INVALID_INPUT',
      })
      setDetectedUnit(null)
      return
    }

    const unit = detectTimestampUnit(timestamp)
    setDetectedUnit(unit)

    const result = timestampToDate(timestamp)
    setTimestampResult(result)
  }

  const handleDateConvert = (value: string = dateInput) => {
    if (!value.trim()) {
      setDateResult(null)
      return
    }

    const date = new Date(value)
    if (isNaN(date.getTime())) {
      setDateResult(null)
      return
    }

    const result = dateToTimestamp(date)
    setDateResult(result)
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleUseCurrentTime = () => {
    const current = getCurrentTimestamp()
    setTimestampInput(current.seconds.toString())
    handleTimestampConvert(current.seconds.toString())
  }

  const handleClear = () => {
    setTimestampInput("")
    setTimestampResult(null)
    setDetectedUnit(null)
    setDateInput("")
    setDateResult(null)
  }

  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('timestampConverter.title')}</h1>
        <p className="text-muted-foreground">
          {t('timestampConverter.description')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={handleUseCurrentTime} variant="default" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t('timestampConverter.currentTime')}
        </Button>
        <Button onClick={handleClear} variant="outline">
          {t('common.clear')}
        </Button>
      </div>

      {/* Current Time Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('timestampConverter.currentTime')}
          </CardTitle>
          <CardDescription>
            {t('timestampConverter.relativeTime')}: {t('timestampConverter.currentTime')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Seconds */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('timestampConverter.seconds')}
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md bg-muted p-3">
                  <code className="text-sm font-mono">{formatNumber(currentTime.seconds)}</code>
                </div>
                <Button
                  onClick={() => handleCopy(currentTime.seconds.toString(), 'current-seconds')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied === 'current-seconds' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Milliseconds */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('timestampConverter.milliseconds')}
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md bg-muted p-3">
                  <code className="text-sm font-mono">{formatNumber(currentTime.milliseconds)}</code>
                </div>
                <Button
                  onClick={() => handleCopy(currentTime.milliseconds.toString(), 'current-milliseconds')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {copied === 'current-milliseconds' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Current Date/Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('timestampConverter.localTime')}
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-md bg-muted p-3">
                <code className="text-sm font-mono">{currentTime.date.toLocaleString()}</code>
              </div>
              <Button
                onClick={() => handleCopy(currentTime.date.toLocaleString(), 'current-date')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied === 'current-date' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timestamp → Date */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('timestampConverter.timestampToDate')}
          </CardTitle>
          <CardDescription>{t('timestampConverter.autoDetect')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('timestampConverter.timestamp')}</label>
            <Textarea
              value={timestampInput}
              onChange={(e) => {
                setTimestampInput(e.target.value)
                handleTimestampConvert(e.target.value)
              }}
              placeholder={t('timestampConverter.timestampPlaceholder')}
              className="min-h-[60px] font-mono text-sm"
            />
            {detectedUnit && detectedUnit !== 'invalid' && (
              <p className="text-xs text-muted-foreground">
                {t('timestampConverter.detectedUnit')}: {detectedUnit === 'seconds' ? t('timestampConverter.seconds') : t('timestampConverter.milliseconds')}
              </p>
            )}
          </div>

          {/* Error Display */}
          {timestampResult && !timestampResult.success && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
                <p className="text-sm text-muted-foreground">{getErrorMessage(timestampResult.errorCode)}</p>
              </div>
            </div>
          )}

          {/* Result */}
          {timestampResult && timestampResult.success && (
            <div className="space-y-3">
              {/* ISO 8601 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t('timestampConverter.iso8601')}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-muted p-3">
                    <code className="text-sm font-mono break-all">{timestampResult.iso8601}</code>
                  </div>
                  <Button
                    onClick={() => handleCopy(timestampResult.iso8601!, 'iso8601')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied === 'iso8601' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Local Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t('timestampConverter.localTime')}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-muted p-3">
                    <code className="text-sm font-mono">{timestampResult.localTime}</code>
                  </div>
                  <Button
                    onClick={() => handleCopy(timestampResult.localTime!, 'localTime')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied === 'localTime' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* UTC Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t('timestampConverter.utcTime')}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-muted p-3">
                    <code className="text-sm font-mono">{timestampResult.utcTime}</code>
                  </div>
                  <Button
                    onClick={() => handleCopy(timestampResult.utcTime!, 'utcTime')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied === 'utcTime' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Relative Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t('timestampConverter.relativeTime')}
                </label>
                <div className="rounded-md bg-muted p-3">
                  <code className="text-sm font-mono">
                    {formatRelativeTime(getRelativeTime(parseFloat(timestampInput)))}
                  </code>
                </div>
              </div>

              {/* Timezones */}
              {timestampResult.timezones && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">{t('timestampConverter.timezones')}</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(timestampResult.timezones).map(([zone, time]) => (
                      <div key={zone} className="space-y-1">
                        <label className="text-xs text-muted-foreground uppercase">{zone}</label>
                        <div className="rounded-md bg-muted p-2">
                          <code className="text-xs font-mono">{time}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Date → Timestamp */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('timestampConverter.dateToTimestamp')}
          </CardTitle>
          <CardDescription>{t('timestampConverter.selectDate')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('timestampConverter.selectDate')}</label>
            <Input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => {
                setDateInput(e.target.value)
                handleDateConvert(e.target.value)
              }}
              className="font-mono text-sm"
            />
          </div>

          {/* Result */}
          {dateResult && (
            <div className="space-y-3">
              {/* Seconds */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Unix {t('timestampConverter.seconds')}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-muted p-3">
                    <code className="text-sm font-mono">{formatNumber(dateResult.seconds)}</code>
                  </div>
                  <Button
                    onClick={() => handleCopy(dateResult.seconds.toString(), 'date-seconds')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied === 'date-seconds' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Milliseconds */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Unix {t('timestampConverter.milliseconds')}
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-muted p-3">
                    <code className="text-sm font-mono">{formatNumber(dateResult.milliseconds)}</code>
                  </div>
                  <Button
                    onClick={() => handleCopy(dateResult.milliseconds.toString(), 'date-milliseconds')}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied === 'date-milliseconds' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Relative Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  {t('timestampConverter.relativeTime')}
                </label>
                <div className="rounded-md bg-muted p-3">
                  <code className="text-sm font-mono">
                    {formatRelativeTime(getRelativeTime(dateResult.seconds))}
                  </code>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('timestampConverter.tip1')}</p>
          <p>• {t('timestampConverter.tip2')}</p>
          <p>• {t('timestampConverter.tip3')}</p>
          <p>• {t('timestampConverter.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
