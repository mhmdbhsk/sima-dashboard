import { AxiosResponse } from 'axios'

import axiosInterceptorInstance from '@/config/axios-config'
import { AuthLoginResponseDto } from '@/lib/dto/auth.dto'

export const authService = {
  async login(username: string, password: string) {
    const res: AxiosResponse<AuthLoginResponseDto> = await axiosInterceptorInstance.post(`/login`, {
      username,
      password,
    })

    return res
  },
}
