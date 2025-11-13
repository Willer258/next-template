import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-20">
      <h1 className="text-4xl font-bold mb-8">Conditions Générales</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptation des conditions</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            En utilisant nos services, vous acceptez les présentes conditions générales. Si vous n êtes pas d accord avec ces conditions, veuillez ne pas utiliser nos services.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Services fournis</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Nous fournissons des services de développement web, design UI/UX, e-commerce et consulting digital. Les détails spécifiques sont définis dans les devis individuels.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Paiement et facturation</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Les paiements sont dus selon les termes définis dans votre contrat. Nous acceptons les cartes bancaires, PayPal et les virements bancaires.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Annulation et remboursement</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Nous offrons une garantie satisfait ou remboursé de 30 jours sur tous nos services. Les conditions spécifiques sont détaillées dans votre contrat.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Propriété intellectuelle</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Une fois le paiement intégral effectué, vous détenez les droits sur le travail livré. Nous conservons le droit d utiliser le projet dans notre portfolio.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
