type OverviewCardProps = {
  parameter: string
  value: string
  icon: any
}

export const OverviewCard = (props: OverviewCardProps) => (
  <div className='relative overflow-hidden rounded-lg border border-muted p-3 gap-4 flex flex-col'>
    <div className='flex items-center'>
      <props.icon className='h-5 w-5' />
      <span className='ml-2 text-sm font-medium truncate'>{props.parameter}</span>
    </div>
    <div className='flex text-xl font-bold justify-end truncate rounded-xl bg-muted px-4 py-4'>{props.value}</div>
  </div>
)
