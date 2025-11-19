import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse, RegisterRequest, User, EmailVerificationToken } from '@/types/auth'
import { hashPassword, validatePassword } from '@/lib/auth/password'
import { generateRandomToken } from '@/lib/auth/tokens'
import { users, emailVerificationTokens, findUserByEmail } from '@/lib/auth/storage'

// POST /api/auth/register - Register new user
export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()

    // Validation
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: email, password, name',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
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

    // Check terms acceptance
    if (!body.acceptTerms) {
      return NextResponse.json(
        {
          success: false,
          error: 'You must accept the terms and conditions',
        } as AuthResponse,
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = findUserByEmail(body.email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'An account with this email already exists',
        } as AuthResponse,
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(body.password)

    // Create user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: body.email.toLowerCase(),
      emailVerified: false,
      name: body.name,
      firstName: body.firstName,
      lastName: body.lastName,
      role: 'user',
      provider: 'email',
      passwordHash,
      twoFactorEnabled: false,
      preferences: {
        language: 'fr',
        currency: 'EUR',
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        marketing: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      loginCount: 0,
    }

    users.push(newUser)

    // Generate email verification token
    const verificationToken: EmailVerificationToken = {
      id: `token_${Date.now()}`,
      userId: newUser.id,
      email: newUser.email,
      token: generateRandomToken(32),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      used: false,
      createdAt: new Date().toISOString(),
    }

    emailVerificationTokens.push(verificationToken)

    // TODO: Send verification email
    console.log('Email verification token:', verificationToken.token) // For development testing

    // Return user data (without sensitive info)
    const { passwordHash: _, twoFactorSecret: __, ...userResponse } = newUser

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userResponse,
        },
        message: 'Account created successfully. Please check your email to verify your account.',
      } as AuthResponse,
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create account',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
