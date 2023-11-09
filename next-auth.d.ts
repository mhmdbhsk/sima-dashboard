import 'next-auth'

declare module 'next-auth' {
  interface User {
    // id: string
    // email: string
    // name: string
    // image: string
    // username: string
    // role: 'admin' | 'department' | 'student' | 'lecturer'
    // nim?: string
    // nip?: string
    // name: string
    // year?: string
    // email: string
    // address?: string
    // province?: string
    // city?: string
    // phone: string
    // status?: 'absent' | 'active' | 'leave' | 'dropout'
    // id_lecturer?: string
    nip?: string
    nim?: string
    name: string
    year?: string
    email: string
    address?: string
    province?: string
    city?: string
    phone: string
    status?: 'absent' | 'active' | 'leave' | 'dropout'
    id_lecturer?: string
    nip?: string
    role: 'admin' | 'department' | 'student' | 'lecturer'
    id: string
    image: string
    username: string

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
