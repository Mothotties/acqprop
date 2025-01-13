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
            market_volatility
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

      return { properties, totalCount: count || 0 };
    },
  });
}