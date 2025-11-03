export interface JWTHeader {
  alg?: string
  typ?: string
  [key: string]: any
}

export interface JWTPayload {
  iss?: string  // Issuer
  sub?: string  // Subject
  aud?: string | string[]  // Audience
  exp?: number  // Expiration Time
  nbf?: number  // Not Before
  iat?: number  // Issued At
  jti?: string  // JWT ID
  [key: string]: any
}

export interface JWTDecodeResult {
  success: boolean
  header?: JWTHeader
  payload?: JWTPayload
  signature?: string
  error?: string
  isExpired?: boolean
  isNotYetValid?: boolean
  expiresAt?: string
  issuedAt?: string
  notBefore?: string
}

/**
 * Base64 URL 디코딩 (JWT는 Base64 URL 인코딩 사용)
 */
function base64UrlDecode(str: string): string {
  // Base64 URL을 일반 Base64로 변환
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')

  // 패딩 추가 (Base64는 4의 배수 길이 필요)
  while (base64.length % 4) {
    base64 += '='
  }

  try {
    // Browser environment
    if (typeof window !== 'undefined') {
      return decodeURIComponent(escape(atob(base64)))
    }

    // Node.js environment
    return Buffer.from(base64, 'base64').toString('utf-8')
  } catch (error) {
    throw new Error('Base64 URL 디코딩 실패')
  }
}

/**
 * JWT 토큰이 유효한 형식인지 검증
 */
export function isValidJWT(token: string): boolean {
  if (!token || typeof token !== 'string') return false

  const parts = token.trim().split('.')
  if (parts.length !== 3) return false

  // 각 파트가 Base64 URL 형식인지 확인
  const base64UrlRegex = /^[A-Za-z0-9_-]+$/
  return parts.every(part => base64UrlRegex.test(part))
}

/**
 * Unix 타임스탬프를 ISO 8601 날짜 문자열로 변환
 */
function unixToDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString()
}

/**
 * JWT 토큰을 디코딩합니다
 */
export function decodeJWT(token: string): JWTDecodeResult {
  if (!token || !token.trim()) {
    return {
      success: false,
      error: "토큰이 비어있습니다.",
    }
  }

  const trimmedToken = token.trim()

  if (!isValidJWT(trimmedToken)) {
    return {
      success: false,
      error: "올바르지 않은 JWT 형식입니다. JWT는 'xxxxx.yyyyy.zzzzz' 형식이어야 합니다.",
    }
  }

  try {
    const parts = trimmedToken.split('.')
    const [headerBase64, payloadBase64, signatureBase64] = parts

    // Header 디코딩
    const headerJson = base64UrlDecode(headerBase64)
    const header: JWTHeader = JSON.parse(headerJson)

    // Payload 디코딩
    const payloadJson = base64UrlDecode(payloadBase64)
    const payload: JWTPayload = JSON.parse(payloadJson)

    // 서명은 디코딩하지 않고 원본 유지
    const signature = signatureBase64

    // 만료 시간 체크
    const now = Math.floor(Date.now() / 1000)
    const isExpired = payload.exp ? payload.exp < now : false
    const isNotYetValid = payload.nbf ? payload.nbf > now : false

    // 날짜 변환
    const expiresAt = payload.exp ? unixToDate(payload.exp) : undefined
    const issuedAt = payload.iat ? unixToDate(payload.iat) : undefined
    const notBefore = payload.nbf ? unixToDate(payload.nbf) : undefined

    return {
      success: true,
      header,
      payload,
      signature,
      isExpired,
      isNotYetValid,
      expiresAt,
      issuedAt,
      notBefore,
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: "JWT 파싱 오류: Header 또는 Payload가 올바른 JSON이 아닙니다.",
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "JWT 디코딩 중 오류가 발생했습니다.",
    }
  }
}

/**
 * JWT 알고리즘 이름을 사람이 읽기 쉬운 형식으로 변환
 */
export function getAlgorithmName(alg: string): string {
  const algorithms: Record<string, string> = {
    'HS256': 'HMAC SHA-256',
    'HS384': 'HMAC SHA-384',
    'HS512': 'HMAC SHA-512',
    'RS256': 'RSA SHA-256',
    'RS384': 'RSA SHA-384',
    'RS512': 'RSA SHA-512',
    'ES256': 'ECDSA SHA-256',
    'ES384': 'ECDSA SHA-384',
    'ES512': 'ECDSA SHA-512',
    'PS256': 'RSA-PSS SHA-256',
    'PS384': 'RSA-PSS SHA-384',
    'PS512': 'RSA-PSS SHA-512',
    'none': 'None (Unsecured)',
  }

  return algorithms[alg] || alg
}

/**
 * 만료까지 남은 시간을 사람이 읽기 쉬운 형식으로 변환
 */
export function getTimeRemaining(exp: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = exp - now

  if (diff < 0) {
    const absDiff = Math.abs(diff)
    if (absDiff < 60) return `${absDiff}초 전 만료`
    if (absDiff < 3600) return `${Math.floor(absDiff / 60)}분 전 만료`
    if (absDiff < 86400) return `${Math.floor(absDiff / 3600)}시간 전 만료`
    return `${Math.floor(absDiff / 86400)}일 전 만료`
  }

  if (diff < 60) return `${diff}초 후 만료`
  if (diff < 3600) return `${Math.floor(diff / 60)}분 후 만료`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 후 만료`
  return `${Math.floor(diff / 86400)}일 후 만료`
}

/**
 * JWT의 표준 클레임을 추출합니다
 */
export function extractStandardClaims(payload: JWTPayload): { key: string; value: any; label: string }[] {
  const standardClaims = [
    { key: 'iss', label: 'Issuer (발급자)' },
    { key: 'sub', label: 'Subject (주체)' },
    { key: 'aud', label: 'Audience (대상)' },
    { key: 'exp', label: 'Expires At (만료 시간)' },
    { key: 'nbf', label: 'Not Before (유효 시작 시간)' },
    { key: 'iat', label: 'Issued At (발급 시간)' },
    { key: 'jti', label: 'JWT ID' },
  ]

  return standardClaims
    .filter(claim => payload[claim.key] !== undefined)
    .map(claim => ({
      key: claim.key,
      value: payload[claim.key],
      label: claim.label,
    }))
}

/**
 * JWT의 커스텀 클레임을 추출합니다
 */
export function extractCustomClaims(payload: JWTPayload): { key: string; value: any }[] {
  const standardKeys = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti']

  return Object.entries(payload)
    .filter(([key]) => !standardKeys.includes(key))
    .map(([key, value]) => ({ key, value }))
}
