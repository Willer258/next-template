import { NextResponse } from 'next/server'
import { AppError } from '@/lib/errors/app-error'
import { ZodError } from 'zod'

/**
 * Centralized error handler for API routes
 * Converts errors into standardized API responses
 */
export function handleApiError(error: unknown): NextResponse {
  // Log error for monitoring (in production, use proper logging service)
  console.error('API Error:', error)

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.format(),
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    )
  }

  // Handle custom application errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        timestamp: new Date().toISOString(),
      },
      { status: error.statusCode }
    )
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any

    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      const field = prismaError.meta?.target?.[0] || 'field'
      return NextResponse.json(
        {
          success: false,
          error: `A record with this ${field} already exists`,
          code: 'DUPLICATE_ERROR',
          timestamp: new Date().toISOString(),
        },
        { status: 409 }
      )
    }

    // Record not found
    if (prismaError.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: 'Record not found',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    }

    // Foreign key constraint violation
    if (prismaError.code === 'P2003') {
      return NextResponse.json(
        {
          success: false,
          error: 'Related record not found',
          code: 'FOREIGN_KEY_ERROR',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      success: false,
      error: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  )
}
