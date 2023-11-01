import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfigs: NextAuthOptions = {
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

        if (credentials?.email === 'bhaska@gmail.com' && credentials?.password === '1234') {
          return {
            name: 'Muhammad Bhaska',
            email: 'bhaska@gmail.com',
            role: 'admin',
            id: '37678dd6-84c6-4897-91f7-4bbf89f8e5af',
            image: 'https://github.com/mhmdbhsk.png',
          }
        }
        if (credentials?.email === 'tiara@gmail.com' && credentials?.password === '1234') {
          return {
            name: 'Tiara Fitra',
            email: 'tiara@gmail.com',
            role: 'student',
            id: 'f53eb534-3808-43fc-b3f5-147774916a7c',
            image: 'https://github.com/qnyara5.png',
          }
        }
        if (credentials?.email === 'derva@gmail.com' && credentials?.password === '1234') {
          return {
            name: 'Derva Anargya Ghaly',
            email: 'derva@gmail.com',
            role: 'lecturer',
            id: '8cb1722d-9d02-4811-8f50-66661c091f0b',
            image: 'https://github.com/dervaagg.png',
          }
        }
        if (credentials?.email === 'duma@gmail.com' && credentials?.password === '1234') {
          return {
            name: 'Duma Mora',
            email: 'duma@gmail.com',
            role: 'department',
            id: 'cebcaa8d-ec3e-4afc-920b-71b59392e89d',
            image: 'https://github.com/DumaSitorus.png',
          }
        }

        throw new Error('Invalid email or password')
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
