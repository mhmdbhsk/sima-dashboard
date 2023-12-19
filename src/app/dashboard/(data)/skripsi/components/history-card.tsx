import { renderStatusValidation } from '@/components/status-badge'
import { SkripsiListReponseDatumDto } from '@/lib/dto/student'

type HistoryCardProps = {
  data: SkripsiListReponseDatumDto
}

export default function HistoryCard({ data }: HistoryCardProps) {
  return (
    <div
      className='bg-background border border-muted p-4 rounded-xl flex justify-between text-sm cursor-pointer gap-4'
      key={data.semester}
    >
      <div className='flex gap-2 grow'>
        <div className='flex gap-1 flex-col justify-center items-center px-4 p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Semester</span>
          <span>{data.semester}</span>
        </div>
        <div className='flex gap-1 flex-col justify-center items-center px-4 p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Nilai</span>
          <span>{data.nilai}</span>
        </div>
      </div>

      <div className='flex gap-2 flex-col items-end justify-center'>{renderStatusValidation(data.statusValidasi)}</div>
    </div>
  )
}
