"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, ChevronUp, ChevronDown, Trash, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ko, ja, zhCN } from "date-fns/locale"
import type { HistoryItem } from "@/lib/hooks/useToolHistory"

interface HistoryPanelProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onClear: () => void
  onToggleFavorite?: (id: string) => void
}

export function HistoryPanel({
  history,
  onSelect,
  onClear,
  onToggleFavorite
}: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()

  // date-fns locale 매핑
  const dateLocales = {
    ko,
    ja,
    zh: zhCN,
    en: undefined
  }

  if (history.length === 0) return null

  return (
    <Card>
      <CardHeader
        className="cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <History className="h-4 w-4" />
            {t('common.history')} ({history.length})
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-md border hover:bg-accent cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(item.timestamp, {
                    addSuffix: true,
                    locale: dateLocales[locale as keyof typeof dateLocales]
                  })}
                </span>
                {onToggleFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(item.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star
                      className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
                    />
                  </button>
                )}
              </div>
              <div onClick={() => onSelect(item)}>
                <pre className="text-xs truncate font-mono">{item.input}</pre>
              </div>
            </div>
          ))}

          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Trash className="h-4 w-4 mr-2" />
            {t('common.clearHistory')}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
