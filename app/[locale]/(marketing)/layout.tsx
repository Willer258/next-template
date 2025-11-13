import { Navbar } from '@/components/layout/navbar'
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
                <li><a href="/services#web" className="hover:text-foreground transition-colors">Développement Web</a></li>
                <li><a href="/services#design" className="hover:text-foreground transition-colors">Design UI/UX</a></li>
                <li><a href="/services#ecommerce" className="hover:text-foreground transition-colors">E-commerce</a></li>
                <li><a href="/services#consulting" className="hover:text-foreground transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground transition-colors">Qui sommes-nous</a></li>
                <li><a href="/services" className="hover:text-foreground transition-colors">Nos services</a></li>
                <li><a href="/shop" className="hover:text-foreground transition-colors">Boutique</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contact@yourbrand.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>123 Avenue des Champs-Élysées</li>
                <li>75008 Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} YourBrand. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
