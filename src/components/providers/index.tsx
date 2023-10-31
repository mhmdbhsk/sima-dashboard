'use client'

import { Session } from 'next-auth'
import { AppProgressBar } from 'next-nprogress-bar'

import NextAuthProviders from './next-auth-provider'
import ReactQueryProviders from './react-query-provider'

export default function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <NextAuthProviders session={session}>
      <ReactQueryProviders>
        {children}
        <AppProgressBar height='2px' color='#000' options={{ showSpinner: false }} shallowRouting />
      </ReactQueryProviders>
    </NextAuthProviders>
  )
}
