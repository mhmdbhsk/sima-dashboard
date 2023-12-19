export interface StudentProfileResponseDto {
  message: string
  data: StudentProfileResponseDataDto
}

export interface StudentProfileResponseDataDto {
  foto: string
  kodeKab: string
  kodeProv: string
  nama: string
  nim: string
  namaDosenWali: string
  nipDosenWali: string
  semester: number
  status: string
  jalurMasuk: string
  email?: any
  noHP?: any
  ipk: string
  jumlahSksKumulatif: string
  angkatan: string
}

export interface UpdateDataFirstTimePayloadDto {
  nim: string
  email: string
  password: string
  alamat: string
  kodeKab: string
  noHP: string
  foto: any
}
