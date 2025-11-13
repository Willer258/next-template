import { Role } from '@prisma/client'

export const permissions = {
  OWNER: ['*'],
  ADMIN: [
    'org:read',
    'org:update',
    'members:read',
    'members:create',
    'members:update',
    'members:delete',
    'billing:read',
    'billing:update',
    'settings:read',
    'settings:update',
  ],
  MEMBER: [
    'org:read',
    'members:read',
    'settings:read',
  ],
  VIEWER: [
    'org:read',
  ],
}

export function hasPermission(role: Role, permission: string): boolean {
  const rolePermissions = permissions[role]

  if (rolePermissions.includes('*')) {
    return true
  }

  return rolePermissions.includes(permission)
}

export function requireRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole)
}
