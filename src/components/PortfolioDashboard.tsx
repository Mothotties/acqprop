import { PortfolioMetrics } from "./portfolio/PortfolioMetrics";
import { PortfolioPerformance } from "./portfolio/PortfolioPerformance";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioDashboardSkeleton } from "./portfolio/PortfolioDashboardSkeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { PropertyFilters } from "./portfolio/PropertyFilters";
import { useState } from "react";
import { SortOption } from "./analytics/PropertySorting";
import { PropertyList } from "./portfolio/PropertyList";
import { Property } from "@/types/property";

const ITEMS_PER_PAGE = 6;

interface SupabaseCoordinates {
  x: string;
  y: string;
}

export function PortfolioDashboard() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>({ field: "created_at", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["portfolio-properties", search, sort, currentPage],
    queryFn: async () => {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from("properties")
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            cap_rate,
            roi,
            predicted_growth,
            market_volatility
          )
        `, { count: 'exact' })
        .range(start, end);

      if (search) {
        query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
      }

      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
      
      const { data: rawData, error, count } = await query;
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching properties",
          description: error.message,
        });
        throw error;
      }

      // Transform the data to match our Property type
      const properties = rawData?.map(property => ({
        ...property,
        coordinates: property.coordinates ? {
          x: parseFloat((property.coordinates as SupabaseCoordinates).x),
          y: parseFloat((property.coordinates as SupabaseCoordinates).y)
        } : null,
        property_analytics: property.property_analytics?.map(analytics => ({
          ...analytics,
          ai_confidence_score: analytics.ai_confidence_score || null,
          cap_rate: analytics.cap_rate || null,
          roi: analytics.roi || null,
          predicted_growth: analytics.predicted_growth || null,
          market_volatility: analytics.market_volatility || null
        }))
      })) as Property[];

      return { properties, totalCount: count || 0 };
    },
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
        <PortfolioPerformance />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Property Overview
              <span className="text-sm font-normal text-muted-foreground">
                {data?.totalCount || 0} Properties
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyFilters 
              onSearchChange={setSearch}
              onSortChange={setSort}
            />
            <PropertyList
              properties={data?.properties || []}
              totalCount={data?.totalCount || 0}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}