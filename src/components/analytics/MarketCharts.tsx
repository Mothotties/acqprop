import { PropertyValueChart } from "./charts/PropertyValueChart";
import { MarketValueChart } from "./charts/MarketValueChart";
import { OccupancyChart } from "./charts/OccupancyChart";
import { RiskAnalysisChart } from "./charts/RiskAnalysisChart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MarketData {
  property: string;
  marketValue: number;
  pricePerSqft: number;
}

interface MarketChartsProps {
  data?: MarketData[];
}

const fetchMarketData = async () => {
  const { data: properties, error } = await supabase
    .from('properties')
    .select(`
      id,
      title,
      property_market_data (
        market_value,
        price_per_sqft
      )
    `)
    .limit(5);

  if (error) throw error;

  return properties.map(property => ({
    property: property.title,
    marketValue: property.property_market_data?.[0]?.market_value || 0,
    pricePerSqft: property.property_market_data?.[0]?.price_per_sqft || 0
  }));
};

export function MarketCharts({ data = [] }: MarketChartsProps) {
  const { data: marketData, isLoading, error } = useQuery({
    queryKey: ['market-data'],
    queryFn: fetchMarketData,
  });

  const chartData = data.length > 0 ? data : marketData || [];

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-[300px] bg-muted rounded-lg" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[300px] bg-muted rounded-lg" />
        <div className="h-[300px] bg-muted rounded-lg" />
      </div>
      <div className="h-[300px] bg-muted rounded-lg" />
    </div>;
  }

  if (error) {
    return <div className="text-destructive">Failed to load market data</div>;
  }

  return (
    <div className="space-y-6">
      <PropertyValueChart data={chartData} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <MarketValueChart data={chartData} />
        <OccupancyChart data={chartData} />
      </div>

      <RiskAnalysisChart data={chartData} />
    </div>
  );
}