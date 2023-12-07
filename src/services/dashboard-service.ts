import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import { DashboardStudentResponseDto } from '@/lib/dto/dashboard'

export const dashboardService = {
  async getDashboardStudent() {
    const res: AxiosResponse<DashboardStudentResponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/dashboard`)

    return res
  },
  async getDashboardLecturer() {
    const res: AxiosResponse<DashboardStudentResponseDto> = await axiosInterceptorInstance.get(`/dosen/dashboard`)

    return res
  },
  async getDashboardDepartment() {
    const res: AxiosResponse<DashboardStudentResponseDto> = await axiosInterceptorInstance.get(`/departemen/dashboard`)

    return res
  },
}
