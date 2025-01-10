import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const trendData = [
  { month: "Jan", actual: 100, predicted: 102, confidence: 95 },
  { month: "Feb", actual: 105, predicted: 108, confidence: 93 },
  { month: "Mar", actual: 110, predicted: 115, confidence: 94 },
  { month: "Apr", actual: 115, predicted: 120, confidence: 92 },
  { month: "May", actual: 120, predicted: 126, confidence: 91 },
  { month: "Jun", actual: 125, predicted: 132, confidence: 90 },
];

export function PredictiveTrendAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Predictive Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#6366F1"
                fill="#6366F133"
                name="Actual Value"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#10B981"
                fill="#10B98133"
                name="Predicted Value"
              />
              <ReferenceLine
                y={115}
                label="Trend Threshold"
                stroke="#F43F5E"
                strokeDasharray="3 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Trend Direction</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-2xl font-bold">Upward</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Confidence Score</p>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-500" />
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Market Activity</p>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <p className="text-2xl font-bold">High</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}