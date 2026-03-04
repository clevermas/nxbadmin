import { Skeleton } from "@/components/ui/skeleton";
import { AdminContainer } from "../admin-container";

export const UsersSkeleton = () => {
  return (
    <AdminContainer type="full-width">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-xs" />

        <div className="flex gap-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <div className="space-y-4.5">
        {Array.from({ length: 12 })
          .map((_, i) => `skeleton-${i}`)
          .map((id) => (
            <Skeleton key={id} className="w-full h-8" />
          ))}
      </div>
    </AdminContainer>
  );
};
