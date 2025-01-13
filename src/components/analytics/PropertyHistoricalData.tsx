import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Calendar } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

export function PropertyHistoricalData({ propertyIds }: { propertyIds: string[] }) {
  const { toast } = useToast();

  const { data: historicalData } = useQuery({
    queryKey: ['propertyHistorical', propertyIds],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_market_data')
        .select('*')
        .in('property_id', propertyIds)
        .order('created_at', { ascending: true });

      if (error) {
        toast({
          title: "Error fetching historical data",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
  });

  const generateReport = () => {
    if (!historicalData) return;

    const reportData = historicalData.map(item => ({
      Date: new Date(item.created_at).toLocaleDateString(),
      'Market Value': item.market_value,
      'Price per Sqft': item.price_per_sqft,
      'Market Demand': item.market_demand_score,
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'property-historical-report.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Historical Performance</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={generateReport}
        >
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_at"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="market_value"
                name="Market Value"
                stroke="#10B981"
              />
              <Line
                type="monotone"
                dataKey="price_per_sqft"
                name="Price per Sqft"
                stroke="#6366F1"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}