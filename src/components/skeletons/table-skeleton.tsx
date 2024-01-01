import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-[32px] w-[250px] rounded" />
          <Skeleton className="h-[31px] w-[112px] rounded" />
          <Skeleton className="h-[31px] w-[112px] rounded" />
        </div>
        <Skeleton className="h-[31px] w-[77px] rounded" />
      </div>

      <Skeleton className="h-[484px] w-[1232px] rounded" />

      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-[21px] w-[150px]" />

        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-[32px] w-[129px] rounded" />
          <Skeleton className="h-[20px] w-[100px] rounded" />
          <Skeleton className="h-[32px] w-[152px] rounded" />
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
