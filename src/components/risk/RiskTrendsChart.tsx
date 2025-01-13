import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RiskTrendsChartProps {
  data: Array<{
    date: string;
    riskScore: number;
    marketVolatility: number;
  }>;
}

export function RiskTrendsChart({ data }: RiskTrendsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Risk Trends Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="riskScore"
                stroke="#EF4444"
                fill="#FEE2E2"
                name="Risk Score"
              />
              <Area
                type="monotone"
                dataKey="marketVolatility"
                stroke="#6366F1"
                fill="#E0E7FF"
                name="Market Volatility"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}