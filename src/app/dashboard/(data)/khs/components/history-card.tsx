import { renderStatusActive, renderStatusValidation } from '@/components/status-badge'
import { KHSListReponseDatumDto } from '@/lib/dto/student'

type HistoryCardProps = {
  data: KHSListReponseDatumDto
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
          <span className='opacity-50'>SKS semester</span>
          <span>{data.jumlahSksSemester}</span>
        </div>
        <div className='flex gap-1 flex-col justify-center items-center px-4 p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>IP semester</span>
          <span>{data.ips}</span>
        </div>
      </div>

      <div className='flex gap-2 flex-col items-end justify-between'>
        {renderStatusActive(data.status)}
        {renderStatusValidation(data.statusValidasi)}
        {/* <span className='opacity-50'>{dateFormatter(data.)}</span> */}
      </div>
    </div>
  )
}
