// Authentication Types and Interfaces

export interface User {
  id: string
  email: string
  emailVerified: boolean
  name: string
  firstName?: string
  lastName?: string
  avatar?: string
  phone?: string
  role: 'user' | 'admin' | 'moderator'
  provider: 'email' | 'google' | 'github' | 'facebook' | 'twitter'
  providerId?: string
  passwordHash?: string // Only for email provider
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  preferences?: UserPreferences
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  loginCount?: number
}

export interface UserPreferences {
  language: string
  currency: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  marketing: boolean
}

export interface Session {
  id: string
  userId: string
  accessToken: string
  refreshToken: string
  expiresAt: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

export interface PasswordResetToken {
  id: string
  userId: string
  token: string
  expiresAt: string
  used: boolean
  createdAt: string
}

export interface EmailVerificationToken {
  id: string
  userId: string
  email: string
  token: string
  expiresAt: string
  used: boolean
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  type: 'shipping' | 'billing'
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  createdAt: string
  updatedAt: string
}

// Request Types
export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  name: string
  firstName?: string
  lastName?: string
  acceptTerms: boolean
}

export interface LoginRequest {
  email: string
  password: string
  remember?: boolean
  twoFactorCode?: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileRequest {
  name?: string
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  preferences?: Partial<UserPreferences>
}

export interface Enable2FARequest {
  password: string
}

export interface Verify2FARequest {
  code: string
}

export interface LinkAccountRequest {
  provider: 'google' | 'github' | 'facebook' | 'twitter'
  accessToken: string
}

// Response Types
export interface AuthResponse {
  success: boolean
  data?: {
    user: Omit<User, 'passwordHash' | 'twoFactorSecret'>
    accessToken?: string
    refreshToken?: string
    session?: Session
  }
  error?: string
  message?: string
}

export interface SessionResponse {
  success: boolean
  data?: {
    user: Omit<User, 'passwordHash' | 'twoFactorSecret'>
    session: Session
  }
  error?: string
}

export interface QRCodeResponse {
  success: boolean
  data?: {
    qrCode: string // Base64 image
    secret: string
    backupCodes: string[]
  }
  error?: string
}

// Validation Types
export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4 // 0 = very weak, 4 = very strong
  feedback: string[]
  meetsRequirements: boolean
}

export interface ValidationError {
  field: string
  message: string
}

// JWT Payload
export interface JWTPayload {
  userId: string
  email: string
  role: User['role']
  sessionId: string
  iat: number
  exp: number
}

export interface RefreshTokenPayload {
  userId: string
  sessionId: string
  iat: number
  exp: number
}

// Account Linking
export interface LinkedAccount {
  id: string
  userId: string
  provider: User['provider']
  providerId: string
  email?: string
  name?: string
  avatar?: string
  accessToken?: string
  refreshToken?: string
  createdAt: string
  updatedAt: string
}

// Audit Log
export interface AuditLog {
  id: string
  userId: string
  action: AuditAction
  details?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

export type AuditAction =
  | 'user.registered'
  | 'user.login'
  | 'user.logout'
  | 'user.password_changed'
  | 'user.password_reset_requested'
  | 'user.password_reset'
  | 'user.email_verified'
  | 'user.profile_updated'
  | 'user.2fa_enabled'
  | 'user.2fa_disabled'
  | 'user.account_linked'
  | 'user.account_unlinked'
  | 'user.deleted'
  | 'session.created'
  | 'session.revoked'

// Rate Limiting
export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number // Timestamp
}

// Email Templates
export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export type EmailType =
  | 'welcome'
  | 'email-verification'
  | 'password-reset'
  | 'password-changed'
  | 'login-alert'
  | '2fa-code'
  | 'account-deleted'
