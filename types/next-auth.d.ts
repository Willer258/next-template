import { Role } from '@prisma/client'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      organizations?: {
        id: string
        name: string
        slug: string
        role: Role
      }[]
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}
