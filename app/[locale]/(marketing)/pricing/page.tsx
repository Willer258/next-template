import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out our platform',
    features: [
      'Up to 3 team members',
      '5 projects',
      'Basic analytics',
      'Community support',
      '1 GB storage',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '$29',
    description: 'Great for small teams',
    features: [
      'Up to 10 team members',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '10 GB storage',
      'Custom domain',
      'API access',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$99',
    description: 'For growing businesses',
    features: [
      'Up to 50 team members',
      'Unlimited projects',
      'Advanced analytics + AI insights',
      '24/7 Priority support',
      '100 GB storage',
      'Custom domain',
      'Full API access',
      'Advanced integrations',
      'White label options',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Enterprise analytics',
      'Dedicated support manager',
      'Unlimited storage',
      'Custom integrations',
      'SLA guarantee',
      'Advanced security',
      'On-premise deployment',
      'Training & onboarding',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-4">Pricing</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the perfect plan for your needs. Always know what you&apos;ll pay.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.highlighted ? 'border-primary shadow-lg' : ''}
          >
            {plan.highlighted && (
              <div className="rounded-t-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-6 text-left">
          <div>
            <h3 className="font-semibold">Can I change plans later?</h3>
            <p className="mt-2 text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">What payment methods do you accept?</h3>
            <p className="mt-2 text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Is there a free trial?</h3>
            <p className="mt-2 text-muted-foreground">
              Yes! All paid plans come with a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
