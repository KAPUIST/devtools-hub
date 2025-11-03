"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { formatJson, minifyJson, validateJson } from "@/lib/tools/json"
import { Check, Copy, AlertCircle } from "lucide-react"

export default function JsonFormatterPage() {
  const t = useTranslations()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [indent, setIndent] = useState(2)

  // 예시 데이터
  const exampleJson = `{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","country":"USA"},"hobbies":["reading","coding","gaming"]}`

  useEffect(() => {
    // 초기 예시 데이터 설정
    setInput(exampleJson)
    handleFormat(exampleJson, 2)
  }, [])

  const handleFormat = (value: string = input, indentSize: number = indent) => {
    const result = formatJson(value, indentSize)
    if (result.success && result.formatted) {
      setOutput(result.formatted)
      setError(null)
    } else {
      setError(result.error || "알 수 없는 오류")
      setOutput("")
    }
  }

  const handleMinify = () => {
    const result = minifyJson(input)
    if (result.success && result.formatted) {
      setOutput(result.formatted)
      setError(null)
    } else {
      setError(result.error || "알 수 없는 오류")
      setOutput("")
    }
  }

  const handleValidate = () => {
    const result = validateJson(input)
    if (result.success && result.formatted) {
      setOutput(result.formatted)
      setError(null)
    } else {
      setError(result.error || "알 수 없는 오류")
      setOutput("")
    }
  }

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    // 실시간 포맷팅 (debounce 없이)
    if (value.trim()) {
      handleFormat(value, indent)
    } else {
      setOutput("")
      setError(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('jsonFormatter.title')}</h1>
        <p className="text-muted-foreground">
          {t('jsonFormatter.description')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleFormat()} variant="default">
          {t('common.format')}
        </Button>
        <Button onClick={handleMinify} variant="outline">
          {t('common.minify')}
        </Button>
        <Button onClick={handleValidate} variant="outline">
          {t('common.validate')}
        </Button>
        <Button onClick={handleClear} variant="outline">
          {t('common.clear')}
        </Button>

        {/* Indent Size */}
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-muted-foreground">{t('jsonFormatter.indent')}:</label>
          <select
            value={indent}
            onChange={(e) => {
              const newIndent = Number(e.target.value)
              setIndent(newIndent)
              if (input.trim()) {
                handleFormat(input, newIndent)
              }
            }}
            className="rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value={2}>2 {t('jsonFormatter.spaces')}</option>
            <option value={4}>4 {t('jsonFormatter.spaces')}</option>
            <option value={8}>8 {t('jsonFormatter.spaces')}</option>
          </select>
        </div>
      </div>

      {/* Input & Output */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('common.input')}</CardTitle>
            <CardDescription>{t('jsonFormatter.inputPlaceholder')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t('jsonFormatter.inputPlaceholder')}
              className="min-h-[400px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg">{t('common.output')}</CardTitle>
              <CardDescription>{t('jsonFormatter.outputPlaceholder')}</CardDescription>
            </div>
            {output && (
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied ? (
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
            )}
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            ) : (
              <Textarea
                value={output}
                readOnly
                placeholder={t('jsonFormatter.outputPlaceholder')}
                className="min-h-[400px] font-mono text-sm"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('jsonFormatter.tip1')}</p>
          <p>• {t('jsonFormatter.tip2')}</p>
          <p>• {t('jsonFormatter.tip3')}</p>
          <p>• {t('jsonFormatter.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
