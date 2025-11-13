"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { ShoppingCart, Star, Filter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

export default function ShopPage() {
  const [cart, setCart] = useState<string[]>([])

  const products = [
    {
      id: '1',
      name: 'Site Vitrine Premium',
      category: 'web',
      price: 2999,
      rating: 4.9,
      reviews: 127,
      description: 'Site web professionnel de 5 pages avec design moderne et responsive',
      features: ['Design sur mesure', 'SEO optimisé', 'Mobile responsive', 'Support 3 mois'],
      image: '🌐',
      badge: 'Populaire'
    },
    {
      id: '2',
      name: 'Application Web Custom',
      category: 'web',
      price: 12999,
      rating: 5.0,
      reviews: 89,
      description: 'Application web complète avec dashboard et authentification',
      features: ['Architecture scalable', 'API REST', 'Dashboard admin', 'Support 6 mois'],
      image: '💻',
      badge: 'Premium'
    },
    {
      id: '3',
      name: 'Design UI/UX Complet',
      category: 'design',
      price: 4999,
      rating: 4.8,
      reviews: 156,
      description: 'Package design complet avec prototypes et design système',
      features: ['Recherche UX', 'Prototypes interactifs', 'Design système', 'Fichiers sources'],
      image: '🎨',
      badge: 'Nouveau'
    },
    {
      id: '4',
      name: 'Boutique E-commerce',
      category: 'ecommerce',
      price: 8999,
      rating: 4.9,
      reviews: 203,
      description: 'Boutique en ligne complète avec paiement et gestion des stocks',
      features: ['Paiement sécurisé', 'Gestion stocks', 'Analytics', 'Support 6 mois'],
      image: '🛒',
      badge: 'Meilleure vente'
    },
    {
      id: '5',
      name: 'Audit SEO Complet',
      category: 'consulting',
      price: 1999,
      rating: 4.7,
      reviews: 94,
      description: 'Analyse complète de votre site avec recommandations SEO',
      features: ['Audit technique', 'Analyse concurrence', 'Plan d\'action', 'Suivi 1 mois'],
      image: '📊',
      badge: ''
    },
    {
      id: '6',
      name: 'Formation React/Next.js',
      category: 'consulting',
      price: 3499,
      rating: 5.0,
      reviews: 67,
      description: 'Formation complète pour votre équipe sur React et Next.js',
      features: ['3 jours formation', 'Support projet', 'Matériel inclus', 'Certification'],
      image: '📚',
      badge: 'Nouveau'
    },
    {
      id: '7',
      name: 'Logo & Branding',
      category: 'design',
      price: 2499,
      rating: 4.8,
      reviews: 178,
      description: 'Identité visuelle complète avec logo et charte graphique',
      features: ['3 propositions', 'Charte graphique', 'Fichiers vectoriels', 'Kit réseaux sociaux'],
      image: '✨',
      badge: 'Populaire'
    },
    {
      id: '8',
      name: 'Marketplace Personnalisée',
      category: 'ecommerce',
      price: 24999,
      rating: 5.0,
      reviews: 34,
      description: 'Plateforme marketplace complète multi-vendeurs',
      features: ['Multi-vendeurs', 'Paiements fractionnés', 'Commissions auto', 'Support 12 mois'],
      image: '🏪',
      badge: 'Premium'
    }
  ]

  const addToCart = (productId: string) => {
    setCart([...cart, productId])
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
            <Badge className="mb-4">Boutique</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Packages{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              prêts à l'emploi
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Découvrez nos packages tout compris pour démarrer rapidement votre projet digital
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un produit..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              <SelectItem value="web">Développement</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="popular">
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Plus populaires</SelectItem>
              <SelectItem value="price-low">Prix croissant</SelectItem>
              <SelectItem value="price-high">Prix décroissant</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="container pb-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-[600px] mx-auto grid-cols-5 mb-12">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="ecommerce">Shop</TabsTrigger>
            <TabsTrigger value="consulting">Conseil</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-6xl mb-4">{product.image}</div>
                      {product.badge && (
                        <Badge className="w-fit mb-2">{product.badge}</Badge>
                      )}
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {product.features.slice(0, 3).map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                      <div className="w-full flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">À partir de</p>
                          <p className="text-2xl font-bold">
                            {product.price.toLocaleString('fr-FR')}€
                          </p>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ajouter au panier
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {['web', 'design', 'ecommerce', 'consulting'].map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {products.filter(p => p.category === category).map((product) => (
                  <motion.div key={product.id} variants={fadeIn}>
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="text-6xl mb-4">{product.image}</div>
                        {product.badge && (
                          <Badge className="w-fit mb-2">{product.badge}</Badge>
                        )}
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                          <div className="space-y-2">
                            {product.features.slice(0, 3).map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-sm">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                <span className="text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-3">
                        <div className="w-full flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">À partir de</p>
                            <p className="text-2xl font-bold">
                              {product.price.toLocaleString('fr-FR')}€
                            </p>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Ajouter au panier
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Chatbot />
    </div>
  )
}
