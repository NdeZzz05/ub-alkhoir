import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoadingProps {
  width: string;
  height: string;
}

export function SkeletonLoading({ width, height }: SkeletonLoadingProps) {
  return (
    <div className="flex flex-col p-1">
      <Skeleton className={`${width} ${height} rounded-md`} />
    </div>
  );
}
