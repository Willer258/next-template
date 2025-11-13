# Next Steps - Development Guide

Ce template est maintenant **beaucoup plus avancé** avec des modules complets et fonctionnels. Voici les prochaines étapes pour le rendre production-ready.

## 🔴 Priorité Haute - Fonctionnement de base

### 1. Configuration des bases de données
```bash
# PostgreSQL
# Créer une base de données et configurer DATABASE_URL dans .env
pnpm db:migrate
pnpm db:generate

# MongoDB (optionnel mais recommandé pour les logs)
# Configurer MONGODB_URI dans .env
```

### 2. Configuration OAuth
- [ ] Créer une app OAuth sur GitHub (https://github.com/settings/developers)
- [ ] Créer une app OAuth sur Google Cloud Console
- [ ] Ajouter les clés dans `.env`:
  ```
  GITHUB_ID=...
  GITHUB_SECRET=...
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  ```
- [ ] Configurer les URLs de callback autorisées

### 3. Connexion des données réelles

#### Module Users
```typescript
// Remplacer dans app/[locale]/(dashboard)/dashboard/users/page.tsx
import { prisma } from '@/lib/db/prisma'

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      memberships: {
        include: {
          organization: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return <UsersTable data={users} />
}
```

#### Module Analytics
- [ ] Connecter les données réelles depuis Prisma
- [ ] Implémenter les calculs d'agrégation
- [ ] Ajouter le caching avec TanStack Query

## 🟡 Priorité Moyenne - Fonctionnalités avancées

### 4. Formulaires avec validation
```bash
pnpm add react-hook-form @hookform/resolvers zod
```

Exemple d'implémentation:
```typescript
// components/forms/user-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'VIEWER'])
})

export function UserForm() {
  const form = useForm({
    resolver: zodResolver(userSchema)
  })

  // ...
}
```

### 5. Server Actions pour les mutations
```typescript
// lib/server/users.ts
'use server'

import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function createUser(data: unknown) {
  const validated = userSchema.parse(data)

  const user = await prisma.user.create({
    data: validated
  })

  revalidatePath('/dashboard/users')
  return user
}
```

### 6. Intégration Stripe
- [ ] Configurer Stripe (clés dans `.env`)
- [ ] Créer les produits et prix dans Stripe Dashboard
- [ ] Implémenter les webhooks
- [ ] Créer la page `/dashboard/billing`

```typescript
// app/[locale]/(dashboard)/dashboard/billing/page.tsx
import { stripe } from '@/lib/stripe'
import { requireAuth } from '@/lib/auth/session'

export default async function BillingPage() {
  const user = await requireAuth()
  // Fetch subscription from Stripe
  // Display billing portal link
}
```

### 7. Module Organizations
- [ ] Page de liste des organisations
- [ ] Inviter des membres
- [ ] Gérer les rôles
- [ ] Transfert de propriété

### 8. Logs & Audit Trail
```typescript
// app/[locale]/(dashboard)/dashboard/logs/page.tsx
import { connectMongo } from '@/lib/db/mongoose'
import { ActivityModel } from '@/lib/models/activity'

export default async function LogsPage() {
  await connectMongo()
  const logs = await ActivityModel
    .find()
    .sort({ createdAt: -1 })
    .limit(100)

  return <LogsTable data={logs} />
}
```

## 🟢 Priorité Basse - Polish & Optimisation

### 9. Animations Framer Motion
```typescript
// components/animated-page.tsx
'use client'

import { motion } from 'framer-motion'

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### 10. Configuration Email (Resend)
```typescript
// lib/email/templates.tsx
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to,
    subject: 'Welcome to SaaS Dashboard',
    html: `<h1>Hello ${name}!</h1>`
  })
}
```

### 11. Tests
```typescript
// tests/unit/utils.test.ts
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('merges classes correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })
})
```

### 12. CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

### 13. Security Headers
```typescript
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}
```

### 14. Blog avec MDX
```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
```

### 15. Search fonctionnalité
- [ ] Implémenter la recherche globale dans la navbar
- [ ] Ajouter Algolia ou recherche locale
- [ ] Keyboard shortcuts (Cmd+K)

## 📋 Checklist complète

### Core Features
- [x] Authentication UI
- [ ] Authentication backend connection
- [x] User Management UI
- [ ] User Management backend
- [x] Analytics UI
- [ ] Analytics real data
- [x] Settings UI
- [ ] Settings backend
- [ ] Organizations module
- [ ] Billing module
- [ ] Logs viewer

### Marketing
- [x] Homepage
- [x] Features page
- [x] Pricing page
- [ ] Blog
- [ ] Contact form
- [ ] Legal pages (Terms, Privacy)

### Technical
- [ ] Database seeding script
- [ ] Email templates
- [ ] Webhook handlers
- [ ] API documentation
- [ ] Rate limiting
- [ ] Error tracking (Sentry)
- [ ] Analytics (Vercel/Plausible)

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Load testing

### DevOps
- [ ] Environment variables documentation
- [ ] Deployment guide
- [ ] Monitoring setup
- [ ] Backup strategy
- [ ] Incident response plan

## 🎯 Roadmap suggérée

### Sprint 1 (Semaine 1-2): MVP
1. Configuration bases de données
2. OAuth fonctionnel
3. CRUD Users avec données réelles
4. Formulaires avec validation
5. Deploy sur Vercel/Netlify

### Sprint 2 (Semaine 3-4): Core Features
1. Module Organizations
2. Invitations d'équipe
3. RBAC enforcement
4. Intégration Stripe basique
5. Page Billing

### Sprint 3 (Semaine 5-6): Advanced
1. Webhooks Stripe
2. Emails transactionnels
3. Logs & Audit
4. Analytics réelles
5. Animations

### Sprint 4 (Semaine 7-8): Polish
1. Tests E2E
2. Documentation API
3. Blog MDX
4. Performance optimization
5. Security audit

## 📚 Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://prisma.io/docs
- TanStack Table: https://tanstack.com/table
- Recharts: https://recharts.org
- shadcn/ui: https://ui.shadcn.com

### Tutoriels
- NextAuth.js avec Prisma: https://authjs.dev
- Stripe avec Next.js: https://stripe.com/docs/stripe-js
- TanStack Query: https://tanstack.com/query

### Outils
- Prisma Studio: `pnpm prisma studio`
- React Query Devtools: Installer `@tanstack/react-query-devtools`
- Stripe CLI: https://stripe.com/docs/stripe-cli

---

**Status actuel**: 🟢 Frontend 80% complete, Backend 30% complete
**Temps estimé pour MVP**: 2-3 semaines avec 1 développeur
**Prêt pour**: Demos, prototypes, développement rapide
