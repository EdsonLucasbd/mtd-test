import { Skeleton } from './ui/skeleton'

export const ItemSkeleton = () => {
  return (
    <div className='w-full lg:w-[280px]'>
      <Skeleton className='h-[350px] lg:[250px]' />
    </div>
  )
}
