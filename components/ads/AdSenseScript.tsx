import Script from 'next/script'

/**
 * Google AdSense Script Component
 * Add this to your root layout to enable AdSense ads
 */
export default function AdSenseScript() {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  // Don't load script in development or if client ID is missing
  if (process.env.NODE_ENV !== 'production' || !adClient) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
