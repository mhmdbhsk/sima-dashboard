import { IconCheckupList, IconUsersGroup } from '@tabler/icons-react'

import { OverviewCard } from './card'

export default function LecturerOverview() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        <OverviewCard parameter='Jumlah Mahasiswa Perwalian' value='150' icon={IconUsersGroup} />
        <OverviewCard parameter='Jumlah IRS Menunggu Verifikasi' value='130' icon={IconCheckupList} />
        <OverviewCard parameter='Jumlah KHS Menunggu Verifikasi' value='10' icon={IconCheckupList} />
        <OverviewCard parameter='Jumlah PKL Menunggu Verifikasi' value='5' icon={IconCheckupList} />
      </div>
    </div>
  )
}
