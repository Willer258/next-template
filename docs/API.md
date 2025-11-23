# E-commerce & Inventory Management API Documentation

This document describes the API endpoints for the e-commerce platform and inventory management system.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently using session-based authentication. Include the following header in requests:

```
x-session-id: your-session-id
```

## Response Format

All API responses follow this structure:

```typescript
{
  success: boolean
  data?: any
  error?: string
  message?: string
}
```

For paginated responses:

```typescript
{
  data: Array<T>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

---

## Products API

### List Products

```http
GET /api/products
```

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `category` (string) - Filter by category
- `subcategory` (string) - Filter by subcategory
- `brand` (string) - Filter by brand
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `inStock` (boolean) - Show only in-stock items
- `status` (string) - Filter by status (active, draft, archived)
- `search` (string) - Search in name, description, SKU

**Example:**
```bash
curl "http://localhost:3000/api/products?page=1&limit=10&category=Electronics&inStock=true"
```

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Wireless Headphones Pro",
      "sku": "WHP-001",
      "price": 129.99,
      "stock": 45,
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Create Product

```http
POST /api/products
```

**Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "sku": "SKU-123",
  "price": 99.99,
  "compareAtPrice": 149.99,
  "category": "Electronics",
  "subcategory": "Audio",
  "brand": "TechCorp",
  "images": ["/path/to/image.jpg"],
  "stock": 100,
  "lowStockThreshold": 10,
  "tags": ["tag1", "tag2"]
}
```

### Get Product

```http
GET /api/products/[id]
```

### Update Product

```http
PUT /api/products/[id]
```

**Body:** Same as Create Product (partial updates allowed)

### Delete Product

```http
DELETE /api/products/[id]
```

---

## Inventory API

### List Inventory

```http
GET /api/inventory
```

**Query Parameters:**
- `lowStockOnly` (boolean) - Show only low stock items
- `warehouseId` (string) - Filter by warehouse
- `search` (string) - Search by SKU

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "productId": "1",
      "sku": "WHP-001",
      "quantity": 45,
      "reserved": 5,
      "available": 40,
      "location": "Warehouse A",
      "lowStockAlert": false
    }
  ]
}
```

### Update Inventory

```http
POST /api/inventory
```

**Body:**
```json
{
  "productId": "1",
  "quantity": 10,
  "type": "in",  // "in" | "out" | "adjustment"
  "reason": "Restocking",
  "reference": "PO-123"
}
```

**Types:**
- `in` - Add stock (receiving inventory)
- `out` - Remove stock (selling, damage, etc.)
- `adjustment` - Set absolute quantity

### Get Stock Movements

```http
GET /api/inventory/movements
```

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `productId` (string)
- `type` (string)
- `startDate` (ISO date)
- `endDate` (ISO date)

---

## Cart API

### Get Cart

```http
GET /api/cart
```

**Headers:**
```
x-session-id: your-session-id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "sessionId": "session-123",
    "items": [
      {
        "id": "1",
        "productId": "1",
        "name": "Product Name",
        "sku": "SKU-123",
        "price": 99.99,
        "quantity": 2,
        "image": "/image.jpg"
      }
    ],
    "subtotal": 199.98,
    "tax": 39.99,
    "shipping": 10.00,
    "total": 249.97,
    "currency": "EUR"
  }
}
```

### Add to Cart

```http
POST /api/cart
```

**Body:**
```json
{
  "productId": "1",
  "variantId": "1-red-large",
  "quantity": 1
}
```

### Update Cart Item

```http
PUT /api/cart
```

**Body:**
```json
{
  "itemId": "1",
  "quantity": 3
}
```

Set quantity to 0 to remove item.

### Clear Cart

```http
DELETE /api/cart
```

---

## Orders API

### List Orders

```http
GET /api/orders
```

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `status` (string) - pending, processing, shipped, delivered, cancelled
- `paymentStatus` (string) - pending, paid, failed, refunded
- `userId` (string)
- `startDate` (ISO date)
- `endDate` (ISO date)
- `search` (string) - Search order number, email, tracking number

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "orderNumber": "ORD-2025-0001",
      "email": "customer@example.com",
      "status": "delivered",
      "paymentStatus": "paid",
      "total": 155.99,
      "items": [...],
      "shippingAddress": {...},
      "trackingNumber": "TRK123456789",
      "createdAt": "2025-01-10T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

### Create Order

```http
POST /api/orders
```

**Body:**
```json
{
  "items": [...],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Main St",
    "city": "Paris",
    "state": "Île-de-France",
    "postalCode": "75001",
    "country": "France",
    "phone": "+33 1 23 45 67 89"
  },
  "billingAddress": {...},
  "paymentMethod": {
    "type": "credit_card",
    "last4": "4242",
    "brand": "Visa"
  },
  "shippingMethod": "standard",
  "notes": "Optional notes"
}
```

### Get Order

```http
GET /api/orders/[id]
```

You can use either order ID or order number.

### Update Order Status

```http
PATCH /api/orders/[id]
```

**Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRK123456789"
}
```

### Cancel Order

```http
DELETE /api/orders/[id]
```

Only pending and processing orders can be cancelled.

---

## Checkout API

### Get Checkout Session

```http
GET /api/checkout
```

**Headers:**
```
x-session-id: your-session-id
```

### Update Checkout Session

```http
POST /api/checkout
```

**Body (Step 1 - Shipping):**
```json
{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Main St",
    "city": "Paris",
    "state": "Île-de-France",
    "postalCode": "75001",
    "country": "France",
    "phone": "+33 1 23 45 67 89"
  },
  "sameAsShipping": true
}
```

**Body (Step 2 - Payment):**
```json
{
  "paymentMethod": {
    "type": "credit_card",
    "last4": "4242",
    "brand": "Visa"
  },
  "shippingMethod": "standard"
}
```

### Complete Checkout

```http
POST /api/checkout/complete
```

Creates the order, processes payment, reserves inventory, and clears the cart.

**Response:**
```json
{
  "success": true,
  "data": {
    "order": {...},
    "message": "Order ORD-2025-0001 created successfully"
  }
}
```

### Clear Checkout Session

```http
DELETE /api/checkout
```

---

## Error Codes

- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `402` - Payment Required (payment failed)
- `404` - Not Found
- `409` - Conflict (duplicate SKU, etc.)
- `410` - Gone (session expired)
- `500` - Internal Server Error

---

## Notes

### Current Implementation

This is a prototype implementation using in-memory storage. For production:

1. **Database Integration**: Replace in-memory arrays with database queries (PostgreSQL, MongoDB, etc.)
2. **Authentication**: Implement proper user authentication (JWT, OAuth, etc.)
3. **Payment Processing**: Integrate with Stripe, PayPal, or other payment gateways
4. **Email Notifications**: Set up transactional emails (SendGrid, Mailgun, etc.)
5. **Inventory Reservations**: Implement proper inventory locking mechanisms
6. **Rate Limiting**: Add rate limiting to prevent abuse
7. **Logging**: Implement comprehensive logging
8. **Webhooks**: Add webhook support for payment confirmations
9. **Search**: Integrate with Elasticsearch or similar for better search
10. **Caching**: Add Redis for session and cart management

### Best Practices

- Always validate input data
- Use transactions for critical operations (order creation, inventory updates)
- Implement idempotency keys for payment operations
- Log all inventory movements for audit trails
- Use optimistic locking for inventory updates
- Implement retry mechanisms for failed operations
- Monitor API performance and errors

---

## Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints.

Example with curl:

```bash
# Get products
curl -X GET "http://localhost:3000/api/products?page=1&limit=10"

# Create product
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","sku":"TEST-001","price":99.99,"stock":10,"category":"Test"}'

# Add to cart
curl -X POST "http://localhost:3000/api/cart" \
  -H "Content-Type: application/json" \
  -H "x-session-id: test-session" \
  -d '{"productId":"1","quantity":2}'
```
