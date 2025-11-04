"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  encodeBase64,
  decodeBase64,
  encodeFileToBase64,
  base64ToBlob,
  getExtensionFromMimeType
} from "@/lib/tools/base64"
import { Check, Copy, AlertCircle, Upload, Download, Image as ImageIcon } from "lucide-react"
import { useToolHistory } from "@/lib/hooks/useToolHistory"
import { HistoryPanel } from "@/components/tools/HistoryPanel"

type Mode = "text" | "file"
type Operation = "encode" | "decode"

// 예시 데이터 (컴포넌트 외부 상수)
const EXAMPLE_TEXT = "Hello, DevTools Hub! 안녕하세요! 👋"
const EXAMPLE_BASE64 = "SGVsbG8sIERldlRvb2xzIEh1YiEg7JWI64WV7ZWY7IS47JqUISDwn5GL"

export default function Base64Page() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<Mode>("text")
  const [operation, setOperation] = useState<Operation>("encode")

  // Text mode states
  const [textInput, setTextInput] = useState("")
  const [base64Input, setBase64Input] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // File mode states
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileBase64, setFileBase64] = useState("")
  const [fileMimeType, setFileMimeType] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isImageFile, setIsImageFile] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { history, addToHistory, clearHistory, toggleFavorite } = useToolHistory('base64')

  // Smart Paste Detection: URL의 paste 파라미터 처리
  useEffect(() => {
    const pastedText = searchParams.get('paste')
    if (pastedText) {
      // 최대 100KB로 제한
      if (pastedText.length > 100_000) {
        console.warn('Paste parameter too large, ignoring')
        window.history.replaceState({}, '', window.location.pathname)
        return
      }

      try {
        const decoded = decodeURIComponent(pastedText)

        // 디코딩 후에도 체크
        if (decoded.length > 100_000) {
          console.warn('Decoded paste too large, ignoring')
          window.history.replaceState({}, '', window.location.pathname)
          return
        }

        // Base64인지 감지 (4의 배수 길이 + A-Za-z0-9+/= 문자)
        const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(decoded) && decoded.length % 4 === 0

        if (isBase64) {
          // Base64 디코딩 모드
          setOperation("decode")
          setBase64Input(decoded)
          const result = decodeBase64(decoded)
          if (result.success && result.result) {
            setOutput(result.result)
            setError(null)
          }
        } else {
          // 일반 텍스트 인코딩 모드
          setOperation("encode")
          setTextInput(decoded)
          const result = encodeBase64(decoded)
          if (result.success && result.result) {
            setOutput(result.result)
            setError(null)
          }
        }

        // URL에서 파라미터 제거 (깔끔하게)
        window.history.replaceState({}, '', window.location.pathname)
      } catch (error) {
        console.error('Failed to decode paste parameter:', error)
      }
      return // paste 파라미터가 있으면 예시 데이터 로드 안함
    }

    // 초기 예시 데이터 설정
    setTextInput(EXAMPLE_TEXT)
    const result = encodeBase64(EXAMPLE_TEXT)
    if (result.success && result.result) {
      setOutput(result.result)
    }
  }, [searchParams])

  const handleTextEncode = () => {
    const result = encodeBase64(textInput)
    if (result.success && result.result) {
      setOutput(result.result)
      setError(null)
      addToHistory(textInput, result.result)
    } else {
      setError(result.error || "인코딩 중 오류가 발생했습니다.")
      setOutput("")
    }
  }

  const handleTextDecode = () => {
    const result = decodeBase64(base64Input)
    if (result.success && result.result) {
      setOutput(result.result)
      setError(null)
      addToHistory(base64Input, result.result)
    } else {
      setError(result.error || "디코딩 중 오류가 발생했습니다.")
      setOutput("")
    }
  }

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)
    setError(null)

    const result = await encodeFileToBase64(file)
    if (result.success && result.base64) {
      setFileBase64(result.base64)
      setFileMimeType(result.mimeType || "")
      setIsImageFile(file.type.startsWith("image/"))
      addToHistory(file.name, `Base64 encoded: ${file.name}`)
    } else {
      setError(result.error || "파일 인코딩 중 오류가 발생했습니다.")
      setFileBase64("")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleCopyBase64 = async () => {
    const textToCopy = mode === "file" ? fileBase64 : output
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadFile = () => {
    if (!fileBase64 || !selectedFile) return

    const blob = base64ToBlob(fileBase64, fileMimeType)
    if (!blob) {
      setError("파일 다운로드 중 오류가 발생했습니다.")
      return
    }

    const url = URL.createObjectURL(blob)

    try {
      const a = document.createElement("a")
      a.href = url
      a.download = selectedFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      setError("파일 다운로드 중 오류가 발생했습니다.")
    } finally {
      // 에러 발생 여부와 관계없이 항상 메모리 정리
      URL.revokeObjectURL(url)
    }
  }

  const handleClear = () => {
    setTextInput("")
    setBase64Input("")
    setOutput("")
    setError(null)
    setSelectedFile(null)
    setFileBase64("")
    setFileMimeType("")
    setIsImageFile(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('base64.title')}</h1>
        <p className="text-muted-foreground">
          {t('base64.description')}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2">
        <Button
          onClick={() => setMode("text")}
          variant={mode === "text" ? "default" : "outline"}
        >
          {t('base64.textMode')}
        </Button>
        <Button
          onClick={() => setMode("file")}
          variant={mode === "file" ? "default" : "outline"}
        >
          {t('base64.fileMode')}
        </Button>
        <Button onClick={handleClear} variant="outline" className="ml-auto">
          {t('common.clear')}
        </Button>
      </div>

      {/* Text Mode */}
      {mode === "text" && (
        <>
          {/* Operation Switcher */}
          <div className="flex gap-2">
            <Button
              onClick={() => setOperation("encode")}
              variant={operation === "encode" ? "default" : "outline"}
              size="sm"
            >
              {t('base64.encode')}
            </Button>
            <Button
              onClick={() => setOperation("decode")}
              variant={operation === "decode" ? "default" : "outline"}
              size="sm"
            >
              {t('base64.decode')}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {operation === "encode" ? t('base64.textInput') : t('base64.base64Input')}
                </CardTitle>
                <CardDescription>
                  {operation === "encode" ? t('base64.textInputPlaceholder') : t('base64.base64InputPlaceholder')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={operation === "encode" ? textInput : base64Input}
                  onChange={(e) => operation === "encode" ? setTextInput(e.target.value) : setBase64Input(e.target.value)}
                  placeholder={operation === "encode" ? t('base64.textInputPlaceholder') : t('base64.base64InputPlaceholder')}
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="mt-4">
                  <Button
                    onClick={operation === "encode" ? handleTextEncode : handleTextDecode}
                    className="w-full"
                  >
                    {operation === "encode" ? t('base64.encode') : t('base64.decode')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">{t('base64.result')}</CardTitle>
                  <CardDescription>
                    {operation === "encode" ? "Base64 " + t('base64.result') : t('base64.textInput')}
                  </CardDescription>
                </div>
                {output && !error && (
                  <Button
                    onClick={handleCopyBase64}
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
                    placeholder={t('base64.result')}
                    className="min-h-[300px] font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* File Mode */}
      {mode === "file" && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('base64.fileMode')}</CardTitle>
              <CardDescription>{t('base64.dragDropFile')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative flex flex-col items-center justify-center
                  min-h-[300px] rounded-lg border-2 border-dashed
                  cursor-pointer transition-colors
                  ${isDragging
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25 hover:border-primary hover:bg-accent"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center gap-4 p-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedFile.type || "unknown"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <div className="rounded-full bg-muted p-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{t('base64.dragDropFile')}</p>
                      <p className="text-xs text-muted-foreground">
                        이미지, 텍스트, 모든 파일 지원
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {fileBase64 && (
                <div className="mt-4 space-y-2">
                  <Button onClick={handleCopyBase64} variant="default" className="w-full gap-2">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t('common.copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t('base64.copyBase64')}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview / Base64 Output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {isImageFile ? t('base64.imagePreview') : "Base64 " + t('base64.result')}
              </CardTitle>
              <CardDescription>
                {isImageFile ? "이미지 미리보기 및 Base64 결과" : "Base64 인코딩 결과"}
              </CardDescription>
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
              ) : fileBase64 ? (
                <div className="space-y-4">
                  {/* Image Preview */}
                  {isImageFile && (
                    <div className="rounded-lg border bg-muted/50 p-4">
                      <img
                        src={`data:${fileMimeType};base64,${fileBase64}`}
                        alt="Preview"
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  )}

                  {/* Base64 String */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Base64:</label>
                    <Textarea
                      value={fileBase64}
                      readOnly
                      className="min-h-[200px] font-mono text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm">파일을 선택하면 여기에 결과가 표시됩니다</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* History Panel */}
      <HistoryPanel
        history={history}
        onSelect={(item) => {
          if (mode === "text") {
            if (operation === "encode") {
              setTextInput(item.input)
            } else {
              setBase64Input(item.input)
            }
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
          <p>• {t('base64.tip1')}</p>
          <p>• {t('base64.tip2')}</p>
          <p>• {t('base64.tip3')}</p>
          <p>• {t('base64.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
