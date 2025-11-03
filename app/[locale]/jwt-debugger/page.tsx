"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  decodeJWT,
  getAlgorithmName,
  getTimeRemaining,
  extractStandardClaims,
  extractCustomClaims,
} from "@/lib/tools/jwt"
import { Check, Copy, AlertCircle, Clock, Shield, FileJson } from "lucide-react"

export default function JWTDebuggerPage() {
  const t = useTranslations()
  const [token, setToken] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [decodedResult, setDecodedResult] = useState<ReturnType<typeof decodeJWT> | null>(null)
  const [copied, setCopied] = useState<'header' | 'payload' | null>(null)

  // 예시 JWT 토큰 (유효 기간: 2099년)
  const exampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjQxMDI0NDQ4MDB9.hxhGCPITnGZwW_Bd8GwZ3rz4X8YGAqH6-VRjYBqMRnQ"

  useEffect(() => {
    // 초기 예시 토큰 설정
    setToken(exampleToken)
    handleDecode(exampleToken)
  }, [])

  const handleDecode = (value: string = token) => {
    if (!value.trim()) {
      setDecodedResult(null)
      setError(null)
      return
    }

    const result = decodeJWT(value)
    if (result.success) {
      setDecodedResult(result)
      setError(null)
    } else {
      setDecodedResult(null)
      setError(result.error || "디코딩 중 오류가 발생했습니다.")
    }
  }

  const handleCopy = async (type: 'header' | 'payload') => {
    if (!decodedResult) return

    const data = type === 'header' ? decodedResult.header : decodedResult.payload
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleClear = () => {
    setToken("")
    setDecodedResult(null)
    setError(null)
  }

  const handleInputChange = (value: string) => {
    setToken(value)
    handleDecode(value)
  }

  // 토큰 상태 배지
  const getStatusBadge = () => {
    if (!decodedResult || !decodedResult.success) return null

    if (decodedResult.isExpired) {
      return (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">{t('jwtDebugger.expiredToken')}</span>
        </div>
      )
    }

    if (decodedResult.isNotYetValid) {
      return (
        <div className="flex items-center gap-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 px-3 py-2">
          <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-500">{t('jwtDebugger.notYetValid')}</span>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 px-3 py-2">
        <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
        <span className="text-sm font-medium text-green-600 dark:text-green-500">{t('jwtDebugger.validToken')}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('jwtDebugger.title')}</h1>
        <p className="text-muted-foreground">
          {t('jwtDebugger.description')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={handleClear} variant="outline">
          {t('common.clear')}
        </Button>
        {decodedResult && getStatusBadge()}
        {decodedResult && decodedResult.payload?.exp && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {getTimeRemaining(decodedResult.payload.exp)}
          </div>
        )}
      </div>

      {/* Token Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('jwtDebugger.token')}
          </CardTitle>
          <CardDescription>{t('jwtDebugger.tokenPlaceholder')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={token}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t('jwtDebugger.tokenPlaceholder')}
            className="min-h-[120px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-destructive">{t('common.error')}</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {/* Decoded JWT */}
      {decodedResult && decodedResult.success && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Header */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">{t('jwtDebugger.header')}</CardTitle>
                <CardDescription>
                  {t('jwtDebugger.algorithm')}, {t('jwtDebugger.type')}
                </CardDescription>
              </div>
              <Button
                onClick={() => handleCopy('header')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied === 'header' ? (
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
            </CardHeader>
            <CardContent className="space-y-3">
              {decodedResult.header?.alg && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('jwtDebugger.algorithm')}
                  </label>
                  <div className="rounded-md bg-muted p-3">
                    <code className="text-sm font-mono">{decodedResult.header.alg}</code>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getAlgorithmName(decodedResult.header.alg)}
                    </p>
                  </div>
                </div>
              )}
              {decodedResult.header?.typ && (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('jwtDebugger.type')}
                  </label>
                  <div className="rounded-md bg-muted p-3">
                    <code className="text-sm font-mono">{decodedResult.header.typ}</code>
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Raw JSON</label>
                <Textarea
                  value={JSON.stringify(decodedResult.header, null, 2)}
                  readOnly
                  className="min-h-[100px] font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payload */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">{t('jwtDebugger.payload')}</CardTitle>
                <CardDescription>Claims</CardDescription>
              </div>
              <Button
                onClick={() => handleCopy('payload')}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied === 'payload' ? (
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
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Standard Claims */}
              {decodedResult.payload && extractStandardClaims(decodedResult.payload).length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Standard Claims</label>
                  {extractStandardClaims(decodedResult.payload).map(claim => (
                    <div key={claim.key} className="space-y-1">
                      <label className="text-xs text-muted-foreground">{claim.label}</label>
                      <div className="rounded-md bg-muted p-2">
                        <code className="text-xs font-mono break-all">
                          {claim.key === 'exp' || claim.key === 'iat' || claim.key === 'nbf'
                            ? `${claim.value} (${new Date(claim.value * 1000).toLocaleString()})`
                            : typeof claim.value === 'object'
                            ? JSON.stringify(claim.value)
                            : String(claim.value)}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Custom Claims */}
              {decodedResult.payload && extractCustomClaims(decodedResult.payload).length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Custom Claims</label>
                  {extractCustomClaims(decodedResult.payload).map(claim => (
                    <div key={claim.key} className="space-y-1">
                      <label className="text-xs text-muted-foreground">{claim.key}</label>
                      <div className="rounded-md bg-muted p-2">
                        <code className="text-xs font-mono break-all">
                          {typeof claim.value === 'object'
                            ? JSON.stringify(claim.value)
                            : String(claim.value)}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Raw JSON</label>
                <Textarea
                  value={JSON.stringify(decodedResult.payload, null, 2)}
                  readOnly
                  className="min-h-[200px] font-mono text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Signature (if decoded) */}
      {decodedResult && decodedResult.success && decodedResult.signature && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              {t('jwtDebugger.signature')}
            </CardTitle>
            <CardDescription>Base64 URL Encoded</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={decodedResult.signature}
              readOnly
              className="min-h-[80px] font-mono text-xs"
            />
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('jwtDebugger.tip1')}</p>
          <p>• {t('jwtDebugger.tip2')}</p>
          <p>• {t('jwtDebugger.tip3')}</p>
          <p>• {t('jwtDebugger.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
