const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export function CardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-md bg-gray-100 p-3 shadow-sm flex flex-col gap-4`}>
      <div className='flex items-center'>
        <div className='h-5 w-5 rounded-md bg-gray-200' />
        <div className='ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium' />
      </div>
      <div className='flex items-center justify-center truncate rounded-md bg-white px-4 py-8' />
    </div>
  )
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  )
}

export default function OverviewSkeleton() {
  return (
    <>
      <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-4'>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  )
}
