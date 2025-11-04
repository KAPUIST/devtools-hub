/**
 * Smart Paste Detection
 * 클립보드 내용을 자동으로 분석해서 적합한 도구 식별
 */

export type ToolType =
  | 'json-formatter'
  | 'jwt-debugger'
  | 'base64'
  | 'url-encoder'
  | 'timestamp'
  | 'uuid-generator'
  | null

/**
 * 붙여넣은 텍스트의 타입을 감지
 * 우선순위: JWT > JSON > Base64 > URL Encoded > Timestamp > UUID
 */
export function detectPasteType(text: string): ToolType {
  const trimmed = text.trim()

  // 너무 짧으면 무시
  if (trimmed.length < 5) return null

  // 너무 길면 무시 (10,000자 제한)
  if (trimmed.length > 10000) return null

  // 1. JWT Detection (eyJ로 시작하는 3-part token)
  // JWT는 항상 "eyJ"로 시작 ({"alg": ...} Base64 인코딩 결과)
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(trimmed)) {
    return 'jwt-debugger'
  }

  // 2. JSON Detection
  // 중괄호/대괄호로 시작하고 JSON.parse 성공
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      JSON.parse(trimmed)
      return 'json-formatter'
    } catch {
      // JSON이 아니면 다음 검사로
    }
  }

  // 3. Base64 Detection
  // - 길이가 4의 배수
  // - A-Za-z0-9+/= 문자만 포함
  // - 최소 20자 이상 (너무 짧으면 일반 텍스트일 수 있음)
  // - Base64는 보통 대소문자 혼합 + 숫자/특수문자 포함 (오탐지 방지)
  if (
    /^[A-Za-z0-9+/]+=*$/.test(trimmed) &&
    trimmed.length % 4 === 0 &&
    trimmed.length >= 20 &&
    /[A-Z]/.test(trimmed) &&
    /[a-z]/.test(trimmed) &&
    /[0-9+/]/.test(trimmed)
  ) {
    return 'base64'
  }

  // 4. URL Encoded Detection
  // %XX 패턴이 있고 10자 이상
  if (/%[0-9A-Fa-f]{2}/.test(trimmed) && trimmed.length > 10) {
    return 'url-encoder'
  }

  // 5. Unix Timestamp Detection
  // 10자리 (초) 또는 13자리 (밀리초) 숫자
  if (/^\d{10}$/.test(trimmed) || /^\d{13}$/.test(trimmed)) {
    return 'timestamp'
  }

  // 6. UUID Detection
  // 8-4-4-4-12 형식
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) {
    return 'uuid-generator'
  }

  return null
}

/**
 * 도구 타입을 사람이 읽기 쉬운 이름으로 변환
 */
export function getToolDisplayName(toolType: ToolType): string {
  const names: Record<Exclude<ToolType, null>, string> = {
    'json-formatter': 'JSON Formatter',
    'jwt-debugger': 'JWT Debugger',
    'base64': 'Base64 Encoder/Decoder',
    'url-encoder': 'URL Encoder/Decoder',
    'timestamp': 'Timestamp Converter',
    'uuid-generator': 'UUID Generator',
  }
  return toolType ? names[toolType] : ''
}
