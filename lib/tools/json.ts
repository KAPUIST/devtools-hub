export interface JsonFormatResult {
  success: boolean
  formatted?: string
  error?: string
  errorLine?: number
}

/**
 * JSON을 예쁘게 포맷팅합니다
 */
export function formatJson(input: string, indent: number = 2): JsonFormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: "입력값이 비어있습니다.",
    }
  }

  try {
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed, null, indent)
    return {
      success: true,
      formatted,
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      // JSON 파싱 에러에서 라인 번호 추출
      const match = error.message.match(/position (\d+)/)
      const position = match ? parseInt(match[1]) : null

      let errorLine: number | undefined
      if (position !== null) {
        errorLine = input.substring(0, position).split('\n').length
      }

      return {
        success: false,
        error: `JSON 파싱 오류: ${error.message}`,
        errorLine,
      }
    }
    return {
      success: false,
      error: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

/**
 * JSON을 압축합니다 (공백 제거)
 */
export function minifyJson(input: string): JsonFormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: "입력값이 비어있습니다.",
    }
  }

  try {
    const parsed = JSON.parse(input)
    const minified = JSON.stringify(parsed)
    return {
      success: true,
      formatted: minified,
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: `JSON 파싱 오류: ${error.message}`,
      }
    }
    return {
      success: false,
      error: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

/**
 * JSON 유효성을 검사합니다
 */
export function validateJson(input: string): JsonFormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: "입력값이 비어있습니다.",
    }
  }

  try {
    JSON.parse(input)
    return {
      success: true,
      formatted: "✓ 유효한 JSON입니다!",
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      const match = error.message.match(/position (\d+)/)
      const position = match ? parseInt(match[1]) : null

      let errorLine: number | undefined
      if (position !== null) {
        errorLine = input.substring(0, position).split('\n').length
      }

      return {
        success: false,
        error: `JSON 파싱 오류: ${error.message}`,
        errorLine,
      }
    }
    return {
      success: false,
      error: "알 수 없는 오류가 발생했습니다.",
    }
  }
}

/**
 * 입력값이 JSON인지 자동 감지합니다
 */
export function detectJson(input: string): boolean {
  if (!input.trim()) return false

  const trimmed = input.trim()
  // JSON은 {, [로 시작해야 함
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return false
  }

  try {
    JSON.parse(trimmed)
    return true
  } catch {
    return false
  }
}
