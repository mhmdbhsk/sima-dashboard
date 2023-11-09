import { IconBuildingBank, IconChalkboard, IconSchool, IconUserCog, IconUsersGroup } from '@tabler/icons-react'

import { OverviewCard } from './card'

export default function AdminOverview() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        <OverviewCard parameter='Jumlah Akun Total' value='150' icon={IconUsersGroup} />
        <OverviewCard parameter='Jumlah Akun Mahasiswa' value='130' icon={IconSchool} />
        <OverviewCard parameter='Jumlah Akun Dosen' value='10' icon={IconChalkboard} />
        <OverviewCard parameter='Jumlah Akun Departemen' value='5' icon={IconBuildingBank} />
        <OverviewCard parameter='Jumlah Akun Admin' value='5' icon={IconUserCog} />
      </div>
    </div>
  )
}
