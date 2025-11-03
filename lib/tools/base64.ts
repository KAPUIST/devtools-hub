export interface Base64Result {
  success: boolean
  result?: string
  error?: string
  mimeType?: string
}

export interface FileEncodingResult {
  success: boolean
  base64?: string
  mimeType?: string
  filename?: string
  size?: number
  error?: string
}

/**
 * 텍스트를 Base64로 인코딩합니다
 */
export function encodeBase64(text: string): Base64Result {
  if (!text) {
    return {
      success: false,
      error: "입력값이 비어있습니다.",
    }
  }

  try {
    // Browser environment
    if (typeof window !== 'undefined') {
      const encoded = btoa(unescape(encodeURIComponent(text)))
      return {
        success: true,
        result: encoded,
      }
    }

    // Node.js environment
    const encoded = Buffer.from(text, 'utf-8').toString('base64')
    return {
      success: true,
      result: encoded,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "인코딩 중 오류가 발생했습니다.",
    }
  }
}

/**
 * Base64를 텍스트로 디코딩합니다
 */
export function decodeBase64(base64: string): Base64Result {
  if (!base64.trim()) {
    return {
      success: false,
      error: "입력값이 비어있습니다.",
    }
  }

  if (!isValidBase64(base64)) {
    return {
      success: false,
      error: "올바르지 않은 Base64 문자열입니다.",
    }
  }

  try {
    // Browser environment
    if (typeof window !== 'undefined') {
      const decoded = decodeURIComponent(escape(atob(base64.trim())))
      return {
        success: true,
        result: decoded,
      }
    }

    // Node.js environment
    const decoded = Buffer.from(base64.trim(), 'base64').toString('utf-8')
    return {
      success: true,
      result: decoded,
    }
  } catch (error) {
    return {
      success: false,
      error: "디코딩 중 오류가 발생했습니다. Base64 형식이 올바른지 확인하세요.",
    }
  }
}

/**
 * 파일을 Base64로 인코딩합니다 (Browser only)
 */
export async function encodeFileToBase64(file: File): Promise<FileEncodingResult> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result as string
      // data:image/png;base64,xxxxx 형식에서 base64 부분만 추출
      const base64 = result.split(',')[1]

      resolve({
        success: true,
        base64,
        mimeType: file.type,
        filename: file.name,
        size: file.size,
      })
    }

    reader.onerror = () => {
      resolve({
        success: false,
        error: "파일을 읽는 중 오류가 발생했습니다.",
      })
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Base64를 Blob으로 변환합니다 (다운로드용)
 */
export function base64ToBlob(base64: string, mimeType: string = 'application/octet-stream'): Blob | null {
  try {
    // data:xxx;base64, 접두사 제거
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64

    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  } catch (error) {
    console.error('Base64 to Blob 변환 실패:', error)
    return null
  }
}

/**
 * Base64 문자열이 유효한지 검증합니다
 */
export function isValidBase64(str: string): boolean {
  if (!str || str.trim() === '') return false

  const trimmed = str.trim()

  // data:xxx;base64, 접두사가 있으면 제거
  const base64String = trimmed.includes(',') ? trimmed.split(',')[1] : trimmed

  // Base64는 A-Z, a-z, 0-9, +, /, = 만 포함
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/

  if (!base64Regex.test(base64String)) {
    return false
  }

  // Base64 길이는 4의 배수여야 함
  if (base64String.length % 4 !== 0) {
    return false
  }

  return true
}

/**
 * 입력값이 Base64인지 자동 감지합니다
 */
export function detectBase64(input: string): boolean {
  if (!input.trim()) return false

  const trimmed = input.trim()

  // data:xxx;base64, 형식인 경우
  if (trimmed.startsWith('data:') && trimmed.includes(';base64,')) {
    return true
  }

  // 최소 길이 체크 (너무 짧으면 Base64일 가능성 낮음)
  if (trimmed.length < 4) return false

  // 유효성 검사
  return isValidBase64(trimmed)
}

/**
 * MIME 타입에서 파일 확장자를 추출합니다
 */
export function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'text/plain': 'txt',
    'text/html': 'html',
    'text/css': 'css',
    'text/javascript': 'js',
    'application/json': 'json',
    'application/pdf': 'pdf',
    'application/zip': 'zip',
  }

  return mimeMap[mimeType] || 'bin'
}

/**
 * Data URL을 파싱합니다
 */
export function parseDataURL(dataURL: string): { mimeType: string; base64: string } | null {
  if (!dataURL.startsWith('data:')) {
    return null
  }

  try {
    const parts = dataURL.split(',')
    if (parts.length !== 2) return null

    const metadata = parts[0]
    const base64 = parts[1]

    const mimeMatch = metadata.match(/data:([^;]+)/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream'

    return { mimeType, base64 }
  } catch {
    return null
  }
}
