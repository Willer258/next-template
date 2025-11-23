import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Product, ProductVariant, UpdateProductRequest } from '@/types/api'

// This would be a database query in production
const getProducts = (): Product[] => {
  // Import from parent route or database
  return []
}

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const products = getProducts()
    const product = products.find(p => p.id === id)

    if (!product) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Product not found',
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch product',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateProductRequest = await request.json()
    const products = getProducts()
    const productIndex = products.findIndex(p => p.id === id)

    if (productIndex === -1) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Product not found',
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    // Check SKU uniqueness if updating SKU
    if (body.sku && body.sku !== products[productIndex].sku) {
      if (products.some(p => p.sku === body.sku && p.id !== id)) {
        const errorResponse: ApiResponse = {
          success: false,
          error: 'Product with this SKU already exists',
        }
        return NextResponse.json(errorResponse, { status: 409 })
      }
    }

    // Ensure variants have IDs if provided
    const updatedVariants = body.variants?.map((v, i): ProductVariant => ({
      ...v,
      id: ('id' in v && typeof v.id === 'string') ? v.id : `${Date.now()}-${i}`,
    }))

    const updatedProduct: Product = {
      ...products[productIndex],
      ...body,
      variants: updatedVariants || products[productIndex].variants,
      id,
      updatedAt: new Date().toISOString(),
    }

    products[productIndex] = updatedProduct

    const response: ApiResponse<Product> = {
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update product',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const products = getProducts()
    const productIndex = products.findIndex(p => p.id === id)

    if (productIndex === -1) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Product not found',
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    products.splice(productIndex, 1)

    const response: ApiResponse = {
      success: true,
      message: 'Product deleted successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete product',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
