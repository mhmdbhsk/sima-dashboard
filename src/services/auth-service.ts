import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import { AuthLoginResponseDto } from '@/lib/dto/auth'

export const authService = {
  async login(username: string, password: string) {
    const res: AxiosResponse<AuthLoginResponseDto> = await axiosInterceptorInstance.post(`/login`, {
      username,
      password,
    })

    return res
  },
}
