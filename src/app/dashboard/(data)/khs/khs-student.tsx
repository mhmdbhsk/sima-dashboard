'use client'

import { IconArrowUp, IconStatusChange } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

import DialogIrs from './components/dialog-khs'

import Header from '@/components/header'
import { OverviewCard } from '@/components/overview/card'
import { Badge } from '@/components/ui/badge'
import { irsStatus } from '@/config/dummy-data'
import * as date from '@/utils/date'

type irsResponseDto = {
  data: {
    createdAt: string
    updatedAt: string
    semester: number
    status: irsStatus
    id: string
    id_student: string
    file: string
    sks: number
    verification_notes: string
  }[]
}

export default function KhsStudent() {
  const renderStatus = (status: string) => {
    switch (status) {
      case irsStatus.accepted:
        return (
          <Badge className='w-max shadow-none font-medium bg-green-500 hover:bg-green-400'>Sudah Diverifikasi</Badge>
        )
      case irsStatus.rejected:
        return <Badge className='w-max shadow-none font-medium bg-red-500 hover:bg-red-400'>Verifikasi Ditolak</Badge>
      default:
        return (
          <Badge className='w-max shadow-none font-medium bg-orange-500 hover:bg-orange-400'>Menunggu Verifikasi</Badge>
        )
    }
  }

  const { data: irsData, isLoading: irsLoading } = useQuery({
    queryKey: ['khs'],
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
              irsData?.data.map((item, index) => (
                <div
                  className='bg-background border border-muted p-4 rounded-xl flex justify-between text-sm cursor-pointer'
                  key={index}
                >
                  <div className='flex gap-2 grow'>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
                      <span className='opacity-50'>Semester</span>
                      <span>{item.semester}</span>
                    </div>
                    <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
                      <span className='opacity-50'>Jumlah SKS</span>
                      <span>{item.sks}</span>
                    </div>
                  </div>

                  <div className='flex flex-col items-end justify-between'>
                    {renderStatus(item.status)}
                    <span className='opacity-50'>{date.dateFormatter(item.updatedAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
