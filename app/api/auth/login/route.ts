import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse, LoginRequest, Session } from '@/types/auth'
import { verifyPassword } from '@/lib/auth/password'
import { generateAccessToken, generateRefreshToken, generateSessionId } from '@/lib/auth/tokens'
import { findUserByEmail, sessions } from '@/lib/auth/storage'

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()

    // Validation
    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find user
    const user = findUserByEmail(body.email)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        } as AuthResponse,
        { status: 401 }
      )
    }

    // Check if user registered with email provider
    if (user.provider !== 'email' || !user.passwordHash) {
      return NextResponse.json(
        {
          success: false,
          error: `This account is registered with ${user.provider}. Please use ${user.provider} to sign in.`,
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(body.password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        } as AuthResponse,
        { status: 401 }
      )
    }

    // Check if email is verified (optional - can be enforced)
    // if (!user.emailVerified) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: 'Please verify your email before logging in',
    //     } as AuthResponse,
    //     { status: 403 }
    //   )
    // }

    // Check 2FA if enabled
    if (user.twoFactorEnabled && !body.twoFactorCode) {
      return NextResponse.json(
        {
          success: false,
          error: '2FA code required',
          message: 'Please provide your two-factor authentication code',
        } as AuthResponse,
        { status: 403 }
      )
    }

    if (user.twoFactorEnabled && body.twoFactorCode) {
      // TODO: Verify 2FA code
      // const isValid = verify2FACode(user.twoFactorSecret, body.twoFactorCode)
      // if (!isValid) {
      //   return NextResponse.json({
      //     success: false,
      //     error: 'Invalid 2FA code',
      //   } as AuthResponse, { status: 401 })
      // }
    }

    // Create session
    const sessionId = generateSessionId()
    const accessToken = await generateAccessToken(user, sessionId)
    const refreshToken = await generateRefreshToken(user.id, sessionId)

    const session: Session = {
      id: sessionId,
      userId: user.id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      createdAt: new Date().toISOString(),
    }

    sessions.push(session)

    // Update user login info
    user.lastLoginAt = new Date().toISOString()
    user.loginCount = (user.loginCount || 0) + 1

    // Return user data (without sensitive info)
    const { passwordHash: _, twoFactorSecret: __, ...userResponse } = user

    // Set cookies
    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: userResponse,
          accessToken,
          refreshToken,
          session,
        },
        message: 'Login successful',
      } as AuthResponse,
      { status: 200 }
    )

    // Set secure cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }

    response.cookies.set('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60, // 15 minutes
    })

    response.cookies.set('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    // TODO: Send login alert email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'New login detected',
    //   template: 'login-alert',
    //   data: { name: user.name, ipAddress: session.ipAddress, time: new Date() }
    // })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
