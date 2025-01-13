import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { type PropertyFilters } from "@/components/PropertySearch";
import { type SortOption } from "@/components/analytics/PropertySorting";
import { PropertyPagination } from "./PropertyPagination";
import { PropertyGridStates } from "./PropertyGridStates";
import { filterPropertiesByLocation } from "@/utils/propertyFilters";
import { type Property } from "@/types/property";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";

const ITEMS_PER_PAGE = 9;

interface PropertyGridProps {
  filters: PropertyFilters;
  sortOption: SortOption;
}

export function PropertyGrid({ filters, sortOption }: PropertyGridProps) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: propertiesData, isLoading, error } = useQuery({
    queryKey: ["properties", filters, sortOption, currentPage],
    queryFn: async () => {
      try {
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

        let filteredProperties = data as Property[];

        if (filters.nearMe) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            filteredProperties = filterPropertiesByLocation(filteredProperties, latitude, longitude);
          } catch (error) {
            console.error("Error getting location:", error);
            toast({
              title: "Location Error",
              description: "Unable to access your location. Please check your browser settings.",
              variant: "destructive",
            });
          }
        }

        return { properties: filteredProperties, count: count || 0 };
      } catch (error) {
        console.error("Error in query:", error);
        toast({
          title: "Error",
          description: "Failed to fetch properties. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
  });

  const totalPages = Math.ceil((propertiesData?.count || 0) / ITEMS_PER_PAGE);

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load properties. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-6">
      <PropertyGridStates 
        isLoading={isLoading} 
        isEmpty={!propertiesData?.properties?.length} 
      />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      ) : propertiesData?.properties?.length > 0 ? (
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
      ) : null}
    </div>
  );
}