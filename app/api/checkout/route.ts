import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, CheckoutSession, Cart } from '@/types/api'

// In-memory storage (replace with database/session in production)
let checkoutSessions: Map<string, CheckoutSession> = new Map()

// Helper to get cart (would be from database in production)
function getCart(sessionId: string): Cart | null {
  // This would fetch from your cart API/database
  return null
}

// POST /api/checkout - Create or update checkout session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sessionId = request.headers.get('x-session-id') || 'default-session'

    let checkoutSession = checkoutSessions.get(sessionId)

    if (!checkoutSession) {
      // Create new checkout session
      const cart = getCart(sessionId)

      if (!cart || cart.items.length === 0) {
        const errorResponse: ApiResponse = {
          success: false,
          error: 'Cart is empty',
        }
        return NextResponse.json(errorResponse, { status: 400 })
      }

      checkoutSession = {
        id: String(Date.now()),
        cart,
        sameAsShipping: true,
        step: 'cart',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      }
    }

    // Update checkout session with provided data
    if (body.shippingAddress) {
      checkoutSession.shippingAddress = body.shippingAddress
      checkoutSession.step = 'payment'
    }

    if (body.billingAddress) {
      checkoutSession.billingAddress = body.billingAddress
    }

    if (body.sameAsShipping !== undefined) {
      checkoutSession.sameAsShipping = body.sameAsShipping
      if (body.sameAsShipping) {
        checkoutSession.billingAddress = checkoutSession.shippingAddress
      }
    }

    if (body.paymentMethod) {
      checkoutSession.paymentMethod = body.paymentMethod
      checkoutSession.step = 'review'
    }

    if (body.shippingMethod) {
      checkoutSession.shippingMethod = body.shippingMethod
    }

    checkoutSessions.set(sessionId, checkoutSession)

    const response: ApiResponse<CheckoutSession> = {
      success: true,
      data: checkoutSession,
      message: 'Checkout session updated',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update checkout session',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// GET /api/checkout - Get current checkout session
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id') || 'default-session'
    const checkoutSession = checkoutSessions.get(sessionId)

    if (!checkoutSession) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'No active checkout session',
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    // Check if session has expired
    if (new Date(checkoutSession.expiresAt) < new Date()) {
      checkoutSessions.delete(sessionId)
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Checkout session expired',
      }
      return NextResponse.json(errorResponse, { status: 410 })
    }

    const response: ApiResponse<CheckoutSession> = {
      success: true,
      data: checkoutSession,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch checkout session',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// DELETE /api/checkout - Clear checkout session
export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id') || 'default-session'
    checkoutSessions.delete(sessionId)

    const response: ApiResponse = {
      success: true,
      message: 'Checkout session cleared',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to clear checkout session',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
