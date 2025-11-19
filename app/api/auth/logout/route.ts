import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse } from '@/types/auth'
import { verifyAccessToken } from '@/lib/auth/tokens'
import { sessions } from '@/lib/auth/storage'

// POST /api/auth/logout - User logout
export async function POST(request: NextRequest) {
  try {
    // Get token from header or cookie
    const authHeader = request.headers.get('authorization')
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    const tokenFromCookie = request.cookies.get('accessToken')?.value

    const token = tokenFromHeader || tokenFromCookie

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'No active session found',
        } as AuthResponse,
        { status: 401 }
      )
    }

    // Verify token
    const payload = await verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired token',
        } as AuthResponse,
        { status: 401 }
      )
    }

    // Remove session
    const sessionIndex = sessions.findIndex(s => s.id === payload.sessionId)
    if (sessionIndex > -1) {
      sessions.splice(sessionIndex, 1)
    }

    // Clear cookies
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      } as AuthResponse,
      { status: 200 }
    )

    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
