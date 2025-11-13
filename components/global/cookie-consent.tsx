"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie } from 'lucide-react'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setTimeout(() => setShow(true), 2000)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <Card className="p-6 shadow-2xl border-2">
            <div className="flex gap-4">
              <Cookie className="h-6 w-6 shrink-0 text-primary" />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Cookies & Confidentialité</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={accept} className="flex-1">
                    Accepter
                  </Button>
                  <Button size="sm" variant="outline" onClick={decline}>
                    Refuser
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
