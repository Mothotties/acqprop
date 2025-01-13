import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Building2 } from "lucide-react";

interface ComparativeAnalysisProps {
  data?: Array<{
    property: string;
    currentValue: number;
    predictedValue: number;
    marketAverage: number;
  }>;
}

export function ComparativeAnalysis({ data }: ComparativeAnalysisProps) {
  // Sample data if no data is provided
  const sampleData = [
    {
      property: "Luxury Condo Downtown",
      currentValue: 750000,
      predictedValue: 825000,
      marketAverage: 780000,
    },
    {
      property: "Suburban Family Home",
      currentValue: 550000,
      predictedValue: 595000,
      marketAverage: 565000,
    },
    {
      property: "Beach View Apartment",
      currentValue: 950000,
      predictedValue: 1050000,
      marketAverage: 985000,
    },
    {
      property: "Mountain Retreat",
      currentValue: 680000,
      predictedValue: 720000,
      marketAverage: 695000,
    },
    {
      property: "City Center Office",
      currentValue: 1200000,
      predictedValue: 1350000,
      marketAverage: 1275000,
    }
  ];

  const chartData = data || sampleData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-500" />
          Property Value Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="property"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
                labelStyle={{ color: '#111' }}
              />
              <Legend />
              <Bar
                dataKey="currentValue"
                name="Current Value"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="predictedValue"
                name="Predicted Value"
                fill="#6366F1"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="marketAverage"
                name="Market Average"
                fill="#F43F5E"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}