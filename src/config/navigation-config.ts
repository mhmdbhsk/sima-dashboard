import {
  IconCheckupList,
  IconDeviceLaptop,
  IconHome,
  IconReportAnalytics,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-react'

const studentNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'IRS', href: '/dashboard/irs', icon: IconCheckupList },
  { name: 'KHS', href: '/dashboard/khs', icon: IconReportAnalytics },
  { name: 'PKL', href: '/dashboard/internship', icon: IconDeviceLaptop },
  { name: 'Skripsi', href: '/dashboard/thesis', icon: IconReportAnalytics },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: IconSettings },
]

const lecturerNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'Mahasiswa Perwalian', href: '/dashboard/students', icon: IconUsersGroup },
  { name: 'Verifikasi IRS', href: '/dashboard/verify/irs', icon: IconCheckupList },
  { name: 'Verifikasi KHS', href: '/dashboard/verify/khs', icon: IconReportAnalytics },
  { name: 'Verifikasi PKL', href: '/dashboard/verify/internship', icon: IconDeviceLaptop },
  { name: 'Verifikasi Skripsi', href: '/dashboard/verify/thesis', icon: IconReportAnalytics },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: IconSettings },
]

const departmentNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'IRS', href: '/dashboard/irs', icon: IconCheckupList },
  { name: 'KHS', href: '/dashboard/khs', icon: IconReportAnalytics },
  { name: 'PKL', href: '/dashboard/internship', icon: IconDeviceLaptop },
  { name: 'Skripsi', href: '/dashboard/thesis', icon: IconReportAnalytics },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: IconSettings },
]

const operatorNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'Pengguna', href: '/dashboard/users', icon: IconUsersGroup },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: IconSettings },
]

export const navigationLists = {
  student: studentNavigationLists,
  lecturer: lecturerNavigationLists,
  department: departmentNavigationLists,
  operator: operatorNavigationLists,
}
