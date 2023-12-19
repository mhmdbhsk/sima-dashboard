import { IconCheck, IconX } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { irsDummyDataType } from '@/config/dummy-data'
import { dateFormatter } from '@/utils/date'

type HistoryCardProps = {
  data: irsDummyDataType
}

export default function VerificationCard({ data }: HistoryCardProps) {
  return (
    <div
      className='bg-background border border-muted p-4 rounded-xl flex justify-between text-sm cursor-pointer items-center'
      key={data.id}
    >
      <div className='flex gap-2 grow'>
        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Nama</span>
          <span>Tiara Fitra</span>
        </div>
        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>NIM</span>
          <span>240601211200008</span>
        </div>
        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Tanggal Diajukan</span>
          <span>{dateFormatter(data.updatedAt)}</span>
        </div>

        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Semester</span>
          <span>{data.semester}</span>
        </div>
        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Jumlah SKS</span>
          <span>{data.sks}</span>
        </div>
      </div>

      <div className='flex gap-2 h-full'>
        <Button
          size='sm'
          variant='outline'
          className='flex p-2 aspect-square w-[62px] h-[62px] flex-col gap-1 bg-green-500 hover:bg-green-600 text-white hover:text-gray-100 border-none'
        >
          <IconCheck size={16} />
          <span>Setujui</span>
        </Button>
        <Button
          size='sm'
          variant='outline'
          className='flex p-2 aspect-square w-[62px] h-[62px] flex-col gap-1 bg-red-500 hover:bg-red-600 text-white hover:text-gray-100 border-none'
        >
          <IconX size={16} />
          <span>Tolak</span>
        </Button>
      </div>
    </div>
  )
}
