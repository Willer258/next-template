import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/hooks/use-theme'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../globals.css'

export const metadata: Metadata = {
  title: 'SaaS Dashboard',
  description: 'Modern SaaS dashboard template with Next.js',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="default" defaultMode="system" storageKey="ui-theme">
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
