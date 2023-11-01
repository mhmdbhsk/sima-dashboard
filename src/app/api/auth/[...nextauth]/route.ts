import NextAuth from 'next-auth'

import { authConfigs } from '@/configs'

const handler = NextAuth(authConfigs)

export { handler as GET, handler as POST }
