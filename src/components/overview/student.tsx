import { IconArrowUp, IconStatusChange } from '@tabler/icons-react'

import { OverviewCard } from './card'

export default function StudentOverview() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        <OverviewCard parameter='SKS Ditempuh' value='87 SKS' icon={IconArrowUp} />
        <OverviewCard parameter='Semester saat ini' value='Semester 5' icon={IconArrowUp} />
        <OverviewCard parameter='IP Kumulatif' value='3.57' icon={IconArrowUp} />
        <OverviewCard parameter='IP Semester' value='3.8' icon={IconArrowUp} />
        <OverviewCard parameter='Status IRS' value='Sudah Diverifikasi' icon={IconStatusChange} />
        <OverviewCard parameter='Status KHS' value='Sudah Diverifikasi' icon={IconStatusChange} />
      </div>
    </div>
  )
}
