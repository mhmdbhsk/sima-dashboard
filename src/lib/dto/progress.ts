export interface StudentProgressRecapPKLResponseDto {
  message: string
  data: StudentProgressRecapPKLResponseDatumDto[]
}

export interface StudentProgressRecapPKLResponseDatumDto {
  angkatan: string
  lulus: number
  belum: number
}

export interface StudentProgressRecapSkripsiResponseDto {
  message: string
  data: StudentProgressRecapSkripsiResponseDatumDto[]
}

export interface StudentProgressRecapSkripsiResponseDatumDto {
  angkatan: string
  lulus: number
  belum: number
}

export interface StudentProgressResponseDto {
  message: string
  data: StudentProgressResponseDataDto
}

export interface StudentProgressResponseDataDto {
  currentPage: number
  maxPage: number
  list: StudentProgressResponseListDto[]
}

export interface StudentProgressResponseListDto {
  nim: string
  nama: string
  angkatan: number
  statusAktif: string
  jumlahSksKumulatif: number | string
  ipk: number | string
}

export interface RecapProgressResponseDto {
  message: string
  data: RecapProgressResponseDatumDto[]
}

export interface RecapProgressResponseDatumDto {
  angkatan: string
  aktif: number
  cuti: number
  mangkir: number
  dropout: number
  undurDiri: number
  lulus: number
  meninggalDunia: number
}
