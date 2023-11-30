export const dummyData = [
  {
    nim: '24060121120008',
    name: 'Tiara Fitra Ramadhani Siregar',
    year: '2021',
    email: 'tiara@gmail.com',
    address: 'Rusunawa Undip',
    province: 'Sumatera Utara',
    city: 'Padangsidempuan',
    phone: '08122122312',
    status: 'active',
    id_lecturer: '198203092006041002',
    role: 'student',
    id: 'f53eb534-3808-43fc-b3f5-147774916a7c',
    image: 'https://github.com/qnyara5.png',
    username: '2',
  },
  {
    nip: 'H.7.198611152023101001',
    name: 'Beny Nugroho, S.Kom.',
    email: 'benynugrohofsm@staff.undip.ac.id',
    phone: '0812122222',
    role: 'admin',
    id: '37678dd6-84c6-4897-91f7-4bbf89f8e5af',
    image: 'https://github.com/mhmdbhsk.png',
    username: '1',
  },
  {
    nip: '198203092006041002',
    name: 'Dr. Eng. Adi Wibowo, S.Si., M.Kom.',
    email: 'adiwibowo@lecturer.undip.ac.id',
    phone: '0812122222',
    role: 'lecturer',
    id: 'c00d99ad-b40f-40eb-a129-98edd245fb16',
    image: 'https://github.com/mhmdbhsk.png',
    username: '3',
  },
  {
    nip: 'H.7.198911012023102001',
    name: 'Annisa Istiadah N., A.Md.',
    email: 'annisaistiadah@staff.undip.ac.id',
    phone: '0812122222',
    role: 'department',
    id: 'f1594449-c37e-421e-b781-9b7795150820',
    image: 'https://github.com/mhmdbhsk.png',
    username: '4',
  },
]

export enum irsStatus {
  accepted = 'accepted',
  rejected = 'rejected',
  pending = 'pending',
}

export type irsDummyDataType = {
  createdAt: string
  updatedAt: string
  semester: number
  status: irsStatus
  id: string
  id_student: string
  file: string
  sks: number
  verification_notes: null | string
}

export const irsDummyData = [
  {
    createdAt: '2023-07-09T00:15:00Z',
    updatedAt: '2023-07-10T00:31:36Z',
    semester: 1,
    status: irsStatus.accepted,
    id: 'ee0cb503-7df4-4489-8449-88f3c6622543',
    id_student: 'f53eb534-3808-43fc-b3f5-147774916a7c',
    file: 'irs.pdf',
    sks: 24,
    verification_notes: null,
  },
  {
    createdAt: '2023-08-29T00:15:00Z',
    updatedAt: '2023-08-30T00:31:36Z',
    semester: 2,
    status: irsStatus.accepted,
    id: 'ee0cb503-7df4-4489-8449-88f3c6622543',
    id_student: 'f53eb534-3808-43fc-b3f5-147774916a7c',
    file: 'irs.pdf',
    sks: 24,
    verification_notes: null,
  },
  {
    createdAt: '2023-09-16T00:15:00Z',
    updatedAt: '2023-09-16T00:31:36Z',
    semester: 3,
    status: irsStatus.accepted,
    id: 'ee0cb503-7df4-4489-8449-88f3c6622543',
    id_student: 'f53eb534-3808-43fc-b3f5-147774916a7c',
    file: 'irs.pdf',
    sks: 24,
    verification_notes: null,
  },
  {
    createdAt: '2023-10-31T00:15:00Z',
    updatedAt: '2023-10-31T00:31:36Z',
    semester: 4,
    status: irsStatus.rejected,
    id: 'ee0cb503-7df4-4489-8449-88f3c6622543',
    id_student: 'f53eb534-3808-43fc-b3f5-147774916a7c',
    file: 'irs.pdf',
    sks: 24,
    verification_notes: 'Masukin yang bener tod, jangan ngasal!',
  },
  {
    createdAt: '2023-11-10T00:15:00Z',
    updatedAt: '2023-11-10T00:31:36Z',
    semester: 5,
    status: irsStatus.pending,
    id: 'ee0cb503-7df4-4489-8449-88f3c6622543',
    id_student: 'f53eb534-3808-43fc-b3f5-147774916a7c',
    file: 'irs.pdf',
    sks: 24,
    verification_notes: null,
  },
]
