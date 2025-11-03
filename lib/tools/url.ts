// URL 인코딩 결과
export interface URLEncodeResult {
  success: boolean
  encoded?: string
  errorCode?: 'EMPTY_INPUT' | 'ENCODING_ERROR'
}

// URL 디코딩 결과
export interface URLDecodeResult {
  success: boolean
  decoded?: string
  errorCode?: 'EMPTY_INPUT' | 'DECODING_ERROR' | 'MALFORMED_URI'
}

// Query 파라미터
export interface QueryParam {
  key: string
  value: string
}

// Query String 파싱 결과
export interface QueryParseResult {
  success: boolean
  params?: QueryParam[]
  errorCode?: 'EMPTY_INPUT' | 'INVALID_URL' | 'NO_QUERY_STRING'
}

/**
 * URL 전체 인코딩 (encodeURI)
 * 특수 문자 :, /, ?, &, =, @ 등은 보존
 */
export function encodeURL(url: string): URLEncodeResult {
  if (!url || url.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    const encoded = encodeURI(url)
    return {
      success: true,
      encoded,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'ENCODING_ERROR',
    }
  }
}

/**
 * URL 구성요소 인코딩 (encodeURIComponent)
 * 모든 특수 문자를 인코딩 (-, _, ., !, ~, *, ', (, ) 제외)
 */
export function encodeURLComponent(text: string): URLEncodeResult {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    const encoded = encodeURIComponent(text)
    return {
      success: true,
      encoded,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'ENCODING_ERROR',
    }
  }
}

/**
 * URL 전체 디코딩 (decodeURI)
 */
export function decodeURL(url: string): URLDecodeResult {
  if (!url || url.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    const decoded = decodeURI(url)
    return {
      success: true,
      decoded,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'MALFORMED_URI',
    }
  }
}

/**
 * URL 구성요소 디코딩 (decodeURIComponent)
 */
export function decodeURLComponent(text: string): URLDecodeResult {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    const decoded = decodeURIComponent(text)
    return {
      success: true,
      decoded,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'MALFORMED_URI',
    }
  }
}

/**
 * Query String 파싱
 * URL에서 query string을 추출하고 key-value 쌍으로 파싱
 */
export function parseQueryString(url: string): QueryParseResult {
  if (!url || url.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    // URL에서 query string 부분 추출
    const queryStartIndex = url.indexOf('?')

    if (queryStartIndex === -1) {
      return {
        success: false,
        errorCode: 'NO_QUERY_STRING',
      }
    }

    const queryString = url.substring(queryStartIndex + 1)

    // Fragment (#) 제거
    const cleanQueryString = queryString.split('#')[0]

    if (!cleanQueryString || cleanQueryString.trim().length === 0) {
      return {
        success: false,
        errorCode: 'NO_QUERY_STRING',
      }
    }

    // key=value 쌍으로 분리
    const pairs = cleanQueryString.split('&')
    const params: QueryParam[] = []

    for (const pair of pairs) {
      const [key, value = ''] = pair.split('=')

      if (key) {
        params.push({
          key: decodeURIComponent(key),
          value: decodeURIComponent(value),
        })
      }
    }

    return {
      success: true,
      params,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'INVALID_URL',
    }
  }
}
