import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border bg-background overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        <Skeleton className="h-5 w-16 rounded-full" />

        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description line 1 */}
        <Skeleton className="h-4 w-full" />
        {/* Description line 2 */}
        <Skeleton className="h-4 w-2/3" />

        {/* Rating */}
        <div className="flex gap-1 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
          ))}
          <Skeleton className="h-3.5 w-10 ml-1" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Location */}
        <div className="flex justify-between items-end pt-3 border-t">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
