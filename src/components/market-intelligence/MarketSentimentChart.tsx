import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, TrendingUp, Activity } from "lucide-react";

interface MarketSentimentChartProps {
  data: {
    month: string;
    sentiment: number;
    confidence: number;
    volatility: number;
  }[];
}

export function MarketSentimentChart({ data }: MarketSentimentChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Market Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#10B981"
                name="Market Sentiment"
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#6366F1"
                name="AI Confidence"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Current Sentiment</p>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-green-500" />
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Trend</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <p className="text-2xl font-bold">Up</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Volume</p>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <p className="text-2xl font-bold">1.8K</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}