"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { detectPasteType, getToolDisplayName } from '@/lib/tools/detectPasteType'
import { toast } from 'sonner'

/**
 * Smart Paste Detection
 * 글로벌 paste 이벤트를 감지하여 적합한 도구로 리다이렉트
 */
export function SmartPasteDetector() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // textarea, input, contentEditable에서는 무시 (정상적인 입력)
      const target = e.target as HTMLElement
      if (
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'INPUT' ||
        target.isContentEditable
      ) {
        return
      }

      // 클립보드 텍스트 가져오기
      const text = e.clipboardData?.getData('text')
      if (!text || text.length < 5) return

      // 타입 감지
      const detectedType = detectPasteType(text)
      if (!detectedType) return

      // 현재 경로에서 도구 이름 추출 (trailing slash 처리)
      const pathSegments = pathname.split('/').filter(s => s.length > 0)
      const currentTool = pathSegments[pathSegments.length - 1]

      // 이미 올바른 도구에 있으면 무시
      if (currentTool === detectedType) return

      // 홈페이지에서는 작동하지 않음
      if (
        pathname === `/${locale}` ||
        pathname.endsWith('/en') ||
        pathname.endsWith('/ko') ||
        pathname.endsWith('/ja') ||
        pathname.endsWith('/zh')
      ) {
        return
      }

      // privacy 페이지에서는 무시
      if (pathname.includes('/privacy')) {
        return
      }

      // Toast 알림 및 리다이렉트 (에러 처리 추가)
      try {
        const displayName = getToolDisplayName(detectedType)
        toast.info(`${displayName} 감지됨. 리다이렉트 중...`, {
          duration: 2000,
        })

        // URL 파라미터로 붙여넣은 텍스트 전달
        const encodedText = encodeURIComponent(text)
        router.push(`/${locale}/${detectedType}?paste=${encodedText}`)
      } catch (error) {
        console.error('Failed to redirect:', error)
        toast.error('리다이렉트 실패. 페이지를 새로고침 해주세요.')
      }
    }

    // 글로벌 paste 이벤트 리스너 등록
    document.addEventListener('paste', handlePaste)

    // 클린업
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [router, pathname, locale])

  return null // UI 렌더링 안함
}
