import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Building2, TrendingUp } from "lucide-react";

interface MarketData {
  property: string;
  marketValue: number;
  pricePerSqft: number;
}

interface MarketChartsProps {
  data: MarketData[];
}

export function MarketCharts({ data }: MarketChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            Market Value Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="property" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="marketValue"
                  stroke="#10B981"
                  name="Market Value"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500" />
            Price per Square Foot Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="property" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}/sq ft`} />
                <Bar 
                  dataKey="pricePerSqft" 
                  fill="#F59E0B" 
                  name="Price/sq ft"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}