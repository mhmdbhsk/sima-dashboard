import { activeStatus } from '../enum/status'

export interface StudentDetailReponseDto {
  message: string
  data: StudentDetailReponseDataDto
}

interface StudentDetailReponseDataDto {
  nama: string
  nim: string
  angkatan: number
  statusAktif: string
  jalurMasuk: string
  semester: number
  foto?: any
  alamat?: any
  email?: any
  noHP?: any
  namaDoswal: string
  nipDoswal: string
  fotoDoswal: string
  dataAkademik: AcademicData
}

export interface AcademicData {
  [semester: number]: AcademicDatum[]
}

export interface AcademicDatum {
  type: 'irs' | 'khs' | 'pkl' | 'skripsi'
  available: boolean
  semester: string
  status?: string
  jumlahSks?: string
  fileIrs?: string
  statusValidasi: boolean
  jumlahSksSemester?: string
  ips?: string
  jumlahSksKumulatif?: string
  ipk?: string
  fileKhs?: string
  nilai?: string
  tanggalLulusSidang?: string
  lamaStudi?: number
  fileSkripsi?: string
}

export interface IrsStudentProgressDto {
  type: string
  available: boolean
  semester: string
  status?: string
  jumlahSks?: string
  fileIrs?: string
  statusValidasi: boolean
  jumlahSksSemester?: string
  ips?: string
  jumlahSksKumulatif?: string
  ipk?: string
  fileKhs?: string
  nilai?: string
  tanggalLulusSidang?: string
  lamaStudi?: number
  fileSkripsi?: string
}

export interface PklStudentProgressDto {
  type: string
  available: boolean
  semester: string
  status?: string
  jumlahSks?: string
  fileIrs?: string
  statusValidasi: boolean
  jumlahSksSemester?: string
  ips?: string
  jumlahSksKumulatif?: string
  ipk?: string
  fileKhs?: string
  nilai?: string
  filePkl?: string
}

export interface KhsStudentProgressDto {
  type: string
  available: boolean
  semester: string
  status: string
  jumlahSks?: string
  fileIrs?: string
  statusValidasi: boolean
  jumlahSksSemester?: string
  ips?: string
  jumlahSksKumulatif?: string
  ipk?: string
  fileKhs?: string
}

export interface IRSListReponseDto {
  message: string
  data: IRSListReponseDatumDto[]
}

export interface IRSListReponseDatumDto {
  nim: string
  semester: string
  status: activeStatus
  jumlahSks: string
  fileIrs: string
  statusValidasi: boolean
}

export interface KHSListReponseDto {
  message: string
  data: KHSListReponseDatumDto[]
}

export interface KHSListReponseDatumDto {
  nim: string
  semester: string
  status: activeStatus
  jumlahSksSemester: string
  ips: string
  jumlahSksKumulatif: string
  ipk: string
  fileKhs: string
  statusValidasi: boolean
}

export interface PKLListReponseDto {
  message: string
  data: PKLListReponseDatumDto[]
}

export interface PKLListReponseDatumDto {
  nim: string
  semester: string
  nilai: string
  filePkl: string
  statusValidasi: boolean
}

export interface SkripsiListReponseDto {
  message: string
  data: SkripsiListReponseDatumDto[]
}

export interface SkripsiListReponseDatumDto {
  nim: string
  semester: string
  nilai: string
  tanggalLulusSidang: string
  lamaStudi: number
  fileSkripsi: string
  statusValidasi: boolean
}

export interface EntryIRSPayloadDto {
  nim: string
  semester: string
  status: string
  jumlahSks: string
  dokumen: File
}

export interface EntryKHSPayloadDto {
  nim: string
  semester: string
  status: string
  jumlahSksSemester: string
  jumlahSksKumulatif: string
  ips: string
  ipk: string
  dokumen: File
}
