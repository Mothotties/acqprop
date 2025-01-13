import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { type PropertyFilters } from "@/components/PropertySearch";
import { type SortOption } from "@/components/analytics/PropertySorting";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  status: string;
  coordinates: { x: number, y: number } | null;
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

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export function PropertyGrid({ filters, sortOption }: PropertyGridProps) {
  const { toast } = useToast();

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

      // If "Near me" filter is active, filter properties by distance
      if (filters.nearMe) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          const MAX_DISTANCE = 50; // Maximum distance in kilometers

          return (data as Property[]).filter(property => {
            if (!property.coordinates) return false;
            const distance = calculateDistance(
              latitude,
              longitude,
              property.coordinates.x,
              property.coordinates.y
            );
            return distance <= MAX_DISTANCE;
          });
        } catch (error) {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to access your location. Please check your browser settings.",
            variant: "destructive",
          });
          return data as Property[];
        }
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