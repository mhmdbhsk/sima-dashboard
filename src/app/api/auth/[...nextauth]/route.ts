import NextAuth from 'next-auth'

import { authConfigs } from '@/config'

const handler = NextAuth(authConfigs)

export { handler as GET, handler as POST }
