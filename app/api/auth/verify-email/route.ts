import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse } from '@/types/auth'
import { findUserById, emailVerificationTokens, users } from '@/lib/auth/storage'

// GET /api/auth/verify-email?token=xxx - Verify email with token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Verification token is required',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find verification token
    const verificationToken = emailVerificationTokens.find(t => t.token === token && !t.used)

    if (!verificationToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or already used verification token',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date(verificationToken.expiresAt) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Verification token has expired. Please request a new one.',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.id === verificationToken.userId)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        } as AuthResponse,
        { status: 404 }
      )
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: true,
          message: 'Email is already verified',
        } as AuthResponse,
        { status: 200 }
      )
    }

    // Mark email as verified
    user.emailVerified = true
    user.updatedAt = new Date().toISOString()

    // Mark token as used
    verificationToken.used = true

    // Return user data (without sensitive info)
    const { passwordHash: _, twoFactorSecret: __, ...userResponse } = user

    // TODO: Send welcome email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Welcome!',
    //   template: 'welcome',
    //   data: { name: user.name }
    // })

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userResponse,
        },
        message: 'Email verified successfully. You can now log in.',
      } as AuthResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to verify email',
      } as AuthResponse,
      { status: 500 }
    )
  }
}

// POST /api/auth/verify-email - Resend verification email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is required',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists, a verification email has been sent.',
        } as AuthResponse,
        { status: 200 }
      )
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is already verified',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // TODO: Rate limit email sending (3 per hour)

    // TODO: Generate new token and send email

    return NextResponse.json(
      {
        success: true,
        message: 'Verification email has been resent. Please check your inbox.',
      } as AuthResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to resend verification email',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
