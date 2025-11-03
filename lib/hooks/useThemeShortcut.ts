"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

/**
 * Global keyboard shortcut for theme toggling
 * Cmd/Ctrl + Shift + D: Toggle between light and dark mode
 */
export function useThemeShortcut() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Shift + D
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [theme, setTheme])
}
