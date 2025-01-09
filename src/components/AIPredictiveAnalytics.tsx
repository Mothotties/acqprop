import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, DollarSign, ChartBar, Activity, Target, AlertTriangle } from "lucide-react";
import { MarketSentimentChart } from "./MarketSentimentChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const forecastData = [
  { month: "Jan", actual: 500000, predicted: 510000, confidence: 95 },
  { month: "Feb", actual: 520000, predicted: 525000, confidence: 93 },
  { month: "Mar", actual: 530000, predicted: 535000, confidence: 94 },
  { month: "Apr", actual: 540000, predicted: 545000, confidence: 92 },
  { month: "May", actual: 550000, predicted: 560000, confidence: 96 },
  { month: "Jun", actual: 570000, predicted: 575000, confidence: 95 },
];

const marketTrends = [
  { period: "Q1", sentiment: 85, volume: 120, price: 100, volatility: 12 },
  { period: "Q2", sentiment: 75, volume: 110, price: 95, volatility: 15 },
  { period: "Q3", sentiment: 90, volume: 130, price: 110, volatility: 8 },
  { period: "Q4", sentiment: 95, volume: 140, price: 115, volatility: 10 },
];

const realTimeData = [
  { time: "9:00", value: 100, volume: 500 },
  { time: "10:00", value: 102, volume: 520 },
  { time: "11:00", value: 101, volume: 510 },
  { time: "12:00", value: 103, volume: 525 },
  { time: "13:00", value: 105, volume: 530 },
  { time: "14:00", value: 106, volume: 535 },
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
    </div>
  );
}
