import type { Metadata } from 'next'
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
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
