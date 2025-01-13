import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const fetchPredictions = async () => {
  const { data, error } = await supabase
    .from('property_market_data')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) throw error;
  return data.map(item => ({
    time: new Date(item.created_at || '').toLocaleTimeString(),
    actual: item.market_value || 0,
    predicted: (item.market_value || 0) * (1 + (item.market_demand_score || 0) / 100),
    confidence: item.market_demand_score || 0,
  }));
};

export function AIMarketPredictions() {
  const { toast } = useToast();
  const { data: predictions = [], refetch } = useQuery({
    queryKey: ['marketPredictions'],
    queryFn: fetchPredictions,
  });

  useEffect(() => {
    const channel = supabase
      .channel('market-predictions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_market_data'
        },
        (payload) => {
          console.log('Real-time prediction update:', payload);
          toast({
            title: "Market Predictions Updated",
            description: "New market data is available for analysis",
          });
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, refetch]);

  const latestConfidence = predictions[predictions.length - 1]?.confidence || 0;
  const predictionStatus = latestConfidence >= 80 ? "High" : latestConfidence >= 60 ? "Medium" : "Low";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          AI Market Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#6366F1"
                name="Actual Value"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10B981"
                name="Predicted Value"
              />
              <ReferenceLine
                y={predictions[0]?.actual}
                label="Baseline"
                stroke="#F43F5E"
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Prediction Confidence</p>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-500" />
              <p className="text-2xl font-bold">{latestConfidence}%</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Market Direction</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-2xl font-bold">
                {predictions[predictions.length - 1]?.predicted > predictions[0]?.actual ? "Up" : "Down"}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Risk Level</p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <p className="text-2xl font-bold">{predictionStatus}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}