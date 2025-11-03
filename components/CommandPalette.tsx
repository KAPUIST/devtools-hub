"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Braces,
  Code2,
  Lock,
  Clock,
  Link2,
  Hash,
  Palette,
  QrCode,
} from "lucide-react"

const tools = [
  {
    title: "JSON Formatter",
    href: "/json-formatter",
    icon: Braces,
    tier: "sidebar.essential",
  },
  {
    title: "RegExp Tester",
    href: "/regex-tester",
    icon: Code2,
    tier: "sidebar.essential",
  },
  {
    title: "Base64 Encode/Decode",
    href: "/base64",
    icon: Lock,
    tier: "sidebar.essential",
  },
  {
    title: "JWT Debugger",
    href: "/jwt-debugger",
    icon: Lock,
    tier: "sidebar.frequentlyUsed",
  },
  {
    title: "Unix Timestamp",
    href: "/unix-time",
    icon: Clock,
    tier: "sidebar.frequentlyUsed",
  },
  {
    title: "URL Encoder",
    href: "/url-encoder",
    icon: Link2,
    tier: "sidebar.frequentlyUsed",
  },
  {
    title: "UUID Generator",
    href: "/uuid-generator",
    icon: Hash,
    tier: "sidebar.frequentlyUsed",
  },
  {
    title: "Hash Generator",
    href: "/hash-generator",
    icon: Hash,
    tier: "sidebar.additional",
  },
  {
    title: "Color Converter",
    href: "/color-converter",
    icon: Palette,
    tier: "sidebar.additional",
  },
  {
    title: "QR Code Generator",
    href: "/qr-generator",
    icon: QrCode,
    tier: "sidebar.additional",
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(`/${locale}${href}`)
  }

  // Group tools by tier
  const groupedTools = {
    essential: tools.filter(t => t.tier === "sidebar.essential"),
    frequentlyUsed: tools.filter(t => t.tier === "sidebar.frequentlyUsed"),
    additional: tools.filter(t => t.tier === "sidebar.additional"),
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t('common.search')} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading={t('sidebar.essential')}>
          {groupedTools.essential.map((tool) => {
            const Icon = tool.icon
            return (
              <CommandItem
                key={tool.href}
                value={`${tool.title} ${tool.href}`}
                onSelect={() => handleSelect(tool.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{tool.title}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading={t('sidebar.frequentlyUsed')}>
          {groupedTools.frequentlyUsed.map((tool) => {
            const Icon = tool.icon
            return (
              <CommandItem
                key={tool.href}
                value={`${tool.title} ${tool.href}`}
                onSelect={() => handleSelect(tool.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{tool.title}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading={t('sidebar.additional')}>
          {groupedTools.additional.map((tool) => {
            const Icon = tool.icon
            return (
              <CommandItem
                key={tool.href}
                value={`${tool.title} ${tool.href}`}
                onSelect={() => handleSelect(tool.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{tool.title}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
