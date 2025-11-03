export type TimestampToDateResult =
  | {
      success: true
      date: Date
      iso8601: string
      localTime: string
      utcTime: string
      timezones: {
        utc: string
        kst: string
        jst: string
        cst: string
        est: string
        pst: string
      }
    }
  | {
      success: false
      errorCode: 'EMPTY_INPUT' | 'INVALID_INPUT' | 'INVALID_TIMESTAMP' | 'CONVERSION_ERROR'
    }

export interface DateToTimestampResult {
  seconds: number
  milliseconds: number
}

export interface CurrentTimestampResult {
  seconds: number
  milliseconds: number
  date: Date
}

/**
 * Timestamp 단위를 자동 감지 (초 vs 밀리초)
 */
export function detectTimestampUnit(value: number): 'seconds' | 'milliseconds' | 'invalid' {
  if (value < 0) return 'invalid'

  // 10000000000 미만 = 초 (2001-09-09 이전)
  // 10000000000 이상 = 밀리초
  if (value < 10000000000) return 'seconds'

  // 9999999999999 이상 = 무효 (너무 큰 값)
  if (value > 9999999999999) return 'invalid'

  return 'milliseconds'
}

/**
 * Unix timestamp → Date 변환
 */
export function timestampToDate(timestamp: number): TimestampToDateResult {
  if (!timestamp && timestamp !== 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  const unit = detectTimestampUnit(timestamp)

  if (unit === 'invalid') {
    return {
      success: false,
      errorCode: 'INVALID_TIMESTAMP',
    }
  }

  try {
    // 초 단위면 밀리초로 변환
    const ms = unit === 'seconds' ? timestamp * 1000 : timestamp
    const date = new Date(ms)

    // Invalid Date 체크
    if (isNaN(date.getTime())) {
      return {
        success: false,
        errorCode: 'INVALID_TIMESTAMP',
      }
    }

    // ISO 8601 형식
    const iso8601 = date.toISOString()

    // 로컬 시간
    const localTime = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    // UTC 시간
    const utcTime = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })

    // 타임존별 시간
    const timezones = {
      utc: formatTimezone(date, 'UTC'),
      kst: formatTimezone(date, 'Asia/Seoul'),
      jst: formatTimezone(date, 'Asia/Tokyo'),
      cst: formatTimezone(date, 'Asia/Shanghai'),
      est: formatTimezone(date, 'America/New_York'),
      pst: formatTimezone(date, 'America/Los_Angeles'),
    }

    return {
      success: true,
      date,
      iso8601,
      localTime,
      utcTime,
      timezones,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'CONVERSION_ERROR',
    }
  }
}

/**
 * Date → Unix timestamp 변환
 */
export function dateToTimestamp(date: Date): DateToTimestampResult {
  const milliseconds = date.getTime()
  const seconds = Math.floor(milliseconds / 1000)

  return {
    seconds,
    milliseconds,
  }
}

/**
 * 현재 Unix timestamp 가져오기
 */
export function getCurrentTimestamp(): CurrentTimestampResult {
  const date = new Date()
  const milliseconds = date.getTime()
  const seconds = Math.floor(milliseconds / 1000)

  return {
    seconds,
    milliseconds,
    date,
  }
}

/**
 * 타임존별 시간 표시
 */
export function formatTimezone(date: Date, timezone: string): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timezone,
  })
}

export interface RelativeTimeResult {
  value: number
  unit: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'now'
  isPast: boolean
}

/**
 * 상대 시간 계산 (숫자와 단위만 반환, 포맷팅은 UI 레이어에서)
 */
export function getRelativeTime(timestamp: number): RelativeTimeResult | null {
  const unit = detectTimestampUnit(timestamp)
  if (unit === 'invalid') return null

  const targetSeconds = unit === 'seconds' ? timestamp : Math.floor(timestamp / 1000)
  const nowSeconds = Math.floor(Date.now() / 1000)
  const diff = targetSeconds - nowSeconds

  if (diff === 0) return { value: 0, unit: 'now', isPast: false }

  const absDiff = Math.abs(diff)
  const isPast = diff < 0

  if (absDiff < 60) {
    return { value: absDiff, unit: 'second', isPast }
  }
  if (absDiff < 3600) {
    const minutes = Math.floor(absDiff / 60)
    return { value: minutes, unit: 'minute', isPast }
  }
  if (absDiff < 86400) {
    const hours = Math.floor(absDiff / 3600)
    return { value: hours, unit: 'hour', isPast }
  }
  if (absDiff < 2592000) { // 30일
    const days = Math.floor(absDiff / 86400)
    return { value: days, unit: 'day', isPast }
  }
  if (absDiff < 31536000) { // 365일
    const months = Math.floor(absDiff / 2592000)
    return { value: months, unit: 'month', isPast }
  }
  const years = Math.floor(absDiff / 31536000)
  return { value: years, unit: 'year', isPast }
}
