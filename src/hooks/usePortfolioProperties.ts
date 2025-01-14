import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Property } from "@/types/property";
import { SortOption } from "@/components/analytics/PropertySorting";

interface SupabaseCoordinates {
  x: string;
  y: string;
}

interface UsePortfolioPropertiesProps {
  search: string;
  sort: SortOption;
  currentPage: number;
  itemsPerPage: number;
}

interface PerformanceData {
  property: string;
  roi: number;
  occupancy: number;
}

interface MarketData {
  property: string;
  marketValue: number;
  pricePerSqft: number;
}

export function usePortfolioProperties({ 
  search, 
  sort, 
  currentPage, 
  itemsPerPage 
}: UsePortfolioPropertiesProps) {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ["portfolio-properties", search, sort, currentPage],
    queryFn: async () => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;

      let query = supabase
        .from("properties")
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            cap_rate,
            roi,
            predicted_growth,
            market_volatility,
            occupancy_rate
          ),
          property_market_data (
            market_value,
            price_per_sqft
          )
        `, { count: 'exact' })
        .range(start, end);

      if (search) {
        query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
      }

      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
      
      const { data: rawData, error, count } = await query;
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching properties",
          description: error.message,
        });
        throw error;
      }

      const properties = rawData?.map(property => ({
        ...property,
        coordinates: property.coordinates ? {
          x: parseFloat((property.coordinates as SupabaseCoordinates).x),
          y: parseFloat((property.coordinates as SupabaseCoordinates).y)
        } : null,
        property_analytics: property.property_analytics?.map(analytics => ({
          ...analytics,
          ai_confidence_score: analytics.ai_confidence_score || null,
          cap_rate: analytics.cap_rate || null,
          roi: analytics.roi || null,
          predicted_growth: analytics.predicted_growth || null,
          market_volatility: analytics.market_volatility || null
        }))
      })) as Property[];

      // Transform data for performance metrics
      const performanceData = properties.map(property => ({
        property: property.title,
        roi: property.property_analytics?.[0]?.roi || 0,
        occupancy: property.property_analytics?.[0]?.occupancy_rate || 0
      }));

      // Transform data for market metrics
      const marketData = properties.map(property => ({
        property: property.title,
        marketValue: property.property_market_data?.[0]?.market_value || 0,
        pricePerSqft: property.property_market_data?.[0]?.price_per_sqft || 0
      }));

      return { 
        properties, 
        totalCount: count || 0,
        performanceData,
        marketData
      };
    },
    staleTime: 30000, // Data stays fresh for 30 seconds
    cacheTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    retry: 3, // Retry failed requests 3 times
  });
}