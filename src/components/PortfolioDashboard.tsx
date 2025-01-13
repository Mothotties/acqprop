import { PortfolioMetrics } from "./portfolio/PortfolioMetrics";
import { PortfolioPerformance } from "./portfolio/PortfolioPerformance";
import { PropertyCard } from "@/components/PropertyCard";
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
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

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

      // Apply search filter
      if (search) {
        query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
      }

      // Apply sorting
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
      
      const { data, error, count } = await query;
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching properties",
          description: error.message,
        });
        throw error;
      }
      return { properties: data, totalCount: count || 0 };
    },
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / ITEMS_PER_PAGE);

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
            <div className="space-y-4">
              {!data?.properties?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  No properties found in your portfolio.
                </div>
              ) : (
                <>
                  <div className="grid gap-4">
                    {data.properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        title={property.title}
                        price={property.price}
                        type={property.property_type}
                        location={property.location}
                        metrics={{
                          capRate: property.property_analytics?.[0]?.cap_rate || 0,
                          roi: property.property_analytics?.[0]?.roi || 0,
                          cashFlow: 0,
                          aiConfidenceScore: property.property_analytics?.[0]?.ai_confidence_score || 0,
                          predictedGrowth: property.property_analytics?.[0]?.predicted_growth || 0,
                          marketVolatility: property.property_analytics?.[0]?.market_volatility || 0,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className="w-8"
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}