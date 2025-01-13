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

export function PortfolioDashboard() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>({ field: "created_at", direction: "desc" });
  
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["portfolio-properties", search, sort],
    queryFn: async () => {
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
        `)
        .limit(3);

      // Apply search filter
      if (search) {
        query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
      }

      // Apply sorting
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
      
      const { data, error } = await query;
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching properties",
          description: error.message,
        });
        throw error;
      }
      return data;
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
                {properties?.length || 0} Properties
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyFilters 
              onSearchChange={setSearch}
              onSortChange={setSort}
            />
            <div className="space-y-4">
              {properties?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No properties found in your portfolio.
                </div>
              ) : (
                properties?.map((property) => (
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}