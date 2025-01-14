import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PropertyAnalytics() {
  const { data: analyticsData } = useQuery({
    queryKey: ['property-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_analytics')
        .select(`
          *,
          property:properties(title)
        `)
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  const chartData = analyticsData?.map(item => ({
    name: item.property?.title?.substring(0, 15) + '...',
    roi: item.roi || 0,
    predictedGrowth: item.predicted_growth || 0,
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="roi" stroke="#8884d8" name="ROI (%)" />
              <Line type="monotone" dataKey="predictedGrowth" stroke="#82ca9d" name="Predicted Growth (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}