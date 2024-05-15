import { Skeleton } from '../ui/skeleton'

export default function VehicleDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
    <div className="bg-white p-4">
      <div className="flex flex-col mobile:flex-row gap-4">
        <Skeleton className="h-64 w-full mobile:w-[300px]" />
        <div className="flex flex-col w-full mobile:w-3/4 justify-between">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
    <div className="bg-white p-4 h-[190px] flex flex-col gap-4">
      <div className="flex gap-2 h-1/4 w-full mobile:w-1/2">
        <div className="h-full w-1/4">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
      <div className="flex flex-col mobile:flex-row gap-4 h-3/4">
        <Skeleton className="h-full w-full mobile:w-1/4" />
        <Skeleton className="h-full w-full mobile:w-1/4" />
        <Skeleton className="h-full w-full mobile:w-1/4" />
        <Skeleton className="h-full w-full mobile:w-1/4" />
      </div>
    </div>
  </div>
  )
}
