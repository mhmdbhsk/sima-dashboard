'use client'

import { IconArrowUp, IconStatusChange } from '@tabler/icons-react'
import { useQueries } from '@tanstack/react-query'

import DialogIrs from './components/dialog-create-irs'
import DialogDetailIRS from './components/dialog-detail-irs'
import HistoryCard from './components/history-card'

import Header from '@/components/header'
import { OverviewCard } from '@/components/overview/card'
import { latestVerificationStatus } from '@/components/status-badge'
import { profileService } from '@/services/profile-service'
import { studentsService } from '@/services/students-service'

export default function IrsStudent() {
  const [student, listIrs] = useQueries({
    queries: [
      {
        queryKey: ['profileStudent'],
        queryFn: profileService.getProfileStudent,
      },
      {
        queryKey: ['listIrs'],
        queryFn: studentsService.getListIrs,
      },
    ],
  })

  const isLoading = student.isLoading || listIrs.isLoading
  const lastIrs = listIrs?.data?.data.data[listIrs?.data?.data.data?.length - 1]
  const studentData = student?.data?.data.data
  const irsData = listIrs?.data?.data.data

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>IRS</span>

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <DialogIrs />
        </div>
      </Header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full mb-2'>
        <OverviewCard parameter='Semester saat ini' value={`Semester ${studentData?.semester}`} icon={IconArrowUp} />
        <OverviewCard
          parameter='Total SKS Diambil'
          value={`${studentData?.jumlahSksKumulatif} SKS`}
          icon={IconStatusChange}
        />
        <OverviewCard
          parameter='Status IRS Terakhir'
          value={latestVerificationStatus(lastIrs?.statusValidasi!)}
          icon={IconStatusChange}
        />
      </div>
      <div className='flex w-full flex-col gap-4 bg-content p-4 rounded-md'>
        <div>
          <div className='mb-3'>
            <span className='font-medium'>Riwayat Laporan Perkembangan</span>
          </div>

          <div className='flex flex-col gap-3'>
            {isLoading || !listIrs ? (
              <span>Memuat</span>
            ) : (
              irsData?.map((item) => <DialogDetailIRS trigger={<HistoryCard data={item} />} data={item} />)
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
