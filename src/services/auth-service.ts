import { axiosInterceptorInstance } from '@/config'

export const authService = {
  async login(email: string, password: string) {
    const response = await axiosInterceptorInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
    })

    return response
  },
}
