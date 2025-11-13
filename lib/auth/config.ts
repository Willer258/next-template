import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/db/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'database' as const,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      if (session.user) {
        session.user.id = user.id
        // Fetch user's organizations and role
        const memberships = await prisma.membership.findMany({
          where: { userId: user.id },
          include: { organization: true },
        })

        // Add organizations to session
        session.user.organizations = memberships.map((m: any) => ({
          id: m.organization.id,
          name: m.organization.name,
          slug: m.organization.slug,
          role: m.role,
        }))
      }
      return session
    },
  },
  events: {
    async signIn(message: { user: any; account?: any; profile?: any }) {
      // Log sign-in event
      await prisma.event.create({
        data: {
          type: 'auth',
          action: 'sign_in',
          userId: message.user.id,
          metadata: {
            provider: message.account?.provider,
          },
        },
      })
    },
  },
}
