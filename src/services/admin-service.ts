import { AxiosResponse } from 'axios'

import { axiosInterceptorInstance } from '@/config'
import {
  LecturerAccountResponseDto,
  LecturerDashboardAdminResponseDto,
  LecturerDropdownListResponseDto,
  StudentAccountResponseDto,
  StudentDashboardAdminResponseDto,
  CreateStudentPayloadDto,
  CreateStudentResponseDto,
  CreateBulkStudentsPayloadDto,
  CreateLecturerPayloadDto,
  StudentLecturerStatusResponseDto,
} from '@/lib/dto/admin'

export const adminService = {
  async getLecturerDashboardAdmin() {
    const res: AxiosResponse<LecturerDashboardAdminResponseDto> =
      await axiosInterceptorInstance.get(`/operator/jumlah-akun-dosen`)

    return res
  },
  async getStudentDashboardAdmin() {
    const res: AxiosResponse<StudentDashboardAdminResponseDto> = await axiosInterceptorInstance.get(
      `/operator/jumlah-akun-mahasiswa`
    )

    return res
  },
  async getStudentsList() {
    const res: AxiosResponse<StudentAccountResponseDto> = await axiosInterceptorInstance.get(`/operator/akun-mahasiswa`)

    return res
  },
  async getLecturerList() {
    const res: AxiosResponse<LecturerAccountResponseDto> = await axiosInterceptorInstance.get(`/operator/akun-dosen`)

    return res
  },
  async getLecturerDropdownList() {
    const res: AxiosResponse<LecturerDropdownListResponseDto[]> =
      await axiosInterceptorInstance.get(`/operator/daftar-dosen`)

    return res
  },
  async createStudent(data: CreateStudentPayloadDto) {
    const res: AxiosResponse<CreateStudentResponseDto> = await axiosInterceptorInstance.post(
      `/operator/add-mahasiswa`,
      data
    )

    return res
  },
  async createLecturer(data: CreateLecturerPayloadDto) {
    const res: AxiosResponse<CreateStudentResponseDto> = await axiosInterceptorInstance.post(
      `/operator/add-dosen`,
      data
    )

    return res
  },
  async createBulkStudents(data: CreateBulkStudentsPayloadDto) {
    const res: AxiosResponse<CreateStudentResponseDto> = await axiosInterceptorInstance.post(
      `/operator/batch-add-mahasiswa`,
      data
    )

    return res
  },
  async printLecturerRecap() {
    const res: AxiosResponse<any> = await axiosInterceptorInstance.get(`/operator/akun-dosen/cetak`)

    return res
  },
  async printStudentRecap() {
    const res: AxiosResponse<any> = await axiosInterceptorInstance.get(`/operator/akun-mahasiswa/cetak`)

    return res
  },
  async updateStudentStatus(nim: string, data: CreateLecturerPayloadDto) {
    const res: AxiosResponse<StudentLecturerStatusResponseDto> = await axiosInterceptorInstance.post(
      `/operator/akun-mahasiswa/status-aktif/${nim}`,
      data
    )

    return res
  },
  async updateStatusStudent(nip: string, data: CreateLecturerPayloadDto) {
    const res: AxiosResponse<StudentLecturerStatusResponseDto> = await axiosInterceptorInstance.post(
      `/operator/akun-dosen/status-aktif/${nip}`,
      data
    )

    return res
  },
}
