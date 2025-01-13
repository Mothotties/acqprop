import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, LineChart, Activity, Brain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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
          // Refresh the data
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

  const trendData = marketData?.map((item) => ({
    property: item.property?.title?.substring(0, 20) + '...',
    marketValue: item.market_value || 0,
    pricePerSqft: item.price_per_sqft || 0,
  })) || [];

  const averageMarketValue = marketData?.reduce((acc, curr) => acc + (curr.market_value || 0), 0) / (marketData?.length || 1);
  const averageDemandScore = marketData?.reduce((acc, curr) => acc + (curr.market_demand_score || 0), 0) / (marketData?.length || 1);

  const getAIInsight = (data: any[]) => {
    const trends = data.map(item => item.local_market_trend);
    const risingCount = trends.filter(t => t === 'Rising').length;
    const decliningCount = trends.filter(t => t === 'Declining').length;
    const stableCount = trends.filter(t => t === 'Stable').length;

    if (risingCount > decliningCount && risingCount > stableCount) {
      return "AI analysis indicates a strong upward market trend. Consider increasing investment allocation.";
    } else if (decliningCount > risingCount && decliningCount > stableCount) {
      return "Market showing signs of correction. Consider defensive positioning.";
    } else {
      return "Market conditions appear stable. Maintain current investment strategy.";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          Real-Time Market Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Average Market Value</p>
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">
                ${averageMarketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Market Demand</p>
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold mt-2">
                {averageDemandScore.toFixed(1)}/100
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Market Trend</p>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-800">
                  {marketData?.[0]?.local_market_trend || 'Stable'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Properties Analyzed</p>
                <LineChart className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-bold mt-2">
                {marketData?.length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Value Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="property" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="marketValue"
                      stroke="#10B981"
                      name="Market Value"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price per Square Foot Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="property" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pricePerSqft" fill="#6366F1" name="Price/sqft" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              AI Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {getAIInsight(marketData)}
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}