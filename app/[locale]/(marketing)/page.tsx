"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Check, Zap, Shield, Users, Sparkles, TrendingUp, Heart, Star, Code, Palette, ShoppingBag, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'

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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container flex min-h-[90vh] flex-col items-center justify-center py-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4" variant="secondary">
              🎉 Nouveau - Lancement de notre plateforme complète
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="mb-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            Transformez vos idées en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              réalité digitale
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="mb-8 max-w-2xl text-xl text-muted-foreground mx-auto"
          >
            Une solution complète pour votre présence en ligne : développement web, design UI/UX,
            e-commerce et consulting. Tout ce dont vous avez besoin pour réussir.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/contact">
                Démarrer un projet <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Découvrir nos services</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="mt-6 text-sm text-muted-foreground"
          >
            Consultation gratuite • Devis personnalisé sous 24h
          </motion.p>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Code className="h-20 w-20 text-blue-600" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 opacity-20"
        >
          <Palette className="h-24 w-24 text-purple-600" />
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Nos Services</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Tout ce dont vous avez besoin
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl text-muted-foreground">
            Des solutions complètes pour votre transformation digitale
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Code,
              title: 'Développement Web',
              description: 'Applications web modernes, performantes et scalables avec les dernières technologies',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Palette,
              title: 'Design UI/UX',
              description: 'Interfaces utilisateur exceptionnelles et expériences mémorables',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: ShoppingBag,
              title: 'E-commerce',
              description: 'Solutions de vente en ligne complètes avec paiement sécurisé',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: MessageSquare,
              title: 'Consulting',
              description: 'Conseils stratégiques personnalisés pour votre croissance digitale',
              color: 'from-orange-500 to-red-500'
            }
          ].map((service) => (
            <motion.div key={service.title} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${service.color} p-3 text-white w-fit group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="border-y bg-muted/50 py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Pourquoi nous choisir</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              L'excellence à chaque étape
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                icon: Zap,
                title: 'Rapide & Efficace',
                description: 'Livraison rapide sans compromis sur la qualité',
                stat: '2x plus rapide'
              },
              {
                icon: Shield,
                title: 'Sécurisé',
                description: 'Sécurité et conformité garanties sur tous nos projets',
                stat: '100% sécurisé'
              },
              {
                icon: Heart,
                title: 'Support Dédié',
                description: 'Une équipe à votre écoute 7j/7 pour vous accompagner',
                stat: '24/7 disponible'
              }
            ].map((item) => (
              <motion.div key={item.title} variants={fadeIn}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-4 text-primary">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="mt-2">{item.description}</CardDescription>
                    <div className="mt-4">
                      <Badge variant="secondary">{item.stat}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-4 text-center"
          >
            {[
              { value: '500+', label: 'Projets Réalisés', icon: Check },
              { value: '250+', label: 'Clients Satisfaits', icon: Users },
              { value: '98%', label: 'Taux de Satisfaction', icon: Star },
              { value: '15+', label: 'Années d\'Expérience', icon: TrendingUp }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="mb-2 text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features List */}
      <section className="container py-20 bg-muted/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={fadeIn} className="mb-12 text-center">
            <Badge className="mb-4">Fonctionnalités</Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qui est inclus
            </h2>
            <p className="text-xl text-muted-foreground">
              Une solution complète pour tous vos besoins digitaux
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
            {[
              'Design Responsive & Mobile',
              'SEO Optimisé',
              'Performance Maximale',
              'Sécurité Avancée',
              'Analytics Intégré',
              'Support Multi-langue',
              'Mode Sombre',
              'Paiement Sécurisé',
              'Gestion des Stocks',
              'Email Marketing',
              'API REST',
              'Documentation Complète',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                variants={fadeIn}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-background hover:bg-accent transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Témoignages</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ce que disent nos clients
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-3"
        >
          {[
            {
              name: 'Marie Dupont',
              role: 'CEO, TechStart',
              content: 'Une équipe exceptionnelle qui a transformé notre vision en réalité. Le résultat dépasse nos attentes!',
              rating: 5
            },
            {
              name: 'Jean Martin',
              role: 'Fondateur, ShopPlus',
              content: 'Notre boutique en ligne a triplé ses ventes depuis le lancement. Un investissement qui en valait la peine.',
              rating: 5
            },
            {
              name: 'Sophie Laurent',
              role: 'Directrice Marketing',
              content: 'Design magnifique, performance au top et un support client irréprochable. Je recommande à 100%!',
              rating: 5
            }
          ].map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                  <div className="mt-4">
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
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
            Rejoignez des centaines d'entreprises qui nous font confiance
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl">
              <Link href="/contact">
                Contactez-nous <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
