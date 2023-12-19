import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import { StudentProfileResponseDto, UpdateDataFirstTimePayloadDto } from '@/lib/dto/profile'

export const profileService = {
  async getProfileStudent() {
    const res: AxiosResponse<StudentProfileResponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/profile`)

    return res
  },
  async getProfileLecturer() {
    const res: AxiosResponse<StudentProfileResponseDto> = await axiosInterceptorInstance.get(`/dosen/profile`)

    return res
  },
  async getProfileDepartment() {
    const res: AxiosResponse<StudentProfileResponseDto> = await axiosInterceptorInstance.get(`/departemen/profile`)

    return res
  },
  async getProfileAdmin() {
    const res: AxiosResponse<StudentProfileResponseDto> = await axiosInterceptorInstance.get(`/departemen/profile`)

    return res
  },
  async updateDataFirstTime(data: UpdateDataFirstTimePayloadDto) {
    const res: AxiosResponse<StudentProfileResponseDto> = await axiosInterceptorInstance.post(
      `/mahasiswa/update-data`,
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    return res
  },
}
