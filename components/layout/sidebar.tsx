'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  CreditCard,
  BarChart3,
  FileText,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Organizations',
    href: '/dashboard/organizations',
    icon: Building2,
  },
  {
    title: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
  {
    title: 'Logs',
    href: '/dashboard/logs',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Dashboard</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
