// API Types and Interfaces for E-commerce and Inventory Management

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  sku: string
  price: number
  compareAtPrice?: number
  category: string
  subcategory?: string
  brand?: string
  images: string[]
  stock: number
  lowStockThreshold: number
  status: 'active' | 'draft' | 'archived'
  variants?: ProductVariant[]
  tags: string[]
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: Record<string, string> // e.g., { size: "L", color: "Red" }
}

// Inventory Types
export interface InventoryItem {
  id: string
  productId: string
  sku: string
  quantity: number
  reserved: number // Quantity reserved in pending orders
  available: number // quantity - reserved
  location?: string
  warehouseId?: string
  lastRestocked?: string
  lowStockAlert: boolean
}

export interface StockMovement {
  id: string
  productId: string
  sku: string
  type: 'in' | 'out' | 'transfer' | 'adjustment'
  quantity: number
  previousQuantity: number
  newQuantity: number
  reason: string
  reference?: string // Order ID, Transfer ID, etc.
  userId: string
  createdAt: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  variantId?: string
  name: string
  sku: string
  price: number
  quantity: number
  image?: string
  attributes?: Record<string, string>
}

export interface Cart {
  id: string
  userId?: string
  sessionId: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  createdAt: string
  updatedAt: string
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  userId?: string
  email: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: PaymentMethod
  shippingMethod: string
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  variantId?: string
  name: string
  sku: string
  quantity: number
  price: number
  total: number
  image?: string
  attributes?: Record<string, string>
}

export interface Address {
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
}

export interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'stripe' | 'bank_transfer'
  last4?: string
  brand?: string
  email?: string
}

// Checkout Types
export interface CheckoutSession {
  id: string
  cart: Cart
  shippingAddress?: Address
  billingAddress?: Address
  sameAsShipping: boolean
  paymentMethod?: PaymentMethod
  shippingMethod?: string
  step: 'cart' | 'shipping' | 'payment' | 'review'
  createdAt: string
  expiresAt: string
}

// Request/Response Types
export interface CreateProductRequest {
  name: string
  description: string
  sku: string
  price: number
  compareAtPrice?: number
  category: string
  subcategory?: string
  brand?: string
  images: string[]
  stock: number
  lowStockThreshold?: number
  variants?: Omit<ProductVariant, 'id'>[]
  tags?: string[]
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string
}

export interface UpdateInventoryRequest {
  productId: string
  quantity: number
  type: 'in' | 'out' | 'adjustment'
  reason: string
  reference?: string
}

export interface AddToCartRequest {
  productId: string
  variantId?: string
  quantity: number
}

export interface UpdateCartItemRequest {
  itemId: string
  quantity: number
}

export interface CreateOrderRequest {
  items: CartItem[]
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: PaymentMethod
  shippingMethod: string
  notes?: string
}

export interface UpdateOrderStatusRequest {
  orderId: string
  status: Order['status']
  trackingNumber?: string
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Filters
export interface ProductFilters {
  category?: string
  subcategory?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  tags?: string[]
  search?: string
}

export interface OrderFilters {
  status?: Order['status']
  paymentStatus?: Order['paymentStatus']
  startDate?: string
  endDate?: string
  search?: string
}
