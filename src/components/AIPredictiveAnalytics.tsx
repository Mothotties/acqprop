import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, DollarSign, ChartBar, Activity, Target, AlertTriangle } from "lucide-react";
import { MarketSentimentChart } from "./MarketSentimentChart";
import { PredictiveTrendAnalysis } from "./PredictiveTrendAnalysis";
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

const fetchMarketTrends = async () => {
  const { data, error } = await supabase
    .from('property_analytics')
    .select(`
      *,
      property:properties(
        title,
        price,
        location
      )
    `)
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) throw error;
  
  return data.map((item, index) => ({
    period: `Q${index + 1}`,
    sentiment: item.ai_confidence_score || 0,
    volume: item.occupancy_rate || 0,
    price: item.predicted_growth || 0,
    volatility: item.risk_score || 0,
  }));
};

export function AIPredictiveAnalytics() {
  const { data: marketTrends = [], isLoading } = useQuery({
    queryKey: ['marketTrends'],
    queryFn: fetchMarketTrends,
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  const averageRisk = marketTrends.reduce((acc, curr) => acc + curr.volatility, 0) / marketTrends.length;
  const riskLevel = averageRisk <= 3 ? "Low" : averageRisk <= 7 ? "Medium" : "High";
  const latestVolatility = marketTrends[marketTrends.length - 1]?.volatility || 0;
  const marketTrend = marketTrends[marketTrends.length - 1]?.price > marketTrends[0]?.price ? "Up" : "Down";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold">AI Predictive Analytics</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <MarketSentimentChart />
        <PredictiveTrendAnalysis />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="w-4 h-4" />
            Market Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sentiment" fill="#10B981" name="Market Sentiment" />
                <Bar dataKey="volatility" fill="#F43F5E" name="Volatility" />
                <Bar dataKey="volume" fill="#6366F1" name="Trading Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <p className="text-2xl font-bold">{riskLevel}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Volatility</p>
              <p className="text-2xl font-bold text-red-500">{latestVolatility.toFixed(1)}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Trend</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-2xl font-bold">{marketTrend}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}