import { PrismaClient } from '@prisma/client'
import { prisma as prismaClient } from '@/lib/db/prisma'

/**
 * Base repository class
 * Provides common database operations for all entities
 */
export abstract class BaseRepository<T> {
  protected prisma: PrismaClient

  constructor() {
    this.prisma = prismaClient
  }

  /**
   * Find all records
   */
  abstract findAll(filters?: any): Promise<T[]>

  /**
   * Find record by ID
   */
  abstract findById(id: string): Promise<T | null>

  /**
   * Create new record
   */
  abstract create(data: any): Promise<T>

  /**
   * Update record by ID
   */
  abstract update(id: string, data: any): Promise<T>

  /**
   * Delete record by ID
   */
  abstract delete(id: string): Promise<void>

  /**
   * Count total records
   */
  abstract count(filters?: any): Promise<number>
}
