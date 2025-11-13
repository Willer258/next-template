"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { ExternalLink, Github, Calendar } from 'lucide-react'
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

const projects = [
  {
    id: '1',
    title: 'Marketplace E-commerce',
    category: 'E-commerce',
    description: 'Plateforme multi-vendeurs avec plus de 10 000 produits et système de paiement intégré',
    image: '🛍️',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    year: '2024',
    client: 'ShopHub',
    featured: true
  },
  {
    id: '2',
    title: 'Application SaaS Analytics',
    category: 'Web App',
    description: 'Dashboard analytics en temps réel avec visualisations de données avancées',
    image: '📊',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    year: '2024',
    client: 'DataViz Pro',
    featured: true
  },
  {
    id: '3',
    title: 'Site Corporate Luxe',
    category: 'Website',
    description: 'Site vitrine haut de gamme avec animations 3D et expérience immersive',
    image: '💎',
    tags: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion'],
    year: '2024',
    client: 'Luxury Brand',
    featured: true
  },
  {
    id: '4',
    title: 'Plateforme de Formation',
    category: 'Education',
    description: 'LMS complet avec cours vidéo, quiz interactifs et suivi de progression',
    image: '🎓',
    tags: ['Next.js', 'Prisma', 'Stripe', 'AWS'],
    year: '2023',
    client: 'EduLearn',
    featured: false
  },
  {
    id: '5',
    title: 'App Mobile Fitness',
    category: 'Mobile',
    description: 'Application de suivi fitness avec plans personnalisés et coaching IA',
    image: '💪',
    tags: ['React Native', 'Firebase', 'TensorFlow', 'Stripe'],
    year: '2023',
    client: 'FitTrack',
    featured: false
  },
  {
    id: '6',
    title: 'Portfolio Photographe',
    category: 'Website',
    description: 'Portfolio élégant avec galerie haute résolution et e-commerce intégré',
    image: '📸',
    tags: ['Next.js', 'Sanity', 'Cloudinary', 'Stripe'],
    year: '2023',
    client: 'Photo Studio',
    featured: false
  },
  {
    id: '7',
    title: 'Plateforme de Réservation',
    category: 'Web App',
    description: 'Système de réservation en ligne pour salles et équipements',
    image: '📅',
    tags: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    year: '2023',
    client: 'BookSpace',
    featured: false
  },
  {
    id: '8',
    title: 'Blog Culinaire',
    category: 'Website',
    description: 'Blog de recettes avec recherche avancée et fonctionnalités sociales',
    image: '👨‍🍳',
    tags: ['Next.js', 'MDX', 'Algolia', 'Vercel'],
    year: '2023',
    client: 'Chef Stories',
    featured: false
  }
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'E-commerce', 'Web App', 'Website', 'Mobile', 'Education']

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(p => p.featured)

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
            <Badge className="mb-4">Portfolio</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Nos{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Réalisations
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Découvrez les projets qui ont marqué notre parcours et la confiance que nos clients nous accordent
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-4 mb-20"
        >
          {[
            { value: '500+', label: 'Projets' },
            { value: '250+', label: 'Clients' },
            { value: '15+', label: 'Pays' },
            { value: '98%', label: 'Satisfaction' }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeIn}
              className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Projets Phares</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeIn}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  <CardHeader>
                    <div className="text-7xl mb-6 text-center group-hover:scale-110 transition-transform">
                      {project.image}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge>{project.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm font-medium">{project.client}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Github className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Projects */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Tous nos projets</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 lg:grid-cols-6 mb-12">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'Tous' : cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {project.image}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{project.category}</Badge>
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Voir le projet
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>

      <Chatbot />
    </div>
  )
}
