import {
  IconCheckupList,
  IconDeviceLaptop,
  IconFileInvoice,
  IconHome,
  IconReportAnalytics,
  IconSettings,
  IconTriangleSquareCircle,
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
  { name: 'Mahasiswa', href: '/dashboard/products', icon: IconTriangleSquareCircle },
  { name: 'IRS', href: '/dashboard/irs', icon: IconCheckupList },
  { name: 'KHS', href: '/dashboard/khs', icon: IconReportAnalytics },
  { name: 'PKL', href: '/dashboard/internship', icon: IconDeviceLaptop },
  { name: 'Skripsi', href: '/dashboard/thesis', icon: IconReportAnalytics },
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
