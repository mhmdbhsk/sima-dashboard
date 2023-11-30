import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

export const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    const accessToken = session?.user.accessToken

    if (session) {
      if (config.headers) config.headers['x-access-token'] = `${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      console.log()
      signOut({ callbackUrl: '/login' })
    } else {
      return Promise.reject(error)
    }
  }
)
