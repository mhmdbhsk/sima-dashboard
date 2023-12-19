import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import { AuthLoginResponseDto } from '@/lib/dto/auth'

export const authService = {
  async kota(keywords: string) {
    const res: AxiosResponse<AuthLoginResponseDto> = await axiosInterceptorInstance.get(`/login`, {
      params: {
        keywords,
      },
    })

    return res
  },
}
