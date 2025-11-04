import { useState, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'

export interface HistoryItem {
  id: string
  timestamp: number
  input: string
  output?: string
  toolName: string
  isFavorite?: boolean
}

export function useToolHistory(toolName: string, maxItems = 10) {
  const [history, setHistory] = useState<HistoryItem[]>([])

  // localStorage에서 히스토리 로드
  useEffect(() => {
    // SSR 안전성: window가 정의되지 않은 서버 환경에서는 실행 안함
    if (typeof window === 'undefined') return

    const key = `devtools-hub-history-${toolName}`

    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved)
        setHistory(parsed)
      }
    } catch (error) {
      console.error('Failed to load history:', error)

      // 손상된 데이터를 백업
      const backupKey = `${key}-corrupted-${Date.now()}`
      try {
        const saved = localStorage.getItem(key)
        if (saved) {
          localStorage.setItem(backupKey, saved)
        }
      } catch {
        // 백업 실패해도 계속 진행
      }

      // 손상된 데이터 제거
      localStorage.removeItem(key)
      setHistory([])
    }
  }, [toolName])

  // 히스토리에 새 아이템 추가
  const addToHistory = useCallback((input: string, output?: string) => {
    const newItem: HistoryItem = {
      id: nanoid(),
      timestamp: Date.now(),
      input,
      output,
      toolName,
    }

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, maxItems)
      const key = `devtools-hub-history-${toolName}`

      try {
        localStorage.setItem(key, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to save history:', error)

        // QuotaExceededError 처리
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          // 오래된 항목 절반만 남기고 삭제
          const reduced = updated.slice(0, Math.floor(maxItems / 2))
          try {
            localStorage.setItem(key, JSON.stringify(reduced))
            return reduced
          } catch {
            console.error('Still failed after reducing items')
          }
        }
      }

      return updated
    })
  }, [toolName, maxItems])

  // 히스토리 전체 삭제
  const clearHistory = useCallback(() => {
    setHistory([])
    const key = `devtools-hub-history-${toolName}`

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }, [toolName])

  // 즐겨찾기 토글
  const toggleFavorite = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
      const key = `devtools-hub-history-${toolName}`

      try {
        localStorage.setItem(key, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to update favorite:', error)
      }

      return updated
    })
  }, [toolName])

  const favorites = history.filter((item) => item.isFavorite)

  return { history, addToHistory, clearHistory, toggleFavorite, favorites }
}
