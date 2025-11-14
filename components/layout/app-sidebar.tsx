"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  CreditCard,
  BarChart3,
  FileText,
  Search,
  LogOut,
  User,
  HelpCircle,
  Zap,
  ShoppingBag,
  Calendar,
  Folder,
  Archive,
  Star,
  ChevronRight,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

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

export function AppSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState('')

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 group-data-[collapsible=icon]:mx-auto">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">
            YourBrand
          </span>
        </div>
        <div className="relative group-data-[collapsible=icon]:hidden">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <SidebarInput
            placeholder="Search..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const hasChildren = 'items' in item && item.items && item.items.length > 0
                  const isActive = Boolean(item.href && (pathname === item.href || pathname?.startsWith(item.href + '/')))

                  if (hasChildren) {
                    return (
                      <Collapsible key={item.title} asChild defaultOpen={false}>
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => {
                                const isSubActive =
                                  pathname === subItem.href || pathname?.startsWith(subItem.href + '/')
                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild isActive={isSubActive}>
                                      <Link href={subItem.href!}>
                                        <subItem.icon />
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link href={item.href!}>
                          <item.icon />
                          <span>{item.title}</span>
                          {item.badge && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg border-2 border-primary">
                    <AvatarImage src="/avatar.jpg" alt="John Doe" />
                    <AvatarFallback className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">John Doe</span>
                    <span className="truncate text-xs text-muted-foreground">john@example.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg border-2 border-primary">
                      <AvatarImage src="/avatar.jpg" alt="John Doe" />
                      <AvatarFallback className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs text-muted-foreground">john@example.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
