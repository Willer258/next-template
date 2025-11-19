import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse, UpdateProfileRequest } from '@/types/auth'
import { verifyAccessToken } from '@/lib/auth/tokens'
import { users } from '@/lib/auth/storage'

// GET /api/auth/me - Get current user profile
export async function GET(request: NextRequest) {
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
          error: 'Authentication required',
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

    // Find user
    const user = users.find(u => u.id === payload.userId)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        } as AuthResponse,
        { status: 404 }
      )
    }

    // Return user data (without sensitive info)
    const { passwordHash: _, twoFactorSecret: __, ...userResponse } = user

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userResponse,
        },
      } as AuthResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get profile',
      } as AuthResponse,
      { status: 500 }
    )
  }
}

// PUT /api/auth/me - Update user profile
export async function PUT(request: NextRequest) {
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
          error: 'Authentication required',
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

    // Find user
    const user = users.find(u => u.id === payload.userId)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        } as AuthResponse,
        { status: 404 }
      )
    }

    // Get update data
    const body: UpdateProfileRequest = await request.json()

    // Update user fields
    if (body.name) user.name = body.name
    if (body.firstName) user.firstName = body.firstName
    if (body.lastName) user.lastName = body.lastName
    if (body.phone) user.phone = body.phone
    if (body.avatar) user.avatar = body.avatar
    if (body.preferences) {
      user.preferences = {
        ...user.preferences,
        ...body.preferences,
      } as typeof user.preferences
    }

    user.updatedAt = new Date().toISOString()

    // Return updated user data (without sensitive info)
    const { passwordHash: _, twoFactorSecret: __, ...userResponse } = user

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userResponse,
        },
        message: 'Profile updated successfully',
      } as AuthResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      } as AuthResponse,
      { status: 500 }
    )
  }
}

// DELETE /api/auth/me - Delete user account
export async function DELETE(request: NextRequest) {
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
          error: 'Authentication required',
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

    // Find and remove user
    const userIndex = users.findIndex(u => u.id === payload.userId)

    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        } as AuthResponse,
        { status: 404 }
      )
    }

    const user = users[userIndex]

    // TODO: Delete all user data (orders, addresses, etc.)
    // TODO: Send account deletion confirmation email

    // Remove user
    users.splice(userIndex, 1)

    // Clear cookies
    const response = NextResponse.json(
      {
        success: true,
        message: 'Account deleted successfully',
      } as AuthResponse,
      { status: 200 }
    )

    response.cookies.set('accessToken', '', { maxAge: 0 })
    response.cookies.set('refreshToken', '', { maxAge: 0 })

    return response
  } catch (error) {
    console.error('Delete account error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete account',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
