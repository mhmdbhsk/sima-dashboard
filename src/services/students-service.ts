import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import {
  IRSListReponseDto,
  KHSListReponseDto,
  PKLListReponseDto,
  SkripsiListReponseDto,
  EntryIRSPayloadDto,
  EntryKHSPayloadDto,
} from '@/lib/dto/student'

export const studentsService = {
  async getListIrs() {
    const res: AxiosResponse<IRSListReponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/get-irs`)

    return res
  },
  async getListKhs() {
    const res: AxiosResponse<KHSListReponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/get-khs`)

    return res
  },
  async getListPkl() {
    const res: AxiosResponse<PKLListReponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/get-pkl`)

    return res
  },
  async getListSkripsi() {
    const res: AxiosResponse<SkripsiListReponseDto> = await axiosInterceptorInstance.get(`/mahasiswa/get-skripsi`)

    return res
  },
  async createEntryIRS(data: EntryIRSPayloadDto) {
    const res: AxiosResponse<SkripsiListReponseDto> = await axiosInterceptorInstance.post(`/mahasiswa/entry-irs`, data)

    return res
  },
  async createEntryKHS(data: EntryKHSPayloadDto) {
    const res: AxiosResponse<SkripsiListReponseDto> = await axiosInterceptorInstance.post(`/mahasiswa/entry-khs`, data)

    return res
  },
  async createBulk(data: any) {
    const res: AxiosResponse = await axiosInterceptorInstance.post(`/operator/batch-add-mahasiswa/`, data)

    return res
  },
}
