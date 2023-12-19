import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import {
  GetListIRSValidationResponseDto,
  GetListKHSValidationResponseDto,
  GetListPKLValidationResponseDto,
  GetListSkripsiValidationResponseDto,
  ValidateIRSPayloadDto,
  ValidateKHSPayloadDto,
  ValidatePKLPayloadDto,
  ValidateSkripsiPayloadDto,
  ValidateIRSResponseDto,
  ValidateKHSResponseDto,
  ValidatePKLResponseDto,
  ValidateSkripsiResponseDto,
} from '@/lib/dto/lecturer'
import { StudentProgressResponseDto } from '@/lib/dto/progress'
import { StudentDetailReponseDto } from '@/lib/dto/student'

export const lecturerService = {
  async getListValidationStudentIRS() {
    const res: AxiosResponse<GetListIRSValidationResponseDto> =
      await axiosInterceptorInstance.get(`/dosen/status-validasi/irs`)

    return res
  },
  async getListValidationStudentKHS() {
    const res: AxiosResponse<GetListKHSValidationResponseDto> =
      await axiosInterceptorInstance.get(`/dosen/status-validasi/khs`)

    return res
  },
  async getListValidationStudentPKL() {
    const res: AxiosResponse<GetListPKLValidationResponseDto> =
      await axiosInterceptorInstance.get(`/dosen/status-validasi/pkl`)

    return res
  },
  async getListValidationStudentSkripsi() {
    const res: AxiosResponse<GetListSkripsiValidationResponseDto> =
      await axiosInterceptorInstance.get(`/dosen/status-validasi/skripsi`)

    return res
  },
  async validateStudentIRS(data: ValidateIRSPayloadDto) {
    console.log(data)
    const res: AxiosResponse<ValidateIRSResponseDto> = await axiosInterceptorInstance.put(`/dosen/validasi/irs`, data)

    return res
  },
  async validateStudentKHS(data: ValidateKHSPayloadDto) {
    const res: AxiosResponse<ValidateKHSResponseDto> = await axiosInterceptorInstance.put(`/dosen/validasi/khs`, data)

    return res
  },
  async validateStudentPKL(data: ValidatePKLPayloadDto) {
    const res: AxiosResponse<ValidatePKLResponseDto> = await axiosInterceptorInstance.put(`/dosen/validasi/pkl`, data)

    return res
  },
  async validateStudentSkripsi(data: ValidateSkripsiPayloadDto) {
    const res: AxiosResponse<ValidateSkripsiResponseDto> = await axiosInterceptorInstance.put(
      `/dosen/validasi/skripsi`,
      data
    )

    return res
  },
  async getStudentProgress(nim: string) {
    const res: AxiosResponse<any> = await axiosInterceptorInstance.get(`/dosen/data-akademik-mhs`, {
      params: {
        nim,
      },
    })

    return res
  },
  async getListProgress() {
    const res: AxiosResponse<StudentProgressResponseDto> = await axiosInterceptorInstance.get(`/dosen/daftar-status`)

    return res
  },
  async getDetailProgressByNim(nim: string) {
    const res: AxiosResponse<StudentDetailReponseDto> = await axiosInterceptorInstance.get('/dosen/data-akademik-mhs', {
      params: {
        nim,
      },
    })

    return res
  },
}
