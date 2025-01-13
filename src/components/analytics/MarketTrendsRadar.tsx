import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface MarketTrendsRadarProps {
  data: Array<{
    metric: string;
    current: number;
    predicted: number;
  }>;
}

export function MarketTrendsRadar({ data }: MarketTrendsRadarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Radar
                name="Current"
                dataKey="current"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
              <Radar
                name="Predicted"
                dataKey="predicted"
                stroke="#6366F1"
                fill="#6366F1"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}