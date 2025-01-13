import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PropertyComparisonProps {
  propertyIds: string[];
}

export function PropertyComparison({ propertyIds }: PropertyComparisonProps) {
  const { data: comparisonData, isLoading } = useQuery({
    queryKey: ['propertyComparison', propertyIds],
    queryFn: async () => {
      const { data: properties, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            risk_score,
            predicted_growth,
            roi
          ),
          property_market_data (
            market_value,
            price_per_sqft,
            market_demand_score
          )
        `)
        .in('id', propertyIds);

      if (error) throw error;
      return properties;
    },
  });

  if (isLoading) {
    return <div>Loading comparison data...</div>;
  }

  const chartData = comparisonData?.map(property => ({
    name: property.title?.substring(0, 20) + '...',
    value: property.price,
    predicted: property.property_market_data?.[0]?.market_value || 0,
    roi: property.property_analytics?.[0]?.roi || 0,
    risk: property.property_analytics?.[0]?.risk_score || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          AI-Powered Property Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="Current Value" fill="#10B981" />
              <Bar dataKey="predicted" name="Predicted Value" fill="#6366F1" />
              <Bar dataKey="roi" name="ROI %" fill="#F59E0B" />
              <Bar dataKey="risk" name="Risk Score" fill="#F43F5E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {comparisonData?.map(property => (
            <Card key={property.id} className="p-4">
              <h3 className="font-semibold mb-2">{property.title}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">
                      {property.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">AI Confidence</span>
                  <Badge variant="secondary">
                    {property.property_analytics?.[0]?.ai_confidence_score}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Growth Potential</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">
                      {property.property_analytics?.[0]?.predicted_growth}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">
                      {property.property_analytics?.[0]?.risk_score <= 3 ? 'Low' :
                       property.property_analytics?.[0]?.risk_score <= 7 ? 'Medium' : 'High'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}