import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetchHistoricalData = async () => {
  const { data, error } = await supabase
    .from('property_market_data')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return data.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    marketValue: item.market_value || 0,
    demandScore: item.market_demand_score || 0,
  }));
};

export function HistoricalTrends() {
  const { data: historicalData = [], isLoading } = useQuery({
    queryKey: ['historicalMarketData'],
    queryFn: fetchHistoricalData,
  });

  if (isLoading) {
    return <div>Loading historical data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-4 h-4 text-purple-500" />
          Historical Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="marketValue"
                stroke="#10B981"
                name="Market Value"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="demandScore"
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