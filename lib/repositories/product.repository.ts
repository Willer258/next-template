import { Product, Prisma } from '@prisma/client'
import { BaseRepository } from './base.repository'
import type { ProductFilters, CreateProductInput, UpdateProductInput } from '@/lib/validators/product.validators'

/**
 * Product repository
 * Handles all database operations for products
 */
export class ProductRepository extends BaseRepository<Product> {
  /**
   * Build where clause from filters
   */
  private buildWhereClause(filters?: ProductFilters): Prisma.ProductWhereInput {
    if (!filters) return {}

    const where: Prisma.ProductWhereInput = {}

    if (filters.category) {
      where.category = filters.category
    }

    if (filters.brand) {
      where.brand = filters.brand
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {}
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice
      }
    }

    if (filters.inStock !== undefined) {
      where.stock = filters.inStock ? { gt: 0 } : { equals: 0 }
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive
    }

    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured
    }

    if (filters.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags
      }
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    return where
  }

  /**
   * Find all products with filters
   */
  async findAll(filters?: ProductFilters): Promise<Product[]> {
    const where = this.buildWhereClause(filters)

    const orderBy: Prisma.ProductOrderByWithRelationInput = {}
    if (filters?.sortBy) {
      orderBy[filters.sortBy as keyof Product] = filters.sortOrder || 'desc'
    } else {
      orderBy.createdAt = 'desc'
    }

    const skip = filters?.page && filters?.limit
      ? (filters.page - 1) * filters.limit
      : undefined

    return await this.prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: filters?.limit,
    })
  }

  /**
   * Find product by ID
   */
  async findById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { id },
    })
  }

  /**
   * Find product by SKU
   */
  async findBySku(sku: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: { sku },
    })
  }

  /**
   * Create new product
   */
  async create(data: CreateProductInput): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        sku: data.sku,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        stock: data.stock,
        lowStockThreshold: data.lowStockThreshold,
        category: data.category,
        brand: data.brand,
        tags: data.tags,
        images: data.images as any, // JSON field
        specifications: data.specifications as any, // JSON field
        isActive: data.isActive,
        isFeatured: data.isFeatured,
      },
    })
  }

  /**
   * Update product
   */
  async update(id: string, data: UpdateProductInput): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        sku: data.sku,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        stock: data.stock,
        lowStockThreshold: data.lowStockThreshold,
        category: data.category,
        brand: data.brand,
        tags: data.tags,
        images: data.images as any,
        specifications: data.specifications as any,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
      },
    })
  }

  /**
   * Delete product
   */
  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    })
  }

  /**
   * Count products with filters
   */
  async count(filters?: ProductFilters): Promise<number> {
    const where = this.buildWhereClause(filters)
    return await this.prisma.product.count({ where })
  }

  /**
   * Update stock
   */
  async updateStock(id: string, quantity: number): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { stock: quantity },
    })
  }

  /**
   * Decrement stock (for orders)
   */
  async decrementStock(id: string, quantity: number): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    })
  }

  /**
   * Increment stock (for returns/restocks)
   */
  async incrementStock(id: string, quantity: number): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          increment: quantity,
        },
      },
    })
  }

  /**
   * Get low stock products
   */
  async getLowStockProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: {
        stock: {
          lte: this.prisma.product.fields.lowStockThreshold,
        },
        isActive: true,
      },
    })
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
        stock: { gt: 0 },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  }
}
