import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { type PropertyFilters } from "@/components/PropertySearch";
import { type SortOption } from "@/components/analytics/PropertySorting";
import { PropertyPagination } from "./PropertyPagination";
import { PropertyGridStates } from "./PropertyGridStates";

const ITEMS_PER_PAGE = 9;

interface PropertyAnalytics {
  ai_confidence_score: number | null;
  cap_rate: number | null;
  roi: number | null;
  predicted_growth: number | null;
  market_volatility: number | null;
}

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  property_type: string;
  coordinates?: { x: number; y: number };
  property_analytics?: PropertyAnalytics[];
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

interface PropertyGridProps {
  filters: PropertyFilters;
  sortOption: SortOption;
}

export function PropertyGrid({ filters, sortOption }: PropertyGridProps) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ["properties", filters, sortOption, currentPage],
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
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

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

      query = query
        .gte("price", filters.priceRange[0])
        .lte("price", filters.priceRange[1]);

      query = query.order(sortOption.field, {
        ascending: sortOption.direction === "asc",
      });

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching properties:", error);
        throw error;
      }

      if (filters.nearMe) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          const MAX_DISTANCE = 50;

          return {
            properties: (data as Property[]).filter(property => {
              if (!property.coordinates) return false;
              const distance = calculateDistance(
                latitude,
                longitude,
                property.coordinates.x,
                property.coordinates.y
              );
              return distance <= MAX_DISTANCE;
            }),
            count: count || 0
          };
        } catch (error) {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to access your location. Please check your browser settings.",
            variant: "destructive",
          });
          return { properties: data as Property[], count: count || 0 };
        }
      }

      return { properties: data as Property[], count: count || 0 };
    },
  });

  const totalPages = Math.ceil((propertiesData?.count || 0) / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <PropertyGridStates 
        isLoading={isLoading} 
        isEmpty={!propertiesData?.properties?.length} 
      />

      {propertiesData?.properties?.length > 0 && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertiesData.properties.map((property) => (
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

          <PropertyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}