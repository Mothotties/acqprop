import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DollarSign, TrendingUp, Target } from "lucide-react";

interface PropertyMetricsComparisonProps {
  properties: Array<{
    title: string;
    price: number;
    roi?: number;
    risk_score?: number;
  }>;
}

export function PropertyMetricsComparison({ properties }: PropertyMetricsComparisonProps) {
  const metricsData = properties.map(property => ({
    name: property.title.substring(0, 15) + '...',
    Price: property.price,
    ROI: property.roi || 0,
    'Risk Score': property.risk_score || 0,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Metrics Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#10B981" />
              <YAxis yAxisId="right" orientation="right" stroke="#6366F1" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="Price"
                fill="#10B981"
                name="Price ($)"
              />
              <Bar
                yAxisId="right"
                dataKey="ROI"
                fill="#6366F1"
                name="ROI (%)"
              />
              <Bar
                yAxisId="right"
                dataKey="Risk Score"
                fill="#F43F5E"
                name="Risk Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}