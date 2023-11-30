import { IconChalkboard, IconUsersGroup } from '@tabler/icons-react'

import { OverviewCard } from './card'

export default function DepartmentOverview() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        <OverviewCard parameter='Jumlah Mahasiswa' value='150' icon={IconUsersGroup} />
        <OverviewCard parameter='Jumlah Dosen' value='130' icon={IconChalkboard} />
      </div>
    </div>
  )
}
