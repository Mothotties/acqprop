import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { type PropertyFilters } from "@/components/PropertySearch";
import { type SortOption } from "@/components/analytics/PropertySorting";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  status: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  property_analytics?: {
    ai_confidence_score: number;
    cap_rate: number;
    roi: number;
    predicted_growth: number;
    market_volatility: number;
  }[];
}

interface PropertyGridProps {
  filters: PropertyFilters;
  sortOption: SortOption;
}

export function PropertyGrid({ filters, sortOption }: PropertyGridProps) {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters, sortOption],
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
        `);

      // Apply filters
      if (filters.searchQuery) {
        query = query.or(`title.ilike.%${filters.searchQuery}%,location.ilike.%${filters.searchQuery}%`);
      }

      if (filters.propertyType !== "all") {
        query = query.eq("property_type", filters.propertyType);
      }

      if (filters.minBeds) {
        query = query.gte("bedrooms", filters.minBeds);
      }

      if (filters.minBaths) {
        query = query.gte("bathrooms", filters.minBaths);
      }

      if (filters.minSqft) {
        query = query.gte("square_feet", filters.minSqft);
      }

      // Apply price range filter
      query = query
        .gte("price", filters.priceRange[0])
        .lte("price", filters.priceRange[1]);

      // Apply sorting
      query = query.order(sortOption.field, {
        ascending: sortOption.direction === "asc",
      });

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      return data as Property[];
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
        <p className="text-muted-foreground">No properties found matching your criteria</p>
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
            aiConfidenceScore: property.property_analytics?.[0]?.ai_confidence_score || 0,
            predictedGrowth: property.property_analytics?.[0]?.predicted_growth || 0,
            marketVolatility: property.property_analytics?.[0]?.market_volatility || 0,
          }}
        />
      ))}
    </div>
  );
}