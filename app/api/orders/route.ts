import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Order, CreateOrderRequest, PaginatedResponse, OrderFilters } from '@/types/api'

// In-memory storage (replace with database in production)
let orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-0001',
    userId: 'user-123',
    email: 'customer@example.com',
    status: 'delivered',
    paymentStatus: 'paid',
    items: [
      {
        id: '1',
        productId: '1',
        name: 'Wireless Headphones Pro',
        sku: 'WHP-001',
        quantity: 1,
        price: 129.99,
        total: 129.99,
        image: '/products/headphones-1.jpg',
      },
    ],
    subtotal: 129.99,
    tax: 26.00,
    shipping: 0,
    discount: 0,
    total: 155.99,
    currency: 'EUR',
    shippingAddress: {
      firstName: 'Jean',
      lastName: 'Dupont',
      address1: '123 Rue de la Paix',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75001',
      country: 'France',
      phone: '+33 1 23 45 67 89',
    },
    billingAddress: {
      firstName: 'Jean',
      lastName: 'Dupont',
      address1: '123 Rue de la Paix',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75001',
      country: 'France',
      phone: '+33 1 23 45 67 89',
    },
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
    },
    shippingMethod: 'standard',
    trackingNumber: 'TRK123456789',
    createdAt: '2025-01-10T10:30:00Z',
    updatedAt: '2025-01-15T14:20:00Z',
  },
]

let orderCounter = 1

function generateOrderNumber(): string {
  orderCounter++
  const year = new Date().getFullYear()
  const paddedNumber = String(orderCounter).padStart(4, '0')
  return `ORD-${year}-${paddedNumber}`
}

// GET /api/orders - List all orders with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Filters
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')
    const userId = searchParams.get('userId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const search = searchParams.get('search')

    let filteredOrders = [...orders]

    // Apply filters
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status)
    }
    if (paymentStatus) {
      filteredOrders = filteredOrders.filter(o => o.paymentStatus === paymentStatus)
    }
    if (userId) {
      filteredOrders = filteredOrders.filter(o => o.userId === userId)
    }
    if (startDate) {
      filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) >= new Date(startDate))
    }
    if (endDate) {
      filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) <= new Date(endDate))
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredOrders = filteredOrders.filter(o =>
        o.orderNumber.toLowerCase().includes(searchLower) ||
        o.email.toLowerCase().includes(searchLower) ||
        o.trackingNumber?.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date (most recent first)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const total = filteredOrders.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    const response: PaginatedResponse<Order> = {
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch orders',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()

    // Validation
    if (!body.items || body.items.length === 0) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Cart is empty',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    if (!body.shippingAddress || !body.paymentMethod) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Missing required information',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Calculate totals
    const subtotal = body.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.2 // 20% tax
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + tax + shipping

    // Create order
    const newOrder: Order = {
      id: String(Date.now()),
      orderNumber: generateOrderNumber(),
      userId: undefined, // Would come from auth
      email: body.shippingAddress.firstName + '@example.com', // Would come from user
      status: 'pending',
      paymentStatus: 'pending',
      items: body.items.map((item, index) => ({
        id: `${Date.now()}-${index}`,
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        image: item.image,
        attributes: item.attributes,
      })),
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      discount: 0,
      total: Math.round(total * 100) / 100,
      currency: 'EUR',
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      paymentMethod: body.paymentMethod,
      shippingMethod: body.shippingMethod,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    // TODO: Process payment
    // TODO: Reserve inventory
    // TODO: Send confirmation email

    const response: ApiResponse<Order> = {
      success: true,
      data: newOrder,
      message: 'Order created successfully',
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
