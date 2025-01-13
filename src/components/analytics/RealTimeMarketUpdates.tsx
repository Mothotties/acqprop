import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, TrendingUp } from "lucide-react";

const fetchLatestMarketData = async () => {
  const { data, error } = await supabase
    .from('property_market_data')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
};

export function RealTimeMarketUpdates() {
  const { toast } = useToast();
  const { data: marketData, refetch } = useQuery({
    queryKey: ['realTimeMarketData'],
    queryFn: fetchLatestMarketData,
  });

  useEffect(() => {
    const channel = supabase
      .channel('market-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_market_data'
        },
        (payload) => {
          console.log('Real-time market update:', payload);
          toast({
            title: "Market Data Updated",
            description: "New market data is available",
          });
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, refetch]);

  const chartData = marketData?.map(item => ({
    time: new Date(item.created_at).toLocaleTimeString(),
    value: item.market_value || 0,
    demand: item.market_demand_score || 0,
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          Real-Time Market Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                name="Market Value"
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#6366F1"
                name="Demand Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}