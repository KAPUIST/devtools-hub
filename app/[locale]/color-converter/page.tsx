"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { parseColor, type ColorResult } from "@/lib/tools/color"
import { Check, Copy, Palette } from "lucide-react"

export default function ColorConverterPage() {
  const t = useTranslations()

  // State
  const [input, setInput] = useState("")
  const [colorResult, setColorResult] = useState<ColorResult | null>(null)
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
  const [pickerColor, setPickerColor] = useState("#FF5733")

  // Ref for timeout cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Example colors
  const exampleColors = [
    { name: "Orange", value: "#FF5733" },
    { name: "Blue", value: "#3498DB" },
    { name: "Green", value: "#2ECC71" },
    { name: "Purple", value: "#9B59B6" },
    { name: "Red", value: "#E74C3C" },
  ]

  // Handle color input change
  const handleInputChange = (value: string) => {
    setInput(value)
    if (value.trim()) {
      const result = parseColor(value)
      setColorResult(result)
    } else {
      setColorResult(null)
    }
  }

  // Handle color picker change
  const handlePickerChange = (value: string) => {
    setPickerColor(value)
    setInput(value)
    const result = parseColor(value)
    setColorResult(result)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle copy to clipboard
  const handleCopy = async (text: string, format: string) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopiedFormat(format)

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setCopiedFormat(null)
        timeoutRef.current = null
      }, 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  // Load example color
  const loadExample = (color: string) => {
    setInput(color)
    const result = parseColor(color)
    setColorResult(result)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('colorConverter.title')}</h1>
        <p className="text-muted-foreground">
          {t('colorConverter.description')}
        </p>
      </div>

      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('colorConverter.input')}</CardTitle>
          <CardDescription>{t('colorConverter.inputDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Color Picker */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{t('colorConverter.colorPicker')}</span>
            </div>
            <input
              type="color"
              value={pickerColor}
              onChange={(e) => handlePickerChange(e.target.value)}
              className="h-10 w-20 cursor-pointer rounded border border-input"
            />
          </div>

          {/* Text Input */}
          <Input
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t('colorConverter.inputPlaceholder')}
            className="font-mono"
          />

          {/* Example Colors */}
          <div className="space-y-2">
            <span className="text-sm font-medium">{t('colorConverter.examples')}</span>
            <div className="flex flex-wrap gap-2">
              {exampleColors.map((color) => (
                <Button
                  key={color.value}
                  onClick={() => loadExample(color.value)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <div
                    className="h-4 w-4 rounded border border-input"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {colorResult && !colorResult.success && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {t(`colorConverter.errors.${colorResult.errorCode}`)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Card */}
      {colorResult && colorResult.success && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('colorConverter.results')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Color Preview */}
            <div className="space-y-2">
              <span className="text-sm font-medium">{t('colorConverter.preview')}</span>
              <div
                className="h-24 w-full rounded-lg border border-input"
                style={{ backgroundColor: colorResult.hex }}
              />
            </div>

            {/* HEX */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">HEX</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(colorResult.hex ?? '', 'HEX')}
                  className="gap-2"
                >
                  {copiedFormat === 'HEX' ? (
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
                value={colorResult.hex ?? ''}
                readOnly
                className="font-mono text-sm"
              />
            </div>

            {/* RGB */}
            {colorResult.rgb && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">RGB</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(`rgb(${colorResult.rgb?.r ?? 0}, ${colorResult.rgb?.g ?? 0}, ${colorResult.rgb?.b ?? 0})`, 'RGB')}
                    className="gap-2"
                  >
                    {copiedFormat === 'RGB' ? (
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
                  value={`rgb(${colorResult.rgb.r}, ${colorResult.rgb.g}, ${colorResult.rgb.b})`}
                  readOnly
                  className="font-mono text-sm"
                />
              </div>
            )}

            {/* HSL */}
            {colorResult.hsl && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">HSL</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(`hsl(${colorResult.hsl?.h ?? 0}, ${colorResult.hsl?.s ?? 0}%, ${colorResult.hsl?.l ?? 0}%)`, 'HSL')}
                    className="gap-2"
                  >
                    {copiedFormat === 'HSL' ? (
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
                  value={`hsl(${colorResult.hsl.h}, ${colorResult.hsl.s}%, ${colorResult.hsl.l}%)`}
                  readOnly
                  className="font-mono text-sm"
                />
              </div>
            )}

            {/* Individual RGB Values */}
            {colorResult.rgb && (
              <div className="space-y-2">
                <span className="text-sm font-medium">{t('colorConverter.rgbValues')}</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">R</span>
                    <Input value={colorResult.rgb.r} readOnly className="text-center" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">G</span>
                    <Input value={colorResult.rgb.g} readOnly className="text-center" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">B</span>
                    <Input value={colorResult.rgb.b} readOnly className="text-center" />
                  </div>
                </div>
              </div>
            )}

            {/* Individual HSL Values */}
            {colorResult.hsl && (
              <div className="space-y-2">
                <span className="text-sm font-medium">{t('colorConverter.hslValues')}</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">H (0-360)</span>
                    <Input value={colorResult.hsl.h} readOnly className="text-center" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">S (0-100%)</span>
                    <Input value={colorResult.hsl.s} readOnly className="text-center" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">L (0-100%)</span>
                    <Input value={colorResult.hsl.l} readOnly className="text-center" />
                  </div>
                </div>
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
          <p>• {t('colorConverter.tip1')}</p>
          <p>• {t('colorConverter.tip2')}</p>
          <p>• {t('colorConverter.tip3')}</p>
          <p>• {t('colorConverter.tip4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
