import { IconFileInvoice, IconHome, IconSettings, IconTriangleSquareCircle, IconUsersGroup } from '@tabler/icons-react'

const studentNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'IRS', href: '/dashboard/irs', icon: IconFileInvoice },
  {
    name: 'KHS',
    href: '/dashboard/khs',
    icon: IconFileInvoice,
  },
  { name: 'PKL', href: '/dashboard/internship', icon: IconUsersGroup },
  { name: 'Skripsi', href: '/dashboard/thesis', icon: IconUsersGroup },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: IconSettings },
]

const lecturerNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'Mahasiswa', href: '/dashboard/products', icon: IconTriangleSquareCircle },
  { name: 'IRS', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'KHS', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'PKL', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'Skripsi', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'Pengaturan', href: '/dashboard/settings', icon: IconSettings },
]

const departmentNavigationLists = [
  { name: 'Beranda', href: '/dashboard', icon: IconHome },
  { name: 'IRS', href: '/dashboard/irs', icon: IconFileInvoice },
  {
    name: 'KHS',
    href: '/dashboard/khs',
    icon: IconFileInvoice,
  },
  { name: 'PKL', href: '/dashboard/internship', icon: IconUsersGroup },
  { name: 'Skripsi', href: '/dashboard/thesis', icon: IconUsersGroup },
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
