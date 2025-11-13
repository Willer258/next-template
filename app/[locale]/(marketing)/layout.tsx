import { Navbar } from '@/components/layout/navbar'
import { CookieConsent } from '@/components/global/cookie-consent'
import { NewsletterPopup } from '@/components/global/newsletter-popup'
import { ScrollToTop } from '@/components/global/scroll-to-top'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-12 bg-muted/50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                YourBrand
              </h3>
              <p className="text-sm text-muted-foreground">
                Transformez vos idées en réalité digitale avec nos solutions innovantes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services#web" className="hover:text-foreground transition-colors">Développement Web</Link></li>
                <li><Link href="/services#design" className="hover:text-foreground transition-colors">Design UI/UX</Link></li>
                <li><Link href="/services#ecommerce" className="hover:text-foreground transition-colors">E-commerce</Link></li>
                <li><Link href="/services#consulting" className="hover:text-foreground transition-colors">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">Qui sommes-nous</Link></li>
                <li><Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Tarifs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">CGV</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} YourBrand. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <CookieConsent />
      <NewsletterPopup />
      <ScrollToTop />
    </div>
  )
}
