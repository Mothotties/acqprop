import { PortfolioMetrics } from "./portfolio/PortfolioMetrics";
import { PortfolioPerformanceMetrics } from "./PortfolioPerformanceMetrics";
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

const ITEMS_PER_PAGE = 6;

// Sample data for analytics charts
const performanceData = [
  { property: "Luxury Condo", roi: 12.5, occupancy: 95 },
  { property: "Downtown Office", roi: 15.2, occupancy: 88 },
  { property: "Retail Space", roi: 9.8, occupancy: 92 },
  { property: "Residential Complex", roi: 11.3, occupancy: 96 },
  { property: "Industrial Park", roi: 13.7, occupancy: 89 },
];

// Sample data for market charts
const marketData = [
  { property: "Luxury Condo", marketValue: 850000, pricePerSqft: 425 },
  { property: "Downtown Office", marketValue: 1200000, pricePerSqft: 380 },
  { property: "Retail Space", marketValue: 750000, pricePerSqft: 350 },
  { property: "Residential Complex", marketValue: 950000, pricePerSqft: 290 },
  { property: "Industrial Park", marketValue: 1500000, pricePerSqft: 275 },
];

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

      <div className="grid gap-6 md:grid-cols-2">
        <PredictiveTrendAnalysis />
      </div>

      <AnalyticsCharts performanceData={performanceData} />
      
      <MarketCharts data={marketData} />
      
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