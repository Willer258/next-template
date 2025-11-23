import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse, ResetPasswordRequest } from '@/types/auth'
import { hashPassword, validatePassword } from '@/lib/auth/password'
import { passwordResetTokens, users, sessions } from '@/lib/auth/storage'

// POST /api/auth/reset-password - Reset password with token
export async function POST(request: NextRequest) {
  try {
    const body: ResetPasswordRequest = await request.json()

    // Validation
    if (!body.token || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token and new password are required',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = validatePassword(body.password)
    if (!passwordValidation.meetsRequirements) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password does not meet requirements',
          message: passwordValidation.feedback.join(', '),
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Check password confirmation
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: 'Passwords do not match',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find reset token
    const resetToken = passwordResetTokens.find(t => t.token === body.token && !t.used)

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired reset token',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date(resetToken.expiresAt) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Reset token has expired. Please request a new one.',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.id === resetToken.userId)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        } as AuthResponse,
        { status: 404 }
      )
    }

    // Hash new password
    const newPasswordHash = await hashPassword(body.password)

    // Update user password
    user.passwordHash = newPasswordHash
    user.updatedAt = new Date().toISOString()

    // Mark token as used
    resetToken.used = true

    // Invalidate all existing sessions for security
    const userSessions = sessions.filter(s => s.userId === user.id)
    userSessions.forEach(session => {
      const index = sessions.indexOf(session)
      if (index > -1) {
        sessions.splice(index, 1)
      }
    })

    // TODO: Send password changed confirmation email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Your password has been changed',
    //   template: 'password-changed',
    //   data: {
    //     name: user.name,
    //     time: new Date().toLocaleString()
    //   }
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset successfully. Please log in with your new password.',
      } as AuthResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to reset password',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
