import { renderStatusActive, renderStatusValidation } from '@/components/status-badge'
import { GetListIRSValidationResponseListDto } from '@/lib/dto/lecturer'

type HistoryCardProps = {
  data: GetListIRSValidationResponseListDto
}

export default function HistoryCard({ data }: HistoryCardProps) {
  return (
    <div
      className='bg-background border border-muted p-4 rounded-xl flex justify-between text-sm cursor-pointer'
      key={data.semester}
    >
      <div className='flex gap-2 grow'>
        <div className='flex gap-1 flex-row justify-start items-start'>
          <span className='opacity-50'>Diajukan oleh</span>
          <span>{data.nama}</span>
          <span className='opacity-50'>NIM</span>
          <span>{data.nim}</span>
          <span className='opacity-50'>Semester</span>
          <span>{data.semester}</span>
          <span className='opacity-50'>Jumlah SKS</span>
          <span>{data.jumlahSks}</span>
        </div>
      </div>

      <div className='flex gap-2 flex-col items-end justify-between'>{renderStatusValidation(data.statusValidasi)}</div>
    </div>
  )
}
