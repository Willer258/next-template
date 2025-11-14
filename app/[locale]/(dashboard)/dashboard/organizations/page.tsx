"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Plus, Search, Users, MapPin, Mail, Phone, Globe, Edit, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Organization {
  id: number
  name: string
  industry: string
  employees: number
  status: 'active' | 'inactive' | 'pending'
  location: string
  email: string
  phone: string
  website?: string
  revenue?: string
}

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      employees: 250,
      status: 'active',
      location: 'Paris, France',
      email: 'contact@techcorp.com',
      phone: '+33 1 23 45 67 89',
      website: 'www.techcorp.com',
      revenue: '€5M'
    },
    {
      id: 2,
      name: 'DesignHub Studio',
      industry: 'Design',
      employees: 45,
      status: 'active',
      location: 'Lyon, France',
      email: 'hello@designhub.com',
      phone: '+33 4 12 34 56 78',
      website: 'www.designhub.com',
      revenue: '€1.2M'
    },
    {
      id: 3,
      name: 'Finance Plus',
      industry: 'Finance',
      employees: 120,
      status: 'active',
      location: 'Marseille, France',
      email: 'info@financeplus.com',
      phone: '+33 4 91 12 34 56',
      revenue: '€3.5M'
    },
    {
      id: 4,
      name: 'Green Energy Co',
      industry: 'Energy',
      employees: 80,
      status: 'pending',
      location: 'Bordeaux, France',
      email: 'contact@greenenergy.com',
      phone: '+33 5 56 12 34 56',
      website: 'www.greenenergy.com',
      revenue: '€2.1M'
    },
    {
      id: 5,
      name: 'HealthCare Systems',
      industry: 'Healthcare',
      employees: 300,
      status: 'inactive',
      location: 'Toulouse, France',
      email: 'support@healthcare.com',
      phone: '+33 5 61 12 34 56',
      revenue: '€8M'
    },
  ])

  const getStatusBadge = (status: Organization['status']) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      inactive: { variant: 'secondary' as const, label: 'Inactive' },
      pending: { variant: 'outline' as const, label: 'Pending' }
    }
    return variants[status]
  }

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: organizations.length,
    active: organizations.filter(o => o.status === 'active').length,
    pending: organizations.filter(o => o.status === 'pending').length,
    totalEmployees: organizations.reduce((sum, o) => sum + o.employees, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Organizations
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage companies and business entities
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>
                Add a new organization to your system
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" placeholder="Company name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input id="employees" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Input id="revenue" placeholder="€0M" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+33 1 23 45 67 89" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input id="website" placeholder="www.example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Company description..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Organization</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all industries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge className="bg-green-500">{stats.active}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge variant="outline">{stats.pending}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Combined workforce
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Organizations List</CardTitle>
              <CardDescription>Manage all registered organizations</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
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
                <TableHead>Organization</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org, index) => (
                <motion.tr
                  key={org.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-accent/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {org.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.industry}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {org.employees}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {org.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{org.revenue}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(org.status).variant}>
                      {getStatusBadge(org.status).label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
