'use client'

import { IconCheck, IconStack2, IconX } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

import { columns } from './data/columns'
import data from './data/users.json'

import { DataTable } from '@/components/data-table/data-table'
import Header from '@/components/header'
import { OverviewCard } from '@/components/overview/card'
import { irsDummyDataType } from '@/config/dummy-data'

type irsResponseDto = {
  data: irsDummyDataType[]
}

export default function IrsDepartment() {
  const { data: irsData, isLoading: irsLoading } = useQuery({
    queryKey: ['irs'],
    queryFn: async () => {
      const res: AxiosResponse<irsResponseDto> = await axios.get('/api/dummy/irs')

      return res.data
    },
  })

  return (
    <main>
      <Header>
        <span className='font-bold text-xl'>Verifikasi IRS</span>
      </Header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full mb-2'>
        <OverviewCard parameter='Total Permintaan' value={18} icon={IconStack2} />
        <OverviewCard parameter='Total Disetujui' value={16} icon={IconCheck} />
        <OverviewCard parameter='Total Ditolak' value={2} icon={IconX} />
      </div>
      <div className='flex w-full flex-col gap-4 bg-content p-4 rounded-md'>
        <div>
          <div className='mb-3'>
            <span className='font-medium'>Daftar Laporan Perkembangan</span>
          </div>

          <div className='flex flex-col gap-3'>
            {irsLoading ? <span>Memuat</span> : <DataTable data={data} columns={columns} searchBy='name' />}
          </div>
        </div>
      </div>
    </main>
  )
}
