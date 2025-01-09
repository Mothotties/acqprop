import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, Activity, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const marketData = [
  { month: "Jan", sentiment: 85, confidence: 92, volatility: 12 },
  { month: "Feb", sentiment: 82, confidence: 90, volatility: 15 },
  { month: "Mar", sentiment: 88, confidence: 94, volatility: 11 },
  { month: "Apr", sentiment: 85, confidence: 91, volatility: 13 },
  { month: "May", sentiment: 90, confidence: 95, volatility: 10 },
  { month: "Jun", sentiment: 92, confidence: 96, volatility: 9 },
];

const predictionData = [
  { time: "1W", value: 100, predicted: 102 },
  { time: "1M", value: 105, predicted: 108 },
  { time: "3M", value: 110, predicted: 115 },
  { time: "6M", value: 115, predicted: 122 },
  { time: "1Y", value: 120, predicted: 130 },
];

export function MarketIntelligenceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-ai" />
        <h2 className="text-2xl font-bold">Market Intelligence</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Market Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
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
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Sentiment</p>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-ai" />
                  <p className="text-2xl font-bold">92%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <p className="text-2xl font-bold">96%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Price Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#D4AF37"
                    fill="#D4AF3733"
                    name="Actual Value"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10B981"
                    fill="#10B98133"
                    name="Predicted Value"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Prediction Status</p>
                <Badge className="bg-green-100 text-green-800">High Accuracy</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Growth Trend</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <p className="text-2xl font-bold">+8.3%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <p className="text-2xl font-bold">Low</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}