import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PropertyValueChartProps {
  data: Array<{
    property: string;
    marketValue: number;
    pricePerSqft: number;
  }>;
}

export function PropertyValueChart({ data }: PropertyValueChartProps) {
  const { data: analyticsData } = useQuery({
    queryKey: ['property-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_analytics')
        .select('*')
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const chartData = data.map(item => ({
    name: item.property,
    "Current Value": item.marketValue,
    "Predicted Value": item.marketValue * (1 + (analyticsData?.[0]?.predicted_growth || 0.05)),
    "Market Average": item.marketValue * 0.95, // Using 95% of market value as average
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-500" />
          Property Value Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Current Value"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Predicted Value"
                stroke="#6366F1"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Market Average"
                stroke="#F43F5E"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}