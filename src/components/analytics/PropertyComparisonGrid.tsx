import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Download } from "lucide-react";
import { PropertyImageGallery } from "./PropertyImageGallery";
import { PropertyMetricsComparison } from "./PropertyMetricsComparison";
import { PropertyBasicInfo } from "./PropertyBasicInfo";
import { PropertyAnalyticsInfo } from "./PropertyAnalyticsInfo";
import { PropertyMarketInfo } from "./PropertyMarketInfo";
import { PropertyFilters, type PropertyFilters as Filters } from "./PropertyFilters";
import { PropertySorting, type SortOption } from "./PropertySorting";
import { exportPropertyComparison } from "@/utils/pdfExport";
import { useState } from "react";

interface PropertyComparisonGridProps {
  propertyIds: string[];
}

export function PropertyComparisonGrid({ propertyIds }: PropertyComparisonGridProps) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: '',
    propertyType: '',
    location: '',
  });

  const [sort, setSort] = useState<SortOption>({
    field: 'created_at',
    direction: 'desc',
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ['propertyComparison', propertyIds, filters, sort],
    queryFn: async () => {
      if (!propertyIds.length) return [];
      
      let query = supabase
        .from('properties')
        .select(`
          *,
          property_analytics (
            id,
            property_id,
            ai_confidence_score,
            risk_score,
            predicted_growth,
            market_trend,
            cap_rate,
            roi,
            occupancy_rate,
            created_at,
            updated_at
          ),
          property_market_data (
            id,
            property_id,
            market_value,
            price_per_sqft,
            market_demand_score,
            local_market_trend,
            comparable_sales,
            last_updated,
            created_at,
            updated_at
          )
        `)
        .in('id', propertyIds);

      // Apply filters
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        if (max === 'plus') {
          query = query.gte('price', parseInt(min));
        } else {
          query = query.gte('price', parseInt(min)).lte('price', parseInt(max));
        }
      }

      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      // Apply sorting
      if (sort.field.includes('_score') || sort.field === 'roi') {
        // For fields in the property_analytics table
        query = query.order(`property_analytics.${sort.field}`, { ascending: sort.direction === 'asc' });
      } else {
        // For fields in the main properties table
        query = query.order(sort.field, { ascending: sort.direction === 'asc' });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading comparison data...</div>;
  }

  if (!properties?.length) {
    return <div>Select properties to compare</div>;
  }

  const handleExport = () => {
    exportPropertyComparison(properties);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PropertyFilters onFilterChange={setFilters} />
          <PropertySorting onSortChange={setSort} />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>
      
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