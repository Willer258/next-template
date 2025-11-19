import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, InventoryItem, StockMovement, UpdateInventoryRequest } from '@/types/api'

// In-memory storage (replace with database in production)
let inventory: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    sku: 'WHP-001',
    quantity: 45,
    reserved: 5,
    available: 40,
    location: 'Warehouse A',
    warehouseId: 'WH-001',
    lowStockAlert: false,
  },
  {
    id: '2',
    productId: '2',
    sku: 'SWU-002',
    quantity: 12,
    reserved: 2,
    available: 10,
    location: 'Warehouse A',
    warehouseId: 'WH-001',
    lowStockAlert: true,
  },
]

let stockMovements: StockMovement[] = []

// GET /api/inventory - Get all inventory items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lowStockOnly = searchParams.get('lowStockOnly') === 'true'
    const warehouseId = searchParams.get('warehouseId')
    const search = searchParams.get('search')

    let filteredInventory = [...inventory]

    if (lowStockOnly) {
      filteredInventory = filteredInventory.filter(item => item.lowStockAlert)
    }

    if (warehouseId) {
      filteredInventory = filteredInventory.filter(item => item.warehouseId === warehouseId)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredInventory = filteredInventory.filter(item =>
        item.sku.toLowerCase().includes(searchLower)
      )
    }

    const response: ApiResponse<InventoryItem[]> = {
      success: true,
      data: filteredInventory,
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch inventory',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/inventory - Update inventory (stock movement)
export async function POST(request: NextRequest) {
  try {
    const body: UpdateInventoryRequest = await request.json()

    // Validation
    if (!body.productId || !body.quantity || !body.type || !body.reason) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Missing required fields: productId, quantity, type, reason',
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const inventoryItem = inventory.find(item => item.productId === body.productId)

    if (!inventoryItem) {
      const errorResponse: ApiResponse = {
        success: false,
        error: 'Inventory item not found',
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const previousQuantity = inventoryItem.quantity
    let newQuantity = previousQuantity

    // Calculate new quantity based on movement type
    switch (body.type) {
      case 'in':
        newQuantity = previousQuantity + body.quantity
        break
      case 'out':
        if (previousQuantity < body.quantity) {
          const errorResponse: ApiResponse = {
            success: false,
            error: 'Insufficient stock',
          }
          return NextResponse.json(errorResponse, { status: 400 })
        }
        newQuantity = previousQuantity - body.quantity
        break
      case 'adjustment':
        newQuantity = body.quantity
        break
    }

    // Update inventory
    inventoryItem.quantity = newQuantity
    inventoryItem.available = newQuantity - inventoryItem.reserved

    // Create stock movement record
    const movement: StockMovement = {
      id: String(Date.now()),
      productId: body.productId,
      sku: inventoryItem.sku,
      type: body.type,
      quantity: body.quantity,
      previousQuantity,
      newQuantity,
      reason: body.reason,
      reference: body.reference,
      userId: 'system', // Would come from auth in production
      createdAt: new Date().toISOString(),
    }

    stockMovements.push(movement)

    const response: ApiResponse<{
      inventory: InventoryItem
      movement: StockMovement
    }> = {
      success: true,
      data: {
        inventory: inventoryItem,
        movement,
      },
      message: 'Inventory updated successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update inventory',
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
