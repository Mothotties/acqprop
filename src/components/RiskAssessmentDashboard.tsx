import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Brain, Target, Activity, TrendingUp, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const riskData = [
  { month: "Jan", risk: 3.2, volatility: 12, confidence: 92 },
  { month: "Feb", risk: 3.5, volatility: 14, confidence: 90 },
  { month: "Mar", risk: 3.1, volatility: 11, confidence: 94 },
  { month: "Apr", risk: 3.8, volatility: 15, confidence: 88 },
  { month: "May", risk: 3.4, volatility: 13, confidence: 91 },
  { month: "Jun", risk: 3.2, volatility: 12, confidence: 93 },
];

const marketData = [
  { time: "1W", value: 100, trend: 5 },
  { time: "1M", value: 105, trend: 7 },
  { time: "3M", value: 115, trend: 6 },
  { time: "6M", value: 125, trend: 8 },
  { time: "1Y", value: 140, trend: 9 },
];

export function RiskAssessmentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">AI Risk Assessment</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#F59E0B"
                    name="Risk Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    stroke="#10B981"
                    name="AI Confidence"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average Risk Score</p>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <p className="text-2xl font-bold">3.4/10</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-green-500" />
                  <p className="text-2xl font-bold">91%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Market Volatility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    fill="#6366F133"
                    name="Market Value"
                  />
                  <Area
                    type="monotone"
                    dataKey="trend"
                    stroke="#F43F5E"
                    fill="#F43F5E33"
                    name="Trend"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Market Status</p>
                <Badge className="bg-green-100 text-green-800">Stable</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Volatility</p>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <p className="text-2xl font-bold">12%</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Trend</p>
                <div className="flex items-center gap-2">
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