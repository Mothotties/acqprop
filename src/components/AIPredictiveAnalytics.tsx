import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, DollarSign, ChartBar, Activity, Target, AlertTriangle } from "lucide-react";
import { MarketSentimentChart } from "./MarketSentimentChart";
import { PredictiveTrendAnalysis } from "./PredictiveTrendAnalysis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const marketTrends = [
  { period: "Q1", sentiment: 85, volume: 120, price: 100, volatility: 12 },
  { period: "Q2", sentiment: 75, volume: 110, price: 95, volatility: 15 },
  { period: "Q3", sentiment: 90, volume: 130, price: 110, volatility: 8 },
  { period: "Q4", sentiment: 95, volume: 140, price: 115, volatility: 10 },
];

export function AIPredictiveAnalytics() {
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
                <p className="text-2xl font-bold">Low</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Volatility</p>
              <p className="text-2xl font-bold text-red-500">8.5%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Trend</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-2xl font-bold">Up</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}