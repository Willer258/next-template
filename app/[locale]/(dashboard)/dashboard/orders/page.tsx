"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FileText, Search, Package, Clock, CheckCircle, XCircle, Eye, Download, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface Order {
  id: string
  customer: string
  email: string
  products: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  paymentMethod: string
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-1234',
      customer: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      products: 3,
      total: 299.97,
      status: 'delivered',
      date: '2025-01-10',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-2024-1235',
      customer: 'Marie Martin',
      email: 'marie.martin@email.com',
      products: 1,
      total: 549.99,
      status: 'shipped',
      date: '2025-01-12',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-2024-1236',
      customer: 'Pierre Bernard',
      email: 'pierre.bernard@email.com',
      products: 5,
      total: 424.95,
      status: 'processing',
      date: '2025-01-13',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-2024-1237',
      customer: 'Sophie Dubois',
      email: 'sophie.dubois@email.com',
      products: 2,
      total: 179.98,
      status: 'pending',
      date: '2025-01-14',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'ORD-2024-1238',
      customer: 'Luc Laurent',
      email: 'luc.laurent@email.com',
      products: 1,
      total: 129.99,
      status: 'delivered',
      date: '2025-01-08',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-2024-1239',
      customer: 'Emma Petit',
      email: 'emma.petit@email.com',
      products: 4,
      total: 339.96,
      status: 'cancelled',
      date: '2025-01-09',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-2024-1240',
      customer: 'Thomas Roux',
      email: 'thomas.roux@email.com',
      products: 2,
      total: 699.98,
      status: 'shipped',
      date: '2025-01-11',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-2024-1241',
      customer: 'Camille Moreau',
      email: 'camille.moreau@email.com',
      products: 3,
      total: 239.97,
      status: 'processing',
      date: '2025-01-13',
      paymentMethod: 'Credit Card'
    },
  ])

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: { variant: 'outline' as const, label: 'Pending', icon: Clock, color: 'text-yellow-500' },
      processing: { variant: 'secondary' as const, label: 'Processing', icon: Package, color: 'text-blue-500' },
      shipped: { variant: 'default' as const, label: 'Shipped', icon: TrendingUp, color: 'text-purple-500' },
      delivered: { variant: 'default' as const, label: 'Delivered', icon: CheckCircle, color: 'text-green-500' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled', icon: XCircle, color: 'text-red-500' }
    }
    return variants[status]
  }

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage customer orders
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge variant="outline" className="text-yellow-500">{stats.pending}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.processing}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Being prepared
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.shipped}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In transit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total sales
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                View and manage all customer orders
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order, index) => {
                const statusInfo = getStatusBadge(order.status)
                const StatusIcon = statusInfo.icon
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <code className="text-xs font-semibold">
                          {order.id}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {order.products} item{order.products > 1 ? 's' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">€{order.total.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{order.paymentMethod}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(order.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                              {order.id} - Placed on {new Date(order.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Customer</h4>
                                <p className="text-sm">{order.customer}</p>
                                <p className="text-xs text-muted-foreground">{order.email}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Payment Method</h4>
                                <p className="text-sm">{order.paymentMethod}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Total Amount</h4>
                                <p className="text-lg font-bold">€{order.total.toFixed(2)}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Status</h4>
                                <div className="flex items-center gap-2">
                                  <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                                  <Badge variant={statusInfo.variant}>
                                    {statusInfo.label}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Order Items</h4>
                              <p className="text-sm text-muted-foreground">
                                {order.products} product{order.products > 1 ? 's' : ''} in this order
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline">Update Status</Button>
                            <Button>Send Invoice</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </motion.tr>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
