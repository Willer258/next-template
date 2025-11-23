import type { JWTPayload, RefreshTokenPayload, User } from '@/types/auth'

// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'

// Token expiration times
const ACCESS_TOKEN_EXPIRY = 15 * 60 // 15 minutes in seconds
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 // 7 days in seconds

// Simple base64 encoding/decoding (in production, use jsonwebtoken package)
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  return Buffer.from(base64, 'base64').toString('utf-8')
}

// Generate JWT token (simplified implementation)
export async function generateAccessToken(user: User, sessionId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    sessionId,
    iat: now,
    exp: now + ACCESS_TOKEN_EXPIRY,
  }

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))

  // In production, use proper HMAC signature
  const signature = await signJWT(`${encodedHeader}.${encodedPayload}`, JWT_SECRET)

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// Generate refresh token
export async function generateRefreshToken(userId: string, sessionId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const payload: RefreshTokenPayload = {
    userId,
    sessionId,
    iat: now,
    exp: now + REFRESH_TOKEN_EXPIRY,
  }

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))

  const signature = await signJWT(`${encodedHeader}.${encodedPayload}`, JWT_REFRESH_SECRET)

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// Sign JWT (simplified - use crypto.subtle in production)
async function signJWT(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  )

  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)))
}

// Verify JWT
export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [encodedHeader, encodedPayload, signature] = parts

    // Verify signature
    const expectedSignature = await signJWT(`${encodedHeader}.${encodedPayload}`, JWT_SECRET)
    if (signature !== expectedSignature) return null

    // Decode payload
    const payload: JWTPayload = JSON.parse(base64UrlDecode(encodedPayload))

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null

    return payload
  } catch (error) {
    return null
  }
}

// Verify refresh token
export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [encodedHeader, encodedPayload, signature] = parts

    // Verify signature
    const expectedSignature = await signJWT(`${encodedHeader}.${encodedPayload}`, JWT_REFRESH_SECRET)
    if (signature !== expectedSignature) return null

    // Decode payload
    const payload: RefreshTokenPayload = JSON.parse(base64UrlDecode(encodedPayload))

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null

    return payload
  } catch (error) {
    return null
  }
}

// Generate random token for email verification, password reset, etc.
export function generateRandomToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)

  for (let i = 0; i < length; i++) {
    token += chars[randomValues[i] % chars.length]
  }

  return token
}

// Generate session ID
export function generateSessionId(): string {
  return `sess_${Date.now()}_${generateRandomToken(16)}`
}

// Generate verification code (6 digits for 2FA)
export function generate2FACode(): string {
  const code = Math.floor(100000 + Math.random() * 900000)
  return code.toString()
}
