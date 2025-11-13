"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
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

const blogPosts = [
  {
    id: '1',
    title: 'Les tendances du développement web en 2025',
    excerpt: 'Découvrez les technologies et frameworks qui vont dominer le développement web cette année.',
    category: 'Développement',
    author: 'Thomas Dubois',
    date: '2025-01-10',
    readTime: '5 min',
    image: '💻',
    featured: true
  },
  {
    id: '2',
    title: 'Comment optimiser votre site pour le SEO',
    excerpt: 'Guide complet pour améliorer votre référencement naturel et attirer plus de visiteurs.',
    category: 'SEO',
    author: 'Marie Laurent',
    date: '2025-01-08',
    readTime: '8 min',
    image: '🔍',
    featured: true
  },
  {
    id: '3',
    title: 'Design UI/UX : Les erreurs à éviter',
    excerpt: 'Les pièges courants en design d interface et comment les éviter pour créer de meilleures expériences.',
    category: 'Design',
    author: 'Sarah Cohen',
    date: '2025-01-05',
    readTime: '6 min',
    image: '🎨',
    featured: false
  },
  {
    id: '4',
    title: 'E-commerce : Augmenter vos conversions de 50%',
    excerpt: 'Stratégies éprouvées pour transformer vos visiteurs en clients fidèles.',
    category: 'E-commerce',
    author: 'Alexandre Martin',
    date: '2025-01-03',
    readTime: '10 min',
    image: '🛒',
    featured: false
  },
  {
    id: '5',
    title: 'Next.js 15 : Nouveautés et améliorations',
    excerpt: 'Tout ce que vous devez savoir sur la dernière version de Next.js et ses nouvelles fonctionnalités.',
    category: 'Développement',
    author: 'Thomas Dubois',
    date: '2025-01-01',
    readTime: '7 min',
    image: '⚡',
    featured: false
  },
  {
    id: '6',
    title: 'Framer Motion : Animations fluides en React',
    excerpt: 'Créez des animations impressionnantes avec Framer Motion pour vos applications React.',
    category: 'Développement',
    author: 'Thomas Dubois',
    date: '2024-12-28',
    readTime: '12 min',
    image: '✨',
    featured: false
  },
  {
    id: '7',
    title: 'Accessibilité web : Guide complet',
    excerpt: 'Rendez votre site accessible à tous avec ces bonnes pratiques et outils essentiels.',
    category: 'Design',
    author: 'Sarah Cohen',
    date: '2024-12-25',
    readTime: '9 min',
    image: '♿',
    featured: false
  },
  {
    id: '8',
    title: 'Sécurité web : Protéger vos applications',
    excerpt: 'Les meilleures pratiques pour sécuriser vos applications web contre les attaques courantes.',
    category: 'Sécurité',
    author: 'Alexandre Martin',
    date: '2024-12-20',
    readTime: '11 min',
    image: '🔒',
    featured: false
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Développement', 'Design', 'E-commerce', 'SEO', 'Sécurité']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

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
            <Badge className="mb-4">Blog</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Actualités &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ressources
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Découvrez nos derniers articles, guides et conseils pour réussir votre transformation digitale
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              className="pl-12 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <section className="container pb-20">
          <h2 className="text-2xl font-bold mb-8">Articles à la une</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="text-6xl mb-4">{post.image}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>{post.category}</Badge>
                      <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900 border-yellow-500">
                        ⭐ À la une
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                        Lire <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="container pb-20">
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
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="text-5xl mb-4">{post.image}</div>
                      <Badge className="w-fit mb-2">{post.category}</Badge>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Par {post.author}
                          </span>
                          <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                            Lire <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun article trouvé pour cette recherche.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="container text-center"
        >
          <motion.h2 variants={fadeIn} className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ne manquez aucun article
          </motion.h2>
          <motion.p variants={fadeIn} className="mb-8 text-xl opacity-90">
            Inscrivez-vous à notre newsletter et recevez les derniers articles directement dans votre boîte mail
          </motion.p>
          <motion.div variants={fadeIn} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="votre@email.com"
              className="bg-white text-foreground"
            />
            <Button variant="secondary" size="lg">
              S abonner
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Chatbot />
    </div>
  )
}
