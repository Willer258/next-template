"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Check, X, Sparkles } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const pricingPlans = {
  monthly: [
    {
      name: 'Starter',
      price: '499',
      description: 'Parfait pour démarrer votre présence en ligne',
      features: [
        { name: 'Site vitrine 5 pages', included: true },
        { name: 'Design responsive', included: true },
        { name: 'SEO de base', included: true },
        { name: 'Formulaire de contact', included: true },
        { name: 'Support 3 mois', included: true },
        { name: 'E-commerce', included: false },
        { name: 'Blog', included: false },
        { name: 'Analytics avancé', included: false }
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '1299',
      description: 'Pour les entreprises en croissance',
      features: [
        { name: 'Site sur mesure illimité', included: true },
        { name: 'Design premium', included: true },
        { name: 'SEO avancé', included: true },
        { name: 'Formulaires avancés', included: true },
        { name: 'Support 6 mois', included: true },
        { name: 'E-commerce complet', included: true },
        { name: 'Blog intégré', included: true },
        { name: 'Analytics avancé', included: false }
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '2999',
      description: 'Solutions sur mesure pour grandes entreprises',
      features: [
        { name: 'Application web complète', included: true },
        { name: 'Design système complet', included: true },
        { name: 'SEO & Marketing', included: true },
        { name: 'Fonctionnalités illimitées', included: true },
        { name: 'Support 12 mois', included: true },
        { name: 'E-commerce avancé', included: true },
        { name: 'Blog & CMS', included: true },
        { name: 'Analytics & BI', included: true }
      ],
      popular: false
    }
  ],
  annual: [
    {
      name: 'Starter',
      price: '4990',
      description: 'Parfait pour démarrer votre présence en ligne',
      features: [
        { name: 'Site vitrine 5 pages', included: true },
        { name: 'Design responsive', included: true },
        { name: 'SEO de base', included: true },
        { name: 'Formulaire de contact', included: true },
        { name: 'Support 3 mois', included: true },
        { name: 'E-commerce', included: false },
        { name: 'Blog', included: false },
        { name: 'Analytics avancé', included: false }
      ],
      popular: false,
      savings: '1000'
    },
    {
      name: 'Professional',
      price: '12990',
      description: 'Pour les entreprises en croissance',
      features: [
        { name: 'Site sur mesure illimité', included: true },
        { name: 'Design premium', included: true },
        { name: 'SEO avancé', included: true },
        { name: 'Formulaires avancés', included: true },
        { name: 'Support 6 mois', included: true },
        { name: 'E-commerce complet', included: true },
        { name: 'Blog intégré', included: true },
        { name: 'Analytics avancé', included: false }
      ],
      popular: true,
      savings: '2600'
    },
    {
      name: 'Enterprise',
      price: '29990',
      description: 'Solutions sur mesure pour grandes entreprises',
      features: [
        { name: 'Application web complète', included: true },
        { name: 'Design système complet', included: true },
        { name: 'SEO & Marketing', included: true },
        { name: 'Fonctionnalités illimitées', included: true },
        { name: 'Support 12 mois', included: true },
        { name: 'E-commerce avancé', included: true },
        { name: 'Blog & CMS', included: true },
        { name: 'Analytics & BI', included: true }
      ],
      popular: false,
      savings: '6000'
    }
  ]
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Tarifs</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Des tarifs{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              transparents
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Choisissez le plan qui correspond à vos besoins. Tous nos plans incluent un support dédié et une garantie satisfait ou remboursé.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container pb-20">
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full md:w-[400px] mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            <TabsTrigger value="annual">
              Annuel
              <Badge variant="secondary" className="ml-2">-17%</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
            >
              {pricingPlans.monthly.map((plan) => (
                <motion.div key={plan.name} variants={fadeIn}>
                  <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary border-2 shadow-2xl scale-105' : ''}`}>
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 rounded-t-lg font-semibold flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Plus populaire
                      </div>
                    )}
                    <CardHeader className={plan.popular ? 'pt-6' : ''}>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-5xl font-bold">{plan.price}€</span>
                        <span className="text-muted-foreground">/mois</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature.name} className="flex items-start gap-2">
                            {feature.included ? (
                              <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            )}
                            <span className={feature.included ? '' : 'text-muted-foreground'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                        asChild
                      >
                        <Link href="/contact">
                          {plan.popular ? 'Commencer maintenant' : 'Demander un devis'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="annual">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
            >
              {pricingPlans.annual.map((plan) => (
                <motion.div key={plan.name} variants={fadeIn}>
                  <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary border-2 shadow-2xl scale-105' : ''}`}>
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 rounded-t-lg font-semibold flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Plus populaire
                      </div>
                    )}
                    <CardHeader className={plan.popular ? 'pt-6' : ''}>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl">{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </div>
                        {plan.savings && (
                          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100">
                            Économisez {plan.savings}€
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4">
                        <span className="text-5xl font-bold">{plan.price}€</span>
                        <span className="text-muted-foreground">/an</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature.name} className="flex items-start gap-2">
                            {feature.included ? (
                              <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            )}
                            <span className={feature.included ? '' : 'text-muted-foreground'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                        asChild
                      >
                        <Link href="/contact">
                          {plan.popular ? 'Commencer maintenant' : 'Demander un devis'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Puis-je changer de plan plus tard ?',
                a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.'
              },
              {
                q: 'Y a-t-il des frais cachés ?',
                a: 'Non, tous nos prix sont transparents. Le prix affiché est le prix final, aucun frais caché.'
              },
              {
                q: 'Proposez-vous des forfaits sur mesure ?',
                a: 'Oui, pour les projets spécifiques, nous créons des devis personnalisés adaptés à vos besoins.'
              },
              {
                q: 'Quels moyens de paiement acceptez-vous ?',
                a: 'Nous acceptons les cartes bancaires, PayPal, virements bancaires et paiements en plusieurs fois.'
              }
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                  <CardDescription>{faq.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  )
}
