"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  CreditCard,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  LogOut,
  User,
  HelpCircle,
  Zap,
  ShoppingBag,
  Mail,
  Calendar,
  Folder,
  Archive,
  Trash2,
  Star,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MenuItem {
  title: string
  href?: string
  icon: any
  badge?: string | number
  items?: MenuItem[]
}

const menuGroups = [
  {
    title: 'Général',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        badge: 'New',
      },
      {
        title: 'Analytics',
        href: '/dashboard/analytics',
        icon: BarChart3,
      },
      {
        title: 'Calendar',
        href: '/dashboard/calendar',
        icon: Calendar,
        badge: 3,
      },
    ],
  },
  {
    title: 'Gestion',
    items: [
      {
        title: 'Users',
        href: '/dashboard/users',
        icon: Users,
        badge: 12,
      },
      {
        title: 'Organizations',
        href: '/dashboard/organizations',
        icon: Building2,
      },
      {
        title: 'Projects',
        icon: Folder,
        items: [
          { title: 'All Projects', href: '/dashboard/projects', icon: Folder },
          { title: 'Active', href: '/dashboard/projects/active', icon: Star },
          { title: 'Archived', href: '/dashboard/projects/archived', icon: Archive },
        ],
      },
    ],
  },
  {
    title: 'E-commerce',
    items: [
      {
        title: 'Products',
        href: '/dashboard/products',
        icon: ShoppingBag,
      },
      {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: FileText,
        badge: 5,
      },
    ],
  },
  {
    title: 'Système',
    items: [
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
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Général', 'Gestion'])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev =>
      prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]
    )
  }

  const NavItem = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
    const hasChildren = item.items && item.items.length > 0
    const [isExpanded, setIsExpanded] = useState(false)

    if (hasChildren) {
      return (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
              'text-muted-foreground',
              depth > 0 && 'ml-4'
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </>
            )}
          </button>
          <AnimatePresence>
            {isExpanded && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {item.items?.map((subItem, i) => (
                  <NavItem key={i} item={subItem} depth={depth + 1} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    const content = (
      <Link
        href={item.href!}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
          isActive
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'hover:bg-accent text-muted-foreground hover:text-foreground',
          depth > 0 && 'ml-4'
        )}
      >
        <item.icon className="h-4 w-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <Badge
                variant={isActive ? 'secondary' : 'outline'}
                className="ml-auto"
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    )

    if (collapsed) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return content
  }

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 280 }}
      className="flex h-full flex-col border-r bg-card/50 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              YourBrand
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="shrink-0"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-6 py-4">
          {menuGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  {expandedGroups.includes(group.title) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                  {group.title}
                </button>
              )}
              <AnimatePresence>
                {(collapsed || expandedGroups.includes(group.title)) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1"
                  >
                    {group.items.map((item, i) => (
                      <NavItem key={i} item={item} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        {!collapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary mx-auto">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>John Doe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </motion.div>
  )
}
