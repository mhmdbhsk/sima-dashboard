import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { authService } from '@/services/auth-service'

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
        const res = await authService.login(credentials?.username!, credentials?.password!)

        const roleHandler = (role: string | string[]) => {
          if (Array.isArray(role)) {
            return convertRole(role[0])
          } else {
            return convertRole(role)
          }
        }

        const convertRole = (role: string) => {
          switch (role) {
            case 'Mahasiswa':
              return 'student'
            case 'Dosen':
              return 'lecturer'
            case 'Departemen':
              return 'department'
            default:
              return 'admin'
          }
        }

        if (res) {
          return {
            id: res.data.id,
            role: roleHandler(res.data.role),
            nama: res.data.nama,
            image: res.data.image,
            firstTime: res.data.firstTime,
            accessToken: res.data.accessToken,
          }
        } else {
          throw new Error('Invalid email or password')
        }
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
      session.user = token

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
