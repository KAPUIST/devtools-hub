// Hash algorithm types
export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

// Hash result interface
export interface HashResult {
  success: boolean
  hash?: string
  errorCode?: 'EMPTY_INPUT' | 'HASH_ERROR' | 'UNSUPPORTED_ALGORITHM'
}

// File hash result interface
export interface FileHashResult {
  success: boolean
  hashes?: {
    'SHA-1': string
    'SHA-256': string
    'SHA-384': string
    'SHA-512': string
  }
  errorCode?: 'EMPTY_FILE' | 'READ_ERROR' | 'HASH_ERROR'
}

/**
 * Hash text using Web Crypto API
 */
export async function hashText(text: string, algorithm: HashAlgorithm): Promise<HashResult> {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    // Convert text to Uint8Array using TextEncoder
    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    // Hash using Web Crypto API
    const hashBuffer = await crypto.subtle.digest(algorithm, data)

    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return {
      success: true,
      hash: hashHex,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'HASH_ERROR',
    }
  }
}

/**
 * Hash file (calculate all algorithms simultaneously)
 */
export async function hashFile(file: File): Promise<FileHashResult> {
  if (!file || file.size === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_FILE',
    }
  }

  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Calculate all hashes in parallel
    const algorithms: HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
    const hashPromises = algorithms.map(async (algorithm) => {
      const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      return { algorithm, hash: hashHex }
    })

    const results = await Promise.all(hashPromises)

    const hashes = {
      'SHA-1': results[0].hash,
      'SHA-256': results[1].hash,
      'SHA-384': results[2].hash,
      'SHA-512': results[3].hash,
    }

    return {
      success: true,
      hashes,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'HASH_ERROR',
    }
  }
}

/**
 * Hash text with all algorithms
 */
export async function hashTextAll(text: string): Promise<{
  success: boolean
  hashes?: {
    'SHA-1': string
    'SHA-256': string
    'SHA-384': string
    'SHA-512': string
  }
  errorCode?: 'EMPTY_INPUT' | 'HASH_ERROR'
}> {
  if (!text || text.trim().length === 0) {
    return {
      success: false,
      errorCode: 'EMPTY_INPUT',
    }
  }

  try {
    const algorithms: HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']
    const hashPromises = algorithms.map(async (algorithm) => {
      const result = await hashText(text, algorithm)
      return { algorithm, hash: result.hash || '' }
    })

    const results = await Promise.all(hashPromises)

    const hashes = {
      'SHA-1': results[0].hash,
      'SHA-256': results[1].hash,
      'SHA-384': results[2].hash,
      'SHA-512': results[3].hash,
    }

    return {
      success: true,
      hashes,
    }
  } catch (error) {
    return {
      success: false,
      errorCode: 'HASH_ERROR',
    }
  }
}
