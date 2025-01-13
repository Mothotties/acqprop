import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2 } from "lucide-react";
import { PropertyImageGallery } from "./PropertyImageGallery";
import { PropertyMetricsComparison } from "./PropertyMetricsComparison";
import { PropertyBasicInfo } from "./PropertyBasicInfo";
import { PropertyAnalyticsInfo } from "./PropertyAnalyticsInfo";
import { PropertyMarketInfo } from "./PropertyMarketInfo";

interface PropertyComparisonGridProps {
  propertyIds: string[];
}

export function PropertyComparisonGrid({ propertyIds }: PropertyComparisonGridProps) {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['propertyComparison', propertyIds],
    queryFn: async () => {
      if (!propertyIds.length) return [];
      
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            risk_score,
            predicted_growth,
            roi
          ),
          property_market_data (
            market_value,
            price_per_sqft,
            market_demand_score
          )
        `)
        .in('id', propertyIds);

      if (error) throw error;
      return data || [];
    },
    enabled: propertyIds.length > 0,
  });

  if (isLoading) {
    return <div>Loading comparison data...</div>;
  }

  if (!properties?.length) {
    return <div>Select properties to compare</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {property.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PropertyImageGallery 
                images={property.images || []} 
                title={property.title} 
              />

              <PropertyBasicInfo property={property} />

              {property.property_analytics?.[0] && (
                <PropertyAnalyticsInfo analytics={property.property_analytics[0]} />
              )}

              {property.property_market_data?.[0] && (
                <PropertyMarketInfo marketData={property.property_market_data[0]} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <PropertyMetricsComparison properties={properties} />
    </div>
  );
}