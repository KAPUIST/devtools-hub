"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export function Footer() {
  const params = useParams()
  const locale = params?.locale as string || 'en'

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-muted-foreground">
            © {currentYear} DevTools Hub. All rights reserved.
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
