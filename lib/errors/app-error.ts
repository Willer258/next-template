/**
 * Base application error class
 * All custom errors should extend this class
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: any
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Validation error (400)
 * Used when request data doesn't meet validation requirements
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

/**
 * Not found error (404)
 * Used when a requested resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      id ? `${resource} with ID '${id}' not found` : `${resource} not found`,
      404,
      'NOT_FOUND'
    )
  }
}

/**
 * Unauthorized error (401)
 * Used when authentication is required but not provided
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

/**
 * Forbidden error (403)
 * Used when user is authenticated but doesn't have permission
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN')
  }
}

/**
 * Conflict error (409)
 * Used when request conflicts with current state (e.g., duplicate entry)
 */
export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 409, 'CONFLICT', details)
  }
}

/**
 * Bad request error (400)
 * Used for general client errors
 */
export class BadRequestError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'BAD_REQUEST', details)
  }
}

/**
 * Internal server error (500)
 * Used for unexpected server errors
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'An unexpected error occurred', details?: any) {
    super(message, 500, 'INTERNAL_ERROR', details)
  }
}
