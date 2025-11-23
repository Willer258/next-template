import { Product } from '@prisma/client'
import { ProductRepository } from '@/lib/repositories/product.repository'
import type {
  ProductFilters,
  CreateProductInput,
  UpdateProductInput
} from '@/lib/validators/product.validators'
import {
  createProductSchema,
  updateProductSchema,
  productFiltersSchema
} from '@/lib/validators/product.validators'
import { NotFoundError, ConflictError, BadRequestError } from '@/lib/errors/app-error'
import type { PaginationMeta } from '@/lib/api/response'

/**
 * Product service
 * Handles business logic for product operations
 */
export class ProductService {
  private productRepo: ProductRepository

  constructor() {
    this.productRepo = new ProductRepository()
  }

  /**
   * Get all products with filters and pagination
   */
  async getProducts(filters: ProductFilters): Promise<{
    products: Product[]
    pagination: PaginationMeta
  }> {
    // Validate filters
    const validatedFilters = productFiltersSchema.parse(filters)

    // Get total count for pagination
    const total = await this.productRepo.count(validatedFilters)

    // Get products
    const products = await this.productRepo.findAll(validatedFilters)

    // Calculate pagination metadata
    const page = validatedFilters.page || 1
    const limit = validatedFilters.limit || 10
    const totalPages = Math.ceil(total / limit)

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepo.findById(id)

    if (!product) {
      throw new NotFoundError('Product', id)
    }

    return product
  }

  /**
   * Create new product
   */
  async createProduct(data: CreateProductInput): Promise<Product> {
    // Validate input
    const validatedData = createProductSchema.parse(data)

    // Check if SKU already exists
    const existingProduct = await this.productRepo.findBySku(validatedData.sku)
    if (existingProduct) {
      throw new ConflictError('A product with this SKU already exists')
    }

    // Validate price logic
    if (validatedData.compareAtPrice && validatedData.compareAtPrice <= validatedData.price) {
      throw new BadRequestError('Compare at price must be greater than regular price')
    }

    // Ensure at least one image is marked as primary
    if (!validatedData.images.some(img => img.isPrimary)) {
      validatedData.images[0].isPrimary = true
    }

    // Create product
    return await this.productRepo.create(validatedData)
  }

  /**
   * Update product
   */
  async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
    // Check if product exists
    await this.getProductById(id)

    // Validate input
    const validatedData = updateProductSchema.parse(data)

    // If updating SKU, check for conflicts
    if (validatedData.sku) {
      const existingProduct = await this.productRepo.findBySku(validatedData.sku)
      if (existingProduct && existingProduct.id !== id) {
        throw new ConflictError('A product with this SKU already exists')
      }
    }

    // Validate price logic if both are being updated
    if (
      validatedData.compareAtPrice !== undefined &&
      validatedData.price !== undefined &&
      validatedData.compareAtPrice <= validatedData.price
    ) {
      throw new BadRequestError('Compare at price must be greater than regular price')
    }

    // Update product
    return await this.productRepo.update(id, validatedData)
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<void> {
    // Check if product exists
    await this.getProductById(id)

    // In production, you might want to soft delete instead
    // or check for existing orders before deleting
    await this.productRepo.delete(id)
  }

  /**
   * Update product stock
   */
  async updateStock(id: string, quantity: number): Promise<Product> {
    // Check if product exists
    await this.getProductById(id)

    if (quantity < 0) {
      throw new BadRequestError('Stock quantity cannot be negative')
    }

    return await this.productRepo.updateStock(id, quantity)
  }

  /**
   * Reserve stock for an order
   */
  async reserveStock(id: string, quantity: number): Promise<Product> {
    const product = await this.getProductById(id)

    if (product.stock < quantity) {
      throw new BadRequestError(
        `Insufficient stock. Only ${product.stock} units available`
      )
    }

    return await this.productRepo.decrementStock(id, quantity)
  }

  /**
   * Release reserved stock (e.g., order cancelled)
   */
  async releaseStock(id: string, quantity: number): Promise<Product> {
    await this.getProductById(id)
    return await this.productRepo.incrementStock(id, quantity)
  }

  /**
   * Get low stock products
   */
  async getLowStockProducts(): Promise<Product[]> {
    return await this.productRepo.getLowStockProducts()
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return await this.productRepo.getFeaturedProducts(limit)
  }

  /**
   * Check if product is in stock
   */
  async isInStock(id: string, quantity: number = 1): Promise<boolean> {
    const product = await this.getProductById(id)
    return product.stock >= quantity
  }
}
