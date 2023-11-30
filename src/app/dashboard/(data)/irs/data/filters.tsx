import { IconUserStar, IconBuildingBank, IconChalkboard, IconSchool } from '@tabler/icons-react'

export const roles = [
  {
    value: 'admin',
    label: 'Admin',
    icon: IconUserStar,
  },
  {
    value: 'student',
    label: 'Mahasiswa',
    icon: IconSchool,
  },
  {
    value: 'lecturer',
    label: 'Dosen',
    icon: IconChalkboard,
  },
  {
    value: 'department',
    label: 'Departemen',
    icon: IconBuildingBank,
  },
]
