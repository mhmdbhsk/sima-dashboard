import { Badge } from './ui/badge'

import { activeStatus } from '@/lib/enum/status'

export const renderStatusActive = (status: activeStatus) => {
  switch (status) {
    case activeStatus.Aktif:
      return (
        <Badge className='flex gap-2 p-1.5 pl-3 shadow-none rounded-xl bg-transparent border border-border text-black dark:text-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200'>
          Status Mahasiswa
          <Badge className='w-max shadow-none font-medium bg-green-500 hover:bg-green-400'>Aktif</Badge>
        </Badge>
      )
    case activeStatus.Cuti:
      return (
        <Badge className='flex gap-2 p-1.5 pl-3 shadow-none rounded-xl bg-transparent border border-border text-black dark:text-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200'>
          Status Mahasiswa
          <Badge className='w-max shadow-none font-medium bg-red-500 hover:bg-red-400'>Cuti</Badge>
        </Badge>
      )
    default:
      return null
  }
}

export const renderStatusValidation = (status: boolean) => {
  switch (status) {
    case true:
      return (
        <Badge className='flex gap-2 p-1.5 pl-3 shadow-none rounded-xl bg-transparent border border-border text-black dark:text-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200'>
          Status Verifikasi
          <Badge className='w-max shadow-none font-medium bg-green-500 hover:bg-green-400'>Sudah Diverifikasi</Badge>
        </Badge>
      )
    case false:
      return (
        <Badge className='flex gap-2 p-1.5 pl-3 shadow-none rounded-xl bg-transparent border border-border text-black dark:text-gray-200 dark:hover:bg-gray-900 hover:bg-gray-200'>
          Status Verifikasi
          <Badge className='w-max shadow-none font-medium bg-red-500 hover:bg-red-400'>Verifikasi Ditolak</Badge>
        </Badge>
      )
    default:
      return null
  }
}

export const latestVerificationStatus = (status: boolean) => {
  switch (status) {
    case true:
      return 'Sudah Diverifikasi'
    case false:
      return 'Verifikasi Ditolak'
    default:
      return 'Menunggu Verifikasi'
  }
}
