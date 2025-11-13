"use client"

import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Chatbot } from '@/components/chatbot/chatbot'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const faqs = {
  general: [
    { q: 'Qui êtes-vous ?', a: 'Nous sommes une agence digitale spécialisée dans le développement web, le design UI/UX et l e-commerce depuis 15 ans.' },
    { q: 'Où êtes-vous basés ?', a: 'Notre siège est à Paris, mais nous travaillons avec des clients partout dans le monde.' },
    { q: 'Travaillez-vous avec des startups ?', a: 'Absolument ! Nous accompagnons des startups comme des grandes entreprises.' }
  ],
  services: [
    { q: 'Quels services proposez-vous ?', a: 'Développement web, design UI/UX, e-commerce, consulting digital et formation.' },
    { q: 'Faites-vous de la maintenance ?', a: 'Oui, nous proposons des contrats de maintenance mensuels pour tous nos projets.' },
    { q: 'Proposez-vous du SEO ?', a: 'Oui, tous nos sites sont optimisés SEO et nous proposons aussi du consulting SEO.' }
  ],
  pricing: [
    { q: 'Quels sont vos tarifs ?', a: 'Nos tarifs démarrent à 499€/mois. Consultez notre page Tarifs pour plus de détails.' },
    { q: 'Acceptez-vous les paiements en plusieurs fois ?', a: 'Oui, nous proposons des paiements échelonnés pour tous nos projets.' },
    { q: 'Y a-t-il des frais cachés ?', a: 'Non, tous nos devis sont transparents et détaillés.' }
  ]
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="container py-20">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-12">
          <motion.div variants={fadeIn}><Badge className="mb-4">FAQ</Badge></motion.div>
          <motion.h1 variants={fadeIn} className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Questions <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fréquentes</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto">
            Trouvez rapidement des réponses à vos questions
          </motion.p>
        </motion.div>
      </section>

      <section className="container pb-20">
        <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          </TabsList>

          {Object.entries(faqs).map(([key, items]) => (
            <TabsContent key={key} value={key}>
              <Card className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {items.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Chatbot />
    </div>
  )
}
