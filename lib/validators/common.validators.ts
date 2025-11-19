import { z } from 'zod'

/**
 * Common reusable validation schemas
 */

/**
 * Pagination parameters
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

/**
 * UUID validation
 */
export const uuidSchema = z.string().uuid('Invalid ID format')

/**
 * Date range validation
 */
export const dateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
})

/**
 * Sort parameters
 */
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

/**
 * Search parameters
 */
export const searchSchema = z.object({
  search: z.string().optional(),
})

/**
 * Combined filter parameters
 */
export const baseFilterSchema = paginationSchema
  .merge(sortSchema)
  .merge(searchSchema)

/**
 * Email validation
 */
export const emailSchema = z.string().email('Invalid email address')

/**
 * Phone validation (basic)
 */
export const phoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, 'Invalid phone number')
  .optional()

/**
 * URL validation
 */
export const urlSchema = z.string().url('Invalid URL')

/**
 * Price validation (positive number with max 2 decimal places)
 */
export const priceSchema = z
  .number()
  .positive('Price must be positive')
  .refine((val) => {
    const decimal = val.toString().split('.')[1]
    return !decimal || decimal.length <= 2
  }, 'Price cannot have more than 2 decimal places')

/**
 * Percentage validation (0-100)
 */
export const percentageSchema = z
  .number()
  .min(0, 'Percentage cannot be negative')
  .max(100, 'Percentage cannot exceed 100')

/**
 * Helper to parse query parameters
 */
export function parseQueryParams<T extends z.ZodType>(
  schema: T,
  url: string
): z.infer<T> {
  const { searchParams } = new URL(url)
  const params: Record<string, any> = {}

  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return schema.parse(params)
}

/**
 * Helper to validate request body
 */
export async function validateBody<T extends z.ZodType>(
  schema: T,
  request: Request
): Promise<z.infer<T>> {
  const body = await request.json()
  return schema.parse(body)
}
