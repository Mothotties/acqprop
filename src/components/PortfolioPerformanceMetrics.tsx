import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Brain, Target, Activity } from "lucide-react";

const performanceData = [
  { month: "Jan", actual: 100, predicted: 102, confidence: 95 },
  { month: "Feb", actual: 105, predicted: 108, confidence: 94 },
  { month: "Mar", actual: 115, predicted: 114, confidence: 96 },
  { month: "Apr", actual: 120, predicted: 122, confidence: 93 },
  { month: "May", actual: 125, predicted: 128, confidence: 95 },
  { month: "Jun", actual: 135, predicted: 134, confidence: 97 },
];

export function PortfolioPerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-ai" />
          AI Portfolio Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ROI Prediction</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
              <Badge className="bg-green-100 text-green-800">High Confidence</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">AI Accuracy</p>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <p className="text-2xl font-bold">95%</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Stable</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Volatility</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-500" />
                <p className="text-2xl font-bold">Low</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Monitored</Badge>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  name="Actual Performance"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#6366F1" 
                  name="AI Prediction"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">AI Insights</h4>
            <p className="text-sm text-muted-foreground">
              Based on current market trends and historical data, our AI predicts a strong positive trajectory
              for your portfolio with a 95% confidence level. Market conditions remain favorable for expansion.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}