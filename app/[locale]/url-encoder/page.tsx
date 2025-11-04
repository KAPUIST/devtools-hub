"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Copy, AlertCircle } from "lucide-react"
import {
  encodeURL,
  encodeURLComponent,
  decodeURL,
  decodeURLComponent,
  parseQueryString,
  type QueryParam,
} from "@/lib/tools/url"
import { useToolHistory } from "@/lib/hooks/useToolHistory"
import { HistoryPanel } from "@/components/tools/HistoryPanel"

export default function URLEncoderPage() {
  const t = useTranslations()
  const searchParams = useSearchParams()

  // Encode/Decode states
  const [encodeInput, setEncodeInput] = useState("")
  const [encodeOutput, setEncodeOutput] = useState("")
  const [encodeError, setEncodeError] = useState<string | null>(null)

  const [decodeInput, setDecodeInput] = useState("")
  const [decodeOutput, setDecodeOutput] = useState("")
  const [decodeError, setDecodeError] = useState<string | null>(null)

  // Query Parser states
  const [queryInput, setQueryInput] = useState("")
  const [queryParams, setQueryParams] = useState<QueryParam[]>([])
  const [queryError, setQueryError] = useState<string | null>(null)

  // Copy states
  const [copiedEncode, setCopiedEncode] = useState(false)
  const [copiedDecode, setCopiedDecode] = useState(false)
  const [copiedParam, setCopiedParam] = useState<string | null>(null)
  const { history, addToHistory, clearHistory, toggleFavorite } = useToolHistory('url-encoder')

  // 예시 데이터
  const exampleURL = "https://example.com/search?q=hello world&lang=한국어"
  const exampleQueryURL = "https://api.example.com/users?name=John Doe&age=30&city=New York"

  // Smart Paste Detection: URL의 paste 파라미터 처리
  useEffect(() => {
    const pastedText = searchParams.get('paste')
    if (pastedText) {
      try {
        const decoded = decodeURIComponent(pastedText)
        // URL Encoded인지 감지 (%XX 패턴)
        const isEncoded = /%[0-9A-Fa-f]{2}/.test(decoded)

        if (isEncoded) {
          // URL Encoded 디코딩 모드
          setDecodeInput(decoded)
          const result = decodeURL(decoded)
          if (result.success && result.decoded) {
            setDecodeOutput(result.decoded)
            setDecodeError(null)
          }
        } else {
          // 일반 URL 인코딩 모드
          setEncodeInput(decoded)
          const result = encodeURL(decoded)
          if (result.success && result.encoded) {
            setEncodeOutput(result.encoded)
            setEncodeError(null)
          }
        }

        // URL에서 파라미터 제거 (깔끔하게)
        window.history.replaceState({}, '', window.location.pathname)
      } catch (error) {
        console.error('Failed to decode paste parameter:', error)
      }
    }
  }, [searchParams])

  // Error message 헬퍼
  const getErrorMessage = (errorCode: string): string => {
    return t(`urlEncoder.errors.${errorCode}`)
  }

  // Encode URI
  const handleEncodeURI = () => {
    const result = encodeURL(encodeInput)
    if (result.success && result.encoded) {
      setEncodeOutput(result.encoded)
      setEncodeError(null)
      addToHistory(encodeInput, result.encoded)
    } else if (result.errorCode) {
      setEncodeError(getErrorMessage(result.errorCode))
      setEncodeOutput("")
    }
  }

  // Encode URI Component
  const handleEncodeURIComponent = () => {
    const result = encodeURLComponent(encodeInput)
    if (result.success && result.encoded) {
      setEncodeOutput(result.encoded)
      setEncodeError(null)
      addToHistory(encodeInput, result.encoded)
    } else if (result.errorCode) {
      setEncodeError(getErrorMessage(result.errorCode))
      setEncodeOutput("")
    }
  }

  // Decode URI
  const handleDecodeURI = () => {
    const result = decodeURL(decodeInput)
    if (result.success && result.decoded) {
      setDecodeOutput(result.decoded)
      setDecodeError(null)
      addToHistory(decodeInput, result.decoded)
    } else if (result.errorCode) {
      setDecodeError(getErrorMessage(result.errorCode))
      setDecodeOutput("")
    }
  }

  // Decode URI Component
  const handleDecodeURIComponent = () => {
    const result = decodeURLComponent(decodeInput)
    if (result.success && result.decoded) {
      setDecodeOutput(result.decoded)
      setDecodeError(null)
      addToHistory(decodeInput, result.decoded)
    } else if (result.errorCode) {
      setDecodeError(getErrorMessage(result.errorCode))
      setDecodeOutput("")
    }
  }

  // Parse Query String
  const handleParseQuery = () => {
    const result = parseQueryString(queryInput)
    if (result.success && result.params) {
      setQueryParams(result.params)
      setQueryError(null)
    } else if (result.errorCode) {
      setQueryError(getErrorMessage(result.errorCode))
      setQueryParams([])
    }
  }

  // Copy handlers
  const handleCopyEncode = async () => {
    if (encodeOutput) {
      await navigator.clipboard.writeText(encodeOutput)
      setCopiedEncode(true)
      setTimeout(() => setCopiedEncode(false), 2000)
    }
  }

  const handleCopyDecode = async () => {
    if (decodeOutput) {
      await navigator.clipboard.writeText(decodeOutput)
      setCopiedDecode(true)
      setTimeout(() => setCopiedDecode(false), 2000)
    }
  }

  const handleCopyParam = async (key: string, value: string) => {
    const paramString = `${key}=${value}`
    await navigator.clipboard.writeText(paramString)
    setCopiedParam(paramString)
    setTimeout(() => setCopiedParam(null), 2000)
  }

  // Load example data
  const loadExampleEncode = () => {
    setEncodeInput(exampleURL)
    setEncodeError(null)
  }

  const loadExampleQuery = () => {
    setQueryInput(exampleQueryURL)
    handleParseQuery()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('urlEncoder.title')}</h1>
        <p className="text-muted-foreground">
          {t('urlEncoder.description')}
        </p>
      </div>

      {/* Encode/Decode Tabs */}
      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="encode">{t('urlEncoder.encode')}</TabsTrigger>
          <TabsTrigger value="decode">{t('urlEncoder.decode')}</TabsTrigger>
        </TabsList>

        {/* Encode Tab */}
        <TabsContent value="encode" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('urlEncoder.input')}</CardTitle>
                <CardDescription>
                  {t('urlEncoder.inputPlaceholder')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                  placeholder={t('urlEncoder.inputPlaceholder')}
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleEncodeURI}
                    className="flex-1"
                  >
                    {t('urlEncoder.encodeURI')}
                  </Button>
                  <Button
                    onClick={handleEncodeURIComponent}
                    variant="outline"
                    className="flex-1"
                  >
                    {t('urlEncoder.encodeURIComponent')}
                  </Button>
                </div>
                <Button
                  onClick={loadExampleEncode}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  {t('common.loadExample')}
                </Button>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">{t('urlEncoder.output')}</CardTitle>
                  <CardDescription>
                    Encoded URL
                  </CardDescription>
                </div>
                {encodeOutput && !encodeError && (
                  <Button
                    onClick={handleCopyEncode}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedEncode ? (
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
                {encodeError ? (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
                      <p className="text-sm text-muted-foreground">{encodeError}</p>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={encodeOutput}
                    readOnly
                    placeholder={t('urlEncoder.output')}
                    className="min-h-[200px] font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Decode Tab */}
        <TabsContent value="decode" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('urlEncoder.input')}</CardTitle>
                <CardDescription>
                  Enter encoded URL to decode
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleDecodeURI}
                    className="flex-1"
                  >
                    {t('urlEncoder.decodeURI')}
                  </Button>
                  <Button
                    onClick={handleDecodeURIComponent}
                    variant="outline"
                    className="flex-1"
                  >
                    {t('urlEncoder.decodeURIComponent')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">{t('urlEncoder.output')}</CardTitle>
                  <CardDescription>
                    Decoded URL
                  </CardDescription>
                </div>
                {decodeOutput && !decodeError && (
                  <Button
                    onClick={handleCopyDecode}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedDecode ? (
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
                {decodeError ? (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
                      <p className="text-sm text-muted-foreground">{decodeError}</p>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    value={decodeOutput}
                    readOnly
                    placeholder={t('urlEncoder.output')}
                    className="min-h-[200px] font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Query String Parser */}
      <Card>
        <CardHeader>
          <CardTitle>{t('urlEncoder.queryStringParser')}</CardTitle>
          <CardDescription>
            Parse URL query parameters into key-value pairs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="https://api.example.com/users?name=John&age=30"
              className="font-mono text-sm"
            />
            <Button onClick={handleParseQuery}>
              Parse
            </Button>
            <Button onClick={loadExampleQuery} variant="outline">
              {t('common.loadExample')}
            </Button>
          </div>

          {queryError ? (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
                <p className="text-sm text-muted-foreground">{queryError}</p>
              </div>
            </div>
          ) : queryParams.length > 0 ? (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('urlEncoder.key')}</TableHead>
                    <TableHead>{t('urlEncoder.value')}</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queryParams.map((param, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{param.key}</TableCell>
                      <TableCell className="font-mono text-sm">{param.value}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleCopyParam(param.key, param.value)}
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                        >
                          {copiedParam === `${param.key}=${param.value}` ? (
                            <>
                              <Check className="h-3 w-3" />
                              {t('common.copied')}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              {t('common.copy')}
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">
              {t('urlEncoder.noParams')}
            </p>
          )}
        </CardContent>
      </Card>

      {/* History Panel */}
      <HistoryPanel
        history={history}
        onSelect={(item) => {
          // 인코딩된 URL인지 확인
          const isEncoded = /%[0-9A-Fa-f]{2}/.test(item.input)
          if (isEncoded) {
            setDecodeInput(item.input)
          } else {
            setEncodeInput(item.input)
          }
        }}
        onClear={clearHistory}
        onToggleFavorite={toggleFavorite}
      />

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('urlEncoder.tip1')}</p>
          <p>• {t('urlEncoder.tip2')}</p>
          <p>• {t('urlEncoder.tip3')}</p>
          <p>• {t('urlEncoder.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
