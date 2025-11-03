'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

/**
 * Google AdSense Ad Component
 *
 * Usage:
 * 1. Get your AdSense account approved
 * 2. Add NEXT_PUBLIC_ADSENSE_CLIENT to .env.local
 * 3. Create ad unit and get ad slot ID
 * 4. Use this component:
 *
 * <AdSense adSlot="1234567890" />
 */
export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = {},
}: AdSenseProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV === 'production' && adClient) {
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [adClient])

  // Don't show ads in development or if client ID is missing
  if (process.env.NODE_ENV !== 'production' || !adClient) {
    return (
      <div
        className="flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-gray-500"
        style={style}
      >
        <div className="text-center">
          <p className="text-sm font-medium">Ad Placeholder</p>
          <p className="text-xs">(Ads will appear in production)</p>
        </div>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}
