import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface AnalyticsChartsProps {
  performanceData: Array<{
    property: string;
    roi: number;
    occupancy: number;
  }>;
}

export function AnalyticsCharts({ performanceData }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>ROI Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="roi" fill="#10B981" name="ROI %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Occupancy Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#6366F1"
                  name="Occupancy Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}