// Color format types
export type ColorFormat = 'HEX' | 'RGB' | 'HSL'

// RGB color interface
export interface RGB {
  r: number
  g: number
  b: number
}

// HSL color interface
export interface HSL {
  h: number
  s: number
  l: number
}

// Color result interface
export interface ColorResult {
  success: boolean
  hex?: string
  rgb?: RGB
  hsl?: HSL
  errorCode?: 'INVALID_FORMAT' | 'INVALID_HEX' | 'INVALID_RGB' | 'INVALID_HSL' | 'PARSE_ERROR'
}

/**
 * Parse HEX color string
 */
export function parseHex(hex: string): ColorResult {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '')

  // Validate hex format (3 or 6 characters)
  if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(cleanHex)) {
    return {
      success: false,
      errorCode: 'INVALID_HEX',
    }
  }

  // Convert 3-char hex to 6-char
  let fullHex = cleanHex
  if (cleanHex.length === 3) {
    fullHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Parse RGB values
  const r = parseInt(fullHex.substring(0, 2), 16)
  const g = parseInt(fullHex.substring(2, 4), 16)
  const b = parseInt(fullHex.substring(4, 6), 16)

  const rgb: RGB = { r, g, b }
  const hsl = rgbToHsl(rgb)

  return {
    success: true,
    hex: `#${fullHex.toUpperCase()}`,
    rgb,
    hsl,
  }
}

/**
 * Parse RGB color string
 */
export function parseRgb(rgb: string): ColorResult {
  // Match rgb(r, g, b) format
  const match = rgb.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/)

  if (!match) {
    return {
      success: false,
      errorCode: 'INVALID_RGB',
    }
  }

  const r = parseInt(match[1])
  const g = parseInt(match[2])
  const b = parseInt(match[3])

  // Validate RGB values (0-255)
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    return {
      success: false,
      errorCode: 'INVALID_RGB',
    }
  }

  const rgbObj: RGB = { r, g, b }
  const hex = rgbToHex(rgbObj)
  const hsl = rgbToHsl(rgbObj)

  return {
    success: true,
    hex,
    rgb: rgbObj,
    hsl,
  }
}

/**
 * Parse HSL color string
 */
export function parseHsl(hsl: string): ColorResult {
  // Match hsl(h, s%, l%) format
  const match = hsl.match(/^hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/)

  if (!match) {
    return {
      success: false,
      errorCode: 'INVALID_HSL',
    }
  }

  const h = parseInt(match[1])
  const s = parseInt(match[2])
  const l = parseInt(match[3])

  // Validate HSL values
  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
    return {
      success: false,
      errorCode: 'INVALID_HSL',
    }
  }

  const hslObj: HSL = { h, s, l }
  const rgb = hslToRgb(hslObj)
  const hex = rgbToHex(rgb)

  return {
    success: true,
    hex,
    rgb,
    hsl: hslObj,
  }
}

/**
 * Auto-detect color format and parse
 */
export function parseColor(color: string): ColorResult {
  const trimmed = color.trim()

  if (!trimmed) {
    return {
      success: false,
      errorCode: 'INVALID_FORMAT',
    }
  }

  // Try HEX
  if (trimmed.startsWith('#') || /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(trimmed)) {
    return parseHex(trimmed)
  }

  // Try RGB
  if (trimmed.startsWith('rgb')) {
    return parseRgb(trimmed)
  }

  // Try HSL
  if (trimmed.startsWith('hsl')) {
    return parseHsl(trimmed)
  }

  return {
    success: false,
    errorCode: 'INVALID_FORMAT',
  }
}

/**
 * Convert RGB to HEX
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16).padStart(2, '0')
    return hex.toUpperCase()
  }

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / diff + 2) / 6
        break
      case b:
        h = ((r - g) / diff + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

/**
 * Get formatted color strings
 */
export function getFormattedColors(result: ColorResult): {
  hex: string
  rgb: string
  hsl: string
} {
  return {
    hex: result.hex || '',
    rgb: result.rgb ? `rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})` : '',
    hsl: result.hsl ? `hsl(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%)` : '',
  }
}
