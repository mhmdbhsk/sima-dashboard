import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { dummyData } from './dummy-user-data'

// import { authService } from '@/services/auth-service'

export const authConfigs: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // const loginErrorMessage = 'Invalid email or password'

        // const res = await authService.login(credentials?.email!, credentials?.password!)

        // if (res?.status !== 200) {
        //   throw Error(loginErrorMessage)
        // }

        // const user = res?.data

        // if (user) {
        //   return {
        //     id: user?.id,
        //     name: user?.name,
        //     email: user?.email,
        //     accessToken: user?.accessToken,
        //   }
        // } else {
        //   return null
        // }

        if (credentials?.username === '1' && credentials?.password === '1234') {
          return dummyData[0]
        }
        if (credentials?.username === '2' && credentials?.password === '1234') {
          return dummyData[1]
        }
        if (credentials?.username === '3' && credentials?.password === '1234') {
          return dummyData[2]
        }
        if (credentials?.username === '4' && credentials?.password === '1234') {
          return dummyData[3]
        }

        // const res = await authService.login(credentials?.email!, credentials?.password!)

        // if (res?.status === 200) {
        //   const user = res?.data

        //   if (user) {
        //     return {
        //       id: user?.id,
        //       name: user?.name,
        //       email: user?.email,
        //       role: user?.role,
        //       image: user?.image,
        //       accessToken: user?.accessToken,
        //     }
        //   } else {
        //     return null
        //   }
        // }

        throw new Error('Invalid username or password')
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // session.user.accessToken = token.accessToken
      session.user.role = token.role

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}
