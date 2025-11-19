import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Product, CreateProductRequest, PaginatedResponse, ProductFilters } from '@/types/api'

// In-memory storage (replace with database in production)
let products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    description: 'Premium wireless headphones with active noise cancellation',
    sku: 'WHP-001',
    price: 129.99,
    compareAtPrice: 199.99,
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'TechCorp',
    images: ['/products/headphones-1.jpg'],
    stock: 45,
    lowStockThreshold: 10,
    status: 'active',
    tags: ['wireless', 'noise-cancellation', 'premium'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    description: 'Advanced smartwatch with health tracking',
    sku: 'SWU-002',
    price: 399.99,
    category: 'Electronics',
    subcategory: 'Wearables',
    brand: 'TechCorp',
    images: ['/products/watch-1.jpg'],
    stock: 12,
    lowStockThreshold: 15,
    status: 'active',
    tags: ['smartwatch', 'health', 'fitness'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET /api/products - List all products with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Filters
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const brand = searchParams.get('brand')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const inStock = searchParams.get('inStock')
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    let filteredProducts = [...products]

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }
    if (subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory)
    }
    if (brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === brand)
    }
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice))
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice))
    }
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.stock > 0)
    }
    if (status) {
      filteredProducts = filteredProducts.filter(p => p.status === status)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    const response: PaginatedResponse<Product> = {
      data: paginatedProducts,
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
      error: error instanceof Error ? error.message : 'Failed to fetch products',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body: CreateProductRequest = await request.json()

    // Validation
    if (!body.name || !body.sku || !body.price) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Missing required fields: name, sku, price',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Check if SKU already exists
    if (products.some(p => p.sku === body.sku)) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Product with this SKU already exists',
      }
      return NextResponse.json(errorResponse, { status: 409 })
    }

    const newProduct: Product = {
      id: String(Date.now()),
      name: body.name,
      description: body.description,
      sku: body.sku,
      price: body.price,
      compareAtPrice: body.compareAtPrice,
      category: body.category,
      subcategory: body.subcategory,
      brand: body.brand,
      images: body.images || [],
      stock: body.stock || 0,
      lowStockThreshold: body.lowStockThreshold || 10,
      status: 'active',
      variants: body.variants?.map((v, i) => ({
        ...v,
        id: `${Date.now()}-${i}`,
      })),
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    const response: ApiResponse<Product> = {
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create product',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
