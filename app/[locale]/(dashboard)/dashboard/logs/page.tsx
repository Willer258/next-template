"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Search, AlertCircle, Info, AlertTriangle, CheckCircle, Download, Filter } from 'lucide-react'

interface Log {
  id: number
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  user: string
  action: string
  details: string
  ip?: string
}

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('all')

  const [logs, setLogs] = useState<Log[]>([
    {
      id: 1,
      timestamp: '2025-01-14 10:23:15',
      level: 'info',
      user: 'admin@example.com',
      action: 'User Login',
      details: 'Successful login from dashboard',
      ip: '192.168.1.1'
    },
    {
      id: 2,
      timestamp: '2025-01-14 10:20:42',
      level: 'success',
      user: 'john@example.com',
      action: 'Order Created',
      details: 'New order ORD-2024-1241 created',
      ip: '192.168.1.5'
    },
    {
      id: 3,
      timestamp: '2025-01-14 10:15:30',
      level: 'warning',
      user: 'system',
      action: 'Low Stock Alert',
      details: 'Product "Wireless Mouse" stock below threshold',
    },
    {
      id: 4,
      timestamp: '2025-01-14 09:58:12',
      level: 'error',
      user: 'api@service.com',
      action: 'API Request Failed',
      details: 'Payment gateway timeout - Order ORD-2024-1240',
      ip: '10.0.0.5'
    },
    {
      id: 5,
      timestamp: '2025-01-14 09:45:20',
      level: 'info',
      user: 'marie@example.com',
      action: 'Profile Updated',
      details: 'User profile information changed',
      ip: '192.168.1.10'
    },
    {
      id: 6,
      timestamp: '2025-01-14 09:30:55',
      level: 'success',
      user: 'admin@example.com',
      action: 'Backup Completed',
      details: 'Daily database backup successful',
    },
    {
      id: 7,
      timestamp: '2025-01-14 09:12:33',
      level: 'warning',
      user: 'system',
      action: 'High CPU Usage',
      details: 'Server CPU usage exceeded 80%',
    },
    {
      id: 8,
      timestamp: '2025-01-14 08:55:48',
      level: 'info',
      user: 'pierre@example.com',
      action: 'Document Uploaded',
      details: 'New file "invoice.pdf" uploaded',
      ip: '192.168.1.8'
    },
    {
      id: 9,
      timestamp: '2025-01-14 08:42:15',
      level: 'error',
      user: 'system',
      action: 'Email Delivery Failed',
      details: 'Unable to send notification email to user@example.com',
    },
    {
      id: 10,
      timestamp: '2025-01-14 08:30:00',
      level: 'success',
      user: 'system',
      action: 'Scheduled Task',
      details: 'Daily report generation completed',
    },
    {
      id: 11,
      timestamp: '2025-01-14 08:15:22',
      level: 'info',
      user: 'sophie@example.com',
      action: 'Password Changed',
      details: 'User password updated successfully',
      ip: '192.168.1.12'
    },
    {
      id: 12,
      timestamp: '2025-01-14 07:58:40',
      level: 'warning',
      user: 'system',
      action: 'Failed Login Attempt',
      details: '3 failed login attempts from IP 203.0.113.42',
      ip: '203.0.113.42'
    },
  ])

  const getLogBadge = (level: Log['level']) => {
    const variants = {
      info: { variant: 'secondary' as const, label: 'Info', icon: Info, color: 'text-blue-500' },
      warning: { variant: 'outline' as const, label: 'Warning', icon: AlertTriangle, color: 'text-yellow-500' },
      error: { variant: 'destructive' as const, label: 'Error', icon: AlertCircle, color: 'text-red-500' },
      success: { variant: 'default' as const, label: 'Success', icon: CheckCircle, color: 'text-green-500' }
    }
    return variants[level]
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = filterLevel === 'all' || log.level === filterLevel

    return matchesSearch && matchesLevel
  })

  const stats = {
    total: logs.length,
    info: logs.filter(l => l.level === 'info').length,
    warning: logs.filter(l => l.level === 'warning').length,
    error: logs.filter(l => l.level === 'error').length,
    success: logs.filter(l => l.level === 'success').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            System Logs
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor system activities and events
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Info</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.info}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Information logs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.success}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successful operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.warning}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Warning events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.error}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Error events
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>View all system activities and events</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const logInfo = getLogBadge(log.level)
                const LogIcon = logInfo.icon
                return (
                  <TableRow
                    key={log.id}
                    className="hover:bg-accent/50 transition-colors animate-in fade-in duration-300"
                  >
                    <TableCell>
                      <code className="text-xs">{log.timestamp}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <LogIcon className={`h-4 w-4 ${logInfo.color}`} />
                        <Badge variant={logInfo.variant}>
                          {logInfo.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{log.user}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{log.action}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{log.details}</span>
                    </TableCell>
                    <TableCell>
                      {log.ip ? (
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {log.ip}
                        </code>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
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
