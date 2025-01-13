import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MarketValueChartProps {
  data: Array<{
    property: string;
    marketValue: number;
    pricePerSqft: number;
  }>;
}

export function MarketValueChart({ data }: MarketValueChartProps) {
  const { data: analyticsData } = useQuery({
    queryKey: ['property-analytics-roi'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_analytics')
        .select('roi, property_id')
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const chartData = data.map((item, index) => ({
    name: item.property,
    "Market Value": item.marketValue,
    "ROI": analyticsData?.[index]?.roi || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Market Value & ROI Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="Market Value"
                stroke="#10B981"
                fill="#10B98133"
                name="Market Value"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="ROI"
                stroke="#6366F1"
                fill="#6366F133"
                name="ROI %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}