import { activeStatus } from '../enum/status'

export interface GetListIRSValidationResponseDto {
  data: GetListIRSValidationResponseDataDto
  message: string
}

export interface GetListIRSValidationResponseDataDto {
  currentPage: number
  maxPage: number
  list: GetListIRSValidationResponseListDto[]
}

export interface GetListIRSValidationResponseListDto {
  nim: string
  semester: string
  status: string
  jumlahSks: string
  fileIrs: string
  statusValidasi: boolean
  nama: string
  angkatan: number
  statusAktif: activeStatus
}

export interface GetListKHSValidationResponseDto {
  data: GetListKHSValidationResponseDataDto
  message: string
}

export interface GetListKHSValidationResponseDataDto {
  currentPage: number
  maxPage: number
  list: GetListKHSValidationResponseListDto[]
}

export interface GetListKHSValidationResponseListDto {
  nim: string
  semester: string
  status: string
  jumlahSks: string
  fileIrs: string
  statusValidasi: boolean
  nama: string
  angkatan: number
  statusAktif: activeStatus
}

export interface GetListPKLValidationResponseDto {
  data: GetListPKLValidationResponseDataDto
  message: string
}

export interface GetListPKLValidationResponseDataDto {
  currentPage: number
  maxPage: number
  list: GetListPKLValidationResponseListDto[]
}

export interface GetListPKLValidationResponseListDto {
  nim: string
  semester: string
  nilai: string
  filePkl: string
  statusValidasi: boolean
  nama: string
  angkatan: number
  statusAktif: activeStatus
}

export interface GetListSkripsiValidationResponseDto {
  data: GetListSkripsiValidationResponseDataDto
  message: string
}

export interface GetListSkripsiValidationResponseDataDto {
  currentPage: number
  maxPage: number
  list: GetListSkripsiValidationResponseListDto[]
}

export interface GetListSkripsiValidationResponseListDto {
  nim: string
  semester: string
  nilai: string
  tanggalLulusSidang: string
  lamaStudi: number
  fileSkripsi: string
  statusValidasi: boolean
  nama: string
  angkatan: number
  statusAktif: activeStatus
}

export interface ValidateIRSPayloadDto {
  nim: string
  semester: string
  status: activeStatus
  jumlahSks: string
  fileName: string
}

export interface ValidateKHSPayloadDto {
  nim: string
  semester: string
  status: activeStatus
  jumlahSksSemester: string
  ips: string
  jumlahSksKumulatif: string
  ipk: string
  fileName: string
}

export interface ValidatePKLPayloadDto {
  nim: string
  semester: string
  nilai: string
  fileName: string
}

export interface ValidateSkripsiPayloadDto {
  nim: string
  semester: string
  nilai: string
  tanggalLulusSidang: string
  lamaStudi: string
  fileName: string
}

export interface ValidateIRSResponseDto {
  message: string
  data: ValidateIRSResponseDataDto
}

export interface ValidateIRSResponseDataDto {
  nim: string
  semester: string
  status: string
  jumlahSks: string
  fileIrs: string
  statusValidasi: boolean
}

export interface ValidateKHSResponseDto {
  message: string
  data: ValidateKHSResponseDataDto
}

export interface ValidateKHSResponseDataDto {
  nim: string
  semester: string
  status: string
  jumlahSksSemester: string
  ips: string
  jumlahSksKumulatif: string
  ipk: string
  fileKhs: string
  statusValidasi: boolean
}

export interface ValidatePKLResponseDto {
  message: string
  data: ValidatePKLResponseDataDto
}

export interface ValidatePKLResponseDataDto {
  nim: string
  semester: string
  nilai: string
  filePkl: string
  statusValidasi: boolean
}

export interface ValidateSkripsiResponseDto {
  message: string
  data: ValidateSkripsiResponseDataDto
}

export interface ValidateSkripsiResponseDataDto {
  nim: string
  semester: string
  nilai: string
  tanggalLulusSidang: string
  lamaStudi: number
  fileSkripsi: string
  statusValidasi: boolean
}
