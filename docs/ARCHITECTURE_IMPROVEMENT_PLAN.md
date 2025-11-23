# Plan d'Amélioration de l'Architecture - Next.js E-commerce Template

## 📋 Résumé Exécutif

Ce document présente un plan complet pour améliorer l'architecture du template Next.js e-commerce, incluant le backend, le frontend, et les stratégies de code splitting.

### Problèmes Critiques Identifiés

1. **🔴 CRITIQUE** - Stockage en mémoire uniquement (perte de données au redémarrage)
2. **🔴 CRITIQUE** - Deux systèmes d'authentification en conflit
3. **🔴 CRITIQUE** - Problèmes de sécurité (hachage SHA-256 pour mots de passe)
4. **🟡 IMPORTANT** - Absence de couche service/repository
5. **🟡 IMPORTANT** - Fichiers trop volumineux (jusqu'à 773 lignes)
6. **🟡 IMPORTANT** - Code dupliqué dans les routes API

---

## Phase 1 : Corrections Critiques (Priorité Immédiate)

### 1.1 Migration vers Prisma Database

**Problème actuel :** Toutes les données en mémoire

**Structure proposée :**
```
lib/
├── db/
│   ├── prisma.ts              # Client Prisma existant
│   └── seed.ts                # Script de seed
├── repositories/
│   ├── base.repository.ts     # Repository générique
│   ├── product.repository.ts
│   ├── order.repository.ts
│   ├── cart.repository.ts
│   ├── inventory.repository.ts
│   └── user.repository.ts
└── services/
    ├── product.service.ts
    ├── order.service.ts
    ├── cart.service.ts
    ├── inventory.service.ts
    └── checkout.service.ts
```

**Exemple de migration :**

**AVANT** (app/api/products/route.ts):
```typescript
let products: Product[] = [
  { id: '1', name: 'Product 1', ... }
]

export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true, data: products })
}
```

**APRÈS** (architecture en couches):
```typescript
// lib/repositories/product.repository.ts
export class ProductRepository {
  async findAll(filters?: ProductFilters): Promise<Product[]> {
    return await prisma.product.findMany({
      where: filters ? this.buildWhereClause(filters) : {},
      include: {
        images: true,
        category: true,
      }
    })
  }

  async findById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id },
      include: { images: true, category: true }
    })
  }

  async create(data: CreateProductInput): Promise<Product> {
    return await prisma.product.create({
      data,
      include: { images: true, category: true }
    })
  }
}

// lib/services/product.service.ts
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async getProducts(filters: ProductFilters, pagination: PaginationParams) {
    const products = await this.productRepo.findAll(filters)
    return this.paginate(products, pagination)
  }

  async createProduct(data: CreateProductRequest): Promise<Product> {
    this.validateProductData(data)
    return await this.productRepo.create(data)
  }

  private validateProductData(data: CreateProductRequest) {
    const result = createProductSchema.safeParse(data)
    if (!result.success) {
      throw new ValidationError('Invalid product data', result.error.errors)
    }
  }
}

// app/api/products/route.ts
const productService = new ProductService(new ProductRepository())

export async function GET(request: NextRequest) {
  try {
    const filters = parseFilters(request.url)
    const pagination = parsePagination(request.url)
    const result = await productService.getProducts(filters, pagination)
    return ApiResponse.paginated(result.data, result.pagination)
  } catch (error) {
    return handleApiError(error)
  }
}
```

**Tâches :**
- [ ] Créer `lib/repositories/base.repository.ts`
- [ ] Créer repositories pour chaque entité (Product, Order, Cart, Inventory)
- [ ] Créer services pour la logique métier
- [ ] Migrer les routes API une par une
- [ ] Créer script de seed pour données de test

### 1.2 Consolidation de l'Authentification

**Problème :** Deux systèmes d'auth en conflit (NextAuth.js + Custom JWT)

**Recommandation :** Choisir NextAuth.js et supprimer le système custom

**Raisons :**
- NextAuth.js déjà configuré avec Prisma
- Support OAuth intégré (Google, GitHub)
- Sessions sécurisées dans la DB
- Maintenu par la communauté
- Support TypeScript complet

**Migration :**

```typescript
// lib/auth/auth.ts (nouveau fichier unifié)
import { getServerSession } from 'next-auth'
import { authOptions } from './config'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new UnauthorizedError('Authentication required')
  }
  return user
}

export async function requireRole(role: string) {
  const user = await requireAuth()
  if (user.role !== role) {
    throw new ForbiddenError('Insufficient permissions')
  }
  return user
}

// lib/middleware/auth.middleware.ts
export async function withAuth(
  handler: (req: NextRequest, user: User) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const user = await requireAuth()
      return await handler(req, user)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

// Utilisation dans une route API:
// app/api/orders/route.ts
export const GET = withAuth(async (request, user) => {
  const orders = await orderService.getUserOrders(user.id)
  return ApiResponse.success(orders)
})
```

**Tâches :**
- [ ] Supprimer `lib/auth/tokens.ts`
- [ ] Supprimer `lib/auth/storage.ts`
- [ ] Supprimer `lib/auth/password.ts`
- [ ] Supprimer routes custom (`/api/auth/login`, `/api/auth/register`)
- [ ] Créer middleware d'authentification avec NextAuth
- [ ] Mettre à jour toutes les routes protégées
- [ ] Ajouter gestion des rôles (RBAC)

### 1.3 Nettoyage des Dépendances

**Problème :** Mongoose configuré mais jamais utilisé, dépendances en conflit

```bash
# À supprimer
npm uninstall mongoose
npm uninstall @tremor/react  # Si Recharts suffit, ou vice-versa
```

**Tâches :**
- [ ] Supprimer `lib/db/mongoose.ts`
- [ ] Supprimer Mongoose de package.json
- [ ] Choisir entre Tremor et Recharts pour les graphiques
- [ ] Nettoyer les imports inutilisés

---

## Phase 2 : Architecture Backend (Haute Priorité)

### 2.1 Couche de Validation avec Zod

```
lib/
├── validators/
│   ├── common.validators.ts    # Validators réutilisables
│   ├── product.validators.ts
│   ├── order.validators.ts
│   ├── cart.validators.ts
│   ├── inventory.validators.ts
│   └── user.validators.ts
```

**Exemple d'implémentation :**

```typescript
// lib/validators/common.validators.ts
import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export const idSchema = z.string().uuid('Invalid ID format')

export const dateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
})

// lib/validators/product.validators.ts
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().min(10).max(2000),
  sku: z.string().regex(/^[A-Z0-9-]+$/, 'Invalid SKU format'),
  price: z.number().positive('Price must be positive'),
  compareAtPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  lowStockThreshold: z.number().int().nonnegative().default(10),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  tags: z.array(z.string()).default([]),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string(),
    isPrimary: z.boolean().default(false),
  })).min(1, 'At least one image required'),
  specifications: z.record(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

export const updateProductSchema = createProductSchema.partial()

export const productFiltersSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  inStock: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

// lib/validators/order.validators.ts
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })).min(1, 'Order must contain at least one item'),
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  billingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  paymentMethod: z.enum(['card', 'paypal', 'stripe', 'bank_transfer']),
  notes: z.string().max(500).optional(),
})

// Utilisation dans une route:
// app/api/products/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createProductSchema.parse(body)
    const product = await productService.createProduct(validatedData)
    return ApiResponse.success(product, 'Product created successfully')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponse.error(
        'Validation failed',
        400,
        'VALIDATION_ERROR',
        error.format()
      )
    }
    return handleApiError(error)
  }
}
```

**Tâches :**
- [ ] Créer validators pour toutes les entités
- [ ] Intégrer validation dans les services
- [ ] Créer helpers de validation réutilisables
- [ ] Ajouter types TypeScript générés depuis Zod schemas

### 2.2 Gestion d'Erreurs Centralisée

```typescript
// lib/errors/app-error.ts
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

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      id ? `${resource} with ID ${id} not found` : `${resource} not found`,
      404,
      'NOT_FOUND'
    )
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN')
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 409, 'CONFLICT', details)
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'BAD_REQUEST', details)
  }
}

// lib/utils/error-handler.ts
import { NextResponse } from 'next/server'
import { AppError } from '@/lib/errors/app-error'
import { ZodError } from 'zod'

export function handleApiError(error: unknown): NextResponse {
  // Log error for monitoring
  console.error('API Error:', error)

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json({
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.format(),
      timestamp: new Date().toISOString()
    }, { status: 400 })
  }

  // Handle application errors
  if (error instanceof AppError) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
      timestamp: new Date().toISOString()
    }, { status: error.statusCode })
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any
    if (prismaError.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: 'A record with this value already exists',
        code: 'DUPLICATE_ERROR',
        timestamp: new Date().toISOString()
      }, { status: 409 })
    }
    if (prismaError.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Record not found',
        code: 'NOT_FOUND',
        timestamp: new Date().toISOString()
      }, { status: 404 })
    }
  }

  // Handle unknown errors
  return NextResponse.json({
    success: false,
    error: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  }, { status: 500 })
}
```

**Tâches :**
- [ ] Créer classes d'erreur personnalisées
- [ ] Implémenter error handler centralisé
- [ ] Ajouter logging avec Winston ou Pino
- [ ] Intégrer avec service de monitoring (Sentry)

### 2.3 Standardisation des Réponses API

```typescript
// lib/api/response.ts
import { NextResponse } from 'next/server'

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
  timestamp: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  code: string
  details?: any
  timestamp: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResponse<T = any> {
  success: true
  data: T[]
  pagination: PaginationMeta
  timestamp: string
}

export class ApiResponse {
  static success<T>(
    data: T,
    message?: string,
    status: number = 200
  ): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    }, { status })
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully'
  ): NextResponse<ApiSuccessResponse<T>> {
    return this.success(data, message, 201)
  }

  static error(
    error: string,
    statusCode: number = 500,
    code: string = 'ERROR',
    details?: any
  ): NextResponse<ApiErrorResponse> {
    return NextResponse.json({
      success: false,
      error,
      code,
      details,
      timestamp: new Date().toISOString()
    }, { status: statusCode })
  }

  static paginated<T>(
    data: T[],
    pagination: { page: number; limit: number; total: number }
  ): NextResponse<PaginatedResponse<T>> {
    const totalPages = Math.ceil(pagination.total / pagination.limit)

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        ...pagination,
        totalPages,
        hasNextPage: pagination.page < totalPages,
        hasPreviousPage: pagination.page > 1
      },
      timestamp: new Date().toISOString()
    })
  }

  static noContent(): NextResponse {
    return new NextResponse(null, { status: 204 })
  }
}
```

**Tâches :**
- [ ] Créer classe ApiResponse standardisée
- [ ] Migrer toutes les routes vers ce format
- [ ] Ajouter types TypeScript pour toutes les réponses
- [ ] Documenter format d'API

### 2.4 Middleware et Intercepteurs

```typescript
// lib/middleware/with-auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export function withAuth(
  handler: (req: NextRequest, context: { user: User }) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: any) => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return ApiResponse.error('Authentication required', 401, 'UNAUTHORIZED')
    }

    return handler(req, { ...context, user: session.user })
  }
}

// lib/middleware/with-role.ts
export function withRole(role: string | string[]) {
  return function(
    handler: (req: NextRequest, context: { user: User }) => Promise<NextResponse>
  ) {
    return withAuth(async (req, context) => {
      const roles = Array.isArray(role) ? role : [role]

      if (!roles.includes(context.user.role)) {
        return ApiResponse.error(
          'Insufficient permissions',
          403,
          'FORBIDDEN'
        )
      }

      return handler(req, context)
    })
  }
}

// lib/middleware/with-validation.ts
import { z } from 'zod'

export function withValidation<T extends z.ZodType>(schema: T) {
  return function(
    handler: (
      req: NextRequest,
      context: { validated: z.infer<T> }
    ) => Promise<NextResponse>
  ) {
    return async (req: NextRequest, context?: any) => {
      try {
        const body = await req.json()
        const validated = schema.parse(body)
        return handler(req, { ...context, validated })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return ApiResponse.error(
            'Validation failed',
            400,
            'VALIDATION_ERROR',
            error.format()
          )
        }
        throw error
      }
    }
  }
}

// Utilisation combinée:
// app/api/products/route.ts
export const POST = withAuth(
  withValidation(createProductSchema)(
    async (req, { user, validated }) => {
      const product = await productService.createProduct(validated, user.id)
      return ApiResponse.created(product)
    }
  )
)

// Pour admin uniquement:
export const DELETE = withRole('admin')(
  async (req, { user }) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    await productService.deleteProduct(id)
    return ApiResponse.noContent()
  }
)
```

**Tâches :**
- [ ] Créer middleware d'authentification
- [ ] Créer middleware de validation
- [ ] Créer middleware RBAC
- [ ] Créer middleware rate limiting
- [ ] Créer middleware logging

---

## Phase 3 : Architecture Frontend (Priorité Moyenne)

### 3.1 Refactoring des Gros Fichiers

**Problème :** Fichiers de 300-700 lignes

**Stratégie :**

```
components/
├── layout/
│   ├── navbar/
│   │   ├── navbar.tsx              # Composant principal (50 lignes)
│   │   ├── navbar-desktop.tsx
│   │   ├── navbar-mobile.tsx
│   │   ├── navbar-search.tsx
│   │   ├── navbar-cart.tsx
│   │   └── navbar-user-menu.tsx
│   └── sidebar/
│       ├── app-sidebar.tsx         # Garder celui-ci
│       ├── sidebar-header.tsx
│       ├── sidebar-nav.tsx
│       └── sidebar-footer.tsx
├── marketing/
│   ├── hero/
│   │   ├── hero-section.tsx
│   │   └── hero-cta.tsx
│   ├── features/
│   │   ├── features-section.tsx
│   │   ├── feature-card.tsx
│   │   └── features-grid.tsx
│   └── pricing/
│       ├── pricing-section.tsx
│       └── pricing-card.tsx
└── e-commerce/
    ├── product/
    │   ├── product-card.tsx
    │   ├── product-list.tsx
    │   ├── product-filters.tsx
    │   └── product-quick-view.tsx
    ├── cart/
    │   ├── cart-drawer.tsx
    │   ├── cart-item.tsx
    │   └── cart-summary.tsx
    └── checkout/
        ├── checkout-steps.tsx
        ├── checkout-shipping.tsx
        ├── checkout-payment.tsx
        └── checkout-review.tsx
```

**Exemple de refactoring :**

**AVANT** (navbar.tsx - 301 lignes):
```typescript
export function Navbar() {
  // 301 lignes de code mélangé
}
```

**APRÈS** (architecture modulaire):
```typescript
// components/layout/navbar/navbar.tsx (50 lignes)
import { NavbarDesktop } from './navbar-desktop'
import { NavbarMobile } from './navbar-mobile'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <NavbarDesktop className="hidden md:flex" />
        <NavbarMobile className="flex md:hidden" />
      </div>
    </header>
  )
}

// components/layout/navbar/navbar-desktop.tsx
export function NavbarDesktop({ className }: { className?: string }) {
  return (
    <nav className={cn("flex-1 flex items-center gap-6", className)}>
      <NavbarLogo />
      <NavbarMainMenu />
      <div className="ml-auto flex items-center gap-4">
        <NavbarSearch />
        <NavbarCart />
        <NavbarUserMenu />
      </div>
    </nav>
  )
}

// components/layout/navbar/navbar-mobile.tsx
export function NavbarMobile({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={cn("w-full flex items-center justify-between", className)}>
      <NavbarLogo />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavbarMobileMenu onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </nav>
  )
}
```

**Tâches :**
- [ ] Refactorer navbar.tsx en composants modulaires
- [ ] Supprimer sidebar.tsx dupliqué, garder app-sidebar.tsx
- [ ] Extraire sections de la homepage marketing
- [ ] Créer composants e-commerce réutilisables
- [ ] Limiter chaque fichier à max 150 lignes

### 3.2 State Management avec React Query + Zustand

**Structure proposée :**

```
hooks/
├── api/                           # React Query hooks
│   ├── use-products.ts
│   ├── use-orders.ts
│   ├── use-cart.ts
│   └── use-user.ts
└── store/                         # Zustand stores
    ├── use-cart-store.ts
    ├── use-theme-store.ts
    └── use-ui-store.ts

lib/
└── api/
    ├── client.ts                  # API client
    ├── endpoints/
    │   ├── products.ts
    │   ├── orders.ts
    │   └── cart.ts
    └── types.ts
```

**Implémentation :**

```typescript
// lib/api/client.ts
export class ApiClient {
  private baseUrl = '/api'

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, window.location.origin)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value))
        }
      })
    }

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw await this.handleError(response)
    }
    return response.json()
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }
    return response.json()
  }

  private async handleError(response: Response) {
    const error = await response.json()
    return new ApiError(error.error, error.code, response.status)
  }
}

export const apiClient = new ApiClient()

// lib/api/endpoints/products.ts
export const productsApi = {
  getAll: (filters?: ProductFilters) =>
    apiClient.get<ApiResponse<Product[]>>('/api/products', filters),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Product>>(`/api/products/${id}`),

  create: (data: CreateProductRequest) =>
    apiClient.post<ApiResponse<Product>>('/api/products', data),

  update: (id: string, data: UpdateProductRequest) =>
    apiClient.put<ApiResponse<Product>>(`/api/products/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/api/products/${id}`),
}

// hooks/api/use-products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/endpoints/products'

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.getAll(filters),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) =>
      productsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] })
    },
  })
}

// hooks/store/use-cart-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  productId: string
  quantity: number
  price: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.productId === item.productId)
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          }
        }
        return { items: [...state.items, item] }
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.productId === productId ? { ...i, quantity } : i
        )
      })),

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)

// Utilisation dans un composant:
export function ProductList() {
  const { data: products, isLoading, error } = useProducts({ category: 'electronics' })
  const addToCart = useCartStore(state => state.addItem)

  if (isLoading) return <ProductsSkeleton />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid grid-cols-3 gap-4">
      {products?.data.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart({
            productId: product.id,
            quantity: 1,
            price: product.price
          })}
        />
      ))}
    </div>
  )
}
```

**Tâches :**
- [ ] Créer API client centralisé
- [ ] Créer hooks React Query pour toutes les entités
- [ ] Créer Zustand stores pour état client (cart, theme, UI)
- [ ] Migrer composants vers hooks custom
- [ ] Ajouter optimistic updates

### 3.3 Code Splitting et Performance

```typescript
// app/[locale]/(marketing)/page.tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const Chatbot = dynamic(() => import('@/components/chatbot/chatbot'), {
  ssr: false,
  loading: () => <ChatbotSkeleton />
})

const ThemeCustomizer = dynamic(
  () => import('@/components/theme/theme-customizer'),
  { ssr: false }
)

// Split marketing sections
const HeroSection = dynamic(() => import('@/components/marketing/hero/hero-section'))
const FeaturesSection = dynamic(() => import('@/components/marketing/features/features-section'))
const PricingSection = dynamic(() => import('@/components/marketing/pricing/pricing-section'))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <Chatbot />
      <ThemeCustomizer />
    </>
  )
}

// components/dashboard/analytics/analytics-charts.tsx
"use client"

import dynamic from 'next/dynamic'

// Recharts est lourd - lazy load
const RevenueChart = dynamic(
  () => import('./revenue-chart'),
  { loading: () => <ChartSkeleton /> }
)

const OrdersChart = dynamic(
  () => import('./orders-chart'),
  { loading: () => <ChartSkeleton /> }
)
```

**Optimisations Images :**

```typescript
// components/product/product-card.tsx
import Image from 'next/image'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL={product.blurDataUrl}
        />
      </div>
    </Card>
  )
}
```

**Tâches :**
- [ ] Ajouter dynamic imports pour composants lourds
- [ ] Optimiser images avec Next.js Image
- [ ] Ajouter loading states et skeletons
- [ ] Implémenter Suspense boundaries
- [ ] Analyser bundle avec @next/bundle-analyzer
- [ ] Réduire Framer Motion ou lazy load

### 3.4 Server Components vs Client Components

```typescript
// app/[locale]/(dashboard)/dashboard/products/page.tsx
// ✅ Server Component - fetch data server-side
import { getProducts } from '@/lib/services/product.service'
import { ProductsList } from './products-list'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  // Data fetching on server
  const products = await getProducts({
    page: parseInt(searchParams.page ?? '1'),
    category: searchParams.category,
  })

  return (
    <div>
      <h1>Products</h1>
      {/* Pass data to client component */}
      <ProductsList initialData={products} />
    </div>
  )
}

// app/[locale]/(dashboard)/dashboard/products/products-list.tsx
// Client Component - only for interactivity
"use client"

import { useProducts } from '@/hooks/api/use-products'
import { useState } from 'react'

export function ProductsList({ initialData }: { initialData: Product[] }) {
  const [filters, setFilters] = useState({})
  const { data = initialData } = useProducts(filters)

  return (
    <>
      <ProductFilters onFilterChange={setFilters} />
      <div className="grid grid-cols-3 gap-4">
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
```

**Tâches :**
- [ ] Convertir pages en Server Components où possible
- [ ] Créer loading.tsx pour chaque route
- [ ] Ajouter error.tsx pour error boundaries
- [ ] Utiliser Suspense pour streaming
- [ ] Optimiser avec React Server Components patterns

---

## Phase 4 : Optimisations et Polish (Priorité Basse)

### 4.1 Testing Infrastructure

```
tests/
├── unit/
│   ├── services/
│   │   ├── product.service.test.ts
│   │   ├── order.service.test.ts
│   │   └── cart.service.test.ts
│   └── validators/
│       └── product.validators.test.ts
├── integration/
│   └── api/
│       ├── products.test.ts
│       └── orders.test.ts
└── e2e/
    ├── checkout-flow.spec.ts
    └── user-registration.spec.ts
```

**Tâches :**
- [ ] Setup Vitest ou Jest
- [ ] Ajouter tests unitaires pour services
- [ ] Ajouter tests d'intégration pour API routes
- [ ] Setup Playwright pour E2E tests
- [ ] Ajouter CI/CD avec tests

### 4.2 Documentation

```
docs/
├── ARCHITECTURE_IMPROVEMENT_PLAN.md  # Ce fichier
├── AUTHENTICATION.md                 # Existant
├── API_DOCUMENTATION.md              # À créer
├── DEVELOPMENT_GUIDE.md              # À créer
├── DEPLOYMENT.md                     # À créer
└── STYLE_GUIDE.md                    # À créer
```

**Tâches :**
- [ ] Documenter toutes les API routes
- [ ] Créer guide de développement
- [ ] Documenter architecture des composants
- [ ] Ajouter diagrammes d'architecture
- [ ] Créer guide de contribution

### 4.3 Monitoring et Analytics

```typescript
// lib/monitoring/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})

// lib/analytics/events.ts
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  // Google Analytics, Mixpanel, etc.
}
```

**Tâches :**
- [ ] Ajouter Winston pour logging
- [ ] Intégrer Sentry pour error tracking
- [ ] Ajouter analytics (GA4, Plausible)
- [ ] Setup performance monitoring
- [ ] Ajouter health check endpoint

---

## Plan d'Exécution Recommandé

### Semaine 1-2 : Fondations Critiques
1. Migration Prisma (Phase 1.1)
2. Consolidation Auth (Phase 1.2)
3. Nettoyage dépendances (Phase 1.3)

### Semaine 3-4 : Architecture Backend
4. Validation avec Zod (Phase 2.1)
5. Gestion d'erreurs (Phase 2.2)
6. Standardisation API (Phase 2.3)
7. Middleware (Phase 2.4)

### Semaine 5-6 : Architecture Frontend
8. Refactoring composants (Phase 3.1)
9. State management (Phase 3.2)
10. Code splitting (Phase 3.3)
11. Server/Client components (Phase 3.4)

### Semaine 7-8 : Polish et Optimisation
12. Tests (Phase 4.1)
13. Documentation (Phase 4.2)
14. Monitoring (Phase 4.3)

---

## Métriques de Succès

### Backend
- ✅ 0 données en mémoire (100% Prisma)
- ✅ 1 seul système d'auth
- ✅ 100% validation avec Zod
- ✅ Temps de réponse API < 200ms (p95)
- ✅ Coverage de tests > 80%

### Frontend
- ✅ Taille moyenne fichier < 150 lignes
- ✅ Bundle size < 300KB (gzipped)
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ 0 duplications de code

### Code Quality
- ✅ 0 erreurs TypeScript
- ✅ 0 warnings ESLint
- ✅ A rating Lighthouse (>90)
- ✅ 0 vulnerabilités de sécurité

---

## Conclusion

Ce plan transforme le template d'un prototype en mémoire à une application production-ready avec:
- Architecture en couches propre
- Code maintenable et testable
- Performance optimisée
- Sécurité renforcée
- Expérience développeur améliorée

**Prochaine étape recommandée :** Commencer par la Phase 1 (Corrections Critiques) pour établir des fondations solides.
