"use client"

import { useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hashTextAll, hashFile, type HashAlgorithm } from "@/lib/tools/hash"
import { Check, Copy, Upload, AlertTriangle, Info } from "lucide-react"

export default function HashGeneratorPage() {
  const t = useTranslations()

  // M§∏ ®‹
  const [textInput, setTextInput] = useState("")
  const [textHashes, setTextHashes] = useState<{
    'SHA-1': string
    'SHA-256': string
    'SHA-384': string
    'SHA-512': string
  } | null>(null)
  const [textLoading, setTextLoading] = useState(false)

  // | ®‹
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileHashes, setFileHashes] = useState<{
    'SHA-1': string
    'SHA-256': string
    'SHA-384': string
    'SHA-512': string
  } | null>(null)
  const [fileLoading, setFileLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ı¨ ¡‹
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  // ‹ M§∏
  const exampleText = "Hello, DevTools Hub!"

  // M§∏ t‹ ›1
  const handleHashText = async () => {
    if (!textInput.trim()) return

    setTextLoading(true)
    const result = await hashTextAll(textInput)

    if (result.success && result.hashes) {
      setTextHashes(result.hashes)
    }

    setTextLoading(false)
  }

  // |  › x‰Ï
  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)
    setFileLoading(true)

    const result = await hashFile(file)

    if (result.success && result.hashes) {
      setFileHashes(result.hashes)
    }

    setFileLoading(false)
  }

  // | Ö% ¿Ω
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // ‹ò¯ d ‹m
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // t‹ ı¨
  const handleCopyHash = async (hash: string, algorithm: string) => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopiedHash(algorithm)
      setTimeout(() => setCopiedHash(null), 2000)
    } catch (error) {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = hash
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedHash(algorithm)
      setTimeout(() => setCopiedHash(null), 2000)
    }
  }

  // ‹ \‹
  const loadExample = async () => {
    setTextInput(exampleText)
    setTextLoading(true)
    const result = await hashTextAll(exampleText)
    if (result.success && result.hashes) {
      setTextHashes(result.hashes)
    }
    setTextLoading(false)
  }

  // t‹ ∞¸ T¡
  const renderHashResults = (hashes: typeof textHashes, title: string) => {
    if (!hashes) return null

    const algorithms: Array<{ name: HashAlgorithm; warning?: boolean }> = [
      { name: 'SHA-1', warning: true },
      { name: 'SHA-256' },
      { name: 'SHA-384' },
      { name: 'SHA-512' },
    ]

    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {algorithms.map(({ name, warning }) => (
          <div key={name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{name}</span>
                {warning && (
                  <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-500">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{t('hashGenerator.deprecated')}</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyHash(hashes[name], name)}
                className="gap-2"
              >
                {copiedHash === name ? (
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
            <Input
              value={hashes[name]}
              readOnly
              className="font-mono text-xs"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('hashGenerator.title')}</h1>
        <p className="text-muted-foreground">
          {t('hashGenerator.description')}
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="text" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">{t('hashGenerator.textMode')}</TabsTrigger>
          <TabsTrigger value="file">{t('hashGenerator.fileMode')}</TabsTrigger>
        </TabsList>

        {/* Text Mode */}
        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('hashGenerator.textInput')}</CardTitle>
              <CardDescription>{t('hashGenerator.textInputDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t('hashGenerator.textInputPlaceholder')}
                rows={5}
                className="font-mono"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleHashText}
                  disabled={!textInput.trim() || textLoading}
                  className="flex-1"
                >
                  {textLoading ? t('hashGenerator.generating') : t('hashGenerator.generate')}
                </Button>
                <Button
                  onClick={loadExample}
                  variant="outline"
                >
                  {t('hashGenerator.loadExample')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {textHashes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('hashGenerator.results')}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderHashResults(textHashes, t('hashGenerator.textHashes'))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* File Mode */}
        <TabsContent value="file" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('hashGenerator.fileInput')}</CardTitle>
              <CardDescription>{t('hashGenerator.fileInputDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {t('hashGenerator.dragDropFile')}
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                >
                  {t('hashGenerator.selectFile')}
                </Button>
              </div>

              {selectedFile && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {fileHashes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('hashGenerator.results')}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderHashResults(fileHashes, t('hashGenerator.fileHashes'))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Security Warning */}
      <Card className="border-yellow-500/50 bg-yellow-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <CardTitle className="text-lg">{t('hashGenerator.securityWarning')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>{t('hashGenerator.securityWarningMessage')}</p>
          <p>{t('hashGenerator.sha1Warning')}</p>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('common.tips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>" {t('hashGenerator.tip1')}</p>
          <p>" {t('hashGenerator.tip2')}</p>
          <p>" {t('hashGenerator.tip3')}</p>
          <p>" {t('hashGenerator.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
