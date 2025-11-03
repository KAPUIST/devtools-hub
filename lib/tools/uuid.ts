export interface UUIDResult {
  success: boolean
  uuid?: string
  uuids?: string[]
  error?: string
  errorCode?: string
}

export interface UUIDInfo {
  valid: boolean
  version?: number
  variant?: string
  timestamp?: number
  errorCode?: string
}

/**
 * UUID v4 생성 (랜덤 기반)
 * crypto.randomUUID() 사용
 */
export function generateUUIDv4(): UUIDResult {
  try {
    // Browser environment
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      const uuid = crypto.randomUUID()
      return {
        success: true,
        uuid,
      }
    }

    // Fallback: Manual v4 generation
    return {
      success: true,
      uuid: generateUUIDv4Manual(),
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'UUID_V4_GENERATION_ERROR',
    }
  }
}

/**
 * UUID v4 수동 생성 (crypto.randomUUID() 미지원 환경용)
 * crypto.getRandomValues() 사용 (암호학적으로 안전)
 */
function generateUUIDv4Manual(): string {
  // crypto.getRandomValues() 사용 (더 안전)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)

    // UUID v4 포맷 설정
    bytes[6] = (bytes[6] & 0x0f) | 0x40  // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80  // Variant RFC 4122 (10xxxxxx)

    // Hex 문자열로 변환
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }

  // 최후의 fallback (경고 표시)
  console.warn('⚠️ Using Math.random() for UUID generation. Not cryptographically secure!')
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * UUID v1 생성 (타임스탬프 기반 - 간단한 구현)
 * 주의: 이것은 완전한 RFC 4122 구현이 아닙니다
 */
export function generateUUIDv1(): UUIDResult {
  try {
    const now = Date.now()
    const timestamp = (now * 10000) + 0x01b21dd213814000

    // Timestamp 부분 (60비트)
    const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0')
    const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0')
    const timeHiAndVersion = (((timestamp >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0')

    // Clock sequence (14비트 랜덤) - crypto.getRandomValues() 사용
    let clockSeq: string
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const clockSeqBuffer = new Uint8Array(2)
      crypto.getRandomValues(clockSeqBuffer)
      const clockSeqValue = ((clockSeqBuffer[0] << 8 | clockSeqBuffer[1]) & 0x3fff | 0x8000)
      clockSeq = clockSeqValue.toString(16).padStart(4, '0')
    } else {
      clockSeq = (Math.random() * 0x3fff | 0x8000).toString(16).padStart(4, '0')
    }

    // Node (48비트 랜덤 - MAC 주소 대신) - crypto.getRandomValues() 사용
    let node: string
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const nodeBuffer = new Uint8Array(6)
      crypto.getRandomValues(nodeBuffer)
      node = Array.from(nodeBuffer).map(b => b.toString(16).padStart(2, '0')).join('')
    } else {
      node = Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
    }

    const uuid = `${timeLow}-${timeMid}-${timeHiAndVersion}-${clockSeq}-${node}`

    return {
      success: true,
      uuid,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'UUID_V1_GENERATION_ERROR',
    }
  }
}

/**
 * UUID 여러 개 생성 (Bulk)
 */
export function generateUUIDs(version: 'v1' | 'v4', count: number): UUIDResult {
  if (count < 1 || count > 100) {
    return {
      success: false,
      errorCode: 'INVALID_COUNT',
    }
  }

  try {
    const uuids: string[] = []
    const generateFn = version === 'v4' ? generateUUIDv4 : generateUUIDv1

    for (let i = 0; i < count; i++) {
      const result = generateFn()
      if (result.success && result.uuid) {
        uuids.push(result.uuid)
      } else {
        return {
          success: false,
          errorCode: result.errorCode || 'GENERATION_ERROR',
        }
      }
    }

    return {
      success: true,
      uuids,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'BULK_GENERATION_ERROR',
    }
  }
}

/**
 * UUID 유효성 검증
 */
export function isValidUUID(uuid: string): boolean {
  if (!uuid || typeof uuid !== 'string') return false

  // UUID 정규식 (8-4-4-4-12)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return uuidRegex.test(uuid.trim())
}

/**
 * UUID 정보 파싱
 */
export function parseUUID(uuid: string): UUIDInfo {
  if (!uuid || typeof uuid !== 'string') {
    return {
      valid: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  const trimmed = uuid.trim()

  if (!isValidUUID(trimmed)) {
    return {
      valid: false,
      errorCode: 'INVALID_UUID',
    }
  }

  try {
    // UUID 버전 추출 (3번째 그룹의 첫 글자)
    const parts = trimmed.split('-')
    const versionChar = parts[2][0]
    const version = parseInt(versionChar, 16)

    // Variant 추출 (4번째 그룹의 첫 글자)
    const variantChar = parts[3][0].toLowerCase()
    let variant = 'Unknown'

    if (['8', '9', 'a', 'b'].includes(variantChar)) {
      variant = 'RFC 4122'
    } else if (['c', 'd'].includes(variantChar)) {
      variant = 'Microsoft'
    } else if (['e', 'f'].includes(variantChar)) {
      variant = 'Reserved'
    }

    // UUID v1인 경우 타임스탬프 추출
    let timestamp: number | undefined

    if (version === 1) {
      const timeLow = parseInt(parts[0], 16)
      const timeMid = parseInt(parts[1], 16)
      const timeHiAndVersion = parseInt(parts[2], 16) & 0x0fff

      const uuidTimestamp = (timeHiAndVersion * Math.pow(2, 48)) +
                           (timeMid * Math.pow(2, 32)) +
                           timeLow

      // UUID epoch (1582-10-15) to Unix epoch (1970-01-01)
      timestamp = Math.floor((uuidTimestamp - 0x01b21dd213814000) / 10000)
    }

    return {
      valid: true,
      version,
      variant,
      timestamp,
    }
  } catch (error) {
    return {
      valid: false,
      errorCode: 'PARSE_ERROR',
    }
  }
}

/**
 * UUID 포맷 검증 (하이픈 제거 후 다시 포맷)
 */
export function formatUUID(uuid: string): UUIDResult {
  if (!uuid || typeof uuid !== 'string') {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    // 하이픈 제거
    const cleaned = uuid.replace(/-/g, '').toLowerCase()

    // 길이 체크
    if (cleaned.length !== 32) {
      return {
        success: false,
        errorCode: 'INVALID_LENGTH',
      }
    }

    // Hex 문자만 있는지 체크
    if (!/^[0-9a-f]{32}$/i.test(cleaned)) {
      return {
        success: false,
        errorCode: 'INVALID_CHARACTERS',
      }
    }

    // 8-4-4-4-12 포맷으로 재구성
    const formatted = `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20, 32)}`

    return {
      success: true,
      uuid: formatted,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'FORMAT_ERROR',
    }
  }
}
