import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Shield,
  Zap,
  BarChart3,
  Globe,
  Lock,
  Boxes,
  Palette,
  Code,
  Cloud,
  Workflow,
  Bell,
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with built-in collaboration tools, real-time updates, and role-based access control.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-level encryption, SOC 2 compliance, and advanced security features to keep your data safe.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on modern infrastructure for blazing fast performance. Edge caching ensures instant load times globally.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description:
      'Gain insights with comprehensive analytics, custom dashboards, and exportable reports.',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description:
      'Built-in internationalization with support for multiple languages and locales out of the box.',
  },
  {
    icon: Lock,
    title: 'OAuth Integration',
    description:
      'Secure authentication with GitHub, Google, and other OAuth providers. Single sign-on ready.',
  },
  {
    icon: Boxes,
    title: 'Modular Architecture',
    description:
      'Clean, extensible codebase built with modern patterns. Easy to customize and extend.',
  },
  {
    icon: Palette,
    title: 'Beautiful UI',
    description:
      'Professionally designed interface with dark mode, customizable themes, and accessible components.',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description:
      'RESTful API, webhooks, comprehensive documentation, and SDKs for popular languages.',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description:
      'Deployed on modern cloud infrastructure with auto-scaling, zero-downtime deployments, and 99.9% uptime.',
  },
  {
    icon: Workflow,
    title: 'Automation',
    description:
      'Automate repetitive tasks with workflows, integrations, and custom triggers.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Stay informed with intelligent notifications via email, Slack, or webhooks.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-4">Features</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Everything you need to succeed
        </h1>
        <p className="text-xl text-muted-foreground">
          A complete platform with all the features you need to build, manage, and scale your SaaS application.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <div className="mt-20">
        <div className="rounded-lg border bg-muted/50 p-8">
          <h2 className="mb-4 text-center text-2xl font-bold">
            And much more...
          </h2>
          <p className="mx-auto max-w-2xl text-center text-muted-foreground">
            Our platform includes countless additional features like custom domains, advanced search, file uploads, PDF generation, email templates, audit logs, and more. We&apos;re constantly adding new capabilities based on customer feedback.
          </p>
        </div>
      </div>
    </div>
  )
}
