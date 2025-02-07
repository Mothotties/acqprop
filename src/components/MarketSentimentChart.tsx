import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sentimentData = [
  { time: "9:00", sentiment: 85, confidence: 92, volume: 1200 },
  { time: "10:00", sentiment: 82, confidence: 88, volume: 1500 },
  { time: "11:00", sentiment: 88, confidence: 94, volume: 1300 },
  { time: "12:00", sentiment: 90, confidence: 95, volume: 1400 },
  { time: "13:00", sentiment: 87, confidence: 91, volume: 1600 },
  { time: "14:00", sentiment: 92, confidence: 96, volume: 1800 },
];

export function MarketSentimentChart() {
  return (
    <Card className="border-gold/10 hover:border-gold/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-gold animate-pulse" />
          Real-Time Market Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                stroke="currentColor" 
                className="text-muted-foreground text-xs"
              />
              <YAxis 
                stroke="currentColor" 
                className="text-muted-foreground text-xs"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#D4AF37"
                strokeWidth={2}
                dot={false}
                name="Market Sentiment"
                className="animate-pulse"
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#1a2942"
                strokeWidth={2}
                dot={false}
                name="AI Confidence"
                className="animate-pulse"
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