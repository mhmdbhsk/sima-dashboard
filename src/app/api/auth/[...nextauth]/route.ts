import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// import authService from '@/services/auth'

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
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

        if (credentials?.email === 'admin@gmail.com' && credentials?.password === 'admin') {
          return {
            name: 'admin',
            email: 'admin@gmail.com',
            role: 'admin',
            id: '37678dd6-84c6-4897-91f7-4bbf89f8e5af',
            image: 'https://github.com/mhmdbhsk.png',
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user.accessToken = token.accessToken

      return session
    },
  },
  // session: {
  //   strategy: 'jwt',
  // },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }
