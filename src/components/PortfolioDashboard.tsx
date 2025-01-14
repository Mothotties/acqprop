import { PortfolioMetrics } from "./portfolio/PortfolioMetrics";
import { ROIPerformanceTracker } from "./analytics/ROIPerformanceTracker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { SortOption } from "./analytics/PropertySorting";
import { PropertyOverviewCard } from "./portfolio/PropertyOverviewCard";
import { usePortfolioProperties } from "@/hooks/usePortfolioProperties";
import { PortfolioDiversification } from "./PortfolioDiversification";
import { PredictiveTrendAnalysis } from "./PredictiveTrendAnalysis";
import { AnalyticsCharts } from "./analytics/AnalyticsCharts";
import { MarketCharts } from "./analytics/MarketCharts";
import { PortfolioDashboardSkeleton } from "./portfolio/PortfolioDashboardSkeleton";
import { ErrorBoundary } from "./error/ErrorBoundary";
import { performanceMonitor } from "@/utils/performanceMonitor";
import { useEffect } from "react";

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

  // Monitor component performance
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      performanceMonitor.logMetric('PortfolioDashboard render', duration, {
        search,
        currentPage,
        sortField: sort.field,
      });
    };
  }, [search, currentPage, sort.field]);

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
      <ErrorBoundary>
        <PortfolioMetrics />
      </ErrorBoundary>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ErrorBoundary>
          <ROIPerformanceTracker />
        </ErrorBoundary>
        <ErrorBoundary>
          <PortfolioDiversification />
        </ErrorBoundary>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ErrorBoundary>
          <PredictiveTrendAnalysis />
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <AnalyticsCharts performanceData={data?.performanceData || []} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <MarketCharts data={data?.marketData || []} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <PropertyOverviewCard
          properties={data?.properties || []}
          totalCount={data?.totalCount || 0}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSearchChange={setSearch}
          onSortChange={setSort}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </ErrorBoundary>
    </div>
  );
}