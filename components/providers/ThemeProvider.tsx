"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useThemeShortcut } from "@/lib/hooks/useThemeShortcut"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeShortcutHandler />
      {children}
    </NextThemesProvider>
  )
}

function ThemeShortcutHandler() {
  useThemeShortcut()
  return null
}
