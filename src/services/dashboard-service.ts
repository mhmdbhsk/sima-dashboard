import { AxiosResponse } from 'axios'

import axiosInterceptorInstance from '@/config/axios-config'
import { DashboardStudentResponseDto } from '@/lib/dto/dashboard.dto'

export const dashboardService = {
  async getDashboardStudentData() {
    const res: AxiosResponse<DashboardStudentResponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/dashboard`)

    return res
  },
  async getDashboardData() {
    const res: AxiosResponse<DashboardStudentResponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/dashboard`)

    return res
  },
}
