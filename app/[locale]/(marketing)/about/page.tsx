"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Users, Target, Award, Lightbulb, Heart, Globe, ArrowRight } from 'lucide-react'
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

export default function AboutPage() {
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
            <Badge className="mb-4">À propos de nous</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Nous créons des{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              expériences digitales
            </span>{' '}
            exceptionnelles
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Depuis 2008, nous aidons les entreprises à se transformer digitalement avec passion,
            expertise et innovation.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">Notre Histoire</Badge>
              <h2 className="text-3xl font-bold mb-6">
                15 ans d'excellence au service de l'innovation
              </h2>
              <p className="text-muted-foreground mb-4 text-lg">
                Fondée en 2008, notre entreprise est née d'une vision simple : rendre le digital
                accessible à toutes les entreprises, quelle que soit leur taille.
              </p>
              <p className="text-muted-foreground mb-4 text-lg">
                Avec une équipe passionnée de designers, développeurs et stratèges digitaux, nous
                avons accompagné plus de 500 projets, de la startup innovante à la grande
                entreprise.
              </p>
              <p className="text-muted-foreground text-lg">
                Aujourd'hui, nous sommes fiers d'être reconnus comme l'un des leaders de la
                transformation digitale, toujours à la pointe des dernières technologies.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {[
                { value: '500+', label: 'Projets réalisés' },
                { value: '250+', label: 'Clients satisfaits' },
                { value: '98%', label: 'Taux de satisfaction' },
                { value: '15', label: 'Années d\'expérience' }
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </CardTitle>
                    <CardDescription className="font-medium">{stat.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeIn}>
            <Badge className="mb-4">Nos Valeurs</Badge>
          </motion.div>
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ce qui nous guide au quotidien
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
              icon: Heart,
              title: 'Passion',
              description: 'Nous aimons ce que nous faisons et cela se reflète dans chaque projet que nous livrons.'
            },
            {
              icon: Lightbulb,
              title: 'Innovation',
              description: 'Nous restons à la pointe de la technologie pour offrir les meilleures solutions.'
            },
            {
              icon: Award,
              title: 'Excellence',
              description: 'Nous visons l\'excellence dans chaque détail, de la conception à la livraison.'
            },
            {
              icon: Users,
              title: 'Collaboration',
              description: 'Nous travaillons main dans la main avec nos clients comme de véritables partenaires.'
            },
            {
              icon: Globe,
              title: 'Impact',
              description: 'Nous créons des solutions qui ont un impact réel sur le succès de nos clients.'
            },
            {
              icon: Target,
              title: 'Résultats',
              description: 'Nous nous concentrons sur des résultats mesurables et un ROI tangible.'
            }
          ].map((value) => (
            <motion.div key={value.title} variants={fadeIn}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription className="mt-2">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
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
              <Badge className="mb-4">Notre Équipe</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Les talents qui font la différence
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground">
              Une équipe multidisciplinaire de 30+ experts passionnés
            </motion.p>
          </motion.div>

          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full md:w-[600px] mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="leadership">Direction</TabsTrigger>
              <TabsTrigger value="dev">Développement</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="leadership">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="grid gap-8 md:grid-cols-3"
              >
                {[
                  { name: 'Alexandra Martin', role: 'CEO & Fondatrice', experience: '15 ans d\'expérience' },
                  { name: 'Thomas Dubois', role: 'CTO', experience: '12 ans d\'expérience' },
                  { name: 'Sarah Cohen', role: 'Directrice Creative', experience: '10 ans d\'expérience' }
                ].map((member) => (
                  <motion.div key={member.name} variants={fadeIn}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription className="font-medium">{member.role}</CardDescription>
                        <Badge variant="secondary" className="mt-2">{member.experience}</Badge>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="dev">
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">15+ Développeurs</h3>
                <p className="text-muted-foreground">
                  Experts en React, Next.js, Node.js, Python, et plus encore
                </p>
              </div>
            </TabsContent>

            <TabsContent value="design">
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">10+ Designers</h3>
                <p className="text-muted-foreground">
                  Spécialistes en UI/UX, branding, et design système
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn}>
              <Badge className="mb-4">Notre Mission</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Propulser votre succès digital
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-8">
              Notre mission est simple : aider les entreprises à prospérer dans l'ère digitale en
              créant des solutions web innovantes, performantes et centrées sur l'utilisateur.
              Nous croyons que la technologie doit être au service de vos objectifs business.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button asChild size="lg">
                <Link href="/contact">
                  Discutons de votre projet <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
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
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à travailler ensemble?
          </motion.h2>
          <motion.p variants={fadeIn} className="mb-8 text-xl opacity-90">
            Rejoignez les 250+ entreprises qui nous font confiance
          </motion.p>
          <motion.div variants={fadeIn} className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contactez-nous</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              <Link href="/services">Nos services</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Chatbot />
    </div>
  )
}
