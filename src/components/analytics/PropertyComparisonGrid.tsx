import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, DollarSign, TrendingUp, Home } from "lucide-react";

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
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-medium">${property.price?.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="font-medium">{property.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Property Type</span>
                <span className="font-medium">{property.property_type}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="font-medium">{property.square_feet} sq ft</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Analytics</h4>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Score</span>
                  <span className="font-medium">
                    {property.property_analytics?.[0]?.ai_confidence_score || 'N/A'}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className="font-medium text-green-600">
                    {property.property_analytics?.[0]?.roi || 'N/A'}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <span className="font-medium">
                    {property.property_analytics?.[0]?.risk_score || 'N/A'}/10
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Market Data</h4>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Value</span>
                  <span className="font-medium">
                    ${property.property_market_data?.[0]?.market_value?.toLocaleString() || 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price per sq ft</span>
                  <span className="font-medium">
                    ${property.property_market_data?.[0]?.price_per_sqft?.toLocaleString() || 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Demand Score</span>
                  <span className="font-medium">
                    {property.property_market_data?.[0]?.market_demand_score || 'N/A'}/100
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}