import { PortfolioMetrics } from "./portfolio/PortfolioMetrics";
import { PortfolioPerformanceMetrics } from "./PortfolioPerformanceMetrics";
import { Card, CardContent } from "@/components/ui/card";
import { PortfolioDashboardSkeleton } from "./portfolio/PortfolioDashboardSkeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { SortOption } from "./analytics/PropertySorting";
import { PropertyOverviewCard } from "./portfolio/PropertyOverviewCard";
import { usePortfolioProperties } from "@/hooks/usePortfolioProperties";
import { PortfolioDiversification } from "./PortfolioDiversification";

const ITEMS_PER_PAGE = 6;

export function PortfolioDashboard() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>({ field: "created_at", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, error } = usePortfolioProperties({
    search,
    sort,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  if (isLoading) {
    return <PortfolioDashboardSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load portfolio data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <PortfolioMetrics />
      
      <div className="grid gap-6 md:grid-cols-2">
        <PortfolioPerformanceMetrics />
        <PortfolioDiversification />
      </div>
      
      <PropertyOverviewCard
        properties={data?.properties || []}
        totalCount={data?.totalCount || 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onSearchChange={setSearch}
        onSortChange={setSort}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}