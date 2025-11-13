"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Sparkles } from 'lucide-react'

export function NewsletterPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const shown = sessionStorage.getItem('newsletter-shown')
    if (!shown) {
      setTimeout(() => setShow(true), 10000)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('newsletter-shown', 'true')
    setShow(false)
  }

  const handleClose = () => {
    sessionStorage.setItem('newsletter-shown', 'true')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
          >
            <Card className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>

              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Restez informé !</CardTitle>
                <CardDescription>
                  Recevez nos dernières actualités et offres exclusives
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full" size="lg">
                    S abonner
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Désinscription possible à tout moment
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
