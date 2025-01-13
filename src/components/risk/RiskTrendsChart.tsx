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

// Sample data to use when no real data is provided
const sampleData = [
  { date: "Jan", riskScore: 65, marketVolatility: 45 },
  { date: "Feb", riskScore: 75, marketVolatility: 52 },
  { date: "Mar", riskScore: 70, marketVolatility: 48 },
  { date: "Apr", riskScore: 80, marketVolatility: 55 },
  { date: "May", riskScore: 85, marketVolatility: 58 },
  { date: "Jun", riskScore: 78, marketVolatility: 50 },
];

export function RiskTrendsChart({ data = [] }: RiskTrendsChartProps) {
  // Use sample data if no real data is provided
  const chartData = data.length > 0 ? data : sampleData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Risk Trends Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="riskScore"
                stroke="#EF4444"
                fill="#FEE2E2"
                name="Risk Score"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="marketVolatility"
                stroke="#6366F1"
                fill="#E0E7FF"
                name="Market Volatility"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}