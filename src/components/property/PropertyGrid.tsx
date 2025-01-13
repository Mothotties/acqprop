import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  status: string;
  images?: string[];
  property_analytics?: {
    ai_confidence_score: number;
    cap_rate: number;
    roi: number;
    predicted_growth: number;
    market_volatility: number;
  }[];
}

export function PropertyGrid() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
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
        `);

      if (error) {
        console.error("Error fetching properties:", error);
        return [];
      }

      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          title={property.title}
          price={property.price}
          type={property.property_type}
          location={property.location}
          metrics={{
            capRate: property.property_analytics?.[0]?.cap_rate || 0,
            roi: property.property_analytics?.[0]?.roi || 0,
            cashFlow: 0, // This would need to be calculated based on your business logic
            aiConfidenceScore: property.property_analytics?.[0]?.ai_confidence_score,
            predictedGrowth: property.property_analytics?.[0]?.predicted_growth,
            marketVolatility: property.property_analytics?.[0]?.market_volatility,
          }}
        />
      ))}
    </div>
  );
}