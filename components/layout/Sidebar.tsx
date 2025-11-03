"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
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
    tier: 1,
  },
  {
    title: "RegExp Tester",
    href: "/regex-tester",
    icon: Code2,
    tier: 1,
  },
  {
    title: "Base64 Encode/Decode",
    href: "/base64",
    icon: Lock,
    tier: 1,
  },
  {
    title: "JWT Debugger",
    href: "/jwt-debugger",
    icon: Lock,
    tier: 2,
  },
  {
    title: "Unix Timestamp",
    href: "/unix-time",
    icon: Clock,
    tier: 2,
  },
  {
    title: "URL Encoder",
    href: "/url-encoder",
    icon: Link2,
    tier: 2,
  },
  {
    title: "UUID Generator",
    href: "/uuid-generator",
    icon: Hash,
    tier: 2,
  },
  {
    title: "Hash Generator",
    href: "/hash-generator",
    icon: Hash,
    tier: 3,
  },
  {
    title: "Color Converter",
    href: "/color-converter",
    icon: Palette,
    tier: 3,
  },
  {
    title: "QR Code Generator",
    href: "/qr-generator",
    icon: QrCode,
    tier: 3,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations()

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block md:w-64">
      <div className="h-full overflow-auto py-6 pr-6 lg:py-8">
        <nav className="space-y-1">
          {/* Tier 1 - Essential */}
          <div className="mb-4">
            <h4 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('sidebar.essential')}
            </h4>
            {tools
              .filter((tool) => tool.tier === 1)
              .map((tool) => {
                const Icon = tool.icon
                const isActive = pathname === `/${locale}${tool.href}`
                return (
                  <Link
                    key={tool.href}
                    href={`/${locale}${tool.href}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tool.title}
                  </Link>
                )
              })}
          </div>

          {/* Tier 2 - Frequently Used */}
          <div className="mb-4">
            <h4 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('sidebar.frequentlyUsed')}
            </h4>
            {tools
              .filter((tool) => tool.tier === 2)
              .map((tool) => {
                const Icon = tool.icon
                const isActive = pathname === `/${locale}${tool.href}`
                return (
                  <Link
                    key={tool.href}
                    href={`/${locale}${tool.href}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tool.title}
                  </Link>
                )
              })}
          </div>

          {/* Tier 3 - Additional */}
          <div>
            <h4 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('sidebar.additional')}
            </h4>
            {tools
              .filter((tool) => tool.tier === 3)
              .map((tool) => {
                const Icon = tool.icon
                const isActive = pathname === `/${locale}${tool.href}`
                return (
                  <Link
                    key={tool.href}
                    href={`/${locale}${tool.href}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tool.title}
                  </Link>
                )
              })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
