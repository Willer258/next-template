import { NextResponse } from 'next/server'

/**
 * Standard success response structure
 */
export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
  timestamp: string
}

/**
 * Standard error response structure
 */
export interface ApiErrorResponse {
  success: false
  error: string
  code: string
  details?: any
  timestamp: string
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T = any> {
  success: true
  data: T[]
  pagination: PaginationMeta
  timestamp: string
}

/**
 * Standardized API response helper
 * Ensures all API responses follow the same format
 */
export class ApiResponse {
  /**
   * Success response
   */
  static success<T>(
    data: T,
    message?: string,
    status: number = 200
  ): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        data,
        message,
        timestamp: new Date().toISOString(),
      },
      { status }
    )
  }

  /**
   * Created response (201)
   */
  static created<T>(
    data: T,
    message: string = 'Resource created successfully'
  ): NextResponse<ApiSuccessResponse<T>> {
    return this.success(data, message, 201)
  }

  /**
   * Error response
   */
  static error(
    error: string,
    statusCode: number = 500,
    code: string = 'ERROR',
    details?: any
  ): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        error,
        code,
        details,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    )
  }

  /**
   * Paginated response
   */
  static paginated<T>(
    data: T[],
    pagination: { page: number; limit: number; total: number },
    message?: string
  ): NextResponse<PaginatedResponse<T>> {
    const totalPages = Math.ceil(pagination.total / pagination.limit)

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        ...pagination,
        totalPages,
        hasNextPage: pagination.page < totalPages,
        hasPreviousPage: pagination.page > 1,
      },
      message,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * No content response (204)
   */
  static noContent(): NextResponse {
    return new NextResponse(null, { status: 204 })
  }
}
