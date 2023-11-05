'use client'

import { Session } from 'next-auth'
import { AppProgressBar } from 'next-nprogress-bar'
import { Toaster } from 'react-hot-toast'

import NextAuthProviders from './next-auth-provider'
import ReactQueryProviders from './react-query-provider'
import { ThemeProvider } from './theme-provider'
import { TailwindIndicator } from '../tailwind-indicator'

export default function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <NextAuthProviders session={session}>
        <ReactQueryProviders>
          {children}
          <Toaster />
          <AppProgressBar height='2px' color='#2563eb' shallowRouting />
          <TailwindIndicator />
        </ReactQueryProviders>
      </NextAuthProviders>
    </ThemeProvider>
  )
}
