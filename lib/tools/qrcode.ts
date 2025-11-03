import QRCode from 'qrcode'

// Error correction level type
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

// Size preset type
export type QRCodeSize = 'small' | 'medium' | 'large'

// Size mapping (in pixels)
export const SIZE_PRESETS: Record<QRCodeSize, number> = {
  small: 128,
  medium: 256,
  large: 512,
}

// QR code generation options
export interface QRCodeOptions {
  size: QRCodeSize
  errorCorrectionLevel: ErrorCorrectionLevel
}

// QR code generation result
export interface QRCodeResult {
  success: boolean
  dataURL?: string
  errorCode?: 'EMPTY_INPUT' | 'GENERATION_ERROR' | 'INVALID_OPTIONS'
  errorMessage?: string
}

/**
 * Generate QR code from text/URL
 */
export async function generateQRCode(
  text: string,
  options: QRCodeOptions = {
    size: 'medium',
    errorCorrectionLevel: 'M',
  }
): Promise<QRCodeResult> {
  // Validate input
  if (!text || text.trim() === '') {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  // Validate options
  if (!options.size || !options.errorCorrectionLevel) {
    return {
      success: false,
      errorCode: 'INVALID_OPTIONS',
    }
  }

  try {
    // Get pixel size from preset
    const width = SIZE_PRESETS[options.size]

    // Generate QR code as data URL
    const dataURL = await QRCode.toDataURL(text, {
      width,
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })

    return {
      success: true,
      dataURL,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'GENERATION_ERROR',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get error correction level description
 */
export function getErrorCorrectionDescription(level: ErrorCorrectionLevel): string {
  const descriptions: Record<ErrorCorrectionLevel, string> = {
    L: '7% - Low',
    M: '15% - Medium (recommended)',
    Q: '25% - Quartile',
    H: '30% - High',
  }
  return descriptions[level]
}

/**
 * Get size description
 */
export function getSizeDescription(size: QRCodeSize): string {
  const descriptions: Record<QRCodeSize, string> = {
    small: `128x128px`,
    medium: `256x256px (recommended)`,
    large: `512x512px`,
  }
  return descriptions[size]
}

/**
 * Download QR code as PNG
 */
export function downloadQRCode(dataURL: string, filename: string = 'qrcode.png') {
  const link = document.createElement('a')
  link.href = dataURL
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
