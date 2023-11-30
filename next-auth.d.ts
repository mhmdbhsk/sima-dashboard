import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: 'admin' | 'department' | 'student' | 'lecturer'
    nama: string
    image?: any
    firstTime: boolean
    accessToken: string
  }

  interface Session extends DefaultSession {
    user: User
    expires: string
    error: string
  }
}
