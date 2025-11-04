"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Keyboard } from "lucide-react"

interface Shortcut {
  keys: string[]
  description: string
  category: string
}

export function KeyboardShortcuts() {
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+/ or Ctrl+/ to open shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setOpen(true)
      }

      // Escape to close
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }

      // ? to open shortcuts (like GitHub)
      if (e.key === '?' && !open) {
        const target = e.target as HTMLElement
        // Don't trigger if typing in input/textarea
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setOpen(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const shortcuts: Shortcut[] = [
    {
      keys: ['⌘', 'K'],
      description: t('shortcuts.searchTools'),
      category: 'navigation',
    },
    {
      keys: ['⌘', '/'],
      description: t('shortcuts.showShortcuts'),
      category: 'navigation',
    },
    {
      keys: ['?'],
      description: t('shortcuts.showShortcuts'),
      category: 'navigation',
    },
    {
      keys: ['Esc'],
      description: t('shortcuts.closeModal'),
      category: 'navigation',
    },
    {
      keys: ['⌘', 'Shift', 'D'],
      description: t('shortcuts.toggleTheme'),
      category: 'general',
    },
    {
      keys: ['⌘', 'C'],
      description: t('shortcuts.copyResult'),
      category: 'tools',
    },
    {
      keys: ['⌘', 'Enter'],
      description: t('shortcuts.executeFormat'),
      category: 'tools',
    },
    {
      keys: ['⌘', 'V'],
      description: t('shortcuts.pasteAndDetect'),
      category: 'tools',
    },
  ]

  const categories = {
    navigation: t('shortcuts.categoryNavigation'),
    general: t('shortcuts.categoryGeneral'),
    tools: t('shortcuts.categoryTools'),
  }

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, Shortcut[]>)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Keyboard className="h-6 w-6" />
            {t('shortcuts.title')}
          </DialogTitle>
          <DialogDescription>
            {t('shortcuts.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {categories[category as keyof typeof categories]}
              </h3>
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[13px] font-medium"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
          {t('shortcuts.tip')}
        </div>
      </DialogContent>
    </Dialog>
  )
}
