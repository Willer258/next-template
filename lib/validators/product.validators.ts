import { z } from 'zod'
import { baseFilterSchema, priceSchema } from './common.validators'

/**
 * Product validation schemas
 */

/**
 * Create product request
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  sku: z.string().regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),
  price: priceSchema,
  compareAtPrice: priceSchema.optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  lowStockThreshold: z.number().int().nonnegative().default(10),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  tags: z.array(z.string()).default([]),
  images: z
    .array(
      z.object({
        url: z.string().url('Invalid image URL'),
        alt: z.string(),
        isPrimary: z.boolean().default(false),
      })
    )
    .min(1, 'At least one image is required'),
  specifications: z.record(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

/**
 * Update product request (all fields optional)
 */
export const updateProductSchema = createProductSchema.partial()

/**
 * Product filters
 */
export const productFiltersSchema = baseFilterSchema.extend({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  inStock: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  tags: z.array(z.string()).or(z.string().transform(s => [s])).optional(),
})

/**
 * Product ID parameter
 */
export const productIdSchema = z.object({
  id: z.string().uuid('Invalid product ID'),
})

/**
 * Type exports
 */
export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductFilters = z.infer<typeof productFiltersSchema>
export type ProductIdParam = z.infer<typeof productIdSchema>
