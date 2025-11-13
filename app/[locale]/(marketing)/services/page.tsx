"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Code, Palette, ShoppingBag, MessageSquare, Check, ArrowRight, Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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

export default function ServicesPage() {
  const services = [
    {
      id: 'web',
      icon: Code,
      title: 'Développement Web',
      description: 'Applications web modernes et performantes',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Applications React/Next.js',
        'Sites web sur mesure',
        'Progressive Web Apps (PWA)',
        'API REST et GraphQL',
        'Migration vers le cloud',
        'Maintenance et support'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      price: 'À partir de 5 000€'
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces exceptionnelles et expériences mémorables',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Recherche utilisateur',
        'Wireframing et prototypage',
        'Design système complet',
        'Tests utilisateurs',
        'Design responsive',
        'Branding et identité visuelle'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'After Effects'],
      price: 'À partir de 3 000€'
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      title: 'Solutions E-commerce',
      description: 'Boutiques en ligne complètes et performantes',
      color: 'from-green-500 to-emerald-500',
      features: [
        'Boutique en ligne personnalisée',
        'Intégration paiement (Stripe, PayPal)',
        'Gestion des stocks',
        'Système de commande',
        'Analytics e-commerce',
        'Marketing automation'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'Next.js Commerce'],
      price: 'À partir de 8 000€'
    },
    {
      id: 'consulting',
      icon: MessageSquare,
      title: 'Consulting Digital',
      description: 'Conseils stratégiques pour votre transformation digitale',
      color: 'from-orange-500 to-red-500',
      features: [
        'Audit digital complet',
        'Stratégie de croissance',
        'Optimisation des performances',
        'Formation des équipes',
        'Roadmap technologique',
        'Support continu'
      ],
      technologies: ['Analytics', 'SEO', 'Performance', 'Security', 'Cloud'],
      price: 'À partir de 2 000€'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Nos Services</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Des solutions{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              sur mesure
            </span>{' '}
            pour votre succès
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Découvrez notre gamme complète de services digitaux conçus pour propulser votre entreprise
            vers de nouveaux sommets.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container pb-20">
        <Tabs defaultValue="web" className="w-full">
          <TabsList className="grid w-full md:w-[800px] mx-auto grid-cols-2 lg:grid-cols-4 mb-12">
            <TabsTrigger value="web">Développement</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="consulting">Consulting</TabsTrigger>
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-5xl mx-auto">
                  <CardHeader>
                    <div className={`mb-6 inline-flex rounded-lg bg-gradient-to-r ${service.color} p-4 text-white w-fit`}>
                      <service.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-3xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-lg">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Ce qui est inclus</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Technologies utilisées</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">À partir de</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {service.price}
                        </p>
                      </div>
                      <Button asChild size="lg">
                        <Link href="/contact">
                          Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Process Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Notre Processus</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Comment nous travaillons
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-4"
          >
            {[
              {
                step: '01',
                title: 'Découverte',
                description: 'Nous analysons vos besoins et définissons ensemble vos objectifs.'
              },
              {
                step: '02',
                title: 'Planification',
                description: 'Nous créons une roadmap détaillée et un devis transparent.'
              },
              {
                step: '03',
                title: 'Développement',
                description: 'Notre équipe concrétise votre projet avec des points réguliers.'
              },
              {
                step: '04',
                title: 'Livraison',
                description: 'Nous déployons votre projet et assurons un support continu.'
              }
            ].map((item) => (
              <motion.div key={item.step} variants={fadeIn}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {item.step}
                    </div>
                    <CardTitle className="mb-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-12 text-center">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Questions fréquentes
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Quels sont vos délais de livraison?</AccordionTrigger>
              <AccordionContent>
                Les délais varient selon la complexité du projet. Un site vitrine prend généralement 2-4 semaines,
                tandis qu'une application web complexe peut prendre 2-6 mois. Nous établissons un planning détaillé
                lors de la phase de découverte.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Proposez-vous un support après livraison?</AccordionTrigger>
              <AccordionContent>
                Oui, tous nos projets incluent 3 mois de support gratuit. Nous proposons également des contrats
                de maintenance mensuels pour garantir la sécurité et les performances de votre site.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Comment se déroule le paiement?</AccordionTrigger>
              <AccordionContent>
                Nous fonctionnons généralement avec 3 versements : 30% à la signature, 40% à mi-parcours,
                et 30% à la livraison finale. Pour les petits projets, un paiement en 2 fois est possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Travaillez-vous avec des clients internationaux?</AccordionTrigger>
              <AccordionContent>
                Absolument! Nous avons l'habitude de travailler avec des clients du monde entier.
                Notre équipe est flexible et peut s'adapter à différents fuseaux horaires pour faciliter
                la communication.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Puis-je modifier mon site après sa création?</AccordionTrigger>
              <AccordionContent>
                Oui, tous nos sites sont conçus pour être facilement modifiables. Nous vous formons à
                l'utilisation de votre CMS et restons disponibles pour toute assistance technique.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="container text-center"
        >
          <motion.div variants={fadeIn}>
            <Sparkles className="h-12 w-12 mx-auto mb-6" />
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à démarrer votre projet?
          </motion.h2>
          <motion.p variants={fadeIn} className="mb-8 text-xl opacity-90">
            Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
          </motion.p>
          <motion.div variants={fadeIn} className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              <Link href="/shop">Voir nos packages</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Chatbot />
    </div>
  )
}
