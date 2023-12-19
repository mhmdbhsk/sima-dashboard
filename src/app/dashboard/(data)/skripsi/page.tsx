'use client'

import { IconArrowUp, IconStatusChange } from '@tabler/icons-react'
import { useQueries } from '@tanstack/react-query'

import DialogSkripsi from './components/dialog-create-skripsi'
import DialogDetailSkripsi from './components/dialog-detail-skripsi'
import HistoryCard from './components/history-card'

import Header from '@/components/header'
import { OverviewCard } from '@/components/overview/card'
import { latestVerificationStatus } from '@/components/status-badge'
import { profileService } from '@/services/profile-service'
import { studentsService } from '@/services/students-service'

export default function SkripsiStudent() {
  const [student, listSkripsi] = useQueries({
    queries: [
      {
        queryKey: ['profileStudent'],
        queryFn: profileService.getProfileStudent,
      },
      {
        queryKey: ['listSkripsi'],
        queryFn: studentsService.getListSkripsi,
      },
    ],
  })

  const isLoading = student.isLoading || listSkripsi.isLoading
  const lastSkripsi = listSkripsi?.data?.data.data[listSkripsi?.data?.data.data?.length - 1]
  const studentData = student?.data?.data.data
  const skripsiData = listSkripsi?.data?.data.data

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Skripsi</span>

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <DialogSkripsi />
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
          parameter='Status Skripsi Terakhir'
          value={latestVerificationStatus(lastSkripsi?.statusValidasi!)}
          icon={IconStatusChange}
        />
      </div>
      <div className='flex w-full flex-col gap-4 bg-content p-4 rounded-md'>
        <div>
          <div className='mb-3'>
            <span className='font-medium'>Riwayat Laporan Perkembangan</span>
          </div>

          <div className='flex flex-col gap-3'>
            {isLoading || !listSkripsi ? (
              <span>Memuat</span>
            ) : (
              skripsiData?.map((item) => <DialogDetailSkripsi trigger={<HistoryCard data={item} />} data={item} />)
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
