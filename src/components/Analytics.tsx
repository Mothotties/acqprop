import { MarketTrendsAnalysis } from "./analytics/MarketTrendsAnalysis";
import { PropertyComparisonGrid } from "./analytics/PropertyComparisonGrid";
import { AIMarketInsights } from "./analytics/AIMarketInsights";
import { MarketMetricsGrid } from "./analytics/MarketMetricsGrid";
import { HistoricalTrends } from "./analytics/HistoricalTrends";
import { MarketAlerts } from "./analytics/MarketAlerts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Analytics() {
  const { data: marketStats } = useQuery({
    queryKey: ['market-stats'],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_market_data (
            market_value,
            market_demand_score,
            local_market_trend
          )
        `);

      if (error) throw error;

      const avgMarketValue = properties?.reduce((sum, p) => 
        sum + (p.property_market_data?.[0]?.market_value || 0), 0) / (properties?.length || 1);
      
      const avgDemandScore = properties?.reduce((sum, p) => 
        sum + (p.property_market_data?.[0]?.market_demand_score || 0), 0) / (properties?.length || 1);

      return {
        averageMarketValue: avgMarketValue,
        averageDemandScore: avgDemandScore,
        marketTrend: "Growing",
        totalProperties: properties?.length || 0
      };
    }
  });

  return (
    <div className="space-y-8 animate-fade-up">
      <MarketMetricsGrid 
        averageMarketValue={marketStats?.averageMarketValue || 0}
        averageDemandScore={marketStats?.averageDemandScore || 0}
        marketTrend={marketStats?.marketTrend}
        totalProperties={marketStats?.totalProperties || 0}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <HistoricalTrends />
        <MarketAlerts />
      </div>

      <MarketTrendsAnalysis />
      
      <div className="grid gap-6 md:grid-cols-2">
        <PropertyComparisonGrid />
        <AIMarketInsights />
      </div>
    </div>
  );
}