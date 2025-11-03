import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devtools-hub-app.vercel.app'
  const locales = ['en', 'ko', 'ja', 'zh']
  const tools = [
    'json-formatter',
    'regex-tester',
    'base64',
    'jwt-debugger',
    'timestamp-converter',
    'url-encoder',
    'uuid-generator',
    'hash-generator',
    'color-converter',
    'qr-generator',
  ]

  const routes: MetadataRoute.Sitemap = []

  // Home pages for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  })

  // Tool pages for each locale
  locales.forEach((locale) => {
    tools.forEach((tool) => {
      routes.push({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  return routes
}
