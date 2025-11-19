import { NextRequest } from 'next/server'
import { ProductService } from '@/lib/services/product.service'
import { ApiResponse } from '@/lib/api/response'
import { handleApiError } from '@/lib/utils/error-handler'
import { parseQueryParams } from '@/lib/validators/common.validators'
import {
  createProductSchema,
  productFiltersSchema,
  type CreateProductInput,
} from '@/lib/validators/product.validators'

const productService = new ProductService()

/**
 * GET /api/products - List all products with pagination and filters
 *
 * Query Parameters:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 * - category: Filter by category
 * - brand: Filter by brand
 * - minPrice: Minimum price filter
 * - maxPrice: Maximum price filter
 * - inStock: Filter in-stock products (true/false)
 * - isActive: Filter active products (true/false)
 * - isFeatured: Filter featured products (true/false)
 * - search: Search in name, description, SKU
 * - sortBy: Field to sort by
 * - sortOrder: Sort order (asc/desc)
 * - tags: Filter by tags (array or single value)
 */
export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const filters = parseQueryParams(productFiltersSchema, request.url)

    // Get products from service
    const { products, pagination } = await productService.getProducts(filters)

    // Return paginated response
    return ApiResponse.paginated(products, pagination)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * POST /api/products - Create a new product
 *
 * Request Body:
 * {
 *   name: string (required, 1-200 chars)
 *   description: string (required, 10-2000 chars)
 *   sku: string (required, uppercase letters/numbers/hyphens only)
 *   price: number (required, positive)
 *   compareAtPrice?: number (optional, must be > price)
 *   stock: number (required, non-negative integer)
 *   lowStockThreshold?: number (default: 10)
 *   category: string (required)
 *   brand?: string (optional)
 *   tags?: string[] (default: [])
 *   images: Array<{url: string, alt: string, isPrimary?: boolean}> (min 1)
 *   specifications?: Record<string, string> (optional)
 *   isActive?: boolean (default: true)
 *   isFeatured?: boolean (default: false)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData: CreateProductInput = createProductSchema.parse(body)

    // Create product via service
    const product = await productService.createProduct(validatedData)

    // Return success response
    return ApiResponse.created(product, 'Product created successfully')
  } catch (error) {
    return handleApiError(error)
  }
}
