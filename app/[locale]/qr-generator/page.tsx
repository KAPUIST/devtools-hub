"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  generateQRCode,
  downloadQRCode,
  getErrorCorrectionDescription,
  getSizeDescription,
  type QRCodeSize,
  type ErrorCorrectionLevel
} from "@/lib/tools/qrcode"
import { Check, Copy, Download, QrCode, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function QRGeneratorPage() {
  const t = useTranslations()

  // State
  const [input, setInput] = useState("")
  const [size, setSize] = useState<QRCodeSize>("medium")
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>("M")
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Example data
  const examples = [
    { name: "Website", value: "https://devtools-hub-app.vercel.app" },
    { name: "Email", value: "mailto:hello@example.com" },
    { name: "Phone", value: "tel:+1234567890" },
    { name: "WiFi", value: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;" },
    { name: "Text", value: "Hello, World! This is a QR code." },
  ]

  // Generate QR code when input changes
  useEffect(() => {
    const generateQR = async () => {
      if (!input.trim()) {
        setQrCodeDataURL(null)
        setError(null)
        return
      }

      setIsGenerating(true)
      setError(null)

      const result = await generateQRCode(input, { size, errorCorrectionLevel: errorCorrection })

      if (result.success && result.dataURL) {
        setQrCodeDataURL(result.dataURL)
        setError(null)
      } else {
        setQrCodeDataURL(null)
        setError(t(`qrGenerator.errors.${result.errorCode ?? 'GENERATION_ERROR'}`))
      }

      setIsGenerating(false)
    }

    generateQR()
  }, [input, size, errorCorrection, t])

  // Download QR code
  const handleDownload = () => {
    if (qrCodeDataURL) {
      downloadQRCode(qrCodeDataURL, 'qrcode.png')
    }
  }

  // Copy data URL to clipboard
  const handleCopy = async () => {
    if (!qrCodeDataURL) return

    try {
      await navigator.clipboard.writeText(qrCodeDataURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback: 구식 방법으로 복사
      const textarea = document.createElement('textarea')
      textarea.value = qrCodeDataURL
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()

      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackError) {
        setError(t('qrGenerator.errors.COPY_FAILED'))
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  // Load example
  const loadExample = (value: string) => {
    setInput(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('qrGenerator.title')}</h1>
        <p className="text-muted-foreground">
          {t('qrGenerator.description')}
        </p>
      </div>

      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('qrGenerator.input')}</CardTitle>
          <CardDescription>{t('qrGenerator.inputDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Text Input */}
          <div className="space-y-2">
            <Label htmlFor="qr-input">{t('qrGenerator.textOrUrl')}</Label>
            <Input
              id="qr-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('qrGenerator.inputPlaceholder')}
              className="font-mono"
            />
          </div>

          {/* Example Buttons */}
          <div className="space-y-2">
            <span className="text-sm font-medium">{t('qrGenerator.examples')}</span>
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <Button
                  key={example.value}
                  onClick={() => loadExample(example.value)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <QrCode className="h-4 w-4" />
                  {example.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <Label>{t('qrGenerator.size')}</Label>
            <RadioGroup value={size} onValueChange={(value) => setSize(value as QRCodeSize)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="size-small" />
                <Label htmlFor="size-small" className="cursor-pointer font-normal">
                  {t('qrGenerator.sizeSmall')} {getSizeDescription('small')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="size-medium" />
                <Label htmlFor="size-medium" className="cursor-pointer font-normal">
                  {t('qrGenerator.sizeMedium')} {getSizeDescription('medium')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="size-large" />
                <Label htmlFor="size-large" className="cursor-pointer font-normal">
                  {t('qrGenerator.sizeLarge')} {getSizeDescription('large')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Error Correction Selection */}
          <div className="space-y-2">
            <Label>{t('qrGenerator.errorCorrection')}</Label>
            <RadioGroup
              value={errorCorrection}
              onValueChange={(value) => setErrorCorrection(value as ErrorCorrectionLevel)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="L" id="ec-l" />
                <Label htmlFor="ec-l" className="cursor-pointer font-normal">
                  L - {getErrorCorrectionDescription('L')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="M" id="ec-m" />
                <Label htmlFor="ec-m" className="cursor-pointer font-normal">
                  M - {getErrorCorrectionDescription('M')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Q" id="ec-q" />
                <Label htmlFor="ec-q" className="cursor-pointer font-normal">
                  Q - {getErrorCorrectionDescription('Q')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="H" id="ec-h" />
                <Label htmlFor="ec-h" className="cursor-pointer font-normal">
                  H - {getErrorCorrectionDescription('H')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* QR Code Preview Card */}
      {(qrCodeDataURL || isGenerating) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
              {t('qrGenerator.preview')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* QR Code Image */}
            <div className="flex justify-center">
              <div className="rounded-lg border border-input p-4 bg-white">
                {isGenerating ? (
                  <Skeleton className="w-64 h-64" />
                ) : qrCodeDataURL ? (
                  <img
                    src={qrCodeDataURL}
                    alt="QR Code"
                    className="max-w-full h-auto"
                  />
                ) : null}
              </div>
            </div>

            {/* Action Buttons */}
            {!isGenerating && (
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleDownload}
                  variant="default"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t('qrGenerator.download')}
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
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
                      {t('qrGenerator.copyDataURL')}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('qrGenerator.tip1')}</p>
          <p>• {t('qrGenerator.tip2')}</p>
          <p>• {t('qrGenerator.tip3')}</p>
          <p>• {t('qrGenerator.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
