import { renderStatus } from '@/components/status-badge'
import { irsDummyDataType } from '@/config/dummy-data'
import { dateFormatter } from '@/utils/date'

type HistoryCardProps = {
  data: irsDummyDataType
}

export default function HistoryCard({ data }: HistoryCardProps) {
  return (
    <div
      className='bg-background border border-muted p-4 rounded-xl flex justify-between text-sm cursor-pointer'
      key={data.id}
    >
      <div className='flex gap-2 grow'>
        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Semester</span>
          <span>{data.semester}</span>
        </div>
        <div className='flex gap-1 flex-col items-center p-2 border border-muted rounded-lg'>
          <span className='opacity-50'>Jumlah SKS</span>
          <span>{data.sks}</span>
        </div>
      </div>

      <div className='flex flex-col items-end justify-between'>
        {renderStatus(data.status)}
        <span className='opacity-50'>{dateFormatter(data.updatedAt)}</span>
      </div>
    </div>
  )
}
