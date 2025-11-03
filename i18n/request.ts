import { getRequestConfig } from 'next-intl/server';

// 지원하는 언어 목록
export const locales = ['en', 'ko', 'ja', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// 언어별 이름
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '中文',
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Next.js 16에서는 requestLocale을 await 해야 함
  const locale = await requestLocale;

  console.log('[DEBUG] getRequestConfig - locale:', locale, 'type:', typeof locale, 'locales:', locales, 'includes:', locales.includes(locale as Locale));

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    console.log('[DEBUG] getRequestConfig - invalid locale:', locale, '- using defaultLocale:', defaultLocale);
    // 잘못된 locale은 기본값 사용
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    };
  }

  console.log('[DEBUG] getRequestConfig - loading messages for locale:', locale);
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
