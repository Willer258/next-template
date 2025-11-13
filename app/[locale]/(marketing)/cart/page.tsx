"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

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

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  description: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Site Vitrine Premium',
      price: 2999,
      quantity: 1,
      image: '🌐',
      description: 'Site web professionnel de 5 pages'
    },
    {
      id: '4',
      name: 'Boutique E-commerce',
      price: 8999,
      quantity: 1,
      image: '🛒',
      description: 'Boutique en ligne complète'
    }
  ])
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: string, change: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(10)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

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
            <Badge className="mb-4">Panier</Badge>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Votre{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              panier
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {cartItems.length} {cartItems.length > 1 ? 'produits' : 'produit'} dans votre panier
          </motion.p>
        </motion.div>
      </section>

      {/* Cart Content */}
      <section className="container pb-20">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-8">
              Découvrez nos packages et commencez votre projet dès aujourd'hui
            </p>
            <Button asChild size="lg">
              <Link href="/shop">
                Découvrir nos packages <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-4"
              >
                {cartItems.map((item) => (
                  <motion.div key={item.id} variants={fadeIn}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-4xl">
                              {item.image}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-2xl font-bold">
                                  {(item.price * item.quantity).toLocaleString('fr-FR')}€
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-muted-foreground">
                                    {item.price.toLocaleString('fr-FR')}€ / unité
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Shopping */}
              <Button variant="outline" asChild className="w-full">
                <Link href="/shop">
                  Continuer mes achats
                </Link>
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="sticky top-24 space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Récapitulatif</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Promo Code */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Code promo"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Button onClick={applyPromoCode}>
                          Appliquer
                        </Button>
                      </div>
                      {discount > 0 && (
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          ✓ Code promo appliqué (-{discount}%)
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Essayez: WELCOME10 pour -10%
                      </p>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span className="font-medium">
                          {subtotal.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Réduction ({discount}%)</span>
                          <span>-{discountAmount.toLocaleString('fr-FR')}€</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground">
                        <span>TVA (20%)</span>
                        <span>Incluse</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {total.toLocaleString('fr-FR')}€
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full" size="lg">
                      Passer la commande
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Paiement sécurisé • Garantie satisfait ou remboursé
                    </p>
                  </CardFooter>
                </Card>

                {/* Trust Badges */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-base">Pourquoi nous choisir?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>Support technique inclus</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>Garantie satisfait ou remboursé 30 jours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>Paiement sécurisé SSL</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>Livraison dans les délais garantis</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      <Chatbot />
    </div>
  )
}
