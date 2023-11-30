import { Badge } from './ui/badge'

import { irsStatus } from '@/config/dummy-data'

export const renderStatus = (status: string) => {
  switch (status) {
    case irsStatus.accepted:
      return <Badge className='w-max shadow-none font-medium bg-green-500 hover:bg-green-400'>Sudah Diverifikasi</Badge>
    case irsStatus.rejected:
      return <Badge className='w-max shadow-none font-medium bg-red-500 hover:bg-red-400'>Verifikasi Ditolak</Badge>
    default:
      return (
        <Badge className='w-max shadow-none font-medium bg-orange-500 hover:bg-orange-400'>Menunggu Verifikasi</Badge>
      )
  }
}
