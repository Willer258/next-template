import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-20">
      <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Collecte des données</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Nous collectons les informations que vous nous fournissez directement, notamment lors de la création d un compte, d une commande ou d un contact avec notre support.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Utilisation des données</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Vos données sont utilisées pour traiter vos commandes, améliorer nos services et vous contacter concernant votre compte ou nos services.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Protection des données</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Vos droits</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Vous avez le droit d accéder, de rectifier ou de supprimer vos données personnelles. Contactez-nous à privacy@yourbrand.com pour exercer ces droits.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
