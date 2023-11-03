import type { Metadata, Viewport } from 'next'
import { getServerSession } from 'next-auth'

import Providers from '@/components/providers'
import { authConfigs, siteConfig } from '@/config'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  colorScheme: 'light',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfigs)

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased transition-all duration-200 ease-in-out',
          fontSans.variable
        )}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
