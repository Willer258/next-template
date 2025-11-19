import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Cart, CartItem, AddToCartRequest } from '@/types/api'

// In-memory storage (replace with database/session in production)
let carts: Map<string, Cart> = new Map()

// Helper to calculate cart totals
function calculateCartTotals(items: CartItem[]): {
  subtotal: number
  tax: number
  shipping: number
  total: number
} {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.2 // 20% tax (adjust based on region)
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over €100
  const total = subtotal + tax + shipping

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
  }
}

// Helper to get or create cart
function getOrCreateCart(sessionId: string, userId?: string): Cart {
  let cart = carts.get(sessionId)

  if (!cart) {
    cart = {
      id: String(Date.now()),
      userId,
      sessionId,
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'EUR',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    carts.set(sessionId, cart)
  }

  return cart
}

// GET /api/cart - Get current cart
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id') || 'default-session'
    const cart = getOrCreateCart(sessionId)

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch cart',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body: AddToCartRequest = await request.json()
    const sessionId = request.headers.get('x-session-id') || 'default-session'

    // Validation
    if (!body.productId || !body.quantity || body.quantity < 1) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Invalid product ID or quantity',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const cart = getOrCreateCart(sessionId)

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === body.productId && item.variantId === body.variantId
    )

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += body.quantity
    } else {
      // Add new item (in production, fetch product details from database)
      const newItem: CartItem = {
        id: String(Date.now()),
        productId: body.productId,
        variantId: body.variantId,
        name: 'Product Name', // Would fetch from products
        sku: 'SKU-123',
        price: 99.99,
        quantity: body.quantity,
        image: '/placeholder.jpg',
      }
      cart.items.push(newItem)
    }

    // Recalculate totals
    const totals = calculateCartTotals(cart.items)
    cart.subtotal = totals.subtotal
    cart.tax = totals.tax
    cart.shipping = totals.shipping
    cart.total = totals.total
    cart.updatedAt = new Date().toISOString()

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
      message: 'Item added to cart',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add item to cart',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body: { itemId: string; quantity: number } = await request.json()
    const sessionId = request.headers.get('x-session-id') || 'default-session'

    const cart = getOrCreateCart(sessionId)
    const itemIndex = cart.items.findIndex(item => item.id === body.itemId)

    if (itemIndex === -1) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Item not found in cart',
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    if (body.quantity < 1) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = body.quantity
    }

    // Recalculate totals
    const totals = calculateCartTotals(cart.items)
    cart.subtotal = totals.subtotal
    cart.tax = totals.tax
    cart.shipping = totals.shipping
    cart.total = totals.total
    cart.updatedAt = new Date().toISOString()

    const response: ApiResponse<Cart> = {
      success: true,
      data: cart,
      message: 'Cart updated',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update cart',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id') || 'default-session'
    carts.delete(sessionId)

    const response: ApiResponse = {
      success: true,
      message: 'Cart cleared',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to clear cart',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
