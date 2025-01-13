import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MarketMetricsGrid } from "./analytics/MarketMetricsGrid";
import { MarketCharts } from "./analytics/MarketCharts";
import { AIMarketInsights } from "./analytics/AIMarketInsights";

const fetchMarketData = async () => {
  const { data, error } = await supabase
    .from('property_market_data')
    .select(`
      *,
      property:properties(
        title,
        location,
        price,
        square_feet
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export function MarketAnalyticsDashboard() {
  const { toast } = useToast();
  const [marketData, setMarketData] = useState<any[]>([]);
  const { data: initialData, isLoading } = useQuery({
    queryKey: ['propertyMarketData'],
    queryFn: fetchMarketData,
  });

  useEffect(() => {
    if (initialData) {
      setMarketData(initialData);
    }
  }, [initialData]);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_market_data'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          toast({
            title: "Market Data Updated",
            description: "New market data is available",
          });
          fetchMarketData().then(newData => {
            if (newData) setMarketData(newData);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (isLoading) {
    return <div>Loading market data...</div>;
  }

  const chartData = marketData?.map((item) => ({
    property: item.property?.title?.substring(0, 20) + '...',
    marketValue: item.market_value || 0,
    pricePerSqft: item.price_per_sqft || 0,
  })) || [];

  const averageMarketValue = marketData?.reduce((acc, curr) => acc + (curr.market_value || 0), 0) / (marketData?.length || 1);
  const averageDemandScore = marketData?.reduce((acc, curr) => acc + (curr.market_demand_score || 0), 0) / (marketData?.length || 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          Real-Time Market Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <MarketMetricsGrid
            averageMarketValue={averageMarketValue}
            averageDemandScore={averageDemandScore}
            marketTrend={marketData?.[0]?.local_market_trend}
            totalProperties={marketData?.length || 0}
          />
          <MarketCharts data={chartData} />
          <AIMarketInsights data={marketData} />
        </div>
      </CardContent>
    </Card>
  );
}