import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, DollarSign, ChartBar } from "lucide-react";
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
} from "recharts";

const forecastData = [
  { month: "Jan", actual: 500000, predicted: 510000 },
  { month: "Feb", actual: 520000, predicted: 525000 },
  { month: "Mar", actual: 530000, predicted: 535000 },
  { month: "Apr", actual: 540000, predicted: 545000 },
  { month: "May", actual: 550000, predicted: 560000 },
  { month: "Jun", actual: 570000, predicted: 575000 },
];

const marketTrends = [
  { period: "Q1", sentiment: 85, volume: 120, price: 100 },
  { period: "Q2", sentiment: 75, volume: 110, price: 95 },
  { period: "Q3", sentiment: 90, volume: 130, price: 110 },
  { period: "Q4", sentiment: 95, volume: 140, price: 115 },
];

export function AIPredictiveAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-ai" />
        <h2 className="text-2xl font-bold">AI Predictive Analytics</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Property Value Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#D4AF37"
                    name="Actual Value"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10B981"
                    strokeDasharray="5 5"
                    name="AI Prediction"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="text-2xl font-bold text-ai">98.5%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Forecast Horizon</p>
                <p className="text-2xl font-bold">6 months</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="w-4 h-4" />
              Market Trend Analysis
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
                  <Bar dataKey="volume" fill="#D4AF37" name="Trading Volume" />
                  <Bar dataKey="price" fill="#6EE7B7" name="Price Index" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sentiment</p>
                <p className="text-2xl font-bold text-ai">95%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-2xl font-bold text-gold">+40%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Trend</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-ai" />
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