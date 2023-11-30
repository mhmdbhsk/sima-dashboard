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
