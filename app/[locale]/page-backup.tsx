"use client"

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Braces, Code2, Lock } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  const featuredTools = [
    {
      title: t('tools.jsonFormatter'),
      description: t('jsonFormatter.description'),
      icon: Braces,
      href: "json-formatter",
      tier: t('sidebar.essential'),
    },
    {
      title: t('tools.regexTester'),
      description: "Test regular expressions with real-time matching",
      icon: Code2,
      href: "regex-tester",
      tier: t('sidebar.essential'),
    },
    {
      title: t('tools.base64'),
      description: "Convert text and files to/from Base64 with drag-and-drop support",
      icon: Lock,
      href: "base64",
      tier: t('sidebar.essential'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('home.title')}</h1>
        <p className="text-muted-foreground">
          {t('home.description')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.href} href={`/${locale}/${tool.href}`}>
              <Card className="h-full transition-colors hover:bg-secondary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <div className="mt-1">
                        <span className="text-xs text-muted-foreground">{tool.tier}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-2 text-xl font-semibold">{t('home.keyboardShortcuts')}</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>{t('home.searchTools')}</span>
            <kbd className="rounded border bg-muted px-2 py-1 text-xs">Cmd+K</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('home.toggleDarkMode')}</span>
            <kbd className="rounded border bg-muted px-2 py-1 text-xs">Cmd+D</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('home.copyResult')}</span>
            <kbd className="rounded border bg-muted px-2 py-1 text-xs">Cmd+C</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
