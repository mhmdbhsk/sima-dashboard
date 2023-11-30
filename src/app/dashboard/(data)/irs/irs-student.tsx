'use client'

import { IconArrowUp, IconStatusChange } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

import DialogIrs from './components/dialog-create-irs'
import DialogDetailIRS from './components/dialog-detail-irs'
import HistoryCard from './components/history-card'

import Header from '@/components/header'
import { OverviewCard } from '@/components/overview/card'
import { irsDummyDataType, irsStatus } from '@/config/dummy-data'

type irsResponseDto = {
  data: irsDummyDataType[]
}

export default function IrsStudent() {
  const { data: irsData, isLoading: irsLoading } = useQuery({
    queryKey: ['irs'],
    queryFn: async () => {
      const res: AxiosResponse<irsResponseDto> = await axios.get('/api/dummy/irs')

      return res.data
    },
  })

  const latestVerificationStatus = () => {
    switch (irsData?.data[irsData.data.length - 1].status) {
      case irsStatus.accepted:
        return 'Sudah Diverifikasi'
      case irsStatus.rejected:
        return 'Verifikasi Ditolak'
      default:
        return 'Menunggu Verifikasi'
    }
  }

  const latestSemester = () => irsData?.data[irsData.data.length - 1].semester

  const totalSks = () => irsData?.data.reduce((acc, curr) => acc + curr.sks, 0)

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>IRS</span>

        <div className='flex items-center space-x-1 rounded-md text-secondary-foreground'>
          <DialogIrs />
        </div>
      </Header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full mb-2'>
        <OverviewCard parameter='Semester saat ini' value={`Semester ${latestSemester()}`} icon={IconArrowUp} />
        <OverviewCard parameter='Total SKS Diambil' value={`${totalSks()} SKS`} icon={IconStatusChange} />
        <OverviewCard parameter='Status IRS Terakhir' value={latestVerificationStatus()} icon={IconStatusChange} />
      </div>
      <div className='flex w-full flex-col gap-4 bg-content p-4 rounded-md'>
        <div>
          <div className='mb-3'>
            <span className='font-medium'>Riwayat Laporan Perkembangan</span>
          </div>

          <div className='flex flex-col gap-3'>
            {irsLoading ? (
              <span>Memuat</span>
            ) : (
              irsData?.data.map((item, index) => <DialogDetailIRS trigger={<HistoryCard data={item} />} data={item} />)
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
