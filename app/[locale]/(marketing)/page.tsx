import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  const t = useTranslations('app')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          {t('name')}
        </h1>
        <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
