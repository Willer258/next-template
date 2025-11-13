"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

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

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    newsletter: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message envoyé!",
      description: "Nous vous recontacterons dans les 24h.",
    })
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      budget: '',
      message: '',
      newsletter: false
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
            <Badge className="mb-4">Contact</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Parlons de votre{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              projet
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans votre
            transformation digitale.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3 mb-12"
        >
          {[
            {
              icon: Mail,
              title: 'Email',
              content: 'contact@yourbrand.com',
              description: 'Réponse sous 24h'
            },
            {
              icon: Phone,
              title: 'Téléphone',
              content: '+33 1 23 45 67 89',
              description: 'Lun-Ven 9h-18h'
            },
            {
              icon: MapPin,
              title: 'Adresse',
              content: '123 Avenue des Champs-Élysées',
              description: '75008 Paris, France'
            }
          ].map((item) => (
            <motion.div key={item.title} variants={fadeIn}>
              <Card className="text-center hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="font-medium text-foreground">
                    {item.content}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="container pb-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jean@exemple.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Votre entreprise"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service">Service souhaité *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Développement Web</SelectItem>
                          <SelectItem value="design">Design UI/UX</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget estimé</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">{"< 5 000€"}</SelectItem>
                          <SelectItem value="medium">5 000€ - 15 000€</SelectItem>
                          <SelectItem value="large">15 000€ - 50 000€</SelectItem>
                          <SelectItem value="enterprise">{"> 50 000€"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre projet en quelques mots..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, newsletter: checked as boolean })
                      }
                    />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Je souhaite recevoir la newsletter avec les dernières actualités
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Office Hours */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>Horaires d'ouverture</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lundi - Vendredi</span>
                  <span className="font-medium">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samedi</span>
                  <span className="font-medium">10h00 - 14h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="inline-flex rounded-full bg-purple-100 dark:bg-purple-900 p-2">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle>Questions fréquentes</CardTitle>
                </div>
                <CardDescription>
                  Consultez notre FAQ pour des réponses rapides
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/services#faq">Quels sont vos délais?</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/services#faq">Comment se passe le paiement?</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/services#faq">Proposez-vous un support?</a>
                </Button>
              </CardContent>
            </Card>

            {/* Social Proof */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Réponse garantie sous 24h</CardTitle>
                <CardDescription className="text-blue-100">
                  Notre équipe s'engage à vous répondre rapidement pour démarrer votre projet dans les meilleures conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-xs text-blue-100">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24h</div>
                    <div className="text-xs text-blue-100">Réponse</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">250+</div>
                    <div className="text-xs text-blue-100">Clients</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card className="overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <MapPin className="h-16 w-16 text-blue-600" />
              </div>
              <CardContent className="p-4">
                <p className="text-sm font-medium">123 Avenue des Champs-Élysées</p>
                <p className="text-sm text-muted-foreground">75008 Paris, France</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Chatbot />
      <Toaster />
    </div>
  )
}
