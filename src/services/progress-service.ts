import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import {
  StudentProgressRecapPKLResponseDto,
  StudentProgressRecapSkripsiResponseDto,
  StudentProgressResponseDto,
} from '@/lib/dto/progress'
import { StudentDetailReponseDto } from '@/lib/dto/student'

export const progressService = {
  async getListProgress() {
    const res: AxiosResponse<StudentProgressResponseDto> =
      await axiosInterceptorInstance.get(`/departemen/daftar-status`)

    return res
  },
  async getRecapProgress() {
    const res: AxiosResponse<StudentProgressResponseDto> =
      await axiosInterceptorInstance.get(`/departemen/rekap/status`)

    return res
  },
  async getRecapPKL() {
    const res: AxiosResponse<StudentProgressRecapPKLResponseDto> =
      await axiosInterceptorInstance.get(`/departemen/rekap/pkl`)

    return res
  },
  async getRecapSkripsi() {
    const res: AxiosResponse<StudentProgressRecapSkripsiResponseDto> =
      await axiosInterceptorInstance.get(`/departemen/rekap/skripsi`)

    return res
  },
  async printRecap() {
    const res: AxiosResponse<StudentProgressResponseDto> = await axiosInterceptorInstance.get(
      `/departemen/daftar-status/cetak`
    )

    return res
  },
  async getDetailProgressByNim(nim: string) {
    const res: AxiosResponse<StudentDetailReponseDto> = await axiosInterceptorInstance.get(
      '/departemen/data-akademik-mhs',
      {
        params: {
          nim,
        },
      }
    )

    return res
  },
}
