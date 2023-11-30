'use client'

import { IconArrowUp } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { OverviewCard } from './card'

import { dashboardService } from '@/services/dashboard-service'

export default function StudentOverview() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboardStudentData,
  })

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2'>
        <OverviewCard parameter='SKS Ditempuh' value={`${data?.data.sksNow ?? '-'} SKS`} icon={IconArrowUp} />
        <OverviewCard
          parameter='Semester saat ini'
          value={`Semester ${data?.data.semester ?? '-'}`}
          icon={IconArrowUp}
        />
        <OverviewCard parameter='IP Kumulatif' value={`${data?.data.ipkNow ?? '-'}`} icon={IconArrowUp} />
      </div>
    </div>
  )
}
