export interface DashboardStudentResponseDto {
  ipkNow: number
  sksNow: number
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
  [semester: number]: {
    type: 'irs' | 'khs'
    available: boolean
    semester: string
  }[]
}

export interface DashboardDepartementResponseDto {
  message: string
  data: DashboardDepartementResponseDataDto
}

export interface DashboardDepartementResponseDataDto {
  irs: DashboardDepartementResponseIrsDto
  khs: DashboardDepartementResponseKhsDto
  pkl: DashboardDepartementResponsePklSkripsiDto
  skripsi: DashboardDepartementResponsePklSkripsiDto
}

export interface DashboardDepartementResponsePklSkripsiDto {
  notValidated: number
  lulus: number
  blmLulus: number
}

export interface DashboardDepartementResponseKhsDto {
  notValidated: number
  validated: number
  noEntry: number
}

export interface DashboardDepartementResponseIrsDto {
  notValidated: number
  validate: number
  noEntry: number
}
