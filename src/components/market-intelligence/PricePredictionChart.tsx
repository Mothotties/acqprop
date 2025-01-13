import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, AlertTriangle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PricePredictionChartProps {
  data: {
    time: string;
    value: number;
    predicted: number;
  }[];
}

export function PricePredictionChart({ data }: PricePredictionChartProps) {
  return (
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
            <AreaChart data={data}>
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
  );
}