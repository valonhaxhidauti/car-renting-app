import { Skeleton } from "../ui/skeleton";

export default function ExploreVehiclesSkeleton() {
  return (
    <>
      <Skeleton className="h-[196px] w-full" />
      <div className="flex gap-2 w-full">
        <div className="flex flex-col gap-2 w-[60%] mobile:w-[70%]">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-[78px] w-full" />
            <Skeleton className="h-[78px] w-full" />
            <Skeleton className="h-[78px] w-full" />
            <Skeleton className="h-[78px] w-full" />
          </div>
        </div>
        <div className="w-[40%] mobile:w-[29%]">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </>
  );
}
