import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[140px] w-full" />
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[400px] w-full" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}