import { PortfolioMetrics } from "./portfolio/PortfolioMetrics";
import { PortfolioPerformance } from "./portfolio/PortfolioPerformance";
import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PortfolioDashboard() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["portfolio-properties"],
    queryFn: async () => {
      const { data, error } = await supabase
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
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <PortfolioMetrics />
      
      <div className="grid gap-6 md:grid-cols-2">
        <PortfolioPerformance />
        
        <Card>
          <CardHeader>
            <CardTitle>Property Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties?.map((property) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}