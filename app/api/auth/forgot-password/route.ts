import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse, ForgotPasswordRequest, PasswordResetToken } from '@/types/auth'
import { generateRandomToken } from '@/lib/auth/tokens'
import { findUserByEmail, passwordResetTokens, invalidateUserPasswordResetTokens } from '@/lib/auth/storage'

// POST /api/auth/forgot-password - Request password reset
export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordRequest = await request.json()

    // Validation
    if (!body.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is required',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find user
    const user = findUserByEmail(body.email)

    // Don't reveal if user exists or not (security best practice)
    // Always return success to prevent email enumeration attacks
    const successMessage = 'If an account with that email exists, we sent a password reset link.'

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: successMessage,
        } as AuthResponse,
        { status: 200 }
      )
    }

    // Check if user registered with email provider
    if (user.provider !== 'email') {
      // Still return success but don't send email
      return NextResponse.json(
        {
          success: true,
          message: successMessage,
        } as AuthResponse,
        { status: 200 }
      )
    }

    // Invalidate any existing reset tokens for this user
    invalidateUserPasswordResetTokens(user.id)

    // Generate reset token
    const resetToken: PasswordResetToken = {
      id: `reset_${Date.now()}`,
      userId: user.id,
      token: generateRandomToken(32),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      used: false,
      createdAt: new Date().toISOString(),
    }

    passwordResetTokens.push(resetToken)

    // TODO: Send password reset email
    // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken.token}`
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Reset your password',
    //   template: 'password-reset',
    //   data: {
    //     name: user.name,
    //     resetUrl,
    //     expiresAt: new Date(resetToken.expiresAt).toLocaleString()
    //   }
    // })

    console.log('Password reset token:', resetToken.token) // For development testing

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
      } as AuthResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process request',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
