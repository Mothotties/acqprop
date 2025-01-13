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

interface ComparativeAnalysisProps {
  data: Array<{
    property: string;
    currentValue: number;
    predictedValue: number;
    marketAverage: number;
  }>;
}

export function ComparativeAnalysis({ data }: ComparativeAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Value Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="property" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="currentValue" name="Current Value" fill="#10B981" />
              <Bar dataKey="predictedValue" name="Predicted Value" fill="#6366F1" />
              <Bar dataKey="marketAverage" name="Market Average" fill="#F43F5E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}