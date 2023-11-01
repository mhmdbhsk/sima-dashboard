import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'department' | 'student' | 'lecturer'
    image: string
    // accessToken: string
    // refreshToken: string
    // accessTokenExpires: number
  }

  interface Session extends DefaultSession {
    user: User
    expires: string
    error: string
  }
}
