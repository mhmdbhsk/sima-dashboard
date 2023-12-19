import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'

export const departmentService = {
  async getStudentProgress(nim: string) {
    const res: AxiosResponse<any> = await axiosInterceptorInstance.get(`/departemen/data-akademik-mhs`, {
      params: {
        nim,
      },
    })

    return res
  },
}
