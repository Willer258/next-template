"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreditCard, Download, Plus, CheckCircle, XCircle, Clock, TrendingUp, Wallet } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  description: string
  dueDate: string
}

interface PaymentMethod {
  id: number
  type: 'credit-card' | 'paypal' | 'bank'
  last4?: string
  brand?: string
  email?: string
  isDefault: boolean
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-2025-001',
      date: '2025-01-01',
      amount: 299.00,
      status: 'paid',
      description: 'Monthly subscription - Pro Plan',
      dueDate: '2025-01-15'
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-01',
      amount: 299.00,
      status: 'paid',
      description: 'Monthly subscription - Pro Plan',
      dueDate: '2024-12-15'
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-01',
      amount: 299.00,
      status: 'paid',
      description: 'Monthly subscription - Pro Plan',
      dueDate: '2024-11-15'
    },
    {
      id: 'INV-2025-002',
      date: '2025-02-01',
      amount: 299.00,
      status: 'pending',
      description: 'Monthly subscription - Pro Plan',
      dueDate: '2025-02-15'
    },
  ])

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'credit-card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'paypal',
      email: 'john@example.com',
      isDefault: false
    },
  ])

  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      paid: { variant: 'default' as const, label: 'Paid', icon: CheckCircle, color: 'text-green-500' },
      pending: { variant: 'secondary' as const, label: 'Pending', icon: Clock, color: 'text-yellow-500' },
      overdue: { variant: 'destructive' as const, label: 'Overdue', icon: XCircle, color: 'text-red-500' },
      cancelled: { variant: 'outline' as const, label: 'Cancelled', icon: XCircle, color: 'text-gray-500' }
    }
    return variants[status]
  }

  const stats = {
    totalSpent: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    pendingAmount: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0),
    paidInvoices: invoices.filter(i => i.status === 'paid').length,
    pendingInvoices: invoices.filter(i => i.status === 'pending').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Billing & Payments
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscriptions and payment methods
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">€{stats.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.paidInvoices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully paid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active methods
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </div>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Pro Plan</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">€299.00</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <Button>Upgrade Plan</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium">February 1, 2025</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Billing cycle</span>
                <span className="font-medium">Monthly</span>
              </div>
            </div>
            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold text-sm">Plan Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Unlimited projects
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Custom integrations
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new payment method to your account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Payment Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Payment Method</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="animate-in fade-in slide-in-from-left-3 duration-500"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                          {method.type === 'credit-card' && <CreditCard className="h-5 w-5 text-white" />}
                          {method.type === 'paypal' && <Wallet className="h-5 w-5 text-white" />}
                          {method.type === 'bank' && <TrendingUp className="h-5 w-5 text-white" />}
                        </div>
                        <div>
                          {method.type === 'credit-card' && (
                            <>
                              <p className="font-medium">{method.brand} •••• {method.last4}</p>
                              <p className="text-xs text-muted-foreground">Credit Card</p>
                            </>
                          )}
                          {method.type === 'paypal' && (
                            <>
                              <p className="font-medium">{method.email}</p>
                              <p className="text-xs text-muted-foreground">PayPal</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const statusInfo = getStatusBadge(invoice.status)
                const StatusIcon = statusInfo.icon
                return (
                  <TableRow
                    key={invoice.id}
                    className="hover:bg-accent/50 transition-colors animate-in fade-in duration-300"
                  >
                    <TableCell>
                      <code className="text-xs font-semibold">{invoice.id}</code>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{invoice.description}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">€{invoice.amount.toFixed(2)}</span>
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
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
