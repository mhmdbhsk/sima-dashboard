import { studentStatus } from '../enum/status'

export interface StudentDashboardAdminResponseDto {
  sudahMemilikiAkun: number
  belumMemilikiAkun: number
}
export interface LecturerDashboardAdminResponseDto {
  sudahMemilikiAkun: number
  belumMemilikiAkun: number
}

export interface LecturerDropdownListResponseDto {
  nip: string
  nama: string
}

export interface LecturerAccountResponseDto {
  currentPage: number
  maxPage: number
  list: any[]
}

export interface StudentAccountResponseDto {
  currentPage: number
  maxPage: number
  list: any[]
}

export interface CreateStudentPayloadDto {
  username: string
  namaLengkap: string
  nim: string
  angkatan: string
  password: string
  status: studentStatus
  jalurMasuk: string
  dosenWali: string
}

export interface CreateLecturerPayloadDto {
  username: string
  namaLengkap: string
  nip: string
  password: string
}

export interface CreateBulkStudentsPayloadDto {
  dokumen: File
}

export interface CreateStudentResponseDto {
  message: string
}

export interface StudentLecturerStatusResponseDto {
  data: StudentLecturerStatusResponseDataDto
  message: string
}

export interface StudentLecturerStatusResponseDataDto {
  statusAktif: string
}
