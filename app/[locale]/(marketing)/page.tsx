import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Check, Zap, Shield, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container flex min-h-[80vh] flex-col items-center justify-center py-20 text-center">
        <Badge className="mb-4" variant="secondary">
          🎉 Now in Beta - Try it for free
        </Badge>
        <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Build your SaaS app in <span className="text-primary">days, not months</span>
        </h1>
        <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
          A complete, production-ready Next.js SaaS template with authentication, payments, teams,
          and everything you need to launch fast.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/features">View Features</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required • Free 14-day trial
        </p>
      </section>

      {/* Features Grid */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, out of the box
          </h2>
          <p className="text-xl text-muted-foreground">
            Stop building infrastructure, start building features
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <Zap className="h-6 w-6" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built on Next.js 15 with server components for instant page loads and optimal performance
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                OAuth authentication, RBAC, encryption, and security best practices built-in
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Team-Ready</CardTitle>
              <CardDescription>
                Multi-tenancy, organizations, invitations, and role-based permissions included
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="mb-2 text-4xl font-bold">10k+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">4.9/5</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Included Features */}
      <section className="container py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What&apos;s included
            </h2>
            <p className="text-xl text-muted-foreground">
              A complete foundation for your SaaS
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Authentication & OAuth',
              'User Management',
              'Team & Organizations',
              'Role-Based Access Control',
              'Stripe Integration',
              'Multi-Language Support',
              'Dark Mode',
              'Admin Dashboard',
              'Analytics & Charts',
              'Email Templates',
              'API Documentation',
              'TypeScript & Type Safety',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join thousands of developers building with our platform
          </p>
          <Button asChild size="lg">
            <Link href="/pricing">
              View Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
